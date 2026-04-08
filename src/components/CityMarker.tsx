import { CircleMarker, Tooltip } from "react-leaflet";
import { CityData } from "@/data/paulData";

interface CityMarkerProps {
  city: CityData;
  onClick: (city: CityData) => void;
}

const typeColors: Record<string, string> = {
  visited: "hsl(210, 70%, 45%)",
  letter: "hsl(38, 70%, 50%)",
  both: "hsl(25, 60%, 30%)",
};

const writerNames: Record<string, string> = {
  paul: "Paul",
  peter: "Peter",
  john: "John",
  james: "James",
  jude: "Jude",
  "hebrews-author": "Hebrews Author",
};

const CityMarker = ({ city, onClick }: CityMarkerProps) => {
  return (
    <CircleMarker
      center={[city.lat, city.lng]}
      radius={8}
      pathOptions={{
        fillColor: typeColors[city.type],
        fillOpacity: 0.9,
        color: "hsl(36, 33%, 97%)",
        weight: 2,
      }}
      eventHandlers={{
        click: () => onClick(city),
      }}
    >
      <Tooltip
        direction="top"
        offset={[0, -10]}
        className="city-tooltip"
      >
        <div className="p-2 min-w-[180px]">
          <h3 className="font-serif text-base font-bold text-foreground">{city.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{city.label}</p>
          <p className="text-xs text-muted-foreground mt-1 italic">{city.estimatedAge}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {city.writers.map((w) => (
              <span key={w} className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                {writerNames[w] || w}
              </span>
            ))}
          </div>
          <div className="mt-1.5 border-t border-border pt-1.5">
            <p className="text-xs font-medium text-foreground mb-0.5">References:</p>
            {city.references.slice(0, 3).map((ref) => (
              <p key={ref} className="text-xs text-muted-foreground">{ref}</p>
            ))}
            {city.references.length > 3 && (
              <p className="text-xs text-accent">+{city.references.length - 3} more…</p>
            )}
          </div>
        </div>
      </Tooltip>
    </CircleMarker>
  );
};

export default CityMarker;
