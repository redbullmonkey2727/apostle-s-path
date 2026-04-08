import { CityData } from "@/data/paulData";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { X, BookOpen, MapPin, Tag } from "lucide-react";
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
  const [translation, setTranslation] = useState<"kjv" | "nrsv">("kjv");
  const [selectedRef, setSelectedRef] = useState<string | null>(null);

  const filteredScriptures = activeTopic
    ? city.scriptures.filter((s) => s.topics.includes(activeTopic))
    : city.scriptures;

  const selectedScripture = city.scriptures.find((s) => s.reference === selectedRef);

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-card border-l border-border shadow-lg z-[1000] flex flex-col animate-slide-in-right">
      {/* Header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">{city.name}</h2>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {city.label}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 italic">{city.estimatedAge}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {city.writers.map((w) => (
                <span key={w} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {writerNames[w] || w}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Translation toggle */}
        <div className="flex items-center gap-3 mt-4">
          <Label className="text-sm">Translation:</Label>
          <div className="flex items-center gap-2 text-sm">
            <span className={translation === "kjv" ? "font-semibold text-foreground" : "text-muted-foreground"}>KJV</span>
            <Switch
              checked={translation === "nrsv"}
              onCheckedChange={(checked) => setTranslation(checked ? "nrsv" : "kjv")}
            />
            <span className={translation === "nrsv" ? "font-semibold text-foreground" : "text-muted-foreground"}>NRSV</span>
          </div>
        </div>
      </div>

      {/* Scripture list */}
      <div className="flex-1 overflow-y-auto p-5 space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-1">
          <BookOpen className="h-3.5 w-3.5" /> Scriptures ({filteredScriptures.length})
        </h3>
        {filteredScriptures.map((s) => (
          <button
            key={s.reference}
            onClick={() => setSelectedRef(selectedRef === s.reference ? null : s.reference)}
            className={`w-full text-left px-3 py-2.5 rounded-md border transition-all text-sm ${
              selectedRef === s.reference
                ? "border-primary bg-primary/5 text-foreground"
                : "border-border hover:border-primary/40 text-foreground"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{s.reference}</span>
              <span className="text-xs text-muted-foreground">{writerNames[s.writer]}</span>
            </div>
            {s.topics.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {s.topics.map((t) => (
                  <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-accent/20 text-accent-foreground">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </button>
        ))}

        {filteredScriptures.length === 0 && (
          <p className="text-sm text-muted-foreground italic">No scriptures match the selected topic.</p>
        )}

        {/* Verse display area */}
        {selectedScripture && (
          <div className="mt-4 p-4 rounded-lg bg-muted border border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              {selectedScripture.reference} ({translation.toUpperCase()})
            </p>
            <p className="text-sm leading-relaxed text-foreground font-serif">
              {selectedScripture[translation]}
            </p>
            {selectedScripture.topics.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {selectedScripture.topics.map((t) => (
                  <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary flex items-center gap-0.5">
                    <Tag className="h-2.5 w-2.5" /> {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CityDetailPanel;
