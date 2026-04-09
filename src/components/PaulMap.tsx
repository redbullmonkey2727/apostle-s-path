import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { cities, journeys, tileOptions, CityData } from "@/data/paulData";
import { smoothPath } from "@/lib/smoothPath";
import CityMarker from "./CityMarker";
import CityDetailPanel from "./CityDetailPanel";
import JourneyLegend from "./JourneyLegend";
import TimelineBar from "./TimelineBar";
import GuidedTour from "./GuidedTour";
import ShipwreckMarkerComponent from "./ShipwreckMarker";
import { Loader2 } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useDarkMode } from "@/hooks/useDarkMode";
import type { ShipwreckPoint } from "@/data/types";

function TileUpdater({ tileId }: { tileId: string }) {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [tileId, map]);
  return null;
}

function MapLoadingIndicator() {
  const map = useMap();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const onLoad = () => setLoading(false);
    const onLoadStart = () => setLoading(true);
    map.on("layeradd", onLoad);
    map.on("loading", onLoadStart);
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => {
      map.off("layeradd", onLoad);
      map.off("loading", onLoadStart);
      clearTimeout(timer);
    };
  }, [map]);
  if (!loading) return null;
  return (
    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] bg-card/90 border border-border rounded-lg px-4 py-2 flex items-center gap-2 shadow-md">
      <Loader2 className="h-4 w-4 animate-spin text-primary" />
      <span className="text-sm text-muted-foreground">Loading map…</span>
    </div>
  );
}

// Exposes the map instance to parent
function MapRef({ onMap }: { onMap: (map: L.Map) => void }) {
  const map = useMap();
  useEffect(() => { onMap(map); }, [map, onMap]);
  return null;
}

// Distance between two lat/lng points
function dist(a: [number, number], b: [number, number]): number {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
}

// Find the closest point index in a path to a shipwreck location
function findClosestIndex(positions: [number, number][], point: { lat: number; lng: number }): number {
  let minDist = Infinity;
  let minIdx = 0;
  for (let i = 0; i < positions.length; i++) {
    const d = dist(positions[i], [point.lat, point.lng]);
    if (d < minDist) { minDist = d; minIdx = i; }
  }
  return minIdx;
}

// Animated polyline that draws progressively with slowdowns near shipwrecks
function AnimatedPolyline({
  positions,
  color,
  dashArray,
  shipwrecks = [],
}: {
  positions: [number, number][];
  color: string;
  dashArray?: string;
  shipwrecks?: ShipwreckPoint[];
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  const frameRef = useRef<number>();

  // Pre-compute shipwreck indices and slow zones
  const shipwreckIndices = useMemo(() => {
    return shipwrecks.map((sw) => findClosestIndex(positions, sw));
  }, [positions, shipwrecks]);

  useEffect(() => {
    setVisibleCount(0);
    let count = 0;
    const slowRadius = 15; // points before/after shipwreck to slow down
    const pauseFrames = 30; // frames to pause at shipwreck point
    let pauseCounter = 0;
    let isPaused = false;

    const getSpeed = (idx: number): number => {
      for (const swIdx of shipwreckIndices) {
        const distance = Math.abs(idx - swIdx);
        if (distance === 0) return 0; // will trigger pause
        if (distance <= slowRadius) {
          // Ease: very slow near wreck, speeds up away from it
          const t = distance / slowRadius;
          return Math.max(0.3, t * t * 2);
        }
      }
      return 2; // normal speed
    };

    const step = () => {
      if (isPaused) {
        pauseCounter++;
        if (pauseCounter >= pauseFrames) {
          isPaused = false;
          pauseCounter = 0;
          count++;
        }
        setVisibleCount(count);
        if (count < positions.length) {
          frameRef.current = requestAnimationFrame(step);
        }
        return;
      }

      const speed = getSpeed(Math.floor(count));

      if (speed === 0 && !isPaused) {
        isPaused = true;
        pauseCounter = 0;
        frameRef.current = requestAnimationFrame(step);
        return;
      }

      count = Math.min(count + speed, positions.length);
      setVisibleCount(Math.floor(count));
      if (count < positions.length) {
        frameRef.current = requestAnimationFrame(step);
      }
    };

    const timer = setTimeout(() => {
      frameRef.current = requestAnimationFrame(step);
    }, 100);
    return () => {
      clearTimeout(timer);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [positions, shipwreckIndices]);

  if (visibleCount < 2) return null;

  return (
    <Polyline
      positions={positions.slice(0, visibleCount)}
      pathOptions={{
        color,
        weight: 3,
        opacity: 0.8,
        dashArray,
        lineJoin: "round",
        lineCap: "round",
      }}
    />
  );
}

const PaulMap = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDark, toggle: toggleDark } = useDarkMode();
  const { bookmarks, toggle: toggleBookmark } = useBookmarks();
  const [showTour, setShowTour] = useState(false);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const [activeJourneys, setActiveJourneys] = useState<string[]>(() => {
    const param = searchParams.get("journeys");
    return param ? param.split(",") : ["first", "second", "third", "rome"];
  });
  const [activeTile, setActiveTile] = useState(() => searchParams.get("tile") || "google");
  const [selectedCity, setSelectedCity] = useState<CityData | null>(() => {
    const cityId = searchParams.get("city");
    return cityId ? cities.find((c) => c.id === cityId) || null : null;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState(() => searchParams.get("topic") || "");

  useEffect(() => {
    const params: Record<string, string> = {};
    if (activeJourneys.length > 0 && activeJourneys.length < 4) {
      params.journeys = activeJourneys.join(",");
    }
    if (activeTile !== "google") params.tile = activeTile;
    if (selectedCity) params.city = selectedCity.id;
    if (activeTopic) params.topic = activeTopic;
    setSearchParams(params, { replace: true });
  }, [activeJourneys, activeTile, selectedCity, activeTopic, setSearchParams]);

  const closeCity = useCallback(() => setSelectedCity(null), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showTour) setShowTour(false);
        else closeCity();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeCity, showTour]);

  const toggleJourney = (id: string) => {
    setActiveJourneys((prev) =>
      prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]
    );
  };

  const tile = tileOptions.find((t) => t.id === activeTile) || tileOptions[0];

  const filteredCities = useMemo(() => {
    let result = cities;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.label.toLowerCase().includes(q) ||
          c.references.some((r) => r.toLowerCase().includes(q)) ||
          c.writers.some((w) => w.toLowerCase().includes(q))
      );
    }
    if (activeTopic) {
      result = result.filter((c) =>
        c.scriptures.some((s) => s.topics.includes(activeTopic))
      );
    }
    return result;
  }, [searchQuery, activeTopic]);

  const handlePanTo = useCallback((lat: number, lng: number) => {
    mapInstanceRef.current?.flyTo([lat, lng], 8, { duration: 1.2 });
  }, []);

  const handleMapRef = useCallback((map: L.Map) => {
    mapInstanceRef.current = map;
  }, []);

  return (
    <div className="flex flex-col gap-3 h-[calc(100vh-5rem)]">
      {/* Timeline */}
      <TimelineBar onCitySelect={setSelectedCity} selectedCityId={selectedCity?.id} />

      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        <JourneyLegend
          activeJourneys={activeJourneys}
          onToggleJourney={toggleJourney}
          activeTile={activeTile}
          onTileChange={setActiveTile}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeTopic={activeTopic}
          onTopicChange={setActiveTopic}
          isDark={isDark}
          onToggleDark={toggleDark}
          onStartTour={() => setShowTour(true)}
        />

        <div className="flex-1 rounded-lg overflow-hidden border border-border shadow-sm relative">
          <MapContainer
            center={[37.5, 28]}
            zoom={5}
            className="h-full w-full"
            zoomControl={true}
            scrollWheelZoom={true}
          >
            <TileUpdater tileId={activeTile} />
            <MapLoadingIndicator />
            <MapRef onMap={handleMapRef} />
            <TileLayer url={tile.url} attribution={tile.attribution} />

            {journeys
              .filter((j) => activeJourneys.includes(j.id))
              .map((j) => (
                <AnimatedPolyline
                  key={j.id}
                  positions={smoothPath(j.path, 12)}
                  color={j.color}
                  dashArray={j.id === "rome" ? "8 4" : undefined}
                  shipwrecks={j.shipwrecks}
                />
              ))}

            {/* Shipwreck markers */}
            {journeys
              .filter((j) => activeJourneys.includes(j.id) && j.shipwrecks)
              .flatMap((j) =>
                j.shipwrecks!.map((sw, i) => (
                  <ShipwreckMarkerComponent
                    key={`${j.id}-wreck-${i}`}
                    shipwreck={sw}
                    journeyColor={j.color}
                  />
                ))
              )}

            {filteredCities.map((city) => (
              <CityMarker
                key={city.id}
                city={city}
                onClick={setSelectedCity}
              />
            ))}
          </MapContainer>
        </div>
      </div>

      {selectedCity && (
        <CityDetailPanel
          city={selectedCity}
          onClose={closeCity}
          activeTopic={activeTopic}
          allCities={cities}
          onCityChange={setSelectedCity}
          bookmarks={bookmarks}
          onToggleBookmark={toggleBookmark}
        />
      )}

      {showTour && (
        <GuidedTour
          onClose={() => setShowTour(false)}
          onCitySelect={(city) => {
            setShowTour(false);
            setSelectedCity(city);
          }}
          onPanTo={handlePanTo}
        />
      )}
    </div>
  );
};

export default PaulMap;
