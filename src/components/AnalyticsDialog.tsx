import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BarChart3, MapPin, Tag } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "@/i18n/LanguageContext";
import { cities } from "@/data/paulData";
import { topicTranslations } from "@/data/topicTranslations";

const ANALYTICS_KEY = "nt-map-analytics";

interface AnalyticsData {
  cityViews: Record<string, number>;
  topicViews: Record<string, number>;
}

function readAnalytics(): AnalyticsData {
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { cityViews: {}, topicViews: {} };
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AnalyticsDialog = ({ open, onOpenChange }: Props) => {
  const { t, lang } = useTranslation();
  const isNonEnglish = lang !== "en";
  const langKey = lang as "es" | "fr" | "pt" | "sv" | "no" | "da";

  const { cityRows, topicRows, totalCity, totalTopic } = useMemo(() => {
    const data = open ? readAnalytics() : { cityViews: {}, topicViews: {} };
    const cityRows = Object.entries(data.cityViews)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([id, count]) => ({
        id,
        name: cities.find((c) => c.id === id)?.name || id,
        count,
      }));
    const topicRows = Object.entries(data.topicViews)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([topic, count]) => ({
        topic,
        label: isNonEnglish ? (topicTranslations[topic]?.[langKey] || topic) : topic,
        count,
      }));
    const totalCity = Object.values(data.cityViews).reduce((s, n) => s + n, 0);
    const totalTopic = Object.values(data.topicViews).reduce((s, n) => s + n, 0);
    return { cityRows, topicRows, totalCity, totalTopic };
  }, [open, isNonEnglish, langKey]);

  const maxCity = cityRows[0]?.count || 1;
  const maxTopic = topicRows[0]?.count || 1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-serif">
            <BarChart3 className="h-5 w-5 text-primary" />
            {t.yourActivity}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <section>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1 mb-2">
              <MapPin className="h-3 w-3" /> {t.popularCities} ({totalCity} {t.views})
            </h3>
            {cityRows.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">{t.noViewsYet}</p>
            ) : (
              <ul className="space-y-1.5">
                {cityRows.map((r) => (
                  <li key={r.id} className="text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-foreground truncate">{r.name}</span>
                      <span className="text-xs text-muted-foreground tabular-nums">{r.count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-0.5">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(r.count / maxCity) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1 mb-2">
              <Tag className="h-3 w-3" /> {t.popularTopics} ({totalTopic} {t.views})
            </h3>
            {topicRows.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">{t.noViewsYet}</p>
            ) : (
              <ul className="space-y-1.5">
                {topicRows.map((r) => (
                  <li key={r.topic} className="text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-foreground truncate">{r.label}</span>
                      <span className="text-xs text-muted-foreground tabular-nums">{r.count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-0.5">
                      <div
                        className="h-full bg-accent"
                        style={{ width: `${(r.count / maxTopic) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnalyticsDialog;
