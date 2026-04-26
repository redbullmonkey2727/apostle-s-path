import { verseTranslations } from '../src/data/verseTranslations';
import { cities } from '../src/data/cities';
import * as fs from 'node:fs';

// Collect English text per reference (use the first scripture entry that matches)
const englishByRef = new Map<string, string>();
for (const city of cities) {
  for (const s of city.scriptures) {
    if (!englishByRef.has(s.reference)) englishByRef.set(s.reference, s.text);
  }
}

const allRefs = Array.from(englishByRef.keys());
const missingSv: { reference: string; english: string }[] = [];
const missingDa: { reference: string; english: string }[] = [];

for (const ref of allRefs) {
  const entry = (verseTranslations as any)[ref];
  if (!entry?.sv) missingSv.push({ reference: ref, english: englishByRef.get(ref)! });
  if (!entry?.da) missingDa.push({ reference: ref, english: englishByRef.get(ref)! });
}

fs.writeFileSync('/tmp/missing_sv.json', JSON.stringify(missingSv, null, 2));
fs.writeFileSync('/tmp/missing_da.json', JSON.stringify(missingDa, null, 2));
console.log(`SV missing: ${missingSv.length} -> /tmp/missing_sv.json`);
console.log(`DA missing: ${missingDa.length} -> /tmp/missing_da.json`);
