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
  const refCount = city.scriptures.length;

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
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-serif text-base font-bold text-foreground">{city.name}</h3>
            <span className="text-xs font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
              {refCount} ref{refCount !== 1 ? "s" : ""}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{city.label}</p>
          <p className="text-xs text-muted-foreground mt-1 italic">{city.estimatedAge}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {city.writers.map((w) => (
              <span key={w} className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                {writerNames[w] || w}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-accent mt-1.5">Click to view scriptures →</p>
        </div>
      </Tooltip>
    </CircleMarker>
  );
};

export default CityMarker;
