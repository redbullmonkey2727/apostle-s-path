export interface CityData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  label: string;
  estimatedAge: string;
  type: "visited" | "letter" | "both";
  references: string[];
  scriptures: ScriptureEntry[];
}

export interface ScriptureEntry {
  reference: string;
  esv: string;
  niv: string;
}

export interface JourneyData {
  id: string;
  name: string;
  color: string;
  path: [number, number][];
}

export const cities: CityData[] = [
  {
    id: "jerusalem",
    name: "Jerusalem",
    lat: 31.7683,
    lng: 35.2137,
    label: "Starting point & Council",
    estimatedAge: "~30–60 AD (age 5–35)",
    type: "both",
    references: ["Acts 9:26–30", "Acts 15:1–35", "Acts 21:17–23:22", "Galatians 1:18–19", "Galatians 2:1–10"],
    scriptures: [
      { reference: "Acts 9:26–30", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "Acts 15:1–35", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "Acts 21:17–23:22", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "Galatians 1:18–19", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "Galatians 2:1–10", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
    ],
  },
  {
    id: "damascus",
    name: "Damascus",
    lat: 33.5138,
    lng: 36.2765,
    label: "Conversion of Paul",
    estimatedAge: "~33–36 AD (age 8–11)",
    type: "visited",
    references: ["Acts 9:1–25", "Acts 22:5–16", "Acts 26:12–20", "Galatians 1:17"],
    scriptures: [
      { reference: "Acts 9:1–25", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "Acts 22:5–16", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "Acts 26:12–20", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "Galatians 1:17", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
    ],
  },
  {
    id: "antioch",
    name: "Antioch",
    lat: 36.2,
    lng: 36.15,
    label: "Mission base & Church center",
    estimatedAge: "~44–52 AD (age 19–27)",
    type: "both",
    references: ["Acts 11:25–26", "Acts 13:1–3", "Acts 14:26–28", "Acts 15:35–40", "Galatians 2:11–14"],
    scriptures: [
      { reference: "Acts 11:25–26", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "Acts 13:1–3", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "Acts 14:26–28", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "Acts 15:35–40", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "Galatians 2:11–14", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
    ],
  },
  {
    id: "ephesus",
    name: "Ephesus",
    lat: 37.9411,
    lng: 27.3419,
    label: "Letter recipient & Major ministry",
    estimatedAge: "~52–55 AD (age 27–30)",
    type: "both",
    references: ["Acts 18:19–21", "Acts 19:1–41", "Acts 20:17–38", "Ephesians 1:1", "1 Timothy 1:3"],
    scriptures: [
      { reference: "Acts 19:1–41", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "Ephesians 1:1", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "1 Timothy 1:3", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
    ],
  },
  {
    id: "corinth",
    name: "Corinth",
    lat: 37.9057,
    lng: 22.8765,
    label: "Letter recipient",
    estimatedAge: "~50–52 AD (age 25–27)",
    type: "both",
    references: ["Acts 18:1–18", "1 Corinthians 1:2", "2 Corinthians 1:1", "2 Corinthians 1:23"],
    scriptures: [
      { reference: "Acts 18:1–18", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "1 Corinthians 1:2", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "2 Corinthians 1:1", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
    ],
  },
  {
    id: "philippi",
    name: "Philippi",
    lat: 41.0142,
    lng: 24.2875,
    label: "Letter recipient & First European church",
    estimatedAge: "~49–50 AD (age 24–25)",
    type: "both",
    references: ["Acts 16:11–40", "Philippians 1:1", "1 Thessalonians 2:2"],
    scriptures: [
      { reference: "Acts 16:11–40", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "Philippians 1:1", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
    ],
  },
  {
    id: "thessalonica",
    name: "Thessalonica",
    lat: 40.6401,
    lng: 22.9444,
    label: "Letter recipient",
    estimatedAge: "~49–50 AD (age 24–25)",
    type: "both",
    references: ["Acts 17:1–9", "1 Thessalonians 1:1", "2 Thessalonians 1:1"],
    scriptures: [
      { reference: "Acts 17:1–9", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "1 Thessalonians 1:1", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "2 Thessalonians 1:1", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
    ],
  },
  {
    id: "rome",
    name: "Rome",
    lat: 41.9028,
    lng: 12.4964,
    label: "Letter recipient & Final destination",
    estimatedAge: "~60–62 AD (age 35–37)",
    type: "both",
    references: ["Acts 28:14–31", "Romans 1:7", "Philippians 1:13", "2 Timothy 1:17"],
    scriptures: [
      { reference: "Acts 28:14–31", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "Romans 1:7", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "Philippians 1:13", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
    ],
  },
  {
    id: "galatia",
    name: "Galatia",
    lat: 39.6484,
    lng: 32.5,
    label: "Letter recipient (region)",
    estimatedAge: "~47–49 AD (age 22–24)",
    type: "letter",
    references: ["Acts 16:6", "Acts 18:23", "Galatians 1:2"],
    scriptures: [
      { reference: "Acts 16:6", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "Galatians 1:2", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
    ],
  },
  {
    id: "colossae",
    name: "Colossae",
    lat: 37.7875,
    lng: 29.2614,
    label: "Letter recipient",
    estimatedAge: "~60–62 AD (age 35–37)",
    type: "letter",
    references: ["Colossians 1:2", "Philemon 1:1–2"],
    scriptures: [
      { reference: "Colossians 1:2", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
      { reference: "Philemon 1:1–2", esv: "[ESV text to be added]", niv: "[NIV text to be added]" },
    ],
  },
];

export const journeys: JourneyData[] = [
  {
    id: "first",
    name: "First Missionary Journey",
    color: "hsl(210, 70%, 45%)",
    path: [
      [36.2, 36.15],    // Antioch
      [36.75, 34.63],   // Seleucia
      [35.17, 33.43],   // Salamis, Cyprus
      [34.76, 32.42],   // Paphos, Cyprus
      [36.92, 30.69],   // Perga
      [37.76, 30.29],   // Antioch Pisidia
      [37.73, 31.15],   // Iconium
      [38.35, 31.87],   // Lystra
      [37.87, 32.49],   // Derbe
      [38.35, 31.87],   // Lystra (return)
      [37.73, 31.15],   // Iconium (return)
      [37.76, 30.29],   // Antioch Pisidia (return)
      [36.92, 30.69],   // Perga (return)
      [36.83, 30.61],   // Attalia
      [36.2, 36.15],    // Antioch (return)
    ],
  },
  {
    id: "second",
    name: "Second Missionary Journey",
    color: "hsl(140, 55%, 35%)",
    path: [
      [36.2, 36.15],    // Antioch
      [37.87, 32.49],   // Derbe
      [38.35, 31.87],   // Lystra
      [39.65, 32.5],    // Galatia region
      [40.19, 29.07],   // Troas
      [40.94, 24.41],   // Neapolis
      [41.01, 24.29],   // Philippi
      [40.64, 22.94],   // Thessalonica
      [40.31, 22.39],   // Berea
      [37.97, 23.72],   // Athens
      [37.91, 22.88],   // Corinth
      [37.94, 27.34],   // Ephesus (brief)
      [32.53, 34.89],   // Caesarea
      [31.77, 35.21],   // Jerusalem
      [36.2, 36.15],    // Antioch
    ],
  },
  {
    id: "third",
    name: "Third Missionary Journey",
    color: "hsl(0, 65%, 48%)",
    path: [
      [36.2, 36.15],    // Antioch
      [39.65, 32.5],    // Galatia region
      [37.94, 27.34],   // Ephesus
      [40.19, 29.07],   // Troas
      [41.01, 24.29],   // Philippi
      [40.64, 22.94],   // Thessalonica
      [37.91, 22.88],   // Corinth
      [41.01, 24.29],   // Philippi (return)
      [40.19, 29.07],   // Troas
      [39.1, 26.55],    // Assos
      [38.35, 26.14],   // Mitylene
      [37.75, 27.09],   // Miletus
      [36.18, 29.64],   // Patara
      [34.68, 33.04],   // Cyprus pass
      [33.89, 35.5],    // Tyre
      [32.82, 34.99],   // Ptolemais
      [32.53, 34.89],   // Caesarea
      [31.77, 35.21],   // Jerusalem
    ],
  },
  {
    id: "rome",
    name: "Journey to Rome",
    color: "hsl(270, 50%, 45%)",
    path: [
      [32.53, 34.89],   // Caesarea
      [36.14, 27.66],   // Myra
      [35.28, 24.47],   // Fair Havens, Crete
      [35.88, 17.95],   // Malta area (shipwreck)
      [35.9, 14.42],    // Malta
      [37.07, 15.29],   // Syracuse
      [38.68, 16.0],    // Rhegium
      [40.85, 14.27],   // Puteoli
      [41.9, 12.5],     // Rome
    ],
  },
];

export const tileOptions = [
  {
    id: "standard",
    name: "Standard",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
  },
  {
    id: "terrain",
    name: "Terrain",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; Esri',
  },
  {
    id: "historical",
    name: "Historical",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; Esri',
  },
];
