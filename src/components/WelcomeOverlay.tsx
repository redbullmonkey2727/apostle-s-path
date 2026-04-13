import { useState, useEffect } from "react";
import { BookOpen, MapPin, Search, Compass, Keyboard, X } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

const WelcomeOverlay = ({ onStartTour, forceShow, onForceClose }: { onStartTour?: () => void; forceShow?: boolean; onForceClose?: () => void }) => {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const seen = localStorage.getItem("welcome-seen");
    if (!seen) setShow(true);
  }, []);

  useEffect(() => {
    if (forceShow) setShow(true);
  }, [forceShow]);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem("welcome-seen", "1");
    onForceClose?.();
  };

  const startTour = () => {
    dismiss();
    onStartTour?.();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 animate-fade-in" onClick={dismiss}>
      <div
        className="bg-card border border-border rounded-xl shadow-2xl max-w-lg mx-4 p-8 relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={dismiss} className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-muted transition-colors">
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="h-8 w-8 text-primary" />
          <h2 className="font-serif text-2xl font-bold text-foreground">
            {t.welcomeTitle}
          </h2>
        </div>

        <p className="text-base leading-relaxed text-foreground" style={{ fontFamily: "'Rosarivo', serif" }}>
          {t.welcomeBody}
        </p>

        <div className="mt-5 space-y-2.5">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t.howToExplore}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
              <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-foreground"><strong>{t.clickCityDot.split(" to ")[0]}</strong> {t.clickCityDot.includes(" to ") ? "to " + t.clickCityDot.split(" to ").slice(1).join(" to ") : ""}</p>
            </div>
            <div className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
              <Search className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-foreground">{t.searchTopics}</p>
            </div>
            <div className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
              <Compass className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-foreground">{t.guidedTourDesc}</p>
            </div>
            <div className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
              <Keyboard className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-foreground">{t.shortcutsDesc}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={dismiss}
            className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            {t.startExploring}
          </button>
          <button
            onClick={startTour}
            className="flex-1 py-2.5 rounded-lg border border-primary text-primary font-medium hover:bg-primary/10 transition-colors"
          >
            {t.takeTheTour}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeOverlay;
