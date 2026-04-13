export type WriterType = "paul" | "peter" | "john" | "james" | "jude" | "hebrews-author" | "luke";
export type CityType = "visited" | "letter" | "both";

export interface ScriptureEntry {
  reference: string;
  kjv: string;
  nrsv: string;
  topics: string[];
  writer: WriterType;
  commentary?: string;
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
