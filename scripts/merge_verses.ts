// Merge translated SV+DA verses into src/data/verseTranslations.ts
import * as fs from 'node:fs';

const SV: Record<string, string> = JSON.parse(fs.readFileSync('/tmp/translated_sv.json', 'utf8'));
const DA: Record<string, string> = JSON.parse(fs.readFileSync('/tmp/translated_da.json', 'utf8'));

const FILE = 'src/data/verseTranslations.ts';
let src = fs.readFileSync(FILE, 'utf8');

function escapeStr(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

let svAdded = 0, daAdded = 0, svReplaced = 0, daReplaced = 0;

function addLang(reference: string, lang: 'sv' | 'da', text: string) {
  // Find the entry block for this reference: "REF": { ... },
  // Use a regex that locates the key and the matching closing brace.
  const keyEsc = reference.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`("${keyEsc}":\\s*\\{)([\\s\\S]*?)(\\n\\s*\\},?)`, 'm');
  const m = src.match(re);
  if (!m) {
    console.warn(`  no entry for ${reference}`);
    return;
  }
  const [whole, open, body, close] = m;
  const langRe = new RegExp(`(\\n\\s*${lang}:\\s*")((?:[^"\\\\]|\\\\.)*)(",?)`);
  if (langRe.test(body)) {
    const newBody = body.replace(langRe, `$1${escapeStr(text)}$3`);
    src = src.replace(whole, `${open}${newBody}${close}`);
    if (lang === 'sv') svReplaced++; else daReplaced++;
  } else {
    // Insert before the closing brace, keeping indentation
    const indentMatch = body.match(/\n(\s+)\w+:/);
    const indent = indentMatch ? indentMatch[1] : '    ';
    const newLine = `\n${indent}${lang}: "${escapeStr(text)}",`;
    src = src.replace(whole, `${open}${body}${newLine}${close}`);
    if (lang === 'sv') svAdded++; else daAdded++;
  }
}

for (const [ref, text] of Object.entries(SV)) addLang(ref, 'sv', text);
for (const [ref, text] of Object.entries(DA)) addLang(ref, 'da', text);

fs.writeFileSync(FILE, src);
console.log(`SV: added ${svAdded}, replaced ${svReplaced}`);
console.log(`DA: added ${daAdded}, replaced ${daReplaced}`);
