import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import { useState, useMemo, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { cities, journeys, tileOptions, CityData } from "@/data/paulData";
import { smoothPath } from "@/lib/smoothPath";
import CityMarker from "./CityMarker";
import CityDetailPanel from "./CityDetailPanel";
import JourneyLegend from "./JourneyLegend";

function TileUpdater({ tileId }: { tileId: string }) {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [tileId, map]);
  return null;
}

const PaulMap = () => {
  const [activeJourneys, setActiveJourneys] = useState<string[]>(["first", "second", "third", "rome"]);
  const [activeTile, setActiveTile] = useState("google");
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState("");

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
          onClose={() => setSelectedCity(null)}
          activeTopic={activeTopic}
        />
      )}
    </div>
  );
};

export default PaulMap;
