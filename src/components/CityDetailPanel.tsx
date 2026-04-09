import { CityData } from "@/data/paulData";
import { X, MapPin, Tag, Thermometer, BookOpen, Droplets, ExternalLink } from "lucide-react";
import { commentaries } from "@/data/commentaries";

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

function getCommentary(reference: string): string {
  if (commentaries[reference]) return commentaries[reference];
  for (const key of Object.keys(commentaries)) {
    if (reference.includes(key) || key.includes(reference)) return commentaries[key];
  }
  return "";
}

// Build church website URL for a scripture reference
function getChurchUrl(reference: string): string {
  // Parse "1 Corinthians 15:29" → book slug + chapter
  const bookMap: Record<string, string> = {
    "Genesis": "gen", "Exodus": "ex", "Leviticus": "lev", "Numbers": "num", "Deuteronomy": "deut",
    "Matthew": "matt", "Mark": "mark", "Luke": "luke", "John": "john",
    "Acts": "acts", "Romans": "rom",
    "1 Corinthians": "1-cor", "2 Corinthians": "2-cor",
    "Galatians": "gal", "Ephesians": "eph", "Philippians": "philip",
    "Colossians": "col", "1 Thessalonians": "1-thes", "2 Thessalonians": "2-thes",
    "1 Timothy": "1-tim", "2 Timothy": "2-tim", "Titus": "titus", "Philemon": "philem",
    "Hebrews": "heb", "James": "james", "1 Peter": "1-pet", "2 Peter": "2-pet",
    "1 John": "1-jn", "2 John": "2-jn", "3 John": "3-jn",
    "Jude": "jude", "Revelation": "rev",
  };

  // Extract book name and chapter
  const match = reference.match(/^(.+?)\s+(\d+)/);
  if (!match) return "https://www.churchofjesuschrist.org/study/scriptures/nt";
  
  const bookName = match[1];
  const chapter = match[2];
  const slug = bookMap[bookName];
  
  if (!slug) return "https://www.churchofjesuschrist.org/study/scriptures/nt";
  return `https://www.churchofjesuschrist.org/study/scriptures/nt/${slug}/${chapter}?lang=eng`;
}

const CityDetailPanel = ({ city, onClose, activeTopic }: CityDetailPanelProps) => {
  const filteredScriptures = activeTopic
    ? city.scriptures.filter((s) => s.topics.includes(activeTopic))
    : city.scriptures;

  return (
    <div className="fixed inset-0 bg-background z-[1000] flex flex-col animate-fade-in">
      {/* Top bar */}
      <div className="border-b border-border bg-card px-6 py-4 shrink-0">
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
            <div className="flex items-center gap-6 mt-2 text-xs text-muted-foreground flex-wrap">
              {(city.summerTempC !== undefined || city.winterTempC !== undefined) && (
                <span className="flex items-center gap-1">
                  <Thermometer className="h-3.5 w-3.5" />
                  {city.summerTempC !== undefined && (
                    <span>Summer: <strong className="text-foreground">{city.summerTempC}°C / {Math.round(city.summerTempC * 9 / 5 + 32)}°F</strong></span>
                  )}
                  {city.winterTempC !== undefined && (
                    <span className="ml-2">Winter: <strong className="text-foreground">{city.winterTempC}°C / {Math.round(city.winterTempC * 9 / 5 + 32)}°F</strong></span>
                  )}
                </span>
              )}
              {(city.summerPrecipMm !== undefined || city.winterPrecipMm !== undefined) && (
                <span className="flex items-center gap-1">
                  <Droplets className="h-3.5 w-3.5" />
                  {city.summerPrecipMm !== undefined && (
                    <span>Summer precip: <strong className="text-foreground">{city.summerPrecipMm} mm</strong></span>
                  )}
                  {city.winterPrecipMm !== undefined && (
                    <span className="ml-2">Winter precip: <strong className="text-foreground">{city.winterPrecipMm} mm</strong></span>
                  )}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-colors ml-4"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Scrollable scripture cards */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
          {filteredScriptures.length === 0 && (
            <p className="text-muted-foreground italic text-center py-12">No scriptures match the selected topic.</p>
          )}
          {filteredScriptures.map((s) => {
            const commentary = getCommentary(s.reference);
            const churchUrl = getChurchUrl(s.reference);
            return (
              <div key={s.reference} className="border border-border rounded-lg overflow-hidden bg-card">
                {/* Scripture header */}
                <div className="px-5 py-3 border-b border-border bg-muted/30 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="font-serif text-lg font-bold text-foreground">{s.reference}</span>
                    <span className="text-xs text-muted-foreground">— {writerNames[s.writer]}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {s.topics.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary flex items-center gap-0.5">
                        <Tag className="h-2.5 w-2.5" /> {t}
                      </span>
                    ))}
                    <a
                      href={churchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 ml-2 underline"
                    >
                      <ExternalLink className="h-3 w-3" /> Read on ChurchofJesusChrist.org
                    </a>
                  </div>
                </div>

                {/* Three columns */}
                <div className="grid grid-cols-3 divide-x divide-border min-h-[120px]">
                  {/* KJV */}
                  <div className="p-5">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">KJV</h4>
                    <p className="text-base leading-relaxed text-foreground font-rosarivo">
                      {s.kjv}
                    </p>
                  </div>
                  {/* NRSV */}
                  <div className="p-5">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">NRSV (2021)</h4>
                    <p className="text-base leading-relaxed text-foreground font-rosarivo">
                      {s.nrsv}
                    </p>
                  </div>
                  {/* Application */}
                  <div className="p-5">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Application</h4>
                    {commentary ? (
                      <p className="text-base leading-relaxed text-foreground font-rosarivo">
                        {commentary}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">No commentary available.</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CityDetailPanel;
