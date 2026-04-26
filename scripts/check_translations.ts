import { topicTranslations } from '../src/data/topicTranslations';
import { commentaryTranslations } from '../src/data/commentaryTranslations';
import { tourTranslations } from '../src/data/tourTranslations';
import { writerLabelTranslations } from '../src/data/writerTranslations';
import { eventTranslations } from '../src/data/eventTranslations';
import { contextTranslations } from '../src/data/contextTranslations';

const LANGS = ['es','fr','pt','sv','no','da'] as const;
const report: Record<string, any> = {};

function checkSimple(name: string, obj: Record<string, any>) {
  const missing: string[] = [];
  for (const [key, val] of Object.entries(obj)) {
    for (const l of LANGS) {
      if (!val[l] || val[l].trim() === '') missing.push(`${key} -> ${l}`);
    }
  }
  report[name] = { total: Object.keys(obj).length, missing: missing.length, examples: missing.slice(0, 5) };
}

checkSimple('topics', topicTranslations);
checkSimple('commentaries', commentaryTranslations);
checkSimple('tour', tourTranslations);
checkSimple('writers', writerLabelTranslations);

const eventMissing: string[] = [];
for (const [key, val] of Object.entries(eventTranslations)) {
  for (const l of LANGS) {
    if (!val.name?.[l]) eventMissing.push(`${key} name -> ${l}`);
    if (!val.description?.[l]) eventMissing.push(`${key} desc -> ${l}`);
  }
}
report.events = { total: Object.keys(eventTranslations).length, missing: eventMissing.length, examples: eventMissing.slice(0, 5) };

const ctxMissing: string[] = [];
let ctxTotal = 0;
for (const [city, books] of Object.entries(contextTranslations)) {
  for (const [book, val] of Object.entries(books as any)) {
    ctxTotal++;
    for (const l of LANGS) {
      if (!(val as any)[l]) ctxMissing.push(`${city}.${book} -> ${l}`);
    }
  }
}
report.context = { total: ctxTotal, missing: ctxMissing.length, examples: ctxMissing.slice(0, 5) };

console.log(JSON.stringify(report, null, 2));
