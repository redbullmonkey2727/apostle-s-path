import { journeys, tileOptions } from "@/data/paulData";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MapPin, BookOpen, Navigation } from "lucide-react";

interface JourneyLegendProps {
  activeJourneys: string[];
  onToggleJourney: (id: string) => void;
  activeTile: string;
  onTileChange: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const JourneyLegend = ({
  activeJourneys,
  onToggleJourney,
  activeTile,
  onTileChange,
  searchQuery,
  onSearchChange,
}: JourneyLegendProps) => {
  return (
    <div className="w-full lg:w-72 bg-card border border-border rounded-lg p-4 shadow-sm space-y-5 overflow-y-auto max-h-[calc(100vh-6rem)]">
      <div>
        <h2 className="font-serif text-lg font-bold text-foreground flex items-center gap-2">
          <Navigation className="h-4 w-4 text-primary" />
          Paul's Journeys
        </h2>
        <p className="text-xs text-muted-foreground mt-1">Toggle to show/hide routes</p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search cities or letters…"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
      />

      {/* Journey toggles */}
      <div className="space-y-3">
        {journeys.map((j) => (
          <div key={j.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: j.color }}
              />
              <Label htmlFor={j.id} className="text-sm cursor-pointer">
                {j.name}
              </Label>
            </div>
            <Switch
              id={j.id}
              checked={activeJourneys.includes(j.id)}
              onCheckedChange={() => onToggleJourney(j.id)}
            />
          </div>
        ))}
      </div>

      {/* Marker legend */}
      <div className="border-t border-border pt-3 space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Marker Legend</h3>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(210, 70%, 45%)" }} />
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Visited</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(38, 70%, 50%)" }} />
          <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> Letter recipient</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(25, 60%, 30%)" }} />
          <span>Both</span>
        </div>
      </div>

      {/* Map style */}
      <div className="border-t border-border pt-3 space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Map Style</h3>
        {tileOptions.map((t) => (
          <button
            key={t.id}
            onClick={() => onTileChange(t.id)}
            className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
              activeTile === t.id
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JourneyLegend;
