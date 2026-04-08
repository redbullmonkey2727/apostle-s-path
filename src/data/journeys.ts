import type { JourneyData, TileOption } from "./types";

export const journeys: JourneyData[] = [
  {
    id: "first",
    name: "First Missionary Journey",
    color: "hsl(210, 70%, 45%)",
    path: [
      [36.2, 36.15], [36.75, 34.63], [35.17, 33.43], [34.76, 32.42],
      [36.92, 30.69], [37.76, 30.29], [37.73, 31.15], [38.35, 31.87],
      [37.87, 32.49], [38.35, 31.87], [37.73, 31.15], [37.76, 30.29],
      [36.92, 30.69], [36.83, 30.61], [36.2, 36.15],
    ],
  },
  {
    id: "second",
    name: "Second Missionary Journey",
    color: "hsl(140, 55%, 35%)",
    path: [
      [36.2, 36.15], [37.87, 32.49], [38.35, 31.87], [39.65, 32.5],
      [40.19, 29.07], [40.94, 24.41], [41.01, 24.29], [40.64, 22.94],
      [40.31, 22.39], [37.97, 23.72], [37.91, 22.88], [37.94, 27.34],
      [32.53, 34.89], [31.77, 35.21], [36.2, 36.15],
    ],
  },
  {
    id: "third",
    name: "Third Missionary Journey",
    color: "hsl(0, 65%, 48%)",
    path: [
      [36.2, 36.15], [39.65, 32.5], [37.94, 27.34], [40.19, 29.07],
      [41.01, 24.29], [40.64, 22.94], [37.91, 22.88], [41.01, 24.29],
      [40.19, 29.07], [39.1, 26.55], [38.35, 26.14], [37.75, 27.09],
      [36.18, 29.64], [34.68, 33.04], [33.89, 35.5], [32.82, 34.99],
      [32.53, 34.89], [31.77, 35.21],
    ],
  },
  {
    id: "rome",
    name: "Journey to Rome",
    color: "hsl(270, 50%, 45%)",
    path: [
      [32.53, 34.89], [36.14, 27.66], [35.28, 24.47], [35.88, 17.95],
      [35.9, 14.42], [37.07, 15.29], [38.68, 16.0], [40.85, 14.27],
      [41.9, 12.5],
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
