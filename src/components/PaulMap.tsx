import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { cities, journeys, tileOptions, CityData } from "@/data/paulData";
import { smoothPath } from "@/lib/smoothPath";
import CityMarker from "./CityMarker";
import CityDetailPanel from "./CityDetailPanel";
import JourneyLegend from "./JourneyLegend";
import { Loader2 } from "lucide-react";

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
    // Fallback: hide after 3s
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

const PaulMap = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL params
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

  // Sync state → URL
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

  // Escape key closes city detail panel
  const closeCity = useCallback(() => setSelectedCity(null), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCity();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeCity]);

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

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-5rem)]">
      <JourneyLegend
        activeJourneys={activeJourneys}
        onToggleJourney={toggleJourney}
        activeTile={activeTile}
        onTileChange={setActiveTile}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTopic={activeTopic}
        onTopicChange={setActiveTopic}
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
          <TileLayer url={tile.url} attribution={tile.attribution} />

          {journeys
            .filter((j) => activeJourneys.includes(j.id))
            .map((j) => (
              <Polyline
                key={j.id}
                positions={smoothPath(j.path, 12)}
                pathOptions={{
                  color: j.color,
                  weight: 3,
                  opacity: 0.8,
                  dashArray: j.id === "rome" ? "8 4" : undefined,
                  lineJoin: "round",
                  lineCap: "round",
                }}
              />
            ))}

          {filteredCities.map((city) => (
            <CityMarker
              key={city.id}
              city={city}
              onClick={setSelectedCity}
            />
          ))}
        </MapContainer>
      </div>

      {selectedCity && (
        <CityDetailPanel
          city={selectedCity}
          onClose={closeCity}
          activeTopic={activeTopic}
        />
      )}
    </div>
  );
};

export default PaulMap;
