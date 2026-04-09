import { cities, CityData } from "@/data/paulData";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

interface TimelineBarProps {
  onCitySelect: (city: CityData) => void;
  selectedCityId?: string;
}

interface TimelineEntry {
  city: CityData;
  year: number;
  label: string;
}

function parseYear(age: string): number {
  const m = age.match(/~?(\d+)/);
  return m ? parseInt(m[1]) : 50;
}

const TimelineBar = ({ onCitySelect, selectedCityId }: TimelineBarProps) => {
  const entries = useMemo<TimelineEntry[]>(() => {
    return cities
      .filter((c) => c.epistleName && c.scriptures.length > 0)
      .map((c) => ({
        city: c,
        year: parseYear(c.estimatedAge),
        label: c.epistleName || c.name,
      }))
      .sort((a, b) => a.year - b.year);
  }, []);

  if (entries.length === 0) return null;

  const minYear = entries[0].year;
  const maxYear = entries[entries.length - 1].year;
  const range = maxYear - minYear || 1;

  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="h-3.5 w-3.5 text-primary" />
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Epistle Timeline</h3>
      </div>
      <div className="relative h-12 mx-2">
        {/* Timeline line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
        {/* Year labels */}
        <span className="absolute top-8 left-0 text-[10px] text-muted-foreground">~{minYear} AD</span>
        <span className="absolute top-8 right-0 text-[10px] text-muted-foreground">~{maxYear} AD</span>
        {/* Entries */}
        {entries.map((e, i) => {
          const pct = ((e.year - minYear) / range) * 100;
          const isSelected = e.city.id === selectedCityId;
          return (
            <button
              key={e.city.id}
              onClick={() => onCitySelect(e.city)}
              className="absolute -translate-x-1/2 group"
              style={{ left: `${Math.min(Math.max(pct, 3), 97)}%`, top: 0 }}
              title={`${e.label} (~${e.year} AD)`}
            >
              <div
                className={`w-3 h-3 rounded-full border-2 transition-all ${
                  isSelected
                    ? "bg-primary border-primary scale-125"
                    : "bg-card border-primary/50 hover:border-primary hover:scale-110"
                }`}
              />
              <span className={`absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] ${
                isSelected ? "text-primary font-semibold" : "text-muted-foreground opacity-0 group-hover:opacity-100"
              } transition-opacity`}>
                {e.city.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineBar;
