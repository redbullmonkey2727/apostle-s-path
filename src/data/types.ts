export type WriterType = "paul" | "peter" | "john" | "james" | "jude" | "hebrews-author" | "luke";
export type CityType = "visited" | "letter" | "both";

/** Supported Bible translation keys */
export type TranslationKey = "kjv" | "nrsv" | "es" | "fr" | "pt" | "sv" | "no" | "da";

export const translationMeta: Record<TranslationKey, { label: string; fullName: string }> = {
  kjv: { label: "KJV", fullName: "King James Version" },
  nrsv: { label: "NRSV", fullName: "New Revised Standard Version (2021)" },
  es: { label: "Español", fullName: "Reina-Valera 1909 (Church Edition)" },
  fr: { label: "Français", fullName: "Louis Segond 1910 (LSG)" },
  pt: { label: "Português", fullName: "Almeida 1914 (Church Edition)" },
  sv: { label: "Svenska", fullName: "Svenska Folkbibeln 2015 (XP Media)" },
  no: { label: "Norsk", fullName: "Bibelen 2007 (Norsk Bibel A/S)" },
  da: { label: "Dansk", fullName: "Bibelen 1992 (Danish Bible Society)" },
};

export interface ScriptureEntry {
  reference: string;
  kjv: string;
  nrsv: string;
  topics: string[];
  writer: WriterType;
  commentary?: string;
  /** Optional translations keyed by language code */
  translations?: Partial<Record<TranslationKey, string>>;
}

export interface CityData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  label: string;
  estimatedAge: string;
  type: CityType;
  references: string[];
  scriptures: ScriptureEntry[];
  writers: WriterType[];
  epistleName?: string;
  writerAges?: Record<string, string>;
  summerTempC?: number;
  winterTempC?: number;
  summerPrecipMm?: number;
  winterPrecipMm?: number;
}

export interface ShipwreckPoint {
  lat: number;
  lng: number;
  label: string;
  reference: string;
  description: string;
  date?: string;
  summary?: string;
}

export interface JourneyData {
  id: string;
  name: string;
  color: string;
  path: [number, number][];
  dateRange: string;
  durationNote: string;
  travelNote: string;
  shipwrecks?: ShipwreckPoint[];
}

export interface TileOption {
  id: string;
  name: string;
  url: string;
  attribution: string;
}
