import type { JourneyData, TileOption } from "./types";

export const journeys: JourneyData[] = [
  {
    id: "first",
    name: "First Missionary Journey",
    color: "hsl(0, 65%, 48%)",
    path: [
      // Antioch (Syria) → Seleucia → Salamis (Cyprus) → Paphos → Perga → Pisidian Antioch → Iconium → Lystra → Derbe → return
      [36.20, 36.15],  // Antioch
      [36.10, 35.92],  // Seleucia
      [35.80, 35.40],
      [35.50, 34.60],
      [35.17, 33.95],  // Salamis
      [34.95, 33.50],
      [34.76, 32.42],  // Paphos
      [34.90, 32.00],
      [35.50, 31.50],
      [36.20, 31.00],
      [36.70, 30.80],
      [36.92, 30.69],  // Perga
      [37.20, 30.50],
      [37.50, 30.35],
      [37.76, 30.29],  // Pisidian Antioch
      [37.80, 30.60],
      [37.73, 31.15],  // Iconium
      [37.90, 31.50],
      [38.35, 31.87],  // Lystra
      [37.95, 32.30],
      [37.87, 32.49],  // Derbe
      // Return
      [38.35, 31.87],  // Lystra
      [37.73, 31.15],  // Iconium
      [37.76, 30.29],  // Pisidian Antioch
      [36.92, 30.69],  // Perga
      [36.83, 30.61],  // Attalia
      [36.50, 31.50],
      [36.20, 33.00],
      [36.10, 35.00],
      [36.20, 36.15],  // Antioch
    ],
  },
  {
    id: "second",
    name: "Second Missionary Journey",
    color: "hsl(270, 50%, 45%)",
    path: [
      // Antioch → Derbe → Lystra → Iconium → Phrygia → Galatia → Troas → Samothrace → Neapolis → Philippi → Thessalonica → Berea → Athens → Corinth → Ephesus → Caesarea → Jerusalem → Antioch
      [36.20, 36.15],  // Antioch
      [36.50, 35.50],
      [37.00, 34.50],
      [37.50, 33.50],
      [37.87, 32.49],  // Derbe
      [38.35, 31.87],  // Lystra
      [37.73, 31.15],  // Iconium
      [38.20, 31.00],
      [39.00, 31.50],
      [39.65, 32.50],  // Galatia region
      [39.80, 31.00],
      [39.95, 30.00],
      [39.95, 29.50],  // Troas area
      [40.19, 29.07],  // Troas
      [40.50, 27.80],
      [40.72, 26.00],  // Samothrace
      [40.94, 24.41],  // Neapolis
      [41.01, 24.29],  // Philippi
      [40.90, 23.80],
      [40.64, 22.94],  // Thessalonica
      [40.50, 22.50],
      [40.31, 22.39],  // Berea
      [39.80, 22.50],
      [39.20, 23.00],
      [38.50, 23.30],
      [37.97, 23.72],  // Athens
      [37.95, 23.30],
      [37.91, 22.88],  // Corinth
      [37.90, 23.20],
      [37.80, 24.50],
      [37.85, 25.50],
      [37.94, 27.34],  // Ephesus (brief)
      [37.50, 28.00],
      [36.50, 30.00],
      [35.50, 32.00],
      [34.50, 33.50],
      [33.50, 34.50],
      [32.53, 34.89],  // Caesarea
      [32.00, 35.00],
      [31.77, 35.21],  // Jerusalem
      [32.50, 35.50],
      [34.00, 36.00],
      [36.20, 36.15],  // Antioch
    ],
  },
  {
    id: "third",
    name: "Third Missionary Journey",
    color: "hsl(175, 60%, 35%)",
    path: [
      // Antioch → Galatia → Phrygia → Ephesus → Macedonia → Greece → Philippi → Troas → Assos → Mitylene → Chios → Miletus → Cos → Rhodes → Patara → Tyre → Ptolemais → Caesarea → Jerusalem
      [36.20, 36.15],  // Antioch
      [37.00, 35.00],
      [38.00, 34.00],
      [39.00, 33.00],
      [39.65, 32.50],  // Galatia
      [39.00, 31.00],
      [38.50, 29.50],
      [38.20, 28.50],
      [37.94, 27.34],  // Ephesus (long stay)
      [38.50, 26.50],
      [39.50, 25.50],
      [40.19, 29.07],  // Troas
      [40.50, 27.00],
      [41.01, 24.29],  // Philippi
      [40.64, 22.94],  // Thessalonica
      [40.31, 22.39],  // Berea
      [38.50, 23.00],
      [37.91, 22.88],  // Corinth
      [37.97, 23.72],  // Athens
      [38.50, 23.50],
      [40.31, 22.39],  // Berea
      [40.64, 22.94],  // Thessalonica
      [41.01, 24.29],  // Philippi
      [40.19, 29.07],  // Troas
      [39.30, 26.80],
      [39.10, 26.55],  // Assos
      [38.80, 26.30],  // Mitylene
      [38.35, 26.14],  // Chios
      [37.75, 27.09],  // Miletus
      [36.90, 27.50],
      [36.50, 28.00],  // Cos
      [36.18, 29.64],  // Patara
      [35.50, 30.50],
      [35.00, 32.00],
      [34.68, 33.04],  // Tyre
      [33.89, 35.50],  // Ptolemais
      [32.82, 34.99],  // Ptolemais area
      [32.53, 34.89],  // Caesarea
      [32.00, 35.00],
      [31.77, 35.21],  // Jerusalem
    ],
  },
  {
    id: "rome",
    name: "Journey to Rome",
    color: "hsl(38, 70%, 50%)",
    path: [
      // Caesarea → Sidon → Myra → Cnidus → Fair Havens (Crete) → Malta → Syracuse → Rhegium → Puteoli → Rome
      [32.53, 34.89],  // Caesarea
      [33.56, 35.37],  // Sidon
      [34.50, 34.00],
      [35.50, 32.00],
      [36.14, 29.80],
      [36.30, 28.50],
      [36.14, 27.66],  // Myra
      [36.00, 27.00],
      [35.50, 26.50],
      [35.28, 24.47],  // Fair Havens, Crete
      [35.50, 22.00],
      [35.70, 18.50],
      [35.88, 17.95],  // Malta area
      [35.90, 14.50],
      [35.90, 14.42],  // Malta
      [37.07, 15.29],  // Syracuse
      [38.10, 15.65],  // Rhegium
      [38.68, 16.00],
      [39.50, 15.00],
      [40.50, 14.50],
      [40.85, 14.27],  // Puteoli
      [41.20, 13.50],
      [41.50, 12.80],
      [41.90, 12.50],  // Rome
    ],
  },
];

export const tileOptions: TileOption[] = [
  {
    id: "google",
    name: "Google Maps",
    url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    attribution: '&copy; Google Maps',
  },
  {
    id: "osm",
    name: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
  },
  {
    id: "terrain",
    name: "Terrain",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; Esri',
  },
];
