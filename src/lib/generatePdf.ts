import { cities } from "@/data/paulData";
import type { CityData } from "@/data/types";
import { commentaries } from "@/data/commentaries";

const writerNames: Record<string, string> = {
  paul: "Paul",
  peter: "Peter",
  john: "John",
  luke: "Luke",
  james: "James",
  jude: "Jude",
  "hebrews-author": "Hebrews Author",
};

function getCommentary(reference: string, inlineCommentary?: string): string {
  if (inlineCommentary) return inlineCommentary;
  if (commentaries[reference]) return commentaries[reference];
  for (const key of Object.keys(commentaries)) {
    if (reference.includes(key) || key.includes(reference)) return commentaries[key];
  }
  return "";
}

export function generateScripturePdf(activeTopic: string) {
  let filteredCities: CityData[] = cities;
  if (activeTopic) {
    filteredCities = cities.filter((c) =>
      c.scriptures.some((s) => s.topics.includes(activeTopic))
    );
  }

  const topicLabel = activeTopic || "All Topics";
  const totalScriptures = filteredCities.reduce((sum, c) => {
    const scripts = activeTopic
      ? c.scriptures.filter((s) => s.topics.includes(activeTopic))
      : c.scriptures;
    return sum + scripts.length;
  }, 0);

  // Group by writer
  const writerGroups: Record<string, { city: CityData; scripture: typeof cities[0]["scriptures"][0] }[]> = {};
  for (const city of filteredCities) {
    const scripts = activeTopic
      ? city.scriptures.filter((s) => s.topics.includes(activeTopic))
      : city.scriptures;
    for (const s of scripts) {
      if (!writerGroups[s.writer]) writerGroups[s.writer] = [];
      writerGroups[s.writer].push({ city, scripture: s });
    }
  }

  let html = `<!DOCTYPE html><html><head><meta charset="utf-8">
    <title>Scripture Study Guide — ${topicLabel}</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Rosarivo&display=swap');
      body { font-family: 'Rosarivo', serif; margin: 40px; color: #1a1a1a; line-height: 1.7; }
      h1 { font-family: 'Lora', serif; font-size: 26px; margin-bottom: 4px; color: #2c1810; }
      h2 { font-family: 'Lora', serif; font-size: 20px; margin-top: 32px; border-bottom: 2px solid #c9a96e; padding-bottom: 6px; color: #4a3520; }
      h3 { font-family: 'Lora', serif; font-size: 16px; margin-top: 20px; color: #5a4a3a; }
      .subtitle { color: #666; font-size: 13px; margin-bottom: 28px; }
      .scripture { margin: 16px 0; page-break-inside: avoid; border-left: 3px solid #c9a96e; padding-left: 16px; }
      .ref { font-weight: 700; font-family: 'Lora', serif; font-size: 15px; color: #2c1810; }
      .city-tag { font-size: 11px; color: #fff; background: #6b5b4b; padding: 1px 8px; border-radius: 10px; margin-left: 8px; }
      .topics { font-size: 11px; color: #888; margin-top: 3px; }
      .text-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #999; margin-top: 8px; margin-bottom: 2px; }
      .text { font-size: 13px; margin-top: 2px; }
      .nrsv { font-size: 12.5px; color: #444; margin-top: 2px; }
      .commentary { font-size: 12px; color: #5a4a3a; background: #f8f4ee; border-radius: 6px; padding: 8px 12px; margin-top: 8px; font-style: italic; }
      .writer { font-size: 11px; color: #666; font-style: italic; }
      .toc { margin: 20px 0; }
      .toc a { color: #4a3520; text-decoration: none; font-size: 14px; display: block; padding: 3px 0; }
      .toc a:hover { text-decoration: underline; }
      hr { border: none; border-top: 1px solid #e0d5c5; margin: 24px 0; }
      @media print { body { margin: 20px; } .scripture { break-inside: avoid; } }
    </style>
  </head><body>
    <h1>📖 Scripture Study Guide</h1>
    <p class="subtitle">Topic: ${topicLabel} · ${totalScriptures} scriptures across ${filteredCities.length} locations · Generated ${new Date().toLocaleDateString()}</p>`;

  // Table of contents
  html += `<div class="toc"><strong>Contents</strong>`;
  const writerOrder = ["paul", "peter", "john", "luke", "james", "jude", "hebrews-author"];
  const sortedWriters = writerOrder.filter((w) => writerGroups[w]);
  for (const w of sortedWriters) {
    html += `<a href="#writer-${w}">✦ ${writerNames[w] || w} (${writerGroups[w].length} scriptures)</a>`;
  }
  html += `</div><hr>`;

  // By writer sections
  for (const w of sortedWriters) {
    const entries = writerGroups[w];
    html += `<h2 id="writer-${w}">${writerNames[w] || w}</h2>`;

    // Group by city within writer
    const byCityMap = new Map<string, typeof entries>();
    for (const e of entries) {
      const existing = byCityMap.get(e.city.id) || [];
      existing.push(e);
      byCityMap.set(e.city.id, existing);
    }

    for (const [, cityEntries] of byCityMap) {
      const city = cityEntries[0].city;
      html += `<h3>📍 ${city.name}${city.estimatedAge ? ` · ${city.estimatedAge}` : ""}</h3>`;

      for (const { scripture: s } of cityEntries) {
        const commentary = getCommentary(s.reference, s.commentary);
        html += `<div class="scripture">
          <p class="ref">${s.reference}</p>
          <p class="topics">${s.topics.join(" · ")}</p>
          <p class="text-label">KJV</p>
          <p class="text">${s.kjv}</p>
          <p class="text-label">NRSV</p>
          <p class="nrsv">${s.nrsv}</p>
          ${commentary ? `<div class="commentary">💬 ${commentary}</div>` : ""}
        </div>`;
      }
    }
  }

  // By location appendix
  html += `<hr><h2>Appendix: Scriptures by Location</h2>`;
  for (const city of filteredCities) {
    const scripts = activeTopic
      ? city.scriptures.filter((s) => s.topics.includes(activeTopic))
      : city.scriptures;
    if (scripts.length === 0) continue;
    html += `<p><strong>${city.name}</strong> — ${scripts.map((s) => s.reference).join(", ")}</p>`;
  }

  html += `</body></html>`;

  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 800);
  }
}
