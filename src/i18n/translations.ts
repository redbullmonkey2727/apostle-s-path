export type UILanguage = "en" | "es" | "fr" | "pt" | "sv" | "no";

export const languageLabels: Record<UILanguage, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  pt: "Português",
  sv: "Svenska",
  no: "Norsk",
};

// All translatable UI strings
export interface TranslationStrings {
  // Header
  siteTitle: string;
  siteSubtitle: string;
  bibleListLink: string;

  // Welcome overlay
  welcomeTitle: string;
  welcomeBody: string;
  howToExplore: string;
  clickCityDot: string;
  searchTopics: string;
  guidedTourDesc: string;
  shortcutsDesc: string;
  startExploring: string;
  takeTheTour: string;

  // Journey Legend / Sidebar
  apostolicJourneys: string;
  toggleToShowHide: string;
  guidedTour: string;
  searchPlaceholder: string;
  filterByTopic: string;
  allTopics: string;
  mapStyle: string;
  writersAndMarkers: string;
  dotSizeReflects: string;
  journeyRoutes: string;
  traveled: string;
  showIntroduction: string;

  // Scripture Progress
  scripturesExplored: string;
  explored: string;

  // Timeline
  timeline: string;
  epistles: string;
  historicalEvents: string;

  // City Detail Panel
  map: string;
  kjv: string;
  nrsv: string;
  application: string;
  noCommentary: string;
  noScripturesMatch: string;
  readOnChurch: string;
  removeBookmark: string;
  bookmarkScripture: string;
  summer: string;
  winter: string;
  fromAntioch: string;

  // Guided Tour
  viewScriptures: string;

  // PaulMap
  loadingMap: string;
  hidePanel: string;
  menu: string;
  pdf: string;
  linkCopied: string;
  shareWithFriends: string;
  downloadPdf: string;
  searchMobile: string;
}

const en: TranslationStrings = {
  siteTitle: "The New Testament World: Apostles, Epistles & Journeys",
  siteSubtitle: "Deep dive into the circumstances of the New Testament References that Point to the Restored Church of Jesus Christ.",
  bibleListLink: "Bible List with all included References for further reading ↗",

  welcomeTitle: "The New Testament World",
  welcomeBody: "Welcome to an interactive map of the Apostles' journeys — tracing when and under what circumstances they wrote doctrine pointing to the Restored Church of Jesus Christ. My intent was to allow students of the Bible to see a closer, more intimate view into how difficult and special the circumstances were that the young apostles faced as they attempted to record doctrines and build up the Church of God (Acts 15:4-23, 39; 2 Cor 11:25-33). Their words, written amid affliction and revelation, carry great relevance today. Try switching between map styles (street, terrain, satellite) in the layer control — each view highlights different details of the ancient world.",
  howToExplore: "How to explore",
  clickCityDot: "Click a city dot to see its epistles, scriptures, and commentary",
  searchTopics: "Search topics like \"Godhead\" or \"Priesthood\" for a full scripture list",
  guidedTourDesc: "Guided Tour walks you through Paul's journeys step by step",
  shortcutsDesc: "Shortcuts: ← → cities, T tour, D dark mode, Esc close",
  startExploring: "Start Exploring",
  takeTheTour: "Take the Tour",

  apostolicJourneys: "Apostolic Journeys",
  toggleToShowHide: "Toggle to show/hide routes",
  guidedTour: "Guided Tour",
  searchPlaceholder: "Search cities, doctrinal topics, or writers…",
  filterByTopic: "Filter by Topic",
  allTopics: "All Topics",
  mapStyle: "Map Style",
  writersAndMarkers: "Writers & Marker Colors",
  dotSizeReflects: "Dot size reflects scripture count",
  journeyRoutes: "Journey Routes",
  traveled: "traveled",
  showIntroduction: "Show Introduction",

  scripturesExplored: "Scriptures Explored",
  explored: "explored",

  timeline: "Timeline",
  epistles: "Epistles",
  historicalEvents: "Historical Events",

  map: "Map",
  kjv: "KJV",
  nrsv: "NRSV (2021)",
  application: "Application",
  noCommentary: "No commentary available.",
  noScripturesMatch: "No scriptures match the selected topic.",
  readOnChurch: "Read on ChurchofJesusChrist.org",
  removeBookmark: "Remove bookmark",
  bookmarkScripture: "Bookmark this scripture",
  summer: "Summer",
  winter: "Winter",
  fromAntioch: "from Antioch",

  viewScriptures: "View {count} scripture{s}",

  loadingMap: "Loading map…",
  hidePanel: "Hide Panel",
  menu: "Menu",
  pdf: "PDF",
  linkCopied: "📋 Link copied!",
  shareWithFriends: "Share with Friends",
  downloadPdf: "Download scripture PDF",
  searchMobile: "Search topics, cities, writers…",
};

const es: TranslationStrings = {
  siteTitle: "El Mundo del Nuevo Testamento: Apóstoles, Epístolas y Viajes",
  siteSubtitle: "Una inmersión profunda en las circunstancias de las referencias del Nuevo Testamento que apuntan a la Iglesia Restaurada de Jesucristo.",
  bibleListLink: "Lista bíblica con todas las referencias incluidas para lectura adicional ↗",

  welcomeTitle: "El Mundo del Nuevo Testamento",
  welcomeBody: "Bienvenido a un mapa interactivo de los viajes de los Apóstoles, que traza cuándo y bajo qué circunstancias escribieron doctrina que apunta a la Iglesia Restaurada de Jesucristo. Mi intención fue permitir que los estudiantes de la Biblia vean una visión más cercana e íntima de cuán difíciles y especiales fueron las circunstancias que enfrentaron los jóvenes apóstoles mientras intentaban registrar doctrinas y edificar la Iglesia de Dios (Hechos 15:4-23, 39; 2 Cor 11:25-33). Sus palabras, escritas en medio de la aflicción y la revelación, tienen gran relevancia hoy. Pruebe cambiar entre estilos de mapa (calle, terreno, satélite) en el control de capas — cada vista resalta diferentes detalles del mundo antiguo.",
  howToExplore: "Cómo explorar",
  clickCityDot: "Haga clic en un punto de ciudad para ver sus epístolas, escrituras y comentarios",
  searchTopics: "Busque temas como \"Deidad\" o \"Sacerdocio\" para una lista completa de escrituras",
  guidedTourDesc: "La Visita Guiada le lleva por los viajes de Pablo paso a paso",
  shortcutsDesc: "Atajos: ← → ciudades, T visita, D modo oscuro, Esc cerrar",
  startExploring: "Comenzar a Explorar",
  takeTheTour: "Hacer la Visita",

  apostolicJourneys: "Viajes Apostólicos",
  toggleToShowHide: "Activar para mostrar/ocultar rutas",
  guidedTour: "Visita Guiada",
  searchPlaceholder: "Buscar ciudades, temas doctrinales o escritores…",
  filterByTopic: "Filtrar por Tema",
  allTopics: "Todos los Temas",
  mapStyle: "Estilo de Mapa",
  writersAndMarkers: "Escritores y Colores de Marcador",
  dotSizeReflects: "El tamaño del punto refleja la cantidad de escrituras",
  journeyRoutes: "Rutas de Viaje",
  traveled: "recorridos",
  showIntroduction: "Mostrar Introducción",

  scripturesExplored: "Escrituras Exploradas",
  explored: "explorado",

  timeline: "Línea de Tiempo",
  epistles: "Epístolas",
  historicalEvents: "Eventos Históricos",

  map: "Mapa",
  kjv: "KJV",
  nrsv: "NRSV (2021)",
  application: "Aplicación",
  noCommentary: "Sin comentario disponible.",
  noScripturesMatch: "Ninguna escritura coincide con el tema seleccionado.",
  readOnChurch: "Leer en ChurchofJesusChrist.org",
  removeBookmark: "Eliminar marcador",
  bookmarkScripture: "Marcar esta escritura",
  summer: "Verano",
  winter: "Invierno",
  fromAntioch: "desde Antioquía",

  viewScriptures: "Ver {count} escritura{s}",

  loadingMap: "Cargando mapa…",
  hidePanel: "Ocultar Panel",
  menu: "Menú",
  pdf: "PDF",
  linkCopied: "📋 ¡Enlace copiado!",
  shareWithFriends: "Compartir con Amigos",
  downloadPdf: "Descargar PDF de escrituras",
  searchMobile: "Buscar temas, ciudades, escritores…",
};

const fr: TranslationStrings = {
  siteTitle: "Le Monde du Nouveau Testament : Apôtres, Épîtres et Voyages",
  siteSubtitle: "Plongée approfondie dans les circonstances des références du Nouveau Testament qui renvoient à l'Église Rétablie de Jésus-Christ.",
  bibleListLink: "Liste biblique avec toutes les références incluses pour approfondir ↗",

  welcomeTitle: "Le Monde du Nouveau Testament",
  welcomeBody: "Bienvenue sur une carte interactive des voyages des Apôtres — retraçant quand et dans quelles circonstances ils ont écrit la doctrine renvoyant à l'Église Rétablie de Jésus-Christ. Mon intention était de permettre aux étudiants de la Bible de voir de plus près les circonstances difficiles et spéciales auxquelles les jeunes apôtres ont été confrontés alors qu'ils tentaient d'enregistrer les doctrines et d'édifier l'Église de Dieu (Actes 15:4-23, 39 ; 2 Cor 11:25-33). Leurs paroles, écrites au milieu de l'affliction et de la révélation, ont une grande pertinence aujourd'hui. Essayez de changer les styles de carte (rue, terrain, satellite) dans le contrôle des couches — chaque vue met en évidence différents détails du monde antique.",
  howToExplore: "Comment explorer",
  clickCityDot: "Cliquez sur un point de ville pour voir ses épîtres, écritures et commentaires",
  searchTopics: "Recherchez des sujets comme « Divinité » ou « Prêtrise » pour une liste complète d'écritures",
  guidedTourDesc: "La Visite Guidée vous accompagne à travers les voyages de Paul étape par étape",
  shortcutsDesc: "Raccourcis : ← → villes, T visite, D mode sombre, Échap fermer",
  startExploring: "Commencer l'Exploration",
  takeTheTour: "Faire la Visite",

  apostolicJourneys: "Voyages Apostoliques",
  toggleToShowHide: "Activer pour afficher/masquer les itinéraires",
  guidedTour: "Visite Guidée",
  searchPlaceholder: "Rechercher villes, sujets doctrinaux ou écrivains…",
  filterByTopic: "Filtrer par Sujet",
  allTopics: "Tous les Sujets",
  mapStyle: "Style de Carte",
  writersAndMarkers: "Écrivains et Couleurs des Marqueurs",
  dotSizeReflects: "La taille du point reflète le nombre d'écritures",
  journeyRoutes: "Itinéraires de Voyage",
  traveled: "parcourus",
  showIntroduction: "Afficher l'Introduction",

  scripturesExplored: "Écritures Explorées",
  explored: "exploré",

  timeline: "Chronologie",
  epistles: "Épîtres",
  historicalEvents: "Événements Historiques",

  map: "Carte",
  kjv: "KJV",
  nrsv: "NRSV (2021)",
  application: "Application",
  noCommentary: "Aucun commentaire disponible.",
  noScripturesMatch: "Aucune écriture ne correspond au sujet sélectionné.",
  readOnChurch: "Lire sur ChurchofJesusChrist.org",
  removeBookmark: "Supprimer le signet",
  bookmarkScripture: "Marquer cette écriture",
  summer: "Été",
  winter: "Hiver",
  fromAntioch: "d'Antioche",

  viewScriptures: "Voir {count} écriture{s}",

  loadingMap: "Chargement de la carte…",
  hidePanel: "Masquer le Panneau",
  menu: "Menu",
  pdf: "PDF",
  linkCopied: "📋 Lien copié !",
  shareWithFriends: "Partager avec des Amis",
  downloadPdf: "Télécharger le PDF des écritures",
  searchMobile: "Rechercher sujets, villes, écrivains…",
};

const pt: TranslationStrings = {
  siteTitle: "O Mundo do Novo Testamento: Apóstolos, Epístolas e Viagens",
  siteSubtitle: "Um mergulho profundo nas circunstâncias das referências do Novo Testamento que apontam para a Igreja Restaurada de Jesus Cristo.",
  bibleListLink: "Lista bíblica com todas as referências incluídas para leitura adicional ↗",

  welcomeTitle: "O Mundo do Novo Testamento",
  welcomeBody: "Bem-vindo a um mapa interativo das viagens dos Apóstolos — rastreando quando e em que circunstâncias eles escreveram doutrina apontando para a Igreja Restaurada de Jesus Cristo. Minha intenção foi permitir que estudantes da Bíblia vejam uma visão mais próxima e íntima de quão difíceis e especiais foram as circunstâncias que os jovens apóstolos enfrentaram ao tentar registrar doutrinas e edificar a Igreja de Deus (Atos 15:4-23, 39; 2 Cor 11:25-33). Suas palavras, escritas em meio à aflição e revelação, têm grande relevância hoje. Experimente alternar entre estilos de mapa (rua, terreno, satélite) no controle de camadas — cada vista destaca diferentes detalhes do mundo antigo.",
  howToExplore: "Como explorar",
  clickCityDot: "Clique em um ponto de cidade para ver suas epístolas, escrituras e comentários",
  searchTopics: "Pesquise temas como \"Divindade\" ou \"Sacerdócio\" para uma lista completa de escrituras",
  guidedTourDesc: "O Tour Guiado leva você pelas viagens de Paulo passo a passo",
  shortcutsDesc: "Atalhos: ← → cidades, T tour, D modo escuro, Esc fechar",
  startExploring: "Começar a Explorar",
  takeTheTour: "Fazer o Tour",

  apostolicJourneys: "Viagens Apostólicas",
  toggleToShowHide: "Ativar para mostrar/ocultar rotas",
  guidedTour: "Tour Guiado",
  searchPlaceholder: "Pesquisar cidades, temas doutrinários ou escritores…",
  filterByTopic: "Filtrar por Tema",
  allTopics: "Todos os Temas",
  mapStyle: "Estilo do Mapa",
  writersAndMarkers: "Escritores e Cores dos Marcadores",
  dotSizeReflects: "O tamanho do ponto reflete a quantidade de escrituras",
  journeyRoutes: "Rotas de Viagem",
  traveled: "percorridos",
  showIntroduction: "Mostrar Introdução",

  scripturesExplored: "Escrituras Exploradas",
  explored: "explorado",

  timeline: "Linha do Tempo",
  epistles: "Epístolas",
  historicalEvents: "Eventos Históricos",

  map: "Mapa",
  kjv: "KJV",
  nrsv: "NRSV (2021)",
  application: "Aplicação",
  noCommentary: "Sem comentário disponível.",
  noScripturesMatch: "Nenhuma escritura corresponde ao tema selecionado.",
  readOnChurch: "Ler em ChurchofJesusChrist.org",
  removeBookmark: "Remover marcador",
  bookmarkScripture: "Marcar esta escritura",
  summer: "Verão",
  winter: "Inverno",
  fromAntioch: "de Antioquia",

  viewScriptures: "Ver {count} escritura{s}",

  loadingMap: "Carregando mapa…",
  hidePanel: "Ocultar Painel",
  menu: "Menu",
  pdf: "PDF",
  linkCopied: "📋 Link copiado!",
  shareWithFriends: "Compartilhar com Amigos",
  downloadPdf: "Baixar PDF de escrituras",
  searchMobile: "Pesquisar temas, cidades, escritores…",
};

const sv: TranslationStrings = {
  siteTitle: "Nya Testamentets Värld: Apostlar, Brev och Resor",
  siteSubtitle: "En djupdykning i omständigheterna kring Nya Testamentets referenser som pekar mot Jesu Kristi Återställda Kyrka.",
  bibleListLink: "Bibellista med alla inkluderade referenser för vidare läsning ↗",

  welcomeTitle: "Nya Testamentets Värld",
  welcomeBody: "Välkommen till en interaktiv karta över apostlarnas resor — som spårar när och under vilka omständigheter de skrev lära som pekar mot Jesu Kristi Återställda Kyrka. Min avsikt var att låta bibelstudenter se en närmare och mer intim bild av hur svåra och speciella omständigheterna var som de unga apostlarna mötte när de försökte nedteckna läror och bygga upp Guds kyrka (Apg 15:4-23, 39; 2 Kor 11:25-33). Deras ord, skrivna mitt i lidande och uppenbarelse, har stor relevans idag. Prova att byta mellan kartstilar (gata, terräng, satellit) i lagerkontrollen — varje vy lyfter fram olika detaljer i den antika världen.",
  howToExplore: "Hur man utforskar",
  clickCityDot: "Klicka på en stadspunkt för att se dess brev, skrifter och kommentarer",
  searchTopics: "Sök efter ämnen som \"Gudomen\" eller \"Prästadömet\" för en fullständig skriftlista",
  guidedTourDesc: "Den guidade turen leder dig genom Paulus resor steg för steg",
  shortcutsDesc: "Genvägar: ← → städer, T tur, D mörkt läge, Esc stäng",
  startExploring: "Börja Utforska",
  takeTheTour: "Gör Turen",

  apostolicJourneys: "Apostoliska Resor",
  toggleToShowHide: "Växla för att visa/dölja rutter",
  guidedTour: "Guidad Tur",
  searchPlaceholder: "Sök städer, doktrinfrågor eller författare…",
  filterByTopic: "Filtrera efter Ämne",
  allTopics: "Alla Ämnen",
  mapStyle: "Kartstil",
  writersAndMarkers: "Författare och Markörer",
  dotSizeReflects: "Punktens storlek återspeglar antalet skrifter",
  journeyRoutes: "Reserutter",
  traveled: "rest",
  showIntroduction: "Visa Introduktionen",

  scripturesExplored: "Utforskade Skrifter",
  explored: "utforskat",

  timeline: "Tidslinje",
  epistles: "Brev",
  historicalEvents: "Historiska Händelser",

  map: "Karta",
  kjv: "KJV",
  nrsv: "NRSV (2021)",
  application: "Tillämpning",
  noCommentary: "Ingen kommentar tillgänglig.",
  noScripturesMatch: "Inga skrifter matchar det valda ämnet.",
  readOnChurch: "Läs på ChurchofJesusChrist.org",
  removeBookmark: "Ta bort bokmärke",
  bookmarkScripture: "Bokmärk denna skrift",
  summer: "Sommar",
  winter: "Vinter",
  fromAntioch: "från Antiochia",

  viewScriptures: "Visa {count} skrift{s}er",

  loadingMap: "Laddar karta…",
  hidePanel: "Dölj Panel",
  menu: "Meny",
  pdf: "PDF",
  linkCopied: "📋 Länk kopierad!",
  shareWithFriends: "Dela med Vänner",
  downloadPdf: "Ladda ner PDF med skrifter",
  searchMobile: "Sök ämnen, städer, författare…",
};

const no: TranslationStrings = {
  siteTitle: "Det Nye Testamentets Verden: Apostler, Brev og Reiser",
  siteSubtitle: "Et dypdykk i omstendighetene rundt Det Nye Testamentets referanser som peker mot Jesu Kristi Gjengitte Kirke.",
  bibleListLink: "Bibelliste med alle inkluderte referanser for videre lesing ↗",

  welcomeTitle: "Det Nye Testamentets Verden",
  welcomeBody: "Velkommen til et interaktivt kart over apostlenes reiser — som sporer når og under hvilke omstendigheter de skrev lære som peker mot Jesu Kristi Gjengitte Kirke. Min hensikt var å la bibelstudenter se et nærmere og mer intimt innblikk i hvor vanskelige og spesielle omstendighetene var som de unge apostlene møtte da de forsøkte å nedtegne læresetninger og bygge opp Guds kirke (Apg 15:4-23, 39; 2 Kor 11:25-33). Deres ord, skrevet midt i lidelse og åpenbaring, har stor relevans i dag. Prøv å bytte mellom kartstiler (gate, terreng, satellitt) i lagkontrollen — hver visning fremhever ulike detaljer i den antikke verden.",
  howToExplore: "Hvordan utforske",
  clickCityDot: "Klikk på en bypunkt for å se dens brev, skrifter og kommentarer",
  searchTopics: "Søk etter emner som \"Guddommen\" eller \"Prestedømmet\" for en fullstendig skriftliste",
  guidedTourDesc: "Den guidede turen leder deg gjennom Paulus' reiser steg for steg",
  shortcutsDesc: "Snarveier: ← → byer, T tur, D mørk modus, Esc lukk",
  startExploring: "Begynn å Utforske",
  takeTheTour: "Ta Turen",

  apostolicJourneys: "Apostoliske Reiser",
  toggleToShowHide: "Veksle for å vise/skjule ruter",
  guidedTour: "Guidet Tur",
  searchPlaceholder: "Søk byer, læreanliggender eller forfattere…",
  filterByTopic: "Filtrer etter Emne",
  allTopics: "Alle Emner",
  mapStyle: "Kartstil",
  writersAndMarkers: "Forfattere og Markører",
  dotSizeReflects: "Punktstørrelsen gjenspeiler antall skrifter",
  journeyRoutes: "Reiseruter",
  traveled: "reist",
  showIntroduction: "Vis Introduksjonen",

  scripturesExplored: "Utforskede Skrifter",
  explored: "utforsket",

  timeline: "Tidslinje",
  epistles: "Brev",
  historicalEvents: "Historiske Hendelser",

  map: "Kart",
  kjv: "KJV",
  nrsv: "NRSV (2021)",
  application: "Anvendelse",
  noCommentary: "Ingen kommentar tilgjengelig.",
  noScripturesMatch: "Ingen skrifter samsvarer med det valgte emnet.",
  readOnChurch: "Les på ChurchofJesusChrist.org",
  removeBookmark: "Fjern bokmerke",
  bookmarkScripture: "Bokmerk denne skriften",
  summer: "Sommer",
  winter: "Vinter",
  fromAntioch: "fra Antiokia",

  viewScriptures: "Vis {count} skrift{s}er",

  loadingMap: "Laster kart…",
  hidePanel: "Skjul Panel",
  menu: "Meny",
  pdf: "PDF",
  linkCopied: "📋 Lenke kopiert!",
  shareWithFriends: "Del med Venner",
  downloadPdf: "Last ned PDF med skrifter",
  searchMobile: "Søk emner, byer, forfattere…",
};

export const translations: Record<UILanguage, TranslationStrings> = { en, es, fr, pt, sv, no };
