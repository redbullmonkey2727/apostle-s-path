import { CityData } from "@/data/paulData";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { X, BookOpen, MapPin } from "lucide-react";
import { useState } from "react";

interface CityDetailPanelProps {
  city: CityData;
  onClose: () => void;
}

const CityDetailPanel = ({ city, onClose }: CityDetailPanelProps) => {
  const [translation, setTranslation] = useState<"esv" | "niv">("esv");
  const [selectedRef, setSelectedRef] = useState<string | null>(null);

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
            <span className={translation === "esv" ? "font-semibold text-foreground" : "text-muted-foreground"}>ESV</span>
            <Switch
              checked={translation === "niv"}
              onCheckedChange={(checked) => setTranslation(checked ? "niv" : "esv")}
            />
            <span className={translation === "niv" ? "font-semibold text-foreground" : "text-muted-foreground"}>NIV</span>
          </div>
        </div>
      </div>

      {/* Scripture list */}
      <div className="flex-1 overflow-y-auto p-5 space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-1">
          <BookOpen className="h-3.5 w-3.5" /> Scriptures
        </h3>
        {city.scriptures.map((s) => (
          <button
            key={s.reference}
            onClick={() => setSelectedRef(selectedRef === s.reference ? null : s.reference)}
            className={`w-full text-left px-3 py-2.5 rounded-md border transition-all text-sm ${
              selectedRef === s.reference
                ? "border-primary bg-primary/5 text-foreground"
                : "border-border hover:border-primary/40 text-foreground"
            }`}
          >
            {s.reference}
          </button>
        ))}

        {/* Verse display area */}
        {selectedScripture && (
          <div className="mt-4 p-4 rounded-lg bg-muted border border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              {selectedScripture.reference} ({translation.toUpperCase()})
            </p>
            <p className="text-sm leading-relaxed text-foreground font-serif">
              {selectedScripture[translation]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityDetailPanel;
