import { CircleMarker, Tooltip, useMap } from "react-leaflet";
import { useEffect, useRef, useCallback } from "react";
import { CityData } from "@/data/paulData";

interface CityMarkerProps {
  city: CityData;
  onClick: (city: CityData) => void;
}

const writerColors: Record<string, string> = {
  paul: "hsl(25, 60%, 30%)",
  peter: "hsl(200, 60%, 40%)",
  john: "hsl(280, 50%, 45%)",
  luke: "hsl(170, 50%, 35%)",
  james: "hsl(140, 50%, 35%)",
  jude: "hsl(340, 50%, 45%)",
  "hebrews-author": "hsl(30, 60%, 45%)",
};

function getMarkerColor(city: CityData): string {
  if (city.writers.length > 0) {
    return writerColors[city.writers[0]] || "hsl(25, 60%, 30%)";
  }
  return "hsl(25, 60%, 30%)";
}

const writerNames: Record<string, string> = {
  paul: "Paul",
  peter: "Peter",
  john: "John",
  luke: "Luke",
  james: "James",
  jude: "Jude",
  "hebrews-author": "Hebrews Author",
};

const summaries: Record<string, string> = {
  "Romans 2:12": "Judged by the law you have",
  "Romans 4:24-25": "Justified through Christ's resurrection",
  "Romans 8:16-17": "Joint-heirs with Christ",
  "Romans 8:32-33": "God spared not His own Son",
  "1 Corinthians 1:12-13": "Divisions in the church",
  "1 Corinthians 8:6": "One God, one Lord",
  "1 Corinthians 12:27-28": "Body of Christ; offices in the church",
  "1 Corinthians 14:33": "God is not the author of confusion",
  "1 Corinthians 15:29": "Baptism for the dead",
  "1 Corinthians 15:40-42": "Degrees of glory in resurrection",
  "2 Corinthians 1:2-3": "God of all comfort",
  "2 Corinthians 12:2": "Caught up to the third heaven",
  "Galatians 1:6-8": "No other gospel; angels warning",
  "Galatians 1:19": "James the Lord's brother",
  "Galatians 5:1": "Stand fast in liberty",
  "Galatians 6:7": "Whatsoever a man soweth",
  "Ephesians 1:10": "Dispensation of the fulness of times",
  "Ephesians 2:19-21": "Built on apostles and prophets",
  "Ephesians 4:5": "One Lord, one faith, one baptism",
  "Ephesians 4:11-14": "Apostles, prophets, evangelists for unity",
  "Ephesians 6:12": "Wrestling against spiritual wickedness",
  "Philippians 2:10-11": "Every knee shall bow",
  "Colossians 1:15-16": "Christ the firstborn of creation",
  "Colossians 2:8": "Beware philosophy & tradition of men",
  "1 Thessalonians 5:2": "Day of the Lord as a thief",
  "2 Thessalonians 2:1-3": "Falling away before Christ's coming",
  "1 Timothy 2:5": "One mediator between God and men",
  "1 Timothy 3:1-5": "Qualifications of a bishop",
  "1 Timothy 4:1-3": "Departing from the faith in latter times",
  "2 Timothy 3:1-5": "Perilous times in the last days",
  "2 Timothy 3:16-17": "All scripture is given by inspiration",
  "2 Timothy 4:3-4": "Turning from truth to fables",
  "Titus 1:5-9": "Ordain elders in every city",
  "Hebrews 5:1-4": "Called of God as was Aaron",
  "Hebrews 5:8-9": "Christ learned obedience by suffering",
  "Hebrews 11:1": "Faith is the substance of things hoped for",
  "Hebrews 12:9": "Father of spirits",
  "James 1:5": "Ask of God for wisdom",
  "James 2:17-20": "Faith without works is dead",
  "James 3:17": "Wisdom from above is pure & peaceable",
  "1 Peter 3:18-20": "Christ preached to spirits in prison",
  "1 Peter 4:6": "Gospel preached to the dead",
  "2 Peter 1:19-21": "Prophecy by the Holy Ghost",
  "1 John 4:1": "Try the spirits whether they are of God",
  "Jude 1:3": "Contend for the faith once delivered",
  "Jude 1:6": "Angels who kept not their first estate",
  "Revelation 14:6": "Angel with the everlasting gospel",
  "Revelation 20:12": "Dead judged out of the books",
};

function getSummary(ref: string): string {
  if (summaries[ref]) return summaries[ref];
  for (const key of Object.keys(summaries)) {
    if (ref.includes(key) || key.includes(ref)) return summaries[key];
  }
  return "";
}

const CityMarker = ({ city, onClick }: CityMarkerProps) => {
  const totalRefs = city.scriptures.length;
  const previewScriptures = city.scriptures.slice(0, 3);
  const markerRef = useRef<any>(null);
  const map = useMap();
  const tooltipOpenRef = useRef(false);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;
    const resetTooltip = () => { tooltipOpenRef.current = false; };
    map.on("click", resetTooltip);
    return () => { map.off("click", resetTooltip); };
  }, [map]);

  const handleClick = useCallback(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
      onClick(city);
      return;
    }
    if (!tooltipOpenRef.current) {
      markerRef.current?.openTooltip();
      tooltipOpenRef.current = true;
    } else {
      tooltipOpenRef.current = false;
      onClick(city);
    }
  }, [city, onClick]);

  // Dynamic radius based on scripture count
  const radius = Math.min(6 + totalRefs * 0.4, 14) * 0.95 * 1.042;

  return (
    <>
      <CircleMarker
        ref={markerRef}
        center={[city.lat, city.lng]}
        radius={radius}
        pathOptions={{
          fillColor: getMarkerColor(city),
          fillOpacity: 0.9,
          color: "hsl(36, 33%, 97%)",
          weight: 2,
        }}
        eventHandlers={{ click: handleClick }}
      >
        <Tooltip
          direction="top"
          offset={[0, -10]}
          className="city-tooltip"
        >
          <div className="p-2 min-w-[200px] max-w-[280px] font-rosarivo">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-serif text-base font-bold text-foreground">{city.name}</h3>
              <span className="text-xs font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                {totalRefs} ref{totalRefs !== 1 ? "s" : ""}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{city.label}</p>
            {city.epistleName && (
              <p className="text-[10px] text-muted-foreground italic mt-0.5">
                {city.epistleName} — written {city.estimatedAge}
              </p>
            )}
            <div className="flex flex-wrap gap-1 mt-1">
              {city.writers.map((w) => (
                <span key={w} className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {writerNames[w] || w}
                </span>
              ))}
            </div>
            {previewScriptures.length > 0 && (
              <div className="mt-2 border-t border-border pt-1.5 space-y-1">
                {previewScriptures.map((s, i) => {
                  const summary = getSummary(s.reference);
                  return (
                    <div key={i} className="flex gap-1.5 items-start">
                      <span className="text-[11px] font-semibold text-primary whitespace-nowrap">{s.reference}</span>
                      {summary && (
                        <span className="text-[10px] text-muted-foreground leading-tight">{summary}</span>
                      )}
                    </div>
                  );
                })}
                {totalRefs > 3 && (
                  <p className="text-[10px] text-muted-foreground italic">+{totalRefs - 3} more…</p>
                )}
              </div>
            )}
            <p className="text-[10px] text-accent mt-1.5">Click to view all scriptures →</p>
          </div>
        </Tooltip>
      </CircleMarker>
    </>
  );
};

export default CityMarker;
