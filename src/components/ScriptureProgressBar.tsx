import { BookOpen } from "lucide-react";

interface ScriptureProgressBarProps {
  viewedCount: number;
  totalScriptures: number;
}

const ScriptureProgressBar = ({ viewedCount, totalScriptures }: ScriptureProgressBarProps) => {
  const pct = totalScriptures > 0 ? Math.round((viewedCount / totalScriptures) * 100) : 0;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1 text-muted-foreground font-medium">
          <BookOpen className="h-3.5 w-3.5" /> Scriptures Explored
        </span>
        <span className="text-foreground font-semibold">{viewedCount} / {totalScriptures}</span>
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-[10px] text-muted-foreground text-right">{pct}% explored</p>
    </div>
  );
};

export default ScriptureProgressBar;
