import { cities, CityData, historicalEvents, HistoricalEvent } from "@/data/paulData";
import { Calendar, Landmark } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "@/i18n/LanguageContext";
import { eventTranslations } from "@/data/eventTranslations";
import { translateEpistleName } from "@/data/cityFieldTranslations";

interface TimelineBarProps {
  onCitySelect: (city: CityData) => void;
  selectedCityId?: string;
}

interface TimelineEntry {
  type: "epistle" | "event";
  city?: CityData;
  event?: HistoricalEvent;
  year: number;
  label: string;
  id: string;
}

function parseYear(age: string): number {
  const m = age.match(/~?(\d+)/);
  return m ? parseInt(m[1]) : 50;
}

const TimelineBar = ({ onCitySelect, selectedCityId }: TimelineBarProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { t, lang } = useTranslation();
  const isNonEnglish = lang !== "en";
  const langKey = lang as "es" | "fr" | "pt" | "sv" | "no" | "da";
  const trEventName = (n: string) => isNonEnglish ? (eventTranslations[n]?.name?.[langKey] || n) : n;
  const trEventDesc = (n: string, d: string) => isNonEnglish ? (eventTranslations[n]?.description?.[langKey] || d) : d;

  const entries = useMemo<TimelineEntry[]>(() => {
    const epistleEntries: TimelineEntry[] = cities
      .filter((c) => c.epistleName && c.scriptures.length > 0)
      .map((c) => ({
        type: "epistle" as const,
        city: c,
        year: parseYear(c.estimatedAge),
        label: translateEpistleName(c.epistleName, lang) || c.name,
        id: `epistle-${c.id}`,
      }));

    const eventEntries: TimelineEntry[] = historicalEvents.map((e) => ({
      type: "event" as const,
      event: e,
      year: e.year,
      label: e.name,
      id: `event-${e.id}`,
    }));

    return [...epistleEntries, ...eventEntries].sort((a, b) => a.year - b.year);
  }, []);

  if (entries.length === 0) return null;

  const minYear = entries[0].year;
  const maxYear = entries[entries.length - 1].year;
  const range = maxYear - minYear || 1;

  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-sm">
      <div className="flex items-center gap-4 mb-2">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-primary" />
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t.timeline}</h3>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-[9px] text-muted-foreground">{t.epistles}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-[9px] text-muted-foreground">{t.historicalEvents}</span>
          </div>
        </div>
      </div>
      <div className="relative h-20 mx-2">
        {/* Timeline line */}
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-border" />
        {/* Tick marks every 5 years */}
        {(() => {
          const ticks: React.ReactNode[] = [];
          const firstTick = Math.ceil(minYear / 5) * 5;
          for (let yr = firstTick; yr <= maxYear; yr += 5) {
            const pct = ((yr - minYear) / range) * 100;
            ticks.push(
              <div
                key={`tick-${yr}`}
                className="absolute"
                style={{ left: `${Math.min(Math.max(pct, 0.5), 99.5)}%`, top: "32px" }}
              >
                <div className="w-px h-2 bg-border -translate-x-1/2" />
                <span className="absolute top-2.5 left-1/2 -translate-x-1/2 text-[8px] text-muted-foreground/60 whitespace-nowrap">
                  {yr} AD
                </span>
              </div>
            );
          }
          return ticks;
        })()}
        {/* Year labels — only show if not already a 5-year tick */}
        {minYear % 5 !== 0 && (
          <span className="absolute top-11 left-0 text-[10px] text-muted-foreground font-medium">{minYear} AD</span>
        )}
        {maxYear % 5 !== 0 && (
          <span className="absolute top-11 right-0 text-[10px] text-muted-foreground font-medium">{maxYear} AD</span>
        )}
        {/* Entries */}
        {entries.map((e) => {
          const pct = ((e.year - minYear) / range) * 100;
          const isSelected = e.type === "epistle" && e.city?.id === selectedCityId;
          const isHovered = hoveredId === e.id;
          const isEvent = e.type === "event";

          return (
            <button
              key={e.id}
              onClick={() => {
                if (e.type === "epistle" && e.city) onCitySelect(e.city);
              }}
              onMouseEnter={() => setHoveredId(e.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="absolute -translate-x-1/2 group"
              style={{ left: `${Math.min(Math.max(pct, 2), 98)}%`, top: "12px" }}
              title={`${isEvent && e.event ? trEventName(e.event.name) : e.label} (~${e.year} AD)${isEvent && e.event ? `\n${trEventDesc(e.event.name, e.event.description)}` : ""}`}
            >
              <div
                className={`rounded-full border-2 transition-all ${
                  isEvent
                    ? `w-2.5 h-2.5 mt-[1px] ${isHovered ? "bg-amber-500 border-amber-500 scale-125" : "bg-amber-500/20 border-amber-500/70 hover:border-amber-500 hover:scale-110"}`
                    : `w-3 h-3 ${
                        isSelected
                          ? "bg-primary border-primary scale-125"
                          : "bg-card border-primary/50 hover:border-primary hover:scale-110"
                      }`
                }`}
              />
              <span
                className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap transition-opacity z-10 bottom-full mb-1 ${
                  isSelected
                    ? "text-primary font-semibold opacity-100 text-[10px]"
                    : isHovered
                    ? `${isEvent ? "text-amber-500" : "text-primary"} font-medium opacity-100 text-[10px]`
                    : "text-muted-foreground opacity-0 text-[10px]"
                }`}
              >
                {isEvent ? trEventName(e.event!.name) : e.city?.name}
                {isEvent && isHovered && e.event?.description && (
                  <span className="block text-[9px] text-muted-foreground font-normal max-w-[200px] whitespace-normal text-center">
                    {trEventDesc(e.event.name, e.event.description)}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineBar;
