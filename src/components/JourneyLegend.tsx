import { journeys, tileOptions, allTopics } from "@/data/paulData";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MapPin, BookOpen, Navigation, Tag, PenTool, ChevronDown, Ruler, Clock, Calendar } from "lucide-react";
import { useState } from "react";

interface JourneyLegendProps {
  activeJourneys: string[];
  onToggleJourney: (id: string) => void;
  activeTile: string;
  onTileChange: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeTopic: string;
  onTopicChange: (topic: string) => void;
}

const writerLabels: Record<string, { label: string; color: string }> = {
  paul: { label: "Paul", color: "hsl(25, 60%, 30%)" },
  peter: { label: "Peter", color: "hsl(200, 60%, 40%)" },
  john: { label: "John", color: "hsl(280, 50%, 45%)" },
  james: { label: "James", color: "hsl(140, 50%, 35%)" },
  jude: { label: "Jude", color: "hsl(340, 50%, 45%)" },
  "hebrews-author": { label: "Hebrews Author", color: "hsl(30, 60%, 45%)" },
};

// Haversine formula to calculate distance between two lat/lng points in km
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function totalJourneyKm(path: [number, number][]): number {
  let total = 0;
  for (let i = 1; i < path.length; i++) {
    total += haversineKm(path[i - 1][0], path[i - 1][1], path[i][0], path[i][1]);
  }
  return Math.round(total);
}

const JourneyLegend = ({
  activeJourneys,
  onToggleJourney,
  activeTile,
  onTileChange,
  searchQuery,
  onSearchChange,
  activeTopic,
  onTopicChange,
}: JourneyLegendProps) => {
  const [topicOpen, setTopicOpen] = useState(false);

  return (
    <div className="w-full lg:w-72 bg-card border border-border rounded-lg p-4 shadow-sm space-y-5 overflow-y-auto max-h-[calc(100vh-6rem)]">
      <div>
        <h2 className="font-serif text-lg font-bold text-foreground flex items-center gap-2">
          <Navigation className="h-4 w-4 text-primary" />
          Apostolic Journeys
        </h2>
        <p className="text-xs text-muted-foreground mt-1">Toggle to show/hide routes</p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search cities, letters, or writers…"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
      />

      {/* Topic filter */}
      <div className="space-y-2">
        <button
          onClick={() => setTopicOpen(!topicOpen)}
          className="w-full flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wide"
        >
          <span className="flex items-center gap-1"><Tag className="h-3.5 w-3.5" /> Filter by Topic</span>
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${topicOpen ? "rotate-180" : ""}`} />
        </button>
        {topicOpen && (
          <div className="space-y-1 max-h-48 overflow-y-auto">
            <button
              onClick={() => onTopicChange("")}
              className={`w-full text-left px-2 py-1 text-xs rounded-md transition-colors ${
                !activeTopic ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
              }`}
            >
              All Topics
            </button>
            {allTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => onTopicChange(topic)}
                className={`w-full text-left px-2 py-1 text-xs rounded-md transition-colors ${
                  activeTopic === topic ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        )}
        {activeTopic && (
          <div className="flex items-center gap-1 text-xs text-primary">
            <Tag className="h-3 w-3" />
            <span>{activeTopic}</span>
            <button onClick={() => onTopicChange("")} className="ml-auto hover:text-destructive">✕</button>
          </div>
        )}
      </div>

      {/* Journey toggles with distance */}
      <div className="space-y-3">
        {journeys.map((j) => {
          const distKm = totalJourneyKm(j.path);
          const distMi = Math.round(distKm * 0.621371);
          const isActive = activeJourneys.includes(j.id);
          return (
            <div key={j.id}>
              <div className="flex items-center justify-between">
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
                  checked={isActive}
                  onCheckedChange={() => onToggleJourney(j.id)}
                />
              </div>
              {isActive && (
                <div className="ml-5 mt-1 space-y-0.5">
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {j.dateRange}
                    <span className="mx-1">•</span>
                    <Clock className="h-3 w-3" /> {j.durationNote}
                  </p>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Ruler className="h-3 w-3" />
                    ~{distMi.toLocaleString()} mi ({distKm.toLocaleString()} km) traveled
                  </p>
                  <p className="text-[10px] text-muted-foreground/80 mt-1 leading-snug">
                    {j.travelNote}
                  </p>
                </div>
              )}
            </div>
          );
        })}
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

      {/* Writer legend */}
      <div className="border-t border-border pt-3 space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
          <PenTool className="h-3 w-3" /> Writers
        </h3>
        {Object.entries(writerLabels).map(([key, { label, color }]) => (
          <div key={key} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JourneyLegend;
