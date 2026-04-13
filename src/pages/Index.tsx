import PaulMap from "@/components/PaulMap";
import WelcomeOverlay from "@/components/WelcomeOverlay";
import { BookOpen } from "lucide-react";

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
          <a
            href="https://docs.google.com/spreadsheets/d/1hbUzM5Y4RCZxo-xGVh7ySGKpXRRVeEumqqPabqQhjFQ/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] leading-tight text-primary hover:underline ml-4 max-w-[10rem] text-right hidden sm:block"
          >
            Bible List with all included References for further reading ↗
          </a>
        </div>
      </header>

      <main className="p-2 sm:p-4">
        <PaulMap />
      </main>
    </div>
  );
};

export default Index;
