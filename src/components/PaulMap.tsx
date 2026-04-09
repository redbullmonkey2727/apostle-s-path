import { MapContainer, TileLayer, Polyline, Marker, useMap, CircleMarker, Tooltip } from "react-leaflet";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cities, journeys, tileOptions, CityData, allTopics } from "@/data/paulData";
import { smoothPath } from "@/lib/smoothPath";
import CityMarker from "./CityMarker";
import CityDetailPanel from "./CityDetailPanel";
import JourneyLegend from "./JourneyLegend";
import TimelineBar from "./TimelineBar";
import GuidedTour from "./GuidedTour";
import ShipwreckMarkerComponent from "./ShipwreckMarker";
import WelcomeOverlay from "./WelcomeOverlay";
import ScriptureProgressBar from "./ScriptureProgressBar";
import { Loader2, Share2, FileDown } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useScriptureProgress } from "@/hooks/useScriptureProgress";
import { generateScripturePdf } from "@/lib/generatePdf";
import type { ShipwreckPoint } from "@/data/types";
import shipImg from "@/assets/ship.png";

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

// Land detection: polygon-ish bounding boxes for coastlines
// More granular than before to avoid treating narrow sea crossings as land
const landBoxes: { latMin: number; latMax: number; lngMin: number; lngMax: number }[] = [
  // Central/Eastern Turkey (inland)
  { latMin: 37.5, latMax: 42, lngMin: 30, lngMax: 44 },
  // Western Turkey (Ephesus/Troas coast — narrower to exclude Aegean)
  { latMin: 37.5, latMax: 41, lngMin: 27.5, lngMax: 30 },
  // Levant coast (Syria/Israel/Lebanon)
  { latMin: 31, latMax: 37, lngMin: 34.5, lngMax: 37 },
  // Greece mainland (north)
  { latMin: 39, latMax: 42, lngMin: 19.5, lngMax: 26 },
  // Greece mainland (south, above Peloponnese)
  { latMin: 38, latMax: 39, lngMin: 21, lngMax: 24 },
  // Peloponnese
  { latMin: 36.8, latMax: 38, lngMin: 21.5, lngMax: 23.5 },
  // Italy boot (south)
  { latMin: 37.5, latMax: 42, lngMin: 12, lngMax: 16 },
  // Italy boot (west coast / Rome area)
  { latMin: 40, latMax: 43, lngMin: 11, lngMax: 13 },
  // North Africa coast
  { latMin: 30, latMax: 33, lngMin: 24, lngMax: 35 },
  // Sicily
  { latMin: 36.6, latMax: 38.3, lngMin: 13, lngMax: 15.8 },
  // Cilicia / Tarsus strip
  { latMin: 36.5, latMax: 37.5, lngMin: 34, lngMax: 36.5 },
];

function isOverWater(pos: [number, number]): boolean {
  const [lat, lng] = pos;
  for (const box of landBoxes) {
    if (lat >= box.latMin && lat <= box.latMax && lng >= box.lngMin && lng <= box.lngMax) {
      return false;
    }
  }
  return true;
}

// Create tiny ship icon for the leading edge (14px — 12% smaller than 16px)
const tinyShipIcon = L.divIcon({
  html: `<img src="${shipImg}" style="width:14px;height:14px;object-fit:contain;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.5));" />`,
  className: "sailing-ship-icon",
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

// Global speed multiplier: 8% faster than previous 0.78 → ~0.84
const SPEED_FACTOR = 0.84;

// Animated polyline that draws progressively with slowdowns near shipwrecks
function AnimatedPolyline({
  positions,
  color,
  dashArray,
  shipwrecks = [],
  delay = 0,
}: {
  positions: [number, number][];
  color: string;
  dashArray?: string;
  shipwrecks?: ShipwreckPoint[];
  delay?: number;
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [shipPos, setShipPos] = useState<[number, number] | null>(null);
  const [showShip, setShowShip] = useState(false);
  const [splashPoints, setSplashPoints] = useState<{ pos: [number, number]; key: number }[]>([]);
  const frameRef = useRef<number>();
  const triggeredWrecks = useRef<Set<number>>(new Set());

  // Pre-compute shipwreck indices and slow zones
  const shipwreckIndices = useMemo(() => {
    return shipwrecks.map((sw) => findClosestIndex(positions, sw));
  }, [positions, shipwrecks]);

  useEffect(() => {
    setVisibleCount(0);
    setShipPos(null);
    setShowShip(false);
    let count = 0;
    const slowRadius = 15;
    const pauseFrames = 30;
    let pauseCounter = 0;
    let isPaused = false;

    const getSpeed = (idx: number): number => {
      for (const swIdx of shipwreckIndices) {
        const distance = Math.abs(idx - swIdx);
        if (distance === 0) return 0;
        if (distance <= slowRadius) {
          const t = distance / slowRadius;
          return Math.max(0.3, t * t * 2) * SPEED_FACTOR;
        }
      }
      return 2 * SPEED_FACTOR; // normal speed, 18% slower
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
      const idx = Math.floor(count);
      setVisibleCount(idx);

      // Update ship position at the leading edge
      if (idx > 0 && idx < positions.length) {
        const headPos = positions[idx];
        const onWater = isOverWater(headPos);
        setShowShip(onWater);
        if (onWater) {
          setShipPos(headPos);
        }
      }

      if (count < positions.length) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setShowShip(false);
        setShipPos(null);
      }
    };

    const timer = setTimeout(() => {
      frameRef.current = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(timer);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [positions, shipwreckIndices]);

  if (visibleCount < 2) return null;

  return (
    <>
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
      {showShip && shipPos && (
        <Marker position={shipPos} icon={tinyShipIcon} interactive={false} />
      )}
    </>
  );
}

const PaulMap = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDark, toggle: toggleDark } = useDarkMode();
  const { bookmarks, toggle: toggleBookmark } = useBookmarks();
  const [showTour, setShowTour] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const [activeJourneys, setActiveJourneys] = useState<string[]>(() => {
    const param = searchParams.get("journeys");
    return param ? param.split(",") : ["first", "second", "third", "rome"];
  });
  const [activeTile, setActiveTile] = useState(() => searchParams.get("tile") || "osm");
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
    if (activeTile !== "osm") params.tile = activeTile;
    if (selectedCity) params.city = selectedCity.id;
    if (activeTopic) params.topic = activeTopic;
    setSearchParams(params, { replace: true });
  }, [activeJourneys, activeTile, selectedCity, activeTopic, setSearchParams]);

  const closeCity = useCallback(() => setSelectedCity(null), []);

  // Keyboard shortcuts: Esc, arrows, T, D
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "Escape") {
        if (showTour) setShowTour(false);
        else closeCity();
      } else if (e.key === "t" || e.key === "T") {
        setShowTour((prev) => !prev);
      } else if (e.key === "d" || e.key === "D") {
        toggleDark();
      } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        setSelectedCity((current) => {
          const citiesWithScriptures = cities.filter((c) => c.scriptures.length > 0);
          if (citiesWithScriptures.length === 0) return current;
          if (!current) return citiesWithScriptures[0];
          const idx = citiesWithScriptures.findIndex((c) => c.id === current.id);
          if (e.key === "ArrowRight") {
            return citiesWithScriptures[(idx + 1) % citiesWithScriptures.length];
          } else {
            return citiesWithScriptures[(idx - 1 + citiesWithScriptures.length) % citiesWithScriptures.length];
          }
        });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeCity, showTour, toggleDark]);

  const handleShareLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      // Brief visual feedback via a toast-like approach
      const el = document.createElement("div");
      el.textContent = "📋 Link copied!";
      el.className = "fixed top-4 left-1/2 -translate-x-1/2 z-[3000] bg-card border border-border rounded-lg px-4 py-2 text-sm shadow-lg animate-fade-in";
      document.body.appendChild(el);
      setTimeout(() => { el.style.opacity = "0"; el.style.transition = "opacity 0.3s"; }, 1500);
      setTimeout(() => el.remove(), 2000);
    });
  }, []);

  const toggleJourney = (id: string) => {
    setActiveJourneys((prev) =>
      prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]
    );
  };

  const tile = tileOptions.find((t) => t.id === activeTile) || tileOptions[0];

  // Collect all scriptures matching a topic search
  const topicSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.trim().toLowerCase();
    // Check if query matches any topic name
    const matchedTopic = allTopics.find((t) => t.toLowerCase().includes(q));
    if (!matchedTopic) return null;

    const results: { city: string; cityData: CityData; reference: string; writer: string; topics: string[] }[] = [];
    for (const c of cities) {
      for (const s of c.scriptures) {
        if (s.topics.some((t) => t.toLowerCase().includes(q))) {
          results.push({ city: c.name, cityData: c, reference: s.reference, writer: s.writer, topics: s.topics });
        }
      }
    }
    return results.length > 0 ? { topic: matchedTopic, results } : null;
  }, [searchQuery]);

  const filteredCities = useMemo(() => {
    let result = cities;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.label.toLowerCase().includes(q) ||
          c.references.some((r) => r.toLowerCase().includes(q)) ||
          c.writers.some((w) => w.toLowerCase().includes(q)) ||
          c.scriptures.some((s) => s.topics.some((t) => t.toLowerCase().includes(q)))
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
          {/* Share button */}
          <button
            onClick={handleShareLink}
            className="absolute top-3 left-3 z-[1000] bg-card/90 border border-border rounded-lg px-3 py-1.5 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-card shadow-sm transition-colors"
            title="Copy shareable link"
          >
            <Share2 className="h-3.5 w-3.5" /> Share
          </button>
          {/* Mobile floating search bar */}
          <div className="lg:hidden absolute top-3 left-20 right-3 z-[1000]">
            <input
              type="text"
              placeholder="Search topics, cities, writers…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md border border-input bg-card/95 backdrop-blur text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring shadow-sm"
            />
          </div>
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

            {(() => {
              const journeyOrder = ["first", "second", "third", "rome"];
              const staggerDelay = 4500; // ms between journey starts
              return journeys
                .filter((j) => activeJourneys.includes(j.id))
                .map((j) => {
                  const orderIdx = journeyOrder.indexOf(j.id);
                  return (
                    <AnimatedPolyline
                      key={j.id}
                      positions={smoothPath(j.path, 12)}
                      color={j.color}
                      dashArray={j.id === "rome" ? "8 4" : undefined}
                      shipwrecks={j.shipwrecks}
                      delay={orderIdx * staggerDelay}
                    />
                  );
                });
            })()}

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

          {/* Topic search results overlay */}
          {topicSearchResults && !selectedCity && (
            <div className="absolute top-3 right-3 z-[1000] bg-card/95 backdrop-blur border border-border rounded-lg shadow-lg max-w-sm max-h-[60vh] overflow-y-auto">
              <div className="sticky top-0 bg-card/95 backdrop-blur px-4 py-3 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-sm text-foreground">
                    📖 "{topicSearchResults.topic}" — {topicSearchResults.results.length} scriptures
                  </h3>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-muted-foreground hover:text-foreground text-xs ml-2"
                  >✕</button>
                </div>
              </div>
              <div className="divide-y divide-border">
                {topicSearchResults.results.map((r, i) => (
                  <button
                    key={`${r.reference}-${i}`}
                    onClick={() => {
                      setSelectedCity(r.cityData);
                      setSearchQuery("");
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-muted/50 transition-colors"
                  >
                    <p className="text-sm font-semibold text-foreground">{r.reference}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {r.city} · <span className="capitalize">{r.writer}</span>
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
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

      <WelcomeOverlay onStartTour={() => setShowTour(true)} />
    </div>
  );
};

export default PaulMap;
