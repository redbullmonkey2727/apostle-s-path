// Canonical New Testament book ordering for sorting scripture references.
const NT_ORDER: string[] = [
  "Matthew", "Mark", "Luke", "John",
  "Acts", "Romans",
  "1 Corinthians", "2 Corinthians",
  "Galatians", "Ephesians", "Philippians", "Colossians",
  "1 Thessalonians", "2 Thessalonians",
  "1 Timothy", "2 Timothy", "Titus", "Philemon",
  "Hebrews", "James",
  "1 Peter", "2 Peter",
  "1 John", "2 John", "3 John",
  "Jude", "Revelation",
];

const ORDER_INDEX: Record<string, number> = NT_ORDER.reduce((acc, name, i) => {
  acc[name] = i;
  return acc;
}, {} as Record<string, number>);

/** Parse a reference like "1 Corinthians 12:27-28" or "Acts 15:4, 22-23" into { book, chapter, verse }. */
export function parseReference(ref: string): { book: string; chapter: number; verse: number } {
  const m = ref.match(/^([1-3]?\s?[A-Za-z]+)\s+(\d+)(?::(\d+))?/);
  if (!m) return { book: ref, chapter: 0, verse: 0 };
  const book = m[1].replace(/\s+/g, " ").trim();
  return { book, chapter: parseInt(m[2], 10) || 0, verse: m[3] ? parseInt(m[3], 10) : 0 };
}

export function compareReferences(a: string, b: string): number {
  const pa = parseReference(a);
  const pb = parseReference(b);
  const ia = ORDER_INDEX[pa.book] ?? 999;
  const ib = ORDER_INDEX[pb.book] ?? 999;
  if (ia !== ib) return ia - ib;
  if (pa.chapter !== pb.chapter) return pa.chapter - pb.chapter;
  return pa.verse - pb.verse;
}
