export interface HistoricalEvent {
  id: string;
  name: string;
  year: number;
  location: string;
  description: string;
}

export const historicalEvents: HistoricalEvent[] = [
  {
    id: "crucifixion",
    name: "Crucifixion & Resurrection of Jesus",
    year: 33,
    location: "Jerusalem",
    description: "Jesus Christ crucified under Pontius Pilate, rose on the third day. The central event of Christianity.",
  },
  {
    id: "pentecost",
    name: "Day of Pentecost",
    year: 33,
    location: "Jerusalem",
    description: "The Holy Spirit descends on the apostles; Peter preaches and 3,000 are baptized (Acts 2).",
  },
  {
    id: "stephen-martyred",
    name: "Stoning of Stephen",
    year: 34,
    location: "Jerusalem",
    description: "Stephen becomes the first Christian martyr, stoned outside the city. Saul (Paul) witnesses and approves (Acts 7:58–60).",
  },
  {
    id: "paul-conversion",
    name: "Conversion of Saul/Paul",
    year: 35,
    location: "Damascus",
    description: "Saul encounters the risen Christ on the road to Damascus and is converted (Acts 9:1–19).",
  },
  {
    id: "herod-agrippa-death",
    name: "Death of Herod Agrippa I",
    year: 44,
    location: "Caesarea",
    description: "Herod Agrippa I, who executed James the brother of John, dies suddenly at Caesarea (Acts 12:21–23).",
  },
  {
    id: "claudius-edict",
    name: "Claudius Expels Jews from Rome",
    year: 49,
    location: "Rome",
    description: "Emperor Claudius orders all Jews to leave Rome (Acts 18:2). Aquila and Priscilla relocate to Corinth.",
  },
  {
    id: "jerusalem-council",
    name: "Council of Jerusalem",
    year: 49,
    location: "Jerusalem",
    description: "Apostles and elders convene to decide whether Gentile converts must follow the Law of Moses (Acts 15).",
  },
  {
    id: "gallio-tribunal",
    name: "Paul Before Gallio at Corinth",
    year: 51,
    location: "Corinth",
    description: "Roman proconsul Gallio dismisses charges against Paul, establishing a key chronological anchor for Paul's ministry (Acts 18:12–17).",
  },
  {
    id: "artemis-riot",
    name: "Riot of the Silversmiths at Ephesus",
    year: 55,
    location: "Ephesus",
    description: "Demetrius incites a mob crying 'Great is Artemis of the Ephesians!' against Paul's missionary work (Acts 19:23–41).",
  },
  {
    id: "nero-fire",
    name: "Great Fire of Rome",
    year: 64,
    location: "Rome",
    description: "A devastating fire burns much of Rome for six days. Emperor Nero blames and persecutes Christians.",
  },
  {
    id: "james-martyred",
    name: "Martyrdom of James the Just",
    year: 62,
    location: "Jerusalem",
    description: "James, the Lord's brother and leader of the Jerusalem church, is thrown from the Temple and stoned (Josephus, Antiquities 20.9).",
  },
  {
    id: "paul-martyred",
    name: "Martyrdom of Paul",
    year: 67,
    location: "Rome",
    description: "Paul is traditionally believed to have been beheaded in Rome under Nero's persecution.",
  },
  {
    id: "peter-martyred",
    name: "Martyrdom of Peter",
    year: 67,
    location: "Rome",
    description: "Peter is traditionally believed to have been crucified upside down in Rome under Nero.",
  },
  {
    id: "temple-destroyed",
    name: "Destruction of the Jerusalem Temple",
    year: 70,
    location: "Jerusalem",
    description: "Roman legions under Titus destroy the Second Temple, ending Jewish temple worship. Fulfills Jesus's prophecy (Matt 24:2).",
  },
  {
    id: "vesuvius",
    name: "Eruption of Mount Vesuvius",
    year: 79,
    location: "Pompeii / Bay of Naples",
    description: "Vesuvius erupts, burying Pompeii and Herculaneum. The Roman world near Paul's travel routes is profoundly affected.",
  },
  {
    id: "domitian-persecution",
    name: "Domitian's Persecution of Christians",
    year: 95,
    location: "Rome / Patmos",
    description: "Emperor Domitian intensifies persecution of Christians. John the Revelator is exiled to the island of Patmos.",
  },
];
