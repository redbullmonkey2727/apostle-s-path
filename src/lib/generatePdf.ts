import { cities } from "@/data/paulData";
import type { CityData } from "@/data/types";

export function generateScripturePdf(activeTopic: string) {
  // Filter cities/scriptures
  let filteredCities: CityData[] = cities;
  if (activeTopic) {
    filteredCities = cities.filter((c) =>
      c.scriptures.some((s) => s.topics.includes(activeTopic))
    );
  }

  // Build HTML content for print
  const topicLabel = activeTopic || "All Topics";
  const totalScriptures = filteredCities.reduce((sum, c) => {
    const scripts = activeTopic
      ? c.scriptures.filter((s) => s.topics.includes(activeTopic))
      : c.scriptures;
    return sum + scripts.length;
  }, 0);

  let html = `<!DOCTYPE html><html><head><meta charset="utf-8">
    <title>Scripture Reference — ${topicLabel}</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Rosarivo&display=swap');
      body { font-family: 'Rosarivo', serif; margin: 40px; color: #1a1a1a; line-height: 1.6; }
      h1 { font-family: 'Lora', serif; font-size: 24px; margin-bottom: 4px; }
      h2 { font-family: 'Lora', serif; font-size: 18px; margin-top: 28px; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
      .subtitle { color: #666; font-size: 13px; margin-bottom: 24px; }
      .scripture { margin: 12px 0; page-break-inside: avoid; }
      .ref { font-weight: 700; font-family: 'Lora', serif; font-size: 14px; }
      .topics { font-size: 11px; color: #888; margin-top: 2px; }
      .text { font-size: 13px; margin-top: 4px; }
      .writer { font-size: 11px; color: #666; font-style: italic; }
      @media print { body { margin: 20px; } }
    </style>
  </head><body>
    <h1>📖 Scripture Reference Guide</h1>
    <p class="subtitle">Topic: ${topicLabel} · ${totalScriptures} scriptures · Generated ${new Date().toLocaleDateString()}</p>`;

  for (const city of filteredCities) {
    const scripts = activeTopic
      ? city.scriptures.filter((s) => s.topics.includes(activeTopic))
      : city.scriptures;
    if (scripts.length === 0) continue;

    html += `<h2>${city.name}</h2>`;
    for (const s of scripts) {
      html += `<div class="scripture">
        <p class="ref">${s.reference} <span class="writer">— ${s.writer}</span></p>
        <p class="topics">${s.topics.join(", ")}</p>
        <p class="text">${s.kjv}</p>
      </div>`;
    }
  }

  html += `</body></html>`;

  // Open print window
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    // Auto-trigger print dialog after fonts load
    setTimeout(() => printWindow.print(), 800);
  }
}
