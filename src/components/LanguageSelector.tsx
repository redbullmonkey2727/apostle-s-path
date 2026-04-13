import { Globe } from "lucide-react";
import { TranslationKey, translationMeta } from "@/data/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageSelectorProps {
  value: TranslationKey;
  onChange: (key: TranslationKey) => void;
}

const keys: TranslationKey[] = ["kjv", "nrsv", "es", "fr", "pt", "sv", "no"];

const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  return (
    <div className="space-y-1">
      <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Globe className="h-3 w-3" /> Translation
      </label>
      <Select value={value} onValueChange={(v) => onChange(v as TranslationKey)}>
        <SelectTrigger className="h-8 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {keys.map((k) => (
            <SelectItem key={k} value={k} className="text-xs">
              <span className="font-medium">{translationMeta[k].label}</span>
              <span className="ml-1.5 text-muted-foreground text-[10px]">
                — {translationMeta[k].fullName}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
