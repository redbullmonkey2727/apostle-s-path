import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import { useState, useMemo, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { cities, journeys, tileOptions, CityData } from "@/data/paulData";
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
  const [activeTile, setActiveTile] = useState("terrain");
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleJourney = (id: string) => {
    setActiveJourneys((prev) =>
      prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]
    );
  };

  const tile = tileOptions.find((t) => t.id === activeTile) || tileOptions[0];

  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return cities;
    const q = searchQuery.toLowerCase();
    return cities.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.label.toLowerCase().includes(q) ||
        c.references.some((r) => r.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-5rem)]">
      <JourneyLegend
        activeJourneys={activeJourneys}
        onToggleJourney={toggleJourney}
        activeTile={activeTile}
        onTileChange={setActiveTile}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
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

          {/* Journey polylines */}
          {journeys
            .filter((j) => activeJourneys.includes(j.id))
            .map((j) => (
              <Polyline
                key={j.id}
                positions={j.path}
                pathOptions={{
                  color: j.color,
                  weight: 3,
                  opacity: 0.8,
                  dashArray: j.id === "rome" ? "8 4" : undefined,
                }}
              />
            ))}

          {/* City markers */}
          {filteredCities.map((city) => (
            <CityMarker
              key={city.id}
              city={city}
              onClick={setSelectedCity}
            />
          ))}
        </MapContainer>
      </div>

      {/* City detail panel */}
      {selectedCity && (
        <CityDetailPanel
          city={selectedCity}
          onClose={() => setSelectedCity(null)}
        />
      )}
    </div>
  );
};

export default PaulMap;
