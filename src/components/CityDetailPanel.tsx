import { CityData } from "@/data/paulData";
import { X, MapPin, Tag, Thermometer, BookOpen } from "lucide-react";
import { useState } from "react";

interface CityDetailPanelProps {
  city: CityData;
  onClose: () => void;
  activeTopic: string;
}

const writerNames: Record<string, string> = {
  paul: "Paul",
  peter: "Peter",
  john: "John",
  james: "James",
  jude: "Jude",
  "hebrews-author": "Hebrews Author",
};

const CityDetailPanel = ({ city, onClose, activeTopic }: CityDetailPanelProps) => {
  const [selectedRef, setSelectedRef] = useState<string | null>(
    city.scriptures.length > 0 ? city.scriptures[0].reference : null
  );

  const filteredScriptures = activeTopic
    ? city.scriptures.filter((s) => s.topics.includes(activeTopic))
    : city.scriptures;

  const selectedScripture = city.scriptures.find((s) => s.reference === selectedRef);

  return (
    <div className="fixed inset-0 bg-background z-[1000] flex flex-col animate-fade-in">
      {/* Top bar */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-start justify-between max-w-7xl mx-auto">
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="font-serif text-3xl font-bold text-foreground">{city.name}</h2>
              {city.epistleName && (
                <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {city.epistleName}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {city.label}
              </span>
              <span className="italic">{city.estimatedAge}</span>
              {city.writerAges && Object.entries(city.writerAges).map(([w, age]) => (
                <span key={w} className="px-2 py-0.5 rounded bg-muted text-xs">
                  {writerNames[w] || w}: {age} yrs old
                </span>
              ))}
            </div>
            {(city.summerTempC !== undefined || city.winterTempC !== undefined) && (
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <Thermometer className="h-3.5 w-3.5" />
                {city.summerTempC !== undefined && (
                  <span>Summer avg: <strong className="text-foreground">{city.summerTempC}°C / {Math.round(city.summerTempC * 9 / 5 + 32)}°F</strong></span>
                )}
                {city.winterTempC !== undefined && (
                  <span>Winter avg: <strong className="text-foreground">{city.winterTempC}°C / {Math.round(city.winterTempC * 9 / 5 + 32)}°F</strong></span>
                )}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-colors ml-4"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 flex overflow-hidden max-w-7xl mx-auto w-full">
        {/* Scripture selector sidebar */}
        <div className="w-72 border-r border-border overflow-y-auto p-4 space-y-1 bg-card/50 shrink-0 font-rosarivo">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" /> Scriptures ({filteredScriptures.length})
          </h3>
          {filteredScriptures.map((s) => (
            <button
              key={s.reference}
              onClick={() => setSelectedRef(s.reference)}
              className={`w-full text-left px-3 py-2.5 rounded-md border transition-all text-sm ${
                selectedRef === s.reference
                  ? "border-primary bg-primary/5 text-foreground font-medium"
                  : "border-transparent hover:border-border hover:bg-muted/50 text-foreground"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{s.reference}</span>
                <span className="text-[10px] text-muted-foreground">{writerNames[s.writer]}</span>
              </div>
              {s.topics.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {s.topics.map((t) => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-accent/20 text-accent-foreground flex items-center gap-0.5">
                      <Tag className="h-2 w-2" /> {t}
                    </span>
                  ))}
                </div>
              )}
            </button>
          ))}
          {filteredScriptures.length === 0 && (
            <p className="text-sm text-muted-foreground italic">No scriptures match the selected topic.</p>
          )}
        </div>

        {/* Side-by-side translations */}
        {selectedScripture ? (
          <div className="flex-1 flex overflow-hidden">
            {/* KJV */}
            <div className="flex-1 overflow-y-auto p-6 border-r border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-bold text-foreground">KJV</h3>
                <span className="text-xs text-muted-foreground">{selectedScripture.reference}</span>
              </div>
              <p className="text-sm leading-relaxed text-foreground font-rosarivo whitespace-pre-line">
                {selectedScripture.kjv}
              </p>
              {selectedScripture.topics.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-border">
                  {selectedScripture.topics.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary flex items-center gap-1">
                      <Tag className="h-3 w-3" /> {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {/* NRSV */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-bold text-foreground">NRSV (2021)</h3>
                <span className="text-xs text-muted-foreground">{selectedScripture.reference}</span>
              </div>
              <p className="text-sm leading-relaxed text-foreground font-rosarivo whitespace-pre-line">
                {selectedScripture.nrsv}
              </p>
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Writer: <strong>{writerNames[selectedScripture.writer]}</strong>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <p>Select a scripture from the list to view translations side by side.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityDetailPanel;
