import PaulMap from "@/components/PaulMap";
import WelcomeOverlay from "@/components/WelcomeOverlay";
import { BookOpen } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import { useTranslation } from "@/i18n/LanguageContext";

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <WelcomeOverlay />
      <header className="px-4 lg:px-6 py-3 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <div>
              <h1 className="font-serif text-xl font-bold text-foreground leading-tight">
                {t.siteTitle}
              </h1>
              <p className="text-xs text-muted-foreground">
                {t.siteSubtitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <a
              href="https://docs.google.com/spreadsheets/d/1hbUzM5Y4RCZxo-xGVh7ySGKpXRRVeEumqqPabqQhjFQ/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] leading-tight text-primary hover:underline ml-2 max-w-[10rem] text-right"
            >
              {t.bibleListLink}
            </a>
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
