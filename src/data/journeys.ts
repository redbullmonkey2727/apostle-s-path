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
      // Antioch → Cilician Gates → Derbe → Lystra → Iconium → Phrygia/Galatia → Troas → Samothrace → Neapolis → Philippi → Thessalonica → Berea → Athens → Corinth → Cenchreae → Ephesus → Caesarea → Jerusalem → Antioch
      [36.20, 36.16],   // Antioch
      [36.45, 35.95],
      [36.70, 35.65],
      [36.92, 35.32],   // approach Tarsus
      [36.95, 34.90],   // Tarsus
      [37.10, 34.65],
      [37.30, 34.45],   // Cilician Gates pass
      [37.50, 34.10],
      [37.70, 33.70],
      [37.85, 33.20],
      [37.90, 32.85],
      [37.87, 32.49],   // Derbe
      [38.05, 32.20],
      [38.20, 32.05],
      [38.35, 31.87],   // Lystra (Timothy joins)
      [38.10, 31.50],
      [37.90, 31.30],
      [37.73, 31.15],   // Iconium
      [37.95, 30.80],
      [38.20, 30.50],
      [38.55, 30.25],
      [38.95, 30.15],   // Phrygia
      [39.30, 30.20],
      [39.65, 30.45],
      [39.90, 30.10],
      [40.05, 29.65],
      [40.10, 29.20],
      [40.15, 28.70],
      [40.18, 28.10],
      [40.19, 27.55],
      [40.19, 27.00],
      [40.05, 26.40],
      [39.96, 26.16],   // Troas (vision)
      [40.20, 25.90],
      [40.45, 25.55],
      [40.50, 25.52],   // Samothrace (overnight)
      [40.70, 25.20],
      [40.85, 24.85],
      [40.94, 24.41],   // Neapolis (port)
      [41.01, 24.29],   // Philippi
      [40.95, 23.95],
      [40.80, 23.55],
      [40.64, 22.94],   // Thessalonica
      [40.55, 22.75],
      [40.45, 22.55],
      [40.31, 22.39],   // Berea
      [40.05, 22.55],   // sail south
      [39.65, 22.75],
      [39.20, 23.00],
      [38.75, 23.20],
      [38.30, 23.45],
      [38.05, 23.60],
      [37.97, 23.72],   // Athens
      [37.93, 23.45],
      [37.90, 23.15],
      [37.91, 22.88],   // Corinth (18 months)
      [37.88, 22.99],   // Cenchreae (port — Acts 18:18)
      [37.80, 23.40],
      [37.65, 24.10],
      [37.65, 24.90],
      [37.75, 25.70],
      [37.85, 26.50],
      [37.94, 27.34],   // Ephesus (brief)
      [37.55, 27.70],
      [37.05, 28.30],
      [36.50, 29.10],
      [35.95, 30.05],
      [35.40, 31.10],
      [34.85, 32.20],
      [34.20, 33.10],
      [33.55, 33.85],
      [32.95, 34.50],
      [32.53, 34.89],   // Caesarea
      [32.05, 35.05],
      [31.77, 35.21],   // Jerusalem (greet church)
      [32.05, 35.05],
      [32.55, 35.30],
      [33.20, 35.65],
      [33.95, 35.85],
      [34.70, 36.00],
      [35.40, 36.10],
      [35.90, 36.15],
      [36.20, 36.16],   // Antioch
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
      // Antioch → Tarsus → Cilician Gates → Galatia/Phrygia overland → Ephesus (2.5 yrs) → Macedonia → Corinth → return via Macedonia → Troas → Assos → Mitylene → Chios → Samos → Miletus → Cos → Rhodes → Patara → Tyre → Ptolemais → Caesarea → Jerusalem
      [36.20, 36.16],   // Antioch
      [36.45, 35.90],
      [36.70, 35.55],
      [36.95, 34.90],   // Tarsus
      [37.15, 34.65],
      [37.30, 34.45],   // Cilician Gates
      [37.55, 34.10],
      [37.80, 33.65],
      [37.95, 33.15],
      [37.95, 32.65],
      [37.87, 32.49],   // Derbe area
      [38.10, 32.10],
      [38.35, 31.87],   // Lystra
      [38.10, 31.50],
      [37.85, 31.30],
      [37.73, 31.15],   // Iconium
      [37.95, 30.85],
      [38.20, 30.55],
      [38.55, 30.30],
      [38.85, 30.05],   // Phrygia
      [39.10, 29.65],
      [39.20, 29.10],
      [39.10, 28.50],
      [38.85, 28.00],
      [38.55, 27.65],
      [38.25, 27.50],
      [37.94, 27.34],   // Ephesus (~2.5 years)
      // To Macedonia & Greece (north overland through Asia, then sail)
      [38.20, 27.20],
      [38.55, 27.00],
      [38.95, 26.85],
      [39.40, 26.75],
      [39.85, 26.50],
      [40.19, 26.40],
      [40.05, 26.40],
      [39.96, 26.16],   // Troas (first visit)
      [40.20, 25.85],
      [40.50, 25.40],
      [40.75, 24.90],
      [40.94, 24.41],   // Neapolis
      [41.01, 24.29],   // Philippi
      [40.85, 23.85],
      [40.64, 22.94],   // Thessalonica
      [40.50, 22.70],
      [40.31, 22.39],   // Berea
      [39.85, 22.55],
      [39.30, 22.85],
      [38.70, 23.10],
      [38.20, 23.45],
      [37.97, 23.72],   // Athens (passing)
      [37.92, 23.30],
      [37.91, 22.88],   // Corinth (3 months)
      // Return north overland (plot against him forced overland route — Acts 20:3)
      [38.20, 23.10],
      [38.75, 22.90],
      [39.30, 22.75],
      [39.85, 22.50],
      [40.31, 22.39],   // Berea (return)
      [40.55, 22.75],
      [40.64, 22.94],   // Thessalonica (return)
      [40.85, 23.85],
      [41.01, 24.29],   // Philippi (Passover)
      // Coastal voyage southward
      [40.85, 24.65],
      [40.55, 25.30],
      [40.30, 25.85],
      [39.96, 26.16],   // Troas (Eutychus raised)
      [39.65, 26.30],
      [39.35, 26.40],
      [39.10, 26.55],   // Assos
      [38.95, 26.45],
      [38.90, 26.35],   // Mitylene (Lesbos)
      [38.65, 26.25],
      [38.40, 26.15],   // Chios
      [38.05, 26.50],
      [37.85, 26.85],
      [37.75, 27.09],   // Miletus (farewell to Ephesian elders)
      [37.45, 27.25],
      [37.10, 27.40],
      [36.85, 27.30],   // Cos
      [36.60, 27.65],
      [36.45, 28.00],
      [36.45, 28.22],   // Rhodes
      [36.30, 28.65],
      [36.20, 29.20],
      [36.18, 29.64],   // Patara
      [35.95, 30.20],
      [35.65, 30.95],
      [35.30, 31.65],
      [34.95, 32.30],
      [34.70, 32.85],
      [34.68, 33.04],   // Tyre (7 days)
      [34.30, 33.55],
      [33.85, 34.10],
      [33.30, 34.65],
      [32.82, 34.99],   // Ptolemais
      [32.65, 34.95],
      [32.53, 34.89],   // Caesarea (Philip's house)
      [32.30, 34.95],
      [32.05, 35.05],
      [31.90, 35.15],
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
    travelNote: "Paul sailed as a prisoner under centurion Julius (Acts 27:1). From Caesarea to Sidon, then sheltered behind the lee (north) side of Cyprus due to contrary winds (Acts 27:4), passing Cilicia and Pamphylia to Myra of Lycia. Transferred to an Alexandrian grain ship; struggled past Cnidus, sailed under the lee of Crete to Fair Havens, then was caught by the Euraquilo for 14 days (Acts 27:27) and wrecked on Malta. After 3 months, sailed on the Castor & Pollux to Syracuse and Rhegium, landed at Puteoli, and walked the Appian Way via Forum of Appius and Three Taverns to Rome.",
    path: [
      // Caesarea → Sidon → north of Cyprus (lee side, Acts 27:4) → coast of Cilicia/Pamphylia → Myra → Cnidus → south of Crete (Salmone, Fair Havens) → Euraquilo storm → Malta → Syracuse → Rhegium → Puteoli → Forum of Appius → Three Taverns → Rome
      [32.53, 34.89],   // Caesarea (departure)
      [32.85, 35.05],
      [33.20, 35.20],
      [33.56, 35.37],   // Sidon (Acts 27:3)
      [33.95, 35.35],
      [34.40, 35.30],
      [34.85, 35.20],
      [35.20, 34.90],   // approach Cyprus
      [35.40, 34.50],   // skirt north (lee) side of Cyprus
      [35.55, 34.00],
      [35.65, 33.40],
      [35.70, 32.80],
      [35.85, 32.20],
      [36.00, 31.55],
      [36.05, 30.85],
      [36.10, 30.30],
      [36.14, 29.98],
      [36.26, 29.99],   // Myra of Lycia (transfer to Alexandrian grain ship — Acts 27:5-6)
      [36.20, 29.40],
      [36.10, 28.85],
      [35.95, 28.30],
      [35.75, 27.80],
      [35.55, 27.40],
      [35.40, 27.05],
      [36.69, 27.38],   // Cnidus (with difficulty — Acts 27:7)
      [35.65, 26.55],
      [35.45, 26.30],
      [35.30, 26.20],   // Salmone (east cape of Crete)
      [35.15, 25.65],
      [35.05, 25.10],
      [34.95, 24.70],
      [34.92, 24.50],
      [34.90, 24.45],   // Fair Havens (near Lasea — Acts 27:8)
      [34.95, 24.20],
      [35.00, 23.85],
      [35.05, 23.40],   // departing toward Phoenix
      // Euraquilo storm — driven southwest, then west, then west-northwest past Cauda
      [34.85, 23.95],
      [34.55, 24.10],   // Cauda (Clauda — Acts 27:16)
      [34.70, 23.50],
      [34.95, 22.70],
      [35.20, 21.80],
      [35.40, 20.80],
      [35.55, 19.70],
      [35.65, 18.50],
      [35.75, 17.30],
      [35.82, 16.20],
      [35.88, 15.20],
      [35.90, 14.65],
      [35.90, 14.42],   // Malta — wreck at St. Paul's Bay (3 months)
      // Spring sailing on the Castor & Pollux (Acts 28:11)
      [36.10, 14.50],
      [36.45, 14.75],
      [36.80, 15.05],
      [37.07, 15.29],   // Syracuse (3 days — Acts 28:12)
      [37.40, 15.40],
      [37.75, 15.55],
      [38.10, 15.65],   // Rhegium (Acts 28:13)
      [38.40, 15.55],
      [38.80, 15.30],
      [39.20, 15.05],
      [39.65, 14.80],
      [40.10, 14.55],
      [40.50, 14.40],
      [40.75, 14.30],
      [40.83, 14.12],   // Puteoli (Pozzuoli — landed; Acts 28:13)
      [40.95, 14.05],
      [41.10, 13.85],
      [41.25, 13.65],
      [41.42, 13.35],   // Forum of Appius (Acts 28:15)
      [41.55, 13.05],
      [41.65, 12.85],
      [41.72, 12.75],   // Three Taverns (Acts 28:15)
      [41.80, 12.65],
      [41.88, 12.55],
      [41.90, 12.50],   // Rome (Acts 28:16)
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
