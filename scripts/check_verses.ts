import { verseTranslations } from '../src/data/verseTranslations';
import { cities } from '../src/data/cities';

const LANGS = ['es','fr','pt','sv','no','da'] as const;

// Collect all unique scripture references from cities
const refs = new Set<string>();
for (const city of cities) {
  for (const s of city.scriptures) refs.add(s.reference);
}

const totalRefs = refs.size;
const counts: Record<string, { has: number; missing: string[] }> = {};
for (const l of LANGS) counts[l] = { has: 0, missing: [] };

for (const ref of refs) {
  const entry = (verseTranslations as any)[ref];
  for (const l of LANGS) {
    if (entry && entry[l]) counts[l].has++;
    else counts[l].missing.push(ref);
  }
}

console.log(`Total scripture references in app: ${totalRefs}\n`);
for (const l of LANGS) {
  console.log(`${l.toUpperCase()}: ${counts[l].has}/${totalRefs} translated  (missing ${counts[l].missing.length})`);
  if (counts[l].missing.length) console.log(`  examples: ${counts[l].missing.slice(0,3).join(' | ')}`);
}
