import PaulMap from "@/components/PaulMap";
import { BookOpen } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 lg:px-6 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-primary" />
          <div>
            <h1 className="font-serif text-xl font-bold text-foreground leading-tight">
              The New Testament World: Apostles, Epistles &amp; Journeys
            </h1>
            <p className="text-xs text-muted-foreground">
              An interactive map of the 1st century Mediterranean world
            </p>
          </div>
        </div>
      </header>

      <main className="p-4">
        <PaulMap />
      </main>
    </div>
  );
};

export default Index;
