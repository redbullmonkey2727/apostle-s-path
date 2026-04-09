import { useState, useEffect } from "react";
import { BookOpen, X } from "lucide-react";

const WelcomeOverlay = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("welcome-seen");
    if (!seen) setShow(true);
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem("welcome-seen", "1");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 animate-fade-in" onClick={dismiss}>
      <div
        className="bg-card border border-border rounded-xl shadow-2xl max-w-lg mx-4 p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={dismiss} className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-muted transition-colors">
          <X className="h-5 w-5 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="h-8 w-8 text-primary" />
          <h2 className="font-serif text-2xl font-bold text-foreground">Welcome</h2>
        </div>
        <p className="text-base leading-relaxed text-foreground font-rosarivo">
          Here is an interactive Map of the Apostle's journeys that outlines when and under what
          circumstances he found themselves as they wrote doctrine. They wrote many things regarding
          the Restored Church of Jesus Christ in the midst of their afflictions. They have great
          relevance today.
        </p>
        <button
          onClick={dismiss}
          className="mt-6 w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Explore the Map
        </button>
      </div>
    </div>
  );
};

export default WelcomeOverlay;
