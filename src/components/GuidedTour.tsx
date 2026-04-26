import { useState, useEffect, useCallback } from "react";
import { cities, journeys, CityData } from "@/data/paulData";
import { X, ChevronRight, ChevronLeft, MapPin, Play, Pause } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import { tourTranslations } from "@/data/tourTranslations";

interface GuidedTourProps {
  onClose: () => void;
  onCitySelect: (city: CityData) => void;
  onPanTo: (lat: number, lng: number) => void;
}

// Chronological order of cities Paul visited
const tourSteps = [
  { cityId: "jerusalem", note: "Where it all began — the apostles received the Holy Ghost at Pentecost and the early Church was established." },
  { cityId: "damascus", note: "Paul's dramatic conversion on the road to Damascus (~33 AD). He was blinded by a vision of the risen Christ." },
  { cityId: "antioch", note: "The mission base for Paul's journeys. The disciples were first called Christians here (Acts 11:26)." },
  { cityId: "galatia", note: "Paul wrote to the Galatians warning against false gospels and teaching justification by faith (~47–49 AD)." },
  { cityId: "thessalonica", note: "Paul spent only weeks here but wrote two powerful letters about the Second Coming and the Great Apostasy (~50–51 AD)." },
  { cityId: "corinth", note: "Paul spent 18 months here. His letters address baptism for the dead, degrees of glory, and church unity (~50–52 AD)." },
  { cityId: "ephesus", note: "Paul's longest ministry (~2.5 years). He later wrote Ephesians and the letters to Timothy from prison (~52–55 AD)." },
  { cityId: "philippi", note: "The first European church. Paul wrote Philippians from prison in Rome, teaching about Christ's divine nature (~49–50 AD)." },
  { cityId: "colossae", note: "Paul warned against worldly philosophy and affirmed Christ as the firstborn of creation (~60–62 AD)." },
  { cityId: "rome", note: "Paul's final destination as a prisoner. He wrote Romans earlier; Peter also wrote his epistles from here (~60–67 AD)." },
  { cityId: "crete", note: "Paul left Titus here to ordain elders and organize the churches (~63–65 AD)." },
  { cityId: "patmos", note: "John the Revelator received the Book of Revelation while exiled on this island (~95 AD)." },
  { cityId: "alexandria", note: "The likely origin of the Epistle to the Hebrews, with deep doctrinal arguments about priesthood (~60–70 AD)." },
];

const GuidedTour = ({ onClose, onCitySelect, onPanTo }: GuidedTourProps) => {
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const { t, lang } = useTranslation();

  const currentStep = tourSteps[step];
  const city = cities.find((c) => c.id === currentStep.cityId);
  const isNonEnglish = lang !== "en";
  const langKey = lang as "es" | "fr" | "pt" | "sv" | "no" | "da";
  const translatedNote = isNonEnglish
    ? (tourTranslations[currentStep.cityId]?.[langKey] || currentStep.note)
    : currentStep.note;

  useEffect(() => {
    if (city) {
      onPanTo(city.lat, city.lng);
    }
  }, [step, city, onPanTo]);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= tourSteps.length - 1) {
          setAutoPlay(false);
          return prev;
        }
        return prev + 1;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  if (!city) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[1500] w-[95%] max-w-lg">
      <div className="bg-card border border-border rounded-xl shadow-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <h3 className="font-serif text-lg font-bold text-foreground">{city.name}</h3>
            <span className="text-xs text-muted-foreground">({step + 1}/{tourSteps.length})</span>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed font-rosarivo mb-3">
          {translatedNote}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="p-1.5 rounded-md hover:bg-muted disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className="p-1.5 rounded-md hover:bg-muted transition-colors"
            >
              {autoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setStep(Math.min(tourSteps.length - 1, step + 1))}
              disabled={step === tourSteps.length - 1}
              className="p-1.5 rounded-md hover:bg-muted disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          {city.scriptures.length > 0 && (
            <button
              onClick={() => onCitySelect(city)}
              className="text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {t.viewScriptures.replace("{count}", String(city.scriptures.length)).replace("{s}", city.scriptures.length !== 1 ? "s" : "")}
            </button>
          )}
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / tourSteps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default GuidedTour;
