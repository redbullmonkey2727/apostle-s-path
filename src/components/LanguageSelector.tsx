import { Globe } from "lucide-react";
import { useTranslation, languageLabels, type UILanguage } from "@/i18n/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const langs: UILanguage[] = ["en", "es", "fr", "pt", "sv", "no", "da"];

const LanguageSelector = () => {
  const { lang, setLang, t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="p-2 rounded-md hover:bg-muted transition-colors flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          title={t.language}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{languageLabels[lang]}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {langs.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => setLang(l)}
            className={`text-sm cursor-pointer ${l === lang ? "font-semibold text-primary" : ""}`}
          >
            {languageLabels[l]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
