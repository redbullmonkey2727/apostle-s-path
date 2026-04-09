import { CityData } from "@/data/paulData";
import { X, MapPin, Tag, Thermometer, BookOpen, Droplets, ExternalLink, Scroll, ChevronLeft, ChevronRight, Bookmark, Home } from "lucide-react";
import { commentaries } from "@/data/commentaries";
import { ScriptureEntry } from "@/data/types";
import { useState } from "react";

interface CityDetailPanelProps {
  city: CityData;
  onClose: () => void;
  activeTopic: string;
  allCities: CityData[];
  onCityChange: (city: CityData) => void;
  bookmarks: Set<string>;
  onToggleBookmark: (ref: string) => void;
  onScriptureView?: (reference: string) => void;
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

function getBookName(reference: string): string {
  const m = reference.match(/^(.+?)\s+\d/);
  return m ? m[1] : reference;
}

const bookContextInfo: Record<string, Record<string, string>> = {
  Ephesus: {
    "Acts": "Acts — Luke's record of the early Church. Paul ministered in Ephesus during his 3rd journey (~53–55 AD). Paul was ~48–50 years old.",
    "Ephesians": "Ephesians — Written by Paul from Rome (~60–62 AD) during his first imprisonment, to the saints at Ephesus. Paul was ~55–57 years old.",
    "1 Timothy": "1 Timothy — Written by Paul from Macedonia (~62–64 AD) to Timothy, who was overseeing the church in Ephesus. Paul was ~57–59 years old.",
    "2 Timothy": "2 Timothy — Paul's final letter (~66–67 AD), written from Rome during his second imprisonment, to Timothy at Ephesus. Paul was ~61–62 years old.",
    "1 John": "1 John — Written by John from Ephesus (~85–95 AD), where he spent his later years leading the Church. John was ~75–85 years old.",
    "2 John": "2 John — Written by John from Ephesus (~85–95 AD) to the elect lady and her children. John was ~75–85 years old.",
  },
  Rome: {
    "Romans": "Romans — Written by Paul from Corinth (~57 AD) to the saints in Rome before his arrival. Paul was ~52 years old.",
    "1 Peter": "1 Peter — Written by Peter from Rome (~62–64 AD), referred to symbolically as 'Babylon.' Peter was ~62–64 years old.",
    "2 Peter": "2 Peter — Written by Peter from Rome (~64–67 AD), shortly before his martyrdom. Peter was ~64–67 years old.",
  },
  Jerusalem: {
    "Acts": "Acts — Luke's account of the Apostles' ministry, centered in Jerusalem in the early chapters (~30–50 AD).",
    "James": "James — Written by James the Lord's brother from Jerusalem (~45–50 AD), leader of the Jerusalem church. James was ~40–50 years old.",
    "Jude": "Jude — Written by Jude, brother of James, from Jerusalem (~65 AD). Jude was ~50–65 years old.",
  },
  Corinth: {
    "1 Corinthians": "1 Corinthians — Written by Paul from Ephesus (~55 AD) to address divisions in the Corinthian church. Paul was ~50 years old.",
    "2 Corinthians": "2 Corinthians — Written by Paul from Macedonia (~56 AD) after a painful visit to Corinth. Paul was ~51 years old.",
  },
  Thessalonica: {
    "1 Thessalonians": "1 Thessalonians — Written by Paul from Corinth (~50 AD), one of his earliest letters. Paul was ~45 years old.",
    "2 Thessalonians": "2 Thessalonians — Written by Paul from Corinth (~51 AD), shortly after the first letter. Paul was ~46 years old.",
  },
  Colossae: {
    "Colossians": "Colossians — Written by Paul from Rome (~60–62 AD) during his first imprisonment. Paul was ~55–57 years old.",
  },
  Patmos: {
    "Revelation": "Revelation — Written by John the Revelator from the Isle of Patmos (~95 AD) during exile under Emperor Domitian. John was ~85–90 years old.",
  },
  Crete: {
    "Titus": "Titus — Written by Paul (~63–65 AD) to Titus, whom he left in Crete to organize the churches. Paul was ~58–60 years old.",
  },
  Alexandria: {
    "Hebrews": "Hebrews — Author debated, written ~60–70 AD, addressing Jewish Christians with deep doctrinal arguments.",
  },
};

function getChurchUrl(reference: string): string {
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
  const match = reference.match(/^(.+?)\s+(\d+)/);
  if (!match) return "https://www.churchofjesuschrist.org/study/scriptures/nt";
  const slug = bookMap[match[1]];
  if (!slug) return "https://www.churchofjesuschrist.org/study/scriptures/nt";
  return `https://www.churchofjesuschrist.org/study/scriptures/nt/${slug}/${match[2]}?lang=eng`;
}

const CityDetailPanel = ({ city, onClose, activeTopic, allCities, onCityChange, bookmarks, onToggleBookmark, onScriptureView }: CityDetailPanelProps) => {
  const filteredScriptures = activeTopic
    ? city.scriptures.filter((s) => s.topics.includes(activeTopic))
    : city.scriptures;

  const cityIndex = allCities.findIndex((c) => c.id === city.id);
  const prevCity = cityIndex > 0 ? allCities[cityIndex - 1] : null;
  const nextCity = cityIndex < allCities.length - 1 ? allCities[cityIndex + 1] : null;

  // Mobile tab state for KJV/NRSV/Application
  const [mobileTab, setMobileTab] = useState<"kjv" | "nrsv" | "app">("kjv");

  return (
    <div className="fixed inset-x-0 bottom-0 top-auto h-[55vh] lg:inset-0 lg:h-auto bg-background z-[1000] flex flex-col animate-slide-in-right lg:animate-fade-in rounded-t-2xl lg:rounded-none shadow-[0_-4px_20px_rgba(0,0,0,0.15)] lg:shadow-none">
      {/* Mobile drag handle */}
      <div className="lg:hidden flex justify-center pt-2 pb-1">
        <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
      </div>
      {/* Breadcrumb + nav */}
      <div className="border-b border-border bg-muted/30 px-4 md:px-6 py-2 shrink-0">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <button onClick={onClose} className="flex items-center gap-1 hover:text-foreground transition-colors">
              <Home className="h-3 w-3" /> Map
            </button>
            <span>›</span>
            <span className="text-foreground font-medium">{city.name}</span>
            {activeTopic && (
              <>
                <span>›</span>
                <span className="text-primary">{activeTopic}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1">
            {prevCity && (
              <button
                onClick={() => onCityChange(prevCity)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-muted transition-colors"
              >
                <ChevronLeft className="h-3 w-3" /> {prevCity.name}
              </button>
            )}
            {nextCity && (
              <button
                onClick={() => onCityChange(nextCity)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-muted transition-colors"
              >
                {nextCity.name} <ChevronRight className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Top bar */}
      <div className="border-b border-border bg-card px-4 md:px-6 py-3 md:py-4 shrink-0">
        <div className="flex items-start justify-between max-w-7xl mx-auto">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">{city.name}</h2>
              {city.epistleName && (
                <span className="text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {city.epistleName}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 md:gap-4 mt-1.5 md:mt-2 text-xs md:text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 md:h-3.5 w-3 md:w-3.5" /> {city.label}
              </span>
              <span className="italic">{city.estimatedAge}</span>
              {city.writerAges && Object.entries(city.writerAges).map(([w, age]) => (
                <span key={w} className="px-2 py-0.5 rounded bg-muted text-xs">
                  {writerNames[w] || w}: {age} yrs old
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 md:gap-6 mt-1.5 md:mt-2 text-[10px] md:text-xs text-muted-foreground flex-wrap">
              {city.summerTempC !== undefined && (
                <span className="flex items-center gap-1">
                  <Thermometer className="h-3 md:h-3.5 w-3 md:w-3.5" />
                  Summer: <strong className="text-foreground">{city.summerTempC}°C / {Math.round(city.summerTempC * 9 / 5 + 32)}°F</strong>
                  {city.summerPrecipMm !== undefined && (
                    <span className="flex items-center gap-1 ml-1">
                      <Droplets className="h-2.5 md:h-3 w-2.5 md:w-3" /> <strong className="text-foreground">{city.summerPrecipMm} mm</strong>
                    </span>
                  )}
                </span>
              )}
              {city.winterTempC !== undefined && (
                <span className="flex items-center gap-1">
                  <Thermometer className="h-3 md:h-3.5 w-3 md:w-3.5" />
                  Winter: <strong className="text-foreground">{city.winterTempC}°C / {Math.round(city.winterTempC * 9 / 5 + 32)}°F</strong>
                  {city.winterPrecipMm !== undefined && (
                    <span className="flex items-center gap-1 ml-1">
                      <Droplets className="h-2.5 md:h-3 w-2.5 md:w-3" /> <strong className="text-foreground">{city.winterPrecipMm} mm</strong>
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-colors ml-4"
          >
            <X className="h-5 md:h-6 w-5 md:w-6" />
          </button>
        </div>
      </div>

      {/* Scrollable scripture cards */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6">
          {filteredScriptures.length === 0 && (
            <p className="text-muted-foreground italic text-center py-12">No scriptures match the selected topic.</p>
          )}
          {filteredScriptures.map((s, idx) => {
            const commentary = getCommentary(s.reference);
            const churchUrl = getChurchUrl(s.reference);
            const currentBook = getBookName(s.reference);
            const prevBook = idx > 0 ? getBookName(filteredScriptures[idx - 1].reference) : null;
            const showBookTransition = currentBook !== prevBook;
            const contextMap = bookContextInfo[city.name];
            const contextNote = contextMap ? contextMap[currentBook] : undefined;
            const isMarked = bookmarks.has(s.reference);
            return (
              <div key={s.reference}>
                {showBookTransition && contextNote && (
                  <div className="flex items-center gap-3 mb-3 md:mb-4 mt-2 px-1">
                    <Scroll className="h-4 w-4 text-primary shrink-0" />
                    <p className="text-xs md:text-sm text-muted-foreground italic">{contextNote}</p>
                  </div>
                )}
                <div className="border border-border rounded-lg overflow-hidden bg-card">
                  {/* Scripture header */}
                  <div className="px-4 md:px-5 py-2.5 md:py-3 border-b border-border bg-muted/30">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 md:gap-3">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="font-serif text-base md:text-lg font-bold text-foreground">{s.reference}</span>
                        <span className="text-xs text-muted-foreground">— {writerNames[s.writer]}</span>
                        <button
                          onClick={() => onToggleBookmark(s.reference)}
                          className="p-0.5 rounded hover:bg-muted transition-colors"
                          title={isMarked ? "Remove bookmark" : "Bookmark this scripture"}
                        >
                          <Bookmark className={`h-3.5 w-3.5 ${isMarked ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                        {s.topics.map((t) => (
                          <span key={t} className="text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded-full bg-primary/10 text-primary flex items-center gap-0.5">
                            <Tag className="h-2 md:h-2.5 w-2 md:w-2.5" /> {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a
                      href={churchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs md:text-sm text-primary hover:text-primary/80 flex items-center gap-1 mt-1.5 underline"
                    >
                      <ExternalLink className="h-3 md:h-3.5 w-3 md:w-3.5" /> Read on ChurchofJesusChrist.org
                    </a>
                  </div>

                  {/* Mobile tabs */}
                  <div className="md:hidden border-b border-border flex">
                    {(["kjv", "nrsv", "app"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setMobileTab(tab)}
                        className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                          mobileTab === tab
                            ? "text-primary border-b-2 border-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {tab === "kjv" ? "KJV" : tab === "nrsv" ? "NRSV" : "Application"}
                      </button>
                    ))}
                  </div>

                  {/* Desktop: Three columns / Mobile: Tab content */}
                  <div className="hidden md:grid md:grid-cols-3 md:divide-x divide-border min-h-[120px]">
                    <div className="p-5">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">KJV</h4>
                      <p className="text-base leading-relaxed text-foreground font-rosarivo">{s.kjv}</p>
                    </div>
                    <div className="p-5">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">NRSV (2021)</h4>
                      <p className="text-base leading-relaxed text-foreground font-rosarivo">{s.nrsv}</p>
                    </div>
                    <div className="p-5">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Application</h4>
                      {commentary ? (
                        <p className="text-base leading-relaxed text-foreground font-rosarivo">{commentary}</p>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No commentary available.</p>
                      )}
                    </div>
                  </div>

                  {/* Mobile single-tab view */}
                  <div className="md:hidden p-4">
                    {mobileTab === "kjv" && (
                      <p className="text-sm leading-relaxed text-foreground font-rosarivo">{s.kjv}</p>
                    )}
                    {mobileTab === "nrsv" && (
                      <p className="text-sm leading-relaxed text-foreground font-rosarivo">{s.nrsv}</p>
                    )}
                    {mobileTab === "app" && (
                      commentary ? (
                        <p className="text-sm leading-relaxed text-foreground font-rosarivo">{commentary}</p>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No commentary available.</p>
                      )
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
