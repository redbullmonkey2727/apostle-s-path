import PaulMap from "@/components/PaulMap";
import WelcomeOverlay from "@/components/WelcomeOverlay";
import { BookOpen, Share2 } from "lucide-react";

const handleShare = () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    const el = document.createElement("div");
    el.textContent = "📋 Link copied!";
    el.className = "fixed top-4 left-1/2 -translate-x-1/2 z-[3000] bg-card border border-border rounded-lg px-4 py-2 text-sm shadow-lg animate-fade-in";
    document.body.appendChild(el);
    setTimeout(() => { el.style.opacity = "0"; el.style.transition = "opacity 0.3s"; }, 1500);
    setTimeout(() => el.remove(), 2000);
  });
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <WelcomeOverlay />
      <header className="px-4 lg:px-6 py-2 landscape:py-1 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0" />
            <div className="min-w-0">
              <h1 className="font-serif text-sm sm:text-xl font-bold text-foreground leading-tight truncate">
                The New Testament World: Apostles, Epistles &amp; Journeys
              </h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block landscape:hidden lg:landscape:block">
                Deep dive into the circumstances of the New Testament References that Point to the Restored Church of Jesus Christ.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 ml-4">
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
              title="Copy shareable link"
            >
              <Share2 className="h-3 w-3" /> Share
            </button>
            <a
              href="https://docs.google.com/spreadsheets/d/1hbUzM5Y4RCZxo-xGVh7ySGKpXRRVeEumqqPabqQhjFQ/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] leading-tight text-primary hover:underline max-w-[10rem] text-right hidden sm:block"
            >
              Bible List with all included References for further reading ↗
            </a>
          </div>
        </div>
      </header>

      <main className="p-2 sm:p-4">
        <PaulMap />
      </main>
    </div>
  );
};

export default Index;
