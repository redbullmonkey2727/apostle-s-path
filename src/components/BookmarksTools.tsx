import { useRef } from "react";
import { Bookmark, Download, Upload } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import { toast } from "sonner";

interface Props {
  count: number;
  onExport: () => void;
  onImport: (file: File) => Promise<number>;
}

const BookmarksTools = ({ count, onExport, onImport }: Props) => {
  const { t } = useTranslation();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    try {
      const n = await onImport(f);
      toast.success(`${t.imported}: ${n}`);
    } catch (err) {
      toast.error(t.invalidBookmarksFile);
    }
  };

  return (
    <div className="border-t border-border pt-3 space-y-2">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
        <Bookmark className="h-3 w-3" /> {t.bookmarks} ({count})
      </h3>
      <div className="flex gap-2">
        <button
          onClick={onExport}
          disabled={count === 0}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md border border-border text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title={t.exportBookmarks}
        >
          <Download className="h-3 w-3" /> {t.export}
        </button>
        <button
          onClick={() => fileRef.current?.click()}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md border border-border text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          title={t.importBookmarks}
        >
          <Upload className="h-3 w-3" /> {t.import}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={handleFile}
        />
      </div>
    </div>
  );
};

export default BookmarksTools;
