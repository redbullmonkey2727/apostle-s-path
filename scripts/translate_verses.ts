// Translate missing Bible verses via Lovable AI Gateway
// Writes JSON files at /tmp/translated_sv.json and /tmp/translated_da.json
import * as fs from 'node:fs';

const API_KEY = process.env.LOVABLE_API_KEY;
if (!API_KEY) throw new Error('LOVABLE_API_KEY missing');

const URL = 'https://ai.gateway.lovable.dev/v1/chat/completions';
const MODEL = 'google/gemini-2.5-pro';

type Item = { reference: string; english: string };

async function translateBatch(items: Item[], targetLang: 'sv' | 'da', bibleName: string): Promise<Record<string, string>> {
  const systemPrompt = `You are a Bible translation expert. The user will provide a JSON array of New Testament passages in English (KJV). For each one, return the corresponding passage from the ${bibleName} translation. Preserve verse boundaries. Use the standard published wording of ${bibleName} where possible. Do not paraphrase loosely. Keep proper nouns spelled in the conventional form for that translation.`;

  const userPrompt = `Translate each English passage to ${bibleName}. Return them via the tool call.\n\nPassages:\n${JSON.stringify(items, null, 2)}`;

  const body = {
    model: MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    tools: [
      {
        type: 'function',
        function: {
          name: 'submit_translations',
          description: `Return the ${bibleName} translation for each passage`,
          parameters: {
            type: 'object',
            properties: {
              translations: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    reference: { type: 'string' },
                    text: { type: 'string', description: `The passage in ${bibleName}` },
                  },
                  required: ['reference', 'text'],
                  additionalProperties: false,
                },
              },
            },
            required: ['translations'],
            additionalProperties: false,
          },
        },
      },
    ],
    tool_choice: { type: 'function', function: { name: 'submit_translations' } },
  };

  const resp = await fetch(URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`AI gateway ${resp.status}: ${t.slice(0, 500)}`);
  }
  const json = await resp.json();
  const args = json.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
  if (!args) {
    console.error('Unexpected response:', JSON.stringify(json).slice(0, 500));
    throw new Error('No tool call in response');
  }
  const parsed = JSON.parse(args);
  const out: Record<string, string> = {};
  for (const t of parsed.translations) out[t.reference] = t.text;
  return out;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function run(file: string, lang: 'sv' | 'da', bibleName: string, outFile: string) {
  const items: Item[] = JSON.parse(fs.readFileSync(file, 'utf8'));
  console.log(`\n${lang.toUpperCase()}: ${items.length} verses to translate (${bibleName})`);
  const batches = chunk(items, 15);
  const all: Record<string, string> = {};
  for (let i = 0; i < batches.length; i++) {
    process.stdout.write(`  batch ${i + 1}/${batches.length}... `);
    try {
      const result = await translateBatch(batches[i], lang, bibleName);
      Object.assign(all, result);
      console.log(`✓ (${Object.keys(result).length} translated)`);
    } catch (e: any) {
      console.log(`✗ ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, 800));
  }
  fs.writeFileSync(outFile, JSON.stringify(all, null, 2));
  console.log(`Wrote ${Object.keys(all).length}/${items.length} to ${outFile}`);
}

(async () => {
  await run('/tmp/missing_sv.json', 'sv', 'Svenska Folkbibeln 2015', '/tmp/translated_sv.json');
  await run('/tmp/missing_da.json', 'da', 'Bibelen 1992 (Danish Bible Society)', '/tmp/translated_da.json');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
