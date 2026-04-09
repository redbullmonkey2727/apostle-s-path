import { useState, useEffect } from "react";
import { BookOpen, MapPin, Search, Compass, Keyboard, X } from "lucide-react";

const WelcomeOverlay = ({ onStartTour }: { onStartTour?: () => void }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("welcome-seen");
    if (!seen) setShow(true);
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem("welcome-seen", "1");
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
            The New Testament World
          </h2>
        </div>

        <p className="text-base leading-relaxed text-foreground" style={{ fontFamily: "'Rosarivo', serif" }}>
          Welcome to an interactive map of the Apostles' journeys — tracing when and under what
          circumstances they wrote doctrine pointing to the Restored Church of Jesus Christ.
          Their words, written amid affliction and revelation, carry great relevance today.
          Try switching between map styles (street, terrain, satellite) in the layer control —
          each view highlights different details of the ancient world.
        </p>

        <div className="mt-5 space-y-2.5">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">How to explore</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
              <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-foreground"><strong>Click a city dot</strong> to see its epistles, scriptures, and commentary</p>
            </div>
            <div className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
              <Search className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-foreground"><strong>Search topics</strong> like "Godhead" or "Priesthood" for a full scripture list</p>
            </div>
            <div className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
              <Compass className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-foreground"><strong>Guided Tour</strong> walks you through Paul's journeys step by step</p>
            </div>
            <div className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
              <Keyboard className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-foreground"><strong>Shortcuts:</strong> ← → cities, T tour, D dark mode, Esc close</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={dismiss}
            className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Start Exploring
          </button>
          <button
            onClick={startTour}
            className="flex-1 py-2.5 rounded-lg border border-primary text-primary font-medium hover:bg-primary/10 transition-colors"
          >
            Take the Tour
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeOverlay;
