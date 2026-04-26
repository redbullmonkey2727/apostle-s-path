// Translations for city.label and city.epistleName fields
type Lang = "es" | "fr" | "pt" | "sv" | "no" | "da";

export const cityLabelTranslations: Record<string, Partial<Record<Lang, string>>> = {
  jerusalem: {
    es: "Punto de partida, Concilio y origen de Epístolas",
    fr: "Point de départ, Concile et origine des Épîtres",
    pt: "Ponto de partida, Concílio e origem das Epístolas",
    sv: "Utgångspunkt, kyrkomöte och epistlarnas ursprung",
    no: "Utgangspunkt, kirkemøte og epistlenes opphav",
    da: "Udgangspunkt, kirkemøde og epistlernes oprindelse",
  },
  damascus: {
    es: "Conversión de Pablo",
    fr: "Conversion de Paul",
    pt: "Conversão de Paulo",
    sv: "Paulus omvändelse",
    no: "Paulus' omvendelse",
    da: "Paulus' omvendelse",
  },
  antioch: {
    es: "Base misional y centro de la Iglesia",
    fr: "Base missionnaire et centre de l'Église",
    pt: "Base missionária e centro da Igreja",
    sv: "Missionsbas och kyrkocentrum",
    no: "Misjonsbase og kirkesentrum",
    da: "Missionsbase og kirkecentrum",
  },
  ephesus: {
    es: "Ministerio principal, cartas a Timoteo y epístolas de Juan",
    fr: "Ministère principal, lettres à Timothée et épîtres de Jean",
    pt: "Ministério principal, cartas a Timóteo e epístolas de João",
    sv: "Stort verksamhetsområde, brev till Timotheos och Johannes brev",
    no: "Hovedvirke, brev til Timoteus og Johannes' brev",
    da: "Hovedvirke, breve til Timotheus og Johannes' breve",
  },
  corinth: {
    es: "Destinatario de cartas",
    fr: "Destinataire des lettres",
    pt: "Destinatário das cartas",
    sv: "Brevmottagare",
    no: "Brevmottaker",
    da: "Brevmodtager",
  },
  philippi: {
    es: "Destinatario de carta y primera iglesia europea",
    fr: "Destinataire de lettre et première église européenne",
    pt: "Destinatário de carta e primeira igreja europeia",
    sv: "Brevmottagare och första europeiska församlingen",
    no: "Brevmottaker og første europeiske menighet",
    da: "Brevmodtager og første europæiske menighed",
  },
  thessalonica: {
    es: "Destinatario de cartas",
    fr: "Destinataire des lettres",
    pt: "Destinatário das cartas",
    sv: "Brevmottagare",
    no: "Brevmottaker",
    da: "Brevmodtager",
  },
  rome: {
    es: "Destinatario, epístolas de Pedro y destino final de Pablo",
    fr: "Destinataire, épîtres de Pierre et destination finale de Paul",
    pt: "Destinatário, epístolas de Pedro e destino final de Paulo",
    sv: "Brevmottagare, Petrus brev och Paulus slutmål",
    no: "Brevmottaker, Peters brev og Paulus' endelige reisemål",
    da: "Brevmodtager, Peters breve og Paulus' endelige rejsemål",
  },
  galatia: {
    es: "Destinatario de carta (región)",
    fr: "Destinataire de lettre (région)",
    pt: "Destinatário de carta (região)",
    sv: "Brevmottagare (region)",
    no: "Brevmottaker (region)",
    da: "Brevmodtager (region)",
  },
  colossae: {
    es: "Destinatario de carta",
    fr: "Destinataire de lettre",
    pt: "Destinatário de carta",
    sv: "Brevmottagare",
    no: "Brevmottaker",
    da: "Brevmodtager",
  },
  patmos: {
    es: "Juan el Revelador – Libro de Apocalipsis",
    fr: "Jean le Révélateur – Livre de l'Apocalypse",
    pt: "João o Revelador – Livro do Apocalipse",
    sv: "Johannes uppenbararen – Uppenbarelseboken",
    no: "Johannes åpenbareren – Åpenbaringsboken",
    da: "Johannes Åbenbareren – Åbenbaringsbogen",
  },
  crete: {
    es: "Tito – Destinatario de carta",
    fr: "Tite – Destinataire de lettre",
    pt: "Tito – Destinatário de carta",
    sv: "Titus – Brevmottagare",
    no: "Titus – Brevmottaker",
    da: "Titus – Brevmodtager",
  },
  alexandria: {
    es: "Epístola a los Hebreos",
    fr: "Épître aux Hébreux",
    pt: "Epístola aos Hebreus",
    sv: "Hebreerbrevet",
    no: "Hebreerbrevet",
    da: "Hebræerbrevet",
  },
  achaia: {
    es: "Origen del Evangelio de Lucas",
    fr: "Origine de l'Évangile de Luc",
    pt: "Origem do Evangelho de Lucas",
    sv: "Lukasevangeliets ursprung",
    no: "Lukasevangeliets opphav",
    da: "Lukasevangeliets oprindelse",
  },
};

// Book name translations (used to localize epistleName which lists books)
const bookNames: Record<string, Partial<Record<Lang, string>>> = {
  "James": { es: "Santiago", fr: "Jacques", pt: "Tiago", sv: "Jakobsbrevet", no: "Jakobs brev", da: "Jakobsbrev" },
  "Acts": { es: "Hechos", fr: "Actes", pt: "Atos", sv: "Apostlagärningarna", no: "Apostlenes gjerninger", da: "Apostlenes Gerninger" },
  "Jude": { es: "Judas", fr: "Jude", pt: "Judas", sv: "Judasbrevet", no: "Judas brev", da: "Judasbrev" },
  "Ephesians": { es: "Efesios", fr: "Éphésiens", pt: "Efésios", sv: "Efesierbrevet", no: "Efeserne", da: "Efeserbrevet" },
  "1 Timothy": { es: "1 Timoteo", fr: "1 Timothée", pt: "1 Timóteo", sv: "1 Timotheosbrevet", no: "1 Timoteus", da: "1 Timotheusbrev" },
  "2 Timothy": { es: "2 Timoteo", fr: "2 Timothée", pt: "2 Timóteo", sv: "2 Timotheosbrevet", no: "2 Timoteus", da: "2 Timotheusbrev" },
  "1 John": { es: "1 Juan", fr: "1 Jean", pt: "1 João", sv: "1 Johannesbrevet", no: "1 Johannes", da: "1 Johannesbrev" },
  "2 John": { es: "2 Juan", fr: "2 Jean", pt: "2 João", sv: "2 Johannesbrevet", no: "2 Johannes", da: "2 Johannesbrev" },
  "1 & 2 Timothy": { es: "1 y 2 Timoteo", fr: "1 & 2 Timothée", pt: "1 e 2 Timóteo", sv: "1 & 2 Timotheosbrevet", no: "1 & 2 Timoteus", da: "1 & 2 Timotheusbrev" },
  "1–2 John": { es: "1–2 Juan", fr: "1–2 Jean", pt: "1–2 João", sv: "1–2 Johannesbrevet", no: "1–2 Johannes", da: "1–2 Johannesbrev" },
  "1 & 2 Corinthians": { es: "1 y 2 Corintios", fr: "1 & 2 Corinthiens", pt: "1 e 2 Coríntios", sv: "1 & 2 Korinthierbrevet", no: "1 & 2 Korinterbrev", da: "1 & 2 Korintherbrev" },
  "Philippians": { es: "Filipenses", fr: "Philippiens", pt: "Filipenses", sv: "Filipperbrevet", no: "Filipperne", da: "Filipperbrevet" },
  "1 & 2 Thessalonians": { es: "1 y 2 Tesalonicenses", fr: "1 & 2 Thessaloniciens", pt: "1 e 2 Tessalonicenses", sv: "1 & 2 Thessalonikerbrevet", no: "1 & 2 Tessalonikerbrev", da: "1 & 2 Thessalonikerbrev" },
  "Romans": { es: "Romanos", fr: "Romains", pt: "Romanos", sv: "Romarbrevet", no: "Romerne", da: "Romerbrevet" },
  "1 & 2 Peter": { es: "1 y 2 Pedro", fr: "1 & 2 Pierre", pt: "1 e 2 Pedro", sv: "1 & 2 Petrusbrevet", no: "1 & 2 Peter", da: "1 & 2 Petersbrev" },
  "Galatians": { es: "Gálatas", fr: "Galates", pt: "Gálatas", sv: "Galaterbrevet", no: "Galaterne", da: "Galaterbrevet" },
  "Colossians": { es: "Colosenses", fr: "Colossiens", pt: "Colossenses", sv: "Kolosserbrevet", no: "Kolosserne", da: "Kolossenserbrevet" },
  "Philemon": { es: "Filemón", fr: "Philémon", pt: "Filemom", sv: "Filemonbrevet", no: "Filemon", da: "Filemonbrev" },
  "Revelation": { es: "Apocalipsis", fr: "Apocalypse", pt: "Apocalipse", sv: "Uppenbarelseboken", no: "Åpenbaringsboken", da: "Åbenbaringsbogen" },
  "Titus": { es: "Tito", fr: "Tite", pt: "Tito", sv: "Titusbrevet", no: "Titus", da: "Titusbrev" },
  "Hebrews": { es: "Hebreos", fr: "Hébreux", pt: "Hebreus", sv: "Hebreerbrevet", no: "Hebreerbrevet", da: "Hebræerbrevet" },
  "Luke": { es: "Lucas", fr: "Luc", pt: "Lucas", sv: "Lukasevangeliet", no: "Lukas", da: "Lukasevangeliet" },
};

export function translateEpistleName(name: string | undefined, lang: Lang | "en"): string | undefined {
  if (!name || lang === "en") return name;
  // Split on commas, translate each book token
  return name.split(",").map((part) => {
    const trimmed = part.trim();
    const tr = bookNames[trimmed]?.[lang];
    return tr || trimmed;
  }).join(", ");
}

export function translateCityLabel(cityId: string, fallback: string, lang: Lang | "en"): string {
  if (lang === "en") return fallback;
  return cityLabelTranslations[cityId]?.[lang] || fallback;
}
