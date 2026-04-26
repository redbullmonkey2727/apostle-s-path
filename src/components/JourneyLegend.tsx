import { journeys, tileOptions, allTopics } from "@/data/paulData";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MapPin, BookOpen, Navigation, Tag, PenTool, ChevronDown, Ruler, Clock, Calendar, Moon, Sun, Compass } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "@/i18n/LanguageContext";
import { topicTranslations } from "@/data/topicTranslations";
import { writerLabelTranslations, writerBioTranslations } from "@/data/writerTranslations";

interface JourneyLegendProps {
  activeJourneys: string[];
  onToggleJourney: (id: string) => void;
  activeTile: string;
  onTileChange: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeTopic: string;
  onTopicChange: (topic: string) => void;
  isDark: boolean;
  onToggleDark: () => void;
  onStartTour: () => void;
  onShowWelcome: () => void;
}

const writerLabels: Record<string, { label: string; color: string; bio: string }> = {
  paul: {
    label: "Paul",
    color: "hsl(25, 60%, 30%)",
    bio: "Originally Saul of Tarsus, a Pharisee and persecutor of Christians. After his dramatic conversion on the road to Damascus (Acts 9), he became the most prolific apostolic writer, authoring at least 13 epistles while enduring imprisonments, shipwrecks, and beatings across the Roman Empire.",
  },
  peter: {
    label: "Peter",
    color: "hsl(200, 60%, 40%)",
    bio: "A Galilean fisherman called by Jesus to be the chief apostle (Matt 16:18). He led the early Church in Jerusalem, opened the gospel to the Gentiles (Acts 10), and wrote two epistles from Rome near the end of his life, likely martyred under Nero around AD 64–67.",
  },
  john: {
    label: "John",
    color: "hsl(280, 50%, 45%)",
    bio: "The 'beloved disciple,' son of Zebedee. John was among the inner circle (with Peter and James) and the only apostle tradition says was not martyred. Exiled to Patmos under Domitian, he wrote three epistles and the book of Revelation, emphasizing love and testimony of Christ.",
  },
  luke: {
    label: "Luke",
    color: "hsl(170, 50%, 35%)",
    bio: "A Gentile physician and companion of Paul (Col 4:14), Luke authored both the Gospel of Luke and the Acts of the Apostles — together comprising roughly a quarter of the New Testament. His meticulous, orderly accounts (Luke 1:3) preserve the most detailed record of the early Church's expansion.",
  },
  james: {
    label: "James",
    color: "hsl(140, 50%, 35%)",
    bio: "Known as 'the Lord's brother' (Gal 1:19), James led the Jerusalem church and presided over the apostolic council (Acts 15). His epistle stresses practical faith, good works, and enduring trials — earning him the early title 'James the Just.'",
  },
  jude: {
    label: "Jude",
    color: "hsl(340, 50%, 45%)",
    bio: "Also a brother of Jesus (Jude 1:1), Jude wrote a brief but urgent epistle warning against false teachers who had crept into the Church, exhorting the Saints to 'contend for the faith once delivered' (Jude 1:3).",
  },
  "hebrews-author": {
    label: "Hebrews Author",
    color: "hsl(30, 60%, 45%)",
    bio: "The author of Hebrews remains debated — Paul, Apollos, Barnabas, and others have been proposed. The epistle masterfully connects Old Testament priesthood and sacrifice to Christ's atoning role, likely written before the destruction of the Temple in AD 70.",
  },
};

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
  isDark,
  onToggleDark,
  onStartTour,
  onShowWelcome,
}: JourneyLegendProps) => {
  const [topicOpen, setTopicOpen] = useState(false);
  const { t, lang } = useTranslation();
  const isNonEnglish = lang !== "en";
  const langKey = lang as "es" | "fr" | "pt" | "sv" | "no" | "da";
  const tr = (topic: string) => isNonEnglish ? (topicTranslations[topic]?.[langKey] || topic) : topic;
  const trWriterLabel = (key: string, fallback: string) =>
    isNonEnglish ? (writerLabelTranslations[key]?.[langKey] || fallback) : fallback;
  const trWriterBio = (key: string, fallback: string) =>
    isNonEnglish ? (writerBioTranslations[key]?.[langKey] || fallback) : fallback;

  return (
    <div className="w-full lg:w-72 bg-card border border-border rounded-lg p-4 shadow-sm space-y-5 overflow-y-auto max-h-[calc(100vh-6rem)]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-lg font-bold text-foreground flex items-center gap-2">
            <Navigation className="h-4 w-4 text-primary" />
            {t.apostolicJourneys}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">{t.toggleToShowHide}</p>
        </div>
        <button
          onClick={onToggleDark}
          className="p-2 rounded-md hover:bg-muted transition-colors"
          title={isDark ? "Light mode" : "Dark mode"}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>

      {/* Guided Tour button */}
      <button
        onClick={onStartTour}
        className="w-full flex items-center justify-center gap-2 py-2 rounded-md bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
      >
        <Compass className="h-4 w-4" /> {t.guidedTour}
      </button>

      {/* Search */}
      <input
        type="text"
        placeholder={t.searchPlaceholder}
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
          <span className="flex items-center gap-1"><Tag className="h-3.5 w-3.5" /> {t.filterByTopic}</span>
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
              {t.allTopics}
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

      {/* Map style */}
      <div className="border-t border-border pt-3 space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t.mapStyle}</h3>
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

      {/* Writer legend (also serves as marker legend) */}
      <div className="border-t border-border pt-3 space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
          <PenTool className="h-3 w-3" /> {t.writersAndMarkers}
        </h3>
        {Object.entries(writerLabels).map(([key, { label, color, bio }]) => {
          const isMatch = searchQuery.trim().length > 0 && label.toLowerCase().includes(searchQuery.trim().toLowerCase());
          return (
            <div key={key}>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                <span>{label}</span>
              </div>
              {isMatch && (
                <p className="ml-5 mt-1 text-[11px] leading-snug text-muted-foreground bg-muted/50 rounded-md p-2">
                  {bio}
                </p>
              )}
            </div>
          );
        })}
        <p className="text-[10px] text-muted-foreground mt-1">{t.dotSizeReflects}</p>
      </div>

      {/* Journey toggles with distance */}
      <div className="border-t border-border pt-3 space-y-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t.journeyRoutes}</h3>
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
                    ~{distMi.toLocaleString()} mi ({distKm.toLocaleString()} km) {t.traveled}
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

      {/* Re-show intro */}
      <button
        onClick={onShowWelcome}
        className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
      >
        <BookOpen className="h-3 w-3" /> {t.showIntroduction}
      </button>
    </div>
  );
};

export default JourneyLegend;
