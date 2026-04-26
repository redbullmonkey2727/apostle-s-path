import type { JourneyData, TileOption, ShipwreckPoint } from "./types";

export const journeys: JourneyData[] = [
  {
    id: "first",
    name: "First Missionary Journey",
    color: "hsl(0, 65%, 48%)",
    dateRange: "AD 46–48",
    durationNote: "~2 years",
    travelNote: "Barnabas & Saul sailed from Seleucia to Cyprus, then crossed to Pamphylia. Overland through Pisidian Antioch, Iconium, Lystra, Derbe, then retraced their route. Ancient foot travel averaged ~20 mi/day on Roman roads; sea crossings ~100 mi/day with favorable winds.",
    path: [
      // Antioch (Syria) → Seleucia → Salamis → across Cyprus → Paphos → Perga → Pisidian Antioch → Iconium → Lystra → Derbe → return → Attalia → Antioch
      [36.20, 36.16],   // Antioch (Syria)
      [36.16, 36.05],
      [36.12, 35.92],   // Seleucia Pieria (port)
      [36.05, 35.70],   // open sea
      [35.85, 35.30],
      [35.55, 34.80],
      [35.25, 34.30],
      [35.18, 33.90],   // Salamis (east Cyprus)
      [35.05, 33.55],
      [34.92, 33.10],
      [34.82, 32.70],
      [34.76, 32.42],   // Paphos
      [34.85, 32.10],
      [35.05, 31.70],
      [35.40, 31.40],
      [35.85, 31.15],
      [36.30, 30.95],
      [36.65, 30.82],
      [36.83, 30.69],   // Attalia (port arrival area)
      [36.92, 30.79],   // Perga
      [37.10, 30.70],
      [37.30, 30.55],
      [37.50, 30.45],
      [37.65, 30.38],
      [37.76, 30.29],   // Pisidian Antioch
      [37.78, 30.55],
      [37.77, 30.85],
      [37.73, 31.15],   // Iconium
      [37.85, 31.40],
      [38.00, 31.60],
      [38.20, 31.78],
      [38.35, 31.87],   // Lystra
      [38.20, 32.05],
      [38.05, 32.25],
      [37.95, 32.40],
      [37.87, 32.49],   // Derbe (turnaround)
      // Return: Derbe → Lystra → Iconium → Pisidian Antioch → Perga → Attalia → sail → Antioch
      [37.95, 32.40],
      [38.10, 32.15],
      [38.25, 31.98],
      [38.35, 31.87],   // Lystra (return)
      [38.10, 31.55],
      [37.90, 31.35],
      [37.73, 31.15],   // Iconium (return)
      [37.76, 30.85],
      [37.78, 30.55],
      [37.76, 30.29],   // Pisidian Antioch (return)
      [37.55, 30.40],
      [37.30, 30.55],
      [37.05, 30.65],
      [36.92, 30.79],   // Perga (return)
      [36.83, 30.69],   // Attalia (sail home)
      [36.55, 31.05],
      [36.25, 31.70],
      [36.00, 32.50],
      [35.85, 33.40],
      [35.85, 34.30],
      [35.95, 35.10],
      [36.05, 35.65],
      [36.12, 35.92],   // Seleucia
      [36.20, 36.16],   // Antioch
    ],
    shipwrecks: [
      {
        lat: 35.10, lng: 31.50,
        label: "Shipwreck off Pamphylia",
        reference: "2 Corinthians 11:25",
        date: "~AD 47",
        summary: "During the first missionary journey, Paul and Barnabas sailed from Paphos on Cyprus across the open Mediterranean toward the coast of Pamphylia. This stretch was notorious for sudden squalls. Paul later recounted to the Corinthians that he had been shipwrecked three times and spent 'a night and a day in the deep' (2 Cor 11:25). Scholars believe this crossing was the likely site of one of those ordeals. All aboard survived, and the missionaries continued overland to Perga and then into the interior.",
        description: "One of three shipwrecks Paul mentions before writing 2 Corinthians. Likely occurred crossing from Cyprus to the coast of Pamphylia — a notoriously rough stretch of open Mediterranean."
      }
    ],
  },
  {
    id: "second",
    name: "Second Missionary Journey",
    color: "hsl(270, 50%, 45%)",
    dateRange: "AD 49–52",
    durationNote: "~3 years",
    travelNote: "Paul & Silas traveled overland through Syria, Cilicia, Derbe, Lystra, then across Phrygia and Galatia. A vision called them to Macedonia (Acts 16:9). Sea crossings to Neapolis, then overland to Philippi, Thessalonica, Berea, Athens, and Corinth (18-month stay per Acts 18:11). Return via Ephesus and Caesarea.",
    path: [
      // Antioch → overland through Cilician Gates → Derbe → Lystra → Iconium → Phrygia → Galatia → Troas → Macedonia → Greece → return
      [36.20, 36.15],   // Antioch
      [36.50, 35.80],
      [36.80, 35.40],
      [37.00, 35.00],   // Tarsus area
      [37.20, 34.60],
      [37.40, 34.20],   // Cilician Gates
      [37.60, 33.80],
      [37.75, 33.30],
      [37.85, 32.80],
      [37.87, 32.49],   // Derbe
      [38.10, 32.10],
      [38.35, 31.87],   // Lystra (Timothy joins)
      [38.05, 31.50],
      [37.73, 31.15],   // Iconium
      [38.00, 30.80],
      [38.30, 30.50],
      [38.70, 30.30],   // Phrygia
      [39.10, 30.50],
      [39.40, 31.00],
      [39.65, 31.50],   // Galatia region
      [39.80, 31.20],
      [39.90, 30.60],
      [40.00, 30.00],
      [40.05, 29.50],
      [40.19, 29.07],   // Troas (vision of Macedonian man)
      [40.30, 28.50],
      [40.45, 27.50],
      [40.55, 26.80],
      [40.72, 26.00],   // Samothrace
      [40.85, 25.20],
      [40.94, 24.41],   // Neapolis
      [41.01, 24.29],   // Philippi
      [40.95, 23.90],
      [40.80, 23.50],
      [40.64, 22.94],   // Thessalonica
      [40.52, 22.70],
      [40.38, 22.50],
      [40.31, 22.39],   // Berea
      [40.10, 22.50],
      [39.80, 22.60],
      [39.40, 22.80],
      [39.00, 23.10],
      [38.60, 23.30],
      [38.20, 23.50],
      [37.97, 23.72],   // Athens
      [37.96, 23.40],
      [37.93, 23.10],
      [37.91, 22.88],   // Corinth (18 months)
      // Return via Ephesus
      [37.93, 23.10],
      [37.96, 23.40],
      [37.90, 24.00],
      [37.85, 25.00],
      [37.88, 26.00],
      [37.94, 27.34],   // Ephesus (brief visit)
      [37.70, 27.80],
      [37.30, 28.50],
      [36.80, 29.50],
      [36.30, 30.50],
      [35.80, 31.50],
      [35.30, 32.50],
      [34.50, 33.50],
      [33.50, 34.30],
      [32.80, 34.80],
      [32.53, 34.89],   // Caesarea
      [32.20, 35.05],
      [31.77, 35.21],   // Jerusalem
      [32.20, 35.10],
      [33.00, 35.50],
      [34.50, 36.00],
      [35.50, 36.10],
      [36.20, 36.15],   // Antioch
    ],
    shipwrecks: [
      {
        lat: 40.55, lng: 26.80,
        label: "Shipwreck near Samothrace",
        reference: "2 Corinthians 11:25",
        date: "~AD 50",
        summary: "On the second journey, after receiving the vision of the Macedonian man at Troas (Acts 16:9-10), Paul, Silas, and Timothy set sail across the northern Aegean. The waters around Samothrace were well-known for treacherous currents and sudden storms. Scholars suggest this crossing may have been the site of Paul's second shipwreck. Despite the peril, the party reached Neapolis and pressed on to Philippi, where Lydia and the jailer would become early European converts.",
        description: "Paul's crossing from Troas to Macedonia passed through notoriously treacherous waters around Samothrace. Scholars suggest one of his three pre-AD 56 shipwrecks may have occurred here."
      }
    ],
  },
  {
    id: "third",
    name: "Third Missionary Journey",
    color: "hsl(175, 60%, 35%)",
    dateRange: "AD 53–57",
    durationNote: "~4 years",
    travelNote: "Paul revisited Galatia and Phrygia overland, then settled in Ephesus for ~2.5 years (Acts 19:10). Traveled through Macedonia to Corinth (3-month stay, Acts 20:3), then returned via Philippi, Troas (Eutychus incident, Acts 20:9), and sailed along the coast to Miletus and on to Jerusalem.",
    path: [
      // Antioch → Galatia/Phrygia → Ephesus (2+ years) → Macedonia → Greece → return via coast
      [36.20, 36.15],   // Antioch
      [36.60, 35.60],
      [37.00, 35.00],
      [37.40, 34.20],
      [37.80, 33.50],
      [38.30, 33.00],
      [38.80, 32.50],
      [39.30, 32.00],
      [39.65, 31.50],   // Galatia
      [39.40, 31.00],
      [39.10, 30.50],
      [38.70, 29.80],
      [38.40, 29.00],
      [38.10, 28.20],
      [37.94, 27.34],   // Ephesus (long stay ~2.5 years)
      // To Macedonia & Greece
      [38.10, 27.00],
      [38.50, 26.50],
      [39.00, 26.00],
      [39.50, 25.50],
      [39.90, 25.00],
      [40.19, 29.07],   // Troas (first visit)
      [40.50, 27.50],
      [40.80, 26.00],
      [41.01, 24.29],   // Philippi
      [40.80, 23.60],
      [40.64, 22.94],   // Thessalonica
      [40.31, 22.39],   // Berea
      [39.60, 22.60],
      [38.80, 23.00],
      [38.20, 23.40],
      [37.91, 22.88],   // Corinth (3 months in Greece)
      // Return north
      [38.20, 23.40],
      [38.80, 23.00],
      [39.60, 22.60],
      [40.31, 22.39],   // Berea
      [40.64, 22.94],   // Thessalonica
      [41.01, 24.29],   // Philippi (Passover)
      // Coastal return
      [40.60, 25.50],
      [40.19, 29.07],   // Troas (Eutychus raised)
      [39.50, 26.90],
      [39.10, 26.55],   // Assos
      [38.90, 26.35],   // Mitylene
      [38.50, 26.15],   // Chios
      [37.95, 26.80],
      [37.75, 27.09],   // Miletus (farewell to Ephesian elders)
      [37.40, 27.30],
      [36.90, 27.50],   // Cos
      [36.50, 28.00],   // Rhodes approach
      [36.45, 28.22],   // Rhodes
      [36.30, 29.00],
      [36.18, 29.64],   // Patara
      [35.80, 30.50],
      [35.30, 31.50],
      [34.90, 32.50],
      [34.68, 33.04],   // Tyre (7 days)
      [34.20, 33.80],
      [33.20, 35.00],
      [32.82, 34.99],   // Ptolemais
      [32.53, 34.89],   // Caesarea (Philip's house)
      [32.20, 35.00],
      [31.90, 35.10],
      [31.77, 35.21],   // Jerusalem (arrest)
    ],
    shipwrecks: [
      {
        lat: 35.80, lng: 31.00,
        label: "Shipwreck off Asia Minor coast",
        reference: "2 Corinthians 11:25",
        date: "~AD 55",
        summary: "During the third missionary journey, Paul traveled extensively along the Aegean coastline, sailing between Troas, Assos, Mitylene, Chios, and Miletus. The rugged coast of Asia Minor was fraught with rocky shoals and unpredictable winds. Paul's third shipwreck likely occurred along this route. He later wrote to the Corinthians from Ephesus (or Macedonia) cataloguing his sufferings, including being 'a night and a day in the deep' — possibly clinging to wreckage before rescue.",
        description: "The third of Paul's shipwrecks mentioned in 2 Corinthians, likely on the return voyage from Miletus along the rugged Aegean coast. Paul also spent 'a night and a day in the deep' (2 Cor 11:25)."
      }
    ],
  },
  {
    id: "rome",
    name: "Journey to Rome",
    color: "hsl(38, 70%, 50%)",
    dateRange: "AD 59–60",
    durationNote: "~6 months",
    travelNote: "Paul sailed as a prisoner under centurion Julius (Acts 27:1). From Caesarea to Sidon, then along Cilicia's coast to Myra, transferred to an Alexandrian grain ship. Caught in the Northeaster (Euraquilo) storm for 14 days (Acts 27:27), shipwrecked on Malta for 3 months, then sailed via Syracuse and Rhegium to Puteoli, arriving in Rome on foot via the Appian Way.",
    path: [
      // Caesarea → Sidon → south of Cyprus → Myra → Cnidus → Crete → Malta → Syracuse → Rhegium → Puteoli → Rome
      [32.53, 34.89],   // Caesarea
      [32.80, 35.00],
      [33.20, 35.20],
      [33.56, 35.37],   // Sidon
      [34.00, 35.00],
      [34.50, 34.50],
      [35.00, 33.50],
      [35.40, 32.50],   // south of Cyprus
      [35.80, 31.50],
      [36.00, 30.50],
      [36.10, 29.80],
      [36.14, 29.64],   // Myra (change ships)
      [36.10, 29.00],
      [36.00, 28.20],
      [35.80, 27.50],
      [35.60, 27.00],
      [35.50, 26.50],
      [35.40, 26.00],   // Cnidus
      [35.30, 25.50],
      [35.28, 24.47],   // Fair Havens, Crete
      [35.30, 23.80],
      [35.35, 23.00],   // Cape Matala
      [35.40, 22.00],   // Storm - Euraquilo
      [35.50, 20.50],
      [35.60, 19.00],
      [35.70, 17.50],
      [35.80, 16.50],
      [35.88, 15.50],
      [35.90, 14.50],   // Malta approach
      [35.90, 14.42],   // Malta (3 months)
      // Malta to Rome
      [36.20, 14.45],
      [36.60, 14.80],
      [37.07, 15.29],   // Syracuse (3 days)
      [37.50, 15.45],
      [38.10, 15.65],   // Rhegium
      [38.50, 15.50],
      [39.00, 15.20],
      [39.50, 14.80],
      [40.00, 14.50],
      [40.50, 14.30],
      [40.85, 14.27],   // Puteoli (Pozzuoli)
      [41.00, 14.00],
      [41.20, 13.50],
      [41.40, 13.00],
      [41.60, 12.80],
      [41.90, 12.50],   // Rome
    ],
    shipwrecks: [
      {
        lat: 35.90, lng: 14.42,
        label: "Shipwreck at Malta",
        reference: "Acts 27:41-44; Acts 28:1-6",
        date: "~AD 60, late autumn",
        summary: "The most detailed shipwreck in Scripture. Paul, a prisoner bound for trial in Rome, sailed with 275 others aboard an Alexandrian grain ship under centurion Julius. Ignoring Paul's warning at Fair Havens, they departed Crete and were caught by the Euraquilo — a violent northeaster. For 14 days they drifted without sun or stars, jettisoning cargo and tackle. An angel appeared to Paul promising all lives would be spared (Acts 27:24). The ship struck a sandbar off Malta and broke apart, but every soul reached shore on planks and debris. Paul spent three months on Malta, where he was bitten by a viper and healed the father of Publius, the island chief (Acts 28:3-8).",
        description: "The most famous shipwreck in the Bible. After 14 days adrift in the Euraquilo storm, the Alexandrian grain ship ran aground on a sandbar off Malta. All 276 passengers survived."
      }
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
  {
    id: "satellite",
    name: "Satellite",
    url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    attribution: '&copy; Google Maps',
  },
];
