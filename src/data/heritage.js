// src/data/heritage.js
// ─── Single source of truth for all heritage site data ───────────────────────
//
// LOCAL IMAGE PATHS (public/images/):
//   /images/ajanta-caves.png        (2.7 MB, original: "ajanta caves.png")
//   /images/ellora-caves.png        (5.9 MB, original: "ellora caves.png")
//   /images/elephanta-caves.png     (2.1 MB, original: "elephanta caves.png")
//   /images/gateway-of-india.png    (1.4 MB, original: "gate way of india.png")
//   /images/hampi.png               (2.4 MB, original: "hampi.png")
//   /images/konark.png              (4.2 MB, original: "konark.png")
//   /images/sanchi.png              (3.9 MB, original: "sanchi.png")
//   /images/taj-mahal.png           (14 MB,  original: "taj mehel.png")
//
// IMAGE ATTRIBUTION NOTE:
//   The provenance of the eight local PNG files cannot be established from
//   the files themselves. Their sources and licences are unknown. They should
//   not be assumed to be freely reusable. If publishing this website, replace
//   with images whose licences have been verified, or obtain permission from
//   the original photographers.
//
// LOCAL 3D MODEL PATHS (public/models/):
//   /models/ajanta.glb
//   /models/ellora.glb
//   /models/elephanta.glb
//   /models/gateway-of-india.glb
//   /models/konark.glb
//   /models/taj-mahal.glb
//   /models/Hampi.glb
//   /models/Sanchi.glb
//
// HERITAGE INFORMATION SOURCES:
//   UNESCO World Heritage Centre — whc.unesco.org
//   Archaeological Survey of India — asi.nic.in
//   Wikipedia (background research only; facts cross-checked)
//   Encyclopaedia Britannica (cross-reference)
// ─────────────────────────────────────────────────────────────────────────────

export const heritageSites = [
  // ── 1. AJANTA CAVES ────────────────────────────────────────────────────────
  {
    id: 'ajanta',
    name: 'Ajanta Caves',
    alternateName: null,
    shortName: 'AJANTA',

    // Location
    location: 'Aurangabad, Maharashtra',
    city: 'Ajanta village',
    district: 'Aurangabad (now Chhatrapati Sambhajinagar)',
    state: 'Maharashtra',
    country: 'India',
    coordinates: { lat: 20.5519, lng: 75.7033 },

    // Categorisation
    type: 'Buddhist Heritage',
    category: 'ancient-caves',

    // Periods
    period: '2nd century BCE – 6th century CE',
    periodShort: '200 BCE – 600 CE',
    constructionDates: 'c. 2nd century BCE (Phase I); c. 5th–6th century CE (Phase II)',

    // Heritage status
    heritage: 'UNESCO World Heritage Site',
    unescoStatus: 'Inscribed',
    unescoInscriptionYear: 1983,
    protectionStatus: 'Centrally Protected Monument (Archaeological Survey of India)',

    // Descriptions
    description:
      'Thirty rock-cut Buddhist cave monuments containing some of the finest surviving examples of ancient Indian art, depicting the life of Buddha through stunning murals and sculptures.',
    shortDesc: 'Ancient Buddhist caves with extraordinary murals and sculptures carved into volcanic rock.',
    historicalBackground:
      'The Ajanta Caves were excavated in two main phases. The earliest caves (Phase I) date to the Satavahana period, around the 2nd–1st century BCE. After a period of apparent abandonment, work resumed under the patronage of the Vakataka king Harishena during the 5th–6th century CE (Phase II), when most of the painted caves were created. The caves were forgotten by the outside world after the fall of the Vakataka dynasty and were rediscovered in 1819 by a British officer, John Smith, during a tiger hunt.',
    architecture:
      'The 30 caves are carved into the horseshoe-shaped basalt cliff of the Waghora river gorge. They consist of two types: chaityas (prayer halls with a stupa) and viharas (monasteries). The interior walls and ceilings of many viharas are covered in tempera paintings depicting Jataka tales (stories of the Buddha\'s previous lives), courtly scenes, and animals. The paintings are considered the finest surviving examples of ancient Indian art.',
    culturalSignificance:
      'Ajanta represents the apex of Buddhist artistic expression in India. Its paintings influenced art traditions across Asia, including the Buddhist art of Sri Lanka, Central Asia, China, and Japan. The caves are a UNESCO World Heritage Site inscribed for their "outstanding universal value" as a masterpiece of Buddhist religious art.',

    // Quick facts
    quickFacts: [
      { label: 'Total caves', value: '30' },
      { label: 'Painted caves', value: 'Approx. 16' },
      { label: 'UNESCO inscription', value: '1983' },
      { label: 'Rediscovered', value: '1819 by John Smith' },
      { label: 'Rock type', value: 'Basalt (Deccan Trap)' },
      { label: 'River', value: 'Waghora river gorge' },
    ],

    // Images — local files (provenance unknown; see header note)
    imagePath: '/images/ajanta-caves.png',
    image: '/images/ajanta-caves.png',
    heroImage: '/images/ajanta-caves.png',
    imageAlt: 'Rock-cut cave entrance at Ajanta Caves, Maharashtra, showing ornate carved façade',
    imageAttribution: {
      source: 'Local file (original: "ajanta caves.png")',
      license: 'Unknown — provenance not established',
      note: 'Original photographer and licence not identifiable from file metadata.',
    },

    // 3D model
    modelPath: '/models/ajanta.glb',

    // Map
    mapX: 38, mapY: 52,

    // Tags & facts
    tags: ['Buddhist', 'Rock-cut', 'Paintings', 'UNESCO', '2nd BCE'],
    facts: ['30 cave monuments', 'UNESCO World Heritage since 1983', 'Rediscovered in 1819'],

    // Sources
    sources: [
      { label: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/en/list/242' },
      { label: 'Archaeological Survey of India', url: 'https://asi.nic.in/ajanta-caves/' },
    ],
  },

  // ── 2. ELLORA CAVES ────────────────────────────────────────────────────────
  {
    id: 'ellora',
    name: 'Ellora Caves',
    alternateName: 'Elapura',
    shortName: 'ELLORA',

    location: 'Aurangabad, Maharashtra',
    city: 'Ellora (Verul)',
    district: 'Aurangabad (now Chhatrapati Sambhajinagar)',
    state: 'Maharashtra',
    country: 'India',
    coordinates: { lat: 20.0258, lng: 75.178 },

    type: 'Multi-Religious Heritage',
    category: 'ancient-caves',

    period: '6th – 11th century CE',
    periodShort: '600 – 1000 CE',
    constructionDates: 'c. 6th–11th century CE',

    heritage: 'UNESCO World Heritage Site',
    unescoStatus: 'Inscribed',
    unescoInscriptionYear: 1983,
    protectionStatus: 'Centrally Protected Monument (ASI)',

    description:
      'A spectacular complex of 34 rock-cut temples and monasteries representing Buddhist, Hindu, and Jain faiths, with the Kailasa Temple being one of the largest single rock excavations in the world.',
    shortDesc: 'Monumental rock-cut temples of three faiths — Buddhist, Hindu, and Jain — in a single magnificent complex.',
    historicalBackground:
      'Ellora was carved over several centuries, beginning around the 6th century CE. The Buddhist caves (caves 1–12) were created first, followed by the Hindu caves (caves 13–29) during the Rashtrakuta and Chalukya periods. The Jain caves (caves 30–34) were added last, during the 9th–11th centuries. The entire complex represents a remarkable period of religious coexistence. The Kailasa Temple (Cave 16), commissioned by the Rashtrakuta king Krishna I (c. 756–773 CE), is considered the greatest achievement—carved top to bottom from a single basalt cliff, it is one of the largest rock-cut structures in the world.',
    architecture:
      'Ellora spans Buddhist viharas, Hindu temples, and Jain shrines, all carved from the volcanic basalt of the Charanandri range. The Kailasa Temple (Cave 16) is modelled on Mount Kailash, the abode of Shiva, and is adorned with elaborate relief panels depicting scenes from Hindu mythology. The workmanship required the removal of approximately 200,000 tonnes of rock.',
    culturalSignificance:
      'Ellora is one of the largest rock-cut monastic and temple complexes anywhere in the world. It embodies the spirit of religious pluralism that characterised medieval India. The UNESCO citation highlights it as "one of the greatest achievements of ancient Indian civilization."',

    quickFacts: [
      { label: 'Total caves', value: '34' },
      { label: 'Buddhist caves', value: '12 (Caves 1–12)' },
      { label: 'Hindu caves', value: '17 (Caves 13–29)' },
      { label: 'Jain caves', value: '5 (Caves 30–34)' },
      { label: 'UNESCO inscription', value: '1983' },
      { label: 'Kailasa Temple patron', value: 'King Krishna I (Rashtrakuta, c. 756 CE)' },
    ],

    imagePath: '/images/ellora-caves.png',
    image: '/images/ellora-caves.png',
    heroImage: '/images/ellora-caves.png',
    imageAlt: 'The monumental Kailasa Temple at Ellora Caves, carved from a single basalt cliff',
    imageAttribution: {
      source: 'Local file (original: "ellora caves.png")',
      license: 'Unknown — provenance not established',
      note: 'Original photographer and licence not identifiable from file metadata.',
    },

    modelPath: '/models/ellora.glb',

    mapX: 36, mapY: 53,
    tags: ['Hindu', 'Buddhist', 'Jain', 'Rock-cut', 'UNESCO'],
    facts: ['34 monasteries and temples', 'Kailasa Temple is one of the largest rock-cut structures', 'UNESCO World Heritage since 1983'],

    sources: [
      { label: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/en/list/243' },
      { label: 'Archaeological Survey of India', url: 'https://asi.nic.in/ellora-caves/' },
    ],
  },

  // ── 3. ELEPHANTA CAVES ─────────────────────────────────────────────────────
  {
    id: 'elephanta',
    name: 'Elephanta Caves',
    alternateName: 'Gharapuri Island Caves',
    shortName: 'ELEPHANTA',

    location: 'Mumbai Harbour, Maharashtra',
    city: 'Gharapuri Island',
    district: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    coordinates: { lat: 18.9633, lng: 72.9315 },

    type: 'Hindu Heritage',
    category: 'ancient-caves',

    period: '5th – 8th century CE',
    periodShort: '500 – 800 CE',
    constructionDates: 'c. 5th–8th century CE (principal cave likely 6th century CE)',

    heritage: 'UNESCO World Heritage Site',
    unescoStatus: 'Inscribed',
    unescoInscriptionYear: 1987,
    protectionStatus: 'Centrally Protected Monument (ASI)',

    description:
      'A collection of cave temples on Elephanta Island dedicated to the Hindu god Shiva, featuring the iconic Trimurti — the three-faced Shiva representing creation, preservation, and destruction.',
    shortDesc: 'Island cave temples featuring the monumental Trimurti of Lord Shiva, rising six metres from solid rock.',
    historicalBackground:
      'The island of Gharapuri was renamed "Elephanta" by Portuguese colonisers after a large stone elephant they found near the landing. The caves are thought to have been created during the Kalachuri dynasty, possibly under royal patronage around the 6th century CE, though the exact patrons remain uncertain. The Portuguese used the caves for target practice, causing significant damage to some sculptures. The island and its caves were transferred to the Archaeological Survey of India for conservation after independence.',
    architecture:
      'The main cave (Cave 1) is a cruciform hall roughly 39 metres on a side, supported by pillars carved from the living rock. Its most celebrated sculpture, the Trimurti (Maheshmurti), stands approximately 5.45 metres high and depicts three aspects of Shiva: as creator (Brahma), preserver (Vishnu), and destroyer (Rudra). The cave also features panels showing Shiva as Nataraja, Ardhanarishvara (half-male, half-female), and the Marriage of Shiva and Parvati.',
    culturalSignificance:
      'Elephanta is one of the most important examples of Shaiva cave art in India. The Trimurti is regarded as one of the greatest sculptural masterpieces of the ancient world. UNESCO inscribed the caves as "a creation of great beauty" representing "a synthesis of art, meaning and composition."',

    quickFacts: [
      { label: 'Main cave width', value: 'Approx. 39 m' },
      { label: 'Trimurti height', value: 'Approx. 5.45 m' },
      { label: 'UNESCO inscription', value: '1987' },
      { label: 'Island area', value: 'Approx. 10 sq km' },
      { label: 'Access', value: 'Ferry from Gateway of India, Mumbai' },
    ],

    imagePath: '/images/elephanta-caves.png',
    image: '/images/elephanta-caves.png',
    heroImage: '/images/elephanta-caves.png',
    imageAlt: 'Carved cave entrance and rock-cut sculptures at Elephanta Caves on Mumbai Harbour',
    imageAttribution: {
      source: 'Local file (original: "elephanta caves.png")',
      license: 'Unknown — provenance not established',
      note: 'Original photographer and licence not identifiable from file metadata.',
    },

    modelPath: '/models/elephanta.glb',

    mapX: 33, mapY: 56,
    tags: ['Hindu', 'Shiva', 'Island', 'UNESCO', 'Trimurti'],
    facts: ['7 cave complexes total', 'Trimurti stands ~5.45 m tall', 'UNESCO World Heritage since 1987'],

    sources: [
      { label: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/en/list/244' },
      { label: 'Archaeological Survey of India', url: 'https://asi.nic.in/elephanta-caves/' },
    ],
  },

  // ── 4. KONARK SUN TEMPLE ───────────────────────────────────────────────────
  {
    id: 'konark',
    name: 'Konark Sun Temple',
    alternateName: 'Surya Deula; "Black Pagoda"',
    shortName: 'KONARK',

    location: 'Konark, Odisha',
    city: 'Konark',
    district: 'Puri',
    state: 'Odisha',
    country: 'India',
    coordinates: { lat: 19.8876, lng: 86.0945 },

    type: 'Hindu Heritage',
    category: 'temples',

    period: '13th century CE',
    periodShort: '1250 CE',
    constructionDates: 'c. 1250 CE, reign of King Narasimhadeva I',

    heritage: 'UNESCO World Heritage Site',
    unescoStatus: 'Inscribed',
    unescoInscriptionYear: 1984,
    protectionStatus: 'Centrally Protected Monument (ASI)',

    description:
      'A 13th-century Sun temple built in the form of a colossal chariot with twelve pairs of intricately carved wheels pulled by seven horses, dedicated to the Sun god Surya.',
    shortDesc: 'A colossal temple-chariot with 24 intricately carved stone wheels, dedicated to the Sun god Surya.',
    historicalBackground:
      'The temple was built by the Eastern Ganga king Narasimhadeva I (r. 1238–1264 CE) to celebrate his military victories. It was constructed in the Kalinga architectural style and served as an active place of worship until the late 16th or early 17th century. European sailors called it the "Black Pagoda" because it appeared dark from the sea and served as a navigational landmark. The main tower (shikhara), which is believed to have been extremely tall, collapsed at some point—the exact date and cause remain uncertain. The structure still standing today is the jagamohana (porch), which was filled with sand in the 1900s by British engineers to preserve it.',
    architecture:
      'The temple is designed as a gigantic stone chariot of the Sun god, with 24 intricately carved wheels (each about 3 metres in diameter) and seven sculpted horses at the entrance. The exterior walls are covered in three bands of carvings depicting gods, celestial beings (apsaras), erotic figures (mithunas), animals, and scenes from daily life. The carved wheels double as precise sundials — the spokes cast shadows that can be used to read the time of day.',
    culturalSignificance:
      'Konark is one of the supreme examples of Kalinga temple architecture and of Indian sculptural art. UNESCO recognised it as a "masterpiece of creative genius" with "outstanding universal value."',

    quickFacts: [
      { label: 'Wheel diameter', value: 'Approx. 3 m (24 wheels)' },
      { label: 'Horses', value: '7 sculpted horses' },
      { label: 'UNESCO inscription', value: '1984' },
      { label: 'Patron', value: 'King Narasimhadeva I (Eastern Ganga dynasty)' },
      { label: 'Architectural style', value: 'Kalinga (Odishan)' },
      { label: 'Also known as', value: '"Black Pagoda"' },
    ],

    imagePath: '/images/konark.png',
    image: '/images/konark.png',
    heroImage: '/images/konark.png',
    imageAlt: 'Carved stone chariot wheels of the Konark Sun Temple, Odisha',
    imageAttribution: {
      source: 'Local file (original: "konark.png")',
      license: 'Unknown — provenance not established',
      note: 'Original photographer and licence not identifiable from file metadata.',
    },

    modelPath: '/models/konark.glb',

    mapX: 62, mapY: 52,
    tags: ['Hindu', 'Sun Temple', 'Kalinga', 'UNESCO', '13th Century'],
    facts: ['24 stone chariot wheels', 'UNESCO World Heritage since 1984', 'Known as the Black Pagoda'],

    sources: [
      { label: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/en/list/246' },
      { label: 'Archaeological Survey of India', url: 'https://asi.nic.in/sun-temple-konark/' },
    ],
  },

  // ── 5. TAJ MAHAL ───────────────────────────────────────────────────────────
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    alternateName: 'Crown of the Palace',
    shortName: 'TAJ MAHAL',

    location: 'Agra, Uttar Pradesh',
    city: 'Agra',
    district: 'Agra',
    state: 'Uttar Pradesh',
    country: 'India',
    coordinates: { lat: 27.1751, lng: 78.0421 },

    type: 'Mughal Heritage',
    category: 'monuments',

    period: '17th century CE',
    periodShort: '1631 – 1653 CE',
    constructionDates: 'c. 1631–1653 CE',

    heritage: 'UNESCO World Heritage Site',
    unescoStatus: 'Inscribed',
    unescoInscriptionYear: 1983,
    protectionStatus: 'Centrally Protected Monument (ASI); One of the New Seven Wonders of the World (2007)',

    description:
      'An ivory-white marble mausoleum on the southern bank of the Yamuna river in Agra, commissioned by Mughal emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal. It is widely regarded as the finest example of Mughal architecture and one of the world\'s most recognisable buildings.',
    shortDesc: 'The eternal symbol of love — a white marble mausoleum commissioned by Shah Jahan for his wife Mumtaz Mahal.',
    historicalBackground:
      'Mumtaz Mahal died in 1631 during the birth of their fourteenth child. The grieving emperor Shah Jahan commissioned the mausoleum almost immediately. Construction is believed to have begun in 1632. The main mausoleum was completed by around 1643, with the entire complex (including the mosque, guest house, and great gate) completed by approximately 1653. An estimated 20,000 artisans and labourers from across India and Central Asia worked on the complex. Shah Jahan was later deposed by his son Aurangzeb and spent his final years under house arrest in Agra Fort, with a view of the Taj Mahal across the river.',
    architecture:
      'The central mausoleum is a symmetrical white marble structure set on a square plinth, topped by an onion-shaped dome 73 metres tall. The dome is flanked by four decorative chhatris (small dome-shaped pavilions) and framed by four slender minarets, one at each corner of the plinth. The exterior is inlaid with semi-precious stones in floral and calligraphic patterns (pietra dura). The interior contains the cenotaphs of Mumtaz Mahal and Shah Jahan, surrounded by elaborately carved marble screens. The complex includes a mosque, a guest house (jawab), a reflecting pool, and formal Mughal gardens (charbagh).',
    culturalSignificance:
      'The Taj Mahal is the supreme achievement of Mughal architecture, blending Persian, Islamic, and Indian artistic traditions. UNESCO called it "the jewel of Muslim art in India and one of the universally admired masterpieces of the world\'s heritage." It was declared one of the New Seven Wonders of the World in 2007.',

    quickFacts: [
      { label: 'Height of main dome', value: '73 m (with finial)' },
      { label: 'Completed', value: 'c. 1653 CE' },
      { label: 'Patron', value: 'Mughal Emperor Shah Jahan' },
      { label: 'UNESCO inscription', value: '1983' },
      { label: 'New Seven Wonders', value: '2007' },
      { label: 'Primary material', value: 'White Makrana marble' },
    ],

    imagePath: '/images/taj-mahal.png',
    image: '/images/taj-mahal.png',
    heroImage: '/images/taj-mahal.png',
    imageAlt: 'The Taj Mahal reflected in the central pool of its charbagh garden, Agra, Uttar Pradesh',
    imageAttribution: {
      source: 'Local file (original: "taj mehel.png")',
      license: 'Unknown — provenance not established',
      note: 'Original photographer and licence not identifiable from file metadata.',
    },

    modelPath: '/models/taj-mahal.glb',

    mapX: 44, mapY: 36,
    tags: ['Mughal', 'Marble', 'Mausoleum', 'UNESCO', '7 Wonders'],
    facts: ['Built 1631–1653', 'Estimated 20,000 workers', 'One of the New Seven Wonders (2007)'],

    sources: [
      { label: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/en/list/252' },
      { label: 'Archaeological Survey of India', url: 'https://asi.nic.in/taj-mahal/' },
    ],
  },

  // ── 6. GATEWAY OF INDIA ────────────────────────────────────────────────────
  {
    id: 'gateway-of-india',
    name: 'Gateway of India',
    alternateName: null,
    shortName: 'GATEWAY',

    location: 'Mumbai, Maharashtra',
    city: 'Mumbai (Colaba)',
    district: 'Mumbai City',
    state: 'Maharashtra',
    country: 'India',
    coordinates: { lat: 18.922, lng: 72.8347 },

    type: 'Colonial Heritage',
    category: 'colonial-heritage',

    period: '20th century CE',
    periodShort: '1911 – 1924 CE',
    constructionDates: '1913–1924 CE',

    heritage: 'National Monument of India',
    unescoStatus: 'Not inscribed',
    unescoInscriptionYear: null,
    protectionStatus: 'Listed structure under Mumbai Heritage Conservation Committee; maintained by ASI',

    description:
      'A monumental arch overlooking Mumbai Harbour, built during the British Raj to commemorate the visit of King George V and Queen Mary to India in 1911, blending Indo-Saracenic and Gujarati architectural elements.',
    shortDesc: "Mumbai's iconic arch monument overlooking the Arabian Sea — a symbol of the city's history and spirit.",
    historicalBackground:
      'The Gateway was designed by British architect George Wittet and its foundation stone was laid in 1913. The arch was completed in 1924. It was built to mark the arrival of King George V and Queen Mary in 1911, though a cardboard structure served at that occasion while the permanent monument was under construction. Historically, it was the point of arrival and departure for British viceroys and governors. In a moment of great symbolic importance, the last British troops to leave India after independence marched through the Gateway in February 1948.',
    architecture:
      'The arch stands 26 metres high and is built from yellow Kharodi basalt from a local quarry. Its design blends the Indo-Saracenic style (popular in British India) with elements of 16th-century Gujarati architecture, including ornate lattice screens (jali work) and decorative elements drawn from local traditions. The arch faces the Arabian Sea and is flanked by two large halls.',
    culturalSignificance:
      'The Gateway is one of the most recognisable landmarks in India and one of the premier tourist destinations in Mumbai. It has become a symbol of the city itself, and the point from which visitors embark for Elephanta Island. Its construction marked a particular phase of colonial architecture in India.',

    quickFacts: [
      { label: 'Height', value: '26 m' },
      { label: 'Completed', value: '1924' },
      { label: 'Architect', value: 'George Wittet' },
      { label: 'Construction material', value: 'Yellow Kharodi basalt' },
      { label: 'Architectural style', value: 'Indo-Saracenic / Gujarati' },
      { label: 'Nearby', value: 'Ferry point for Elephanta Island' },
    ],

    imagePath: '/images/gateway-of-india.png',
    image: '/images/gateway-of-india.png',
    heroImage: '/images/gateway-of-india.png',
    imageAlt: 'The Gateway of India arch monument on the waterfront of Mumbai Harbour',
    imageAttribution: {
      source: 'Local file (original: "gate way of india.png")',
      license: 'Unknown — provenance not established',
      note: 'Original photographer and licence not identifiable from file metadata.',
    },

    modelPath: '/models/gateway-of-india.glb',

    mapX: 33, mapY: 57,
    tags: ['Colonial', 'Mumbai', 'Arch', 'Basalt', '20th Century'],
    facts: ['Completed 1924', '26 metres tall', 'Indo-Saracenic architecture'],

    sources: [
      { label: 'Archaeological Survey of India', url: 'https://asi.nic.in/gateway-of-india/' },
      { label: 'Maharashtra Tourism', url: 'https://www.maharashtratourism.gov.in/tourist-place/gateway-of-india' },
    ],
  },

  // ── 7. HAMPI ───────────────────────────────────────────────────────────────
  {
    id: 'hampi',
    name: 'Hampi',
    alternateName: 'Vijayanagara; Pampa Kshetra',
    shortName: 'HAMPI',

    location: 'Ballari, Karnataka',
    city: 'Hampi',
    district: 'Vijayanagara',
    state: 'Karnataka',
    country: 'India',
    coordinates: { lat: 15.335, lng: 76.46 },

    type: 'Vijayanagara Heritage',
    category: 'monuments',

    period: '14th – 16th century CE',
    periodShort: '1336 – 1565 CE',
    constructionDates: 'Founded 1336 CE; sacked and abandoned 1565 CE',

    heritage: 'UNESCO World Heritage Site',
    unescoStatus: 'Inscribed',
    unescoInscriptionYear: 1986,
    protectionStatus: 'Centrally Protected Monument (ASI); UNESCO World Heritage in Danger list (1999–2011)',

    description:
      'The ruined capital of the Vijayanagara Empire, spread across a surreal boulder-strewn landscape, featuring grand temples, royal structures, elaborate water systems, and vibrant marketplace ruins.',
    shortDesc: 'Ruins of a once-glorious empire amid a surreal landscape of giant boulders and ancient stone temples.',
    historicalBackground:
      'Hampi was founded in 1336 CE as the capital of the Vijayanagara Empire by Harihara I and his brother Bukka Raya I of the Sangama dynasty. At its height in the 15th and early 16th centuries, it was one of the largest cities in the world—some estimates suggest a population of 500,000. The empire served as a bulwark of Hindu political and cultural power in southern India against Sultanate expansion. In 1565 CE, the Vijayanagara army was defeated at the Battle of Talikota by a coalition of Deccan Sultanates. The city was subsequently looted and burned, and was never reoccupied.',
    architecture:
      'The ruins extend across approximately 41 sq km of a remarkable landscape of giant rounded granite boulders and the Tungabhadra River. The complex includes the Virupaksha Temple (still actively used), the Vittala Temple (famous for its stone chariot and musical pillars), the Royal Enclosure, the Lotus Mahal, the Hazara Rama Temple, and the Elephant Stables. The architecture blends Dravidian temple styles with Indo-Islamic secular elements in the palace complex.',
    culturalSignificance:
      'Hampi represents the last great Hindu kingdom of medieval India before Mughal dominance. UNESCO recognised it as an "outstanding example of a type of building or architectural or technological ensemble which illustrates a significant stage in human history."',

    quickFacts: [
      { label: 'Area', value: 'Approx. 41 sq km' },
      { label: 'UNESCO inscription', value: '1986' },
      { label: 'Founded', value: '1336 CE' },
      { label: 'Empire', value: 'Vijayanagara Empire' },
      { label: 'River', value: 'Tungabhadra' },
      { label: 'Key structure', value: 'Vittala Temple and Virupaksha Temple' },
    ],

    imagePath: '/images/hampi.png',
    image: '/images/hampi.png',
    heroImage: '/images/hampi.png',
    imageAlt: 'Ancient stone temples and giant boulders of Hampi, former capital of the Vijayanagara Empire, Karnataka',
    imageAttribution: {
      source: 'Local file (original: "hampi.png")',
      license: 'Unknown — provenance not established',
      note: 'Original photographer and licence not identifiable from file metadata.',
    },

    modelPath: '/models/Hampi.glb',

    mapX: 40, mapY: 62,
    tags: ['Vijayanagara', 'Ruins', 'Karnataka', 'UNESCO', 'Medieval'],
    facts: ['Capital of Vijayanagara Empire', 'Over 500 monuments', 'UNESCO World Heritage since 1986'],

    sources: [
      { label: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/en/list/241' },
      { label: 'Archaeological Survey of India', url: 'https://asi.nic.in/hampi/' },
    ],
  },

  // ── 8. SANCHI STUPA ────────────────────────────────────────────────────────
  {
    id: 'sanchi',
    name: 'Sanchi Stupa',
    alternateName: 'Monuments at Sanchi; Kakanaya; Kakanava',
    shortName: 'SANCHI',

    location: 'Sanchi, Madhya Pradesh',
    city: 'Sanchi',
    district: 'Raisen',
    state: 'Madhya Pradesh',
    country: 'India',
    coordinates: { lat: 23.4791, lng: 77.7397 },

    type: 'Buddhist Heritage',
    category: 'buddhist-heritage',

    period: '3rd century BCE – 12th century CE',
    periodShort: '300 BCE',
    constructionDates: 'c. 3rd century BCE (Ashokan); expanded 1st century BCE–1st century CE (toranas)',

    heritage: 'UNESCO World Heritage Site',
    unescoStatus: 'Inscribed',
    unescoInscriptionYear: 1989,
    protectionStatus: 'Centrally Protected Monument (ASI)',

    description:
      "One of the oldest stone structures in India, Sanchi is a complex of Buddhist monuments including the Great Stupa (Stupa No. 1), commissioned by Emperor Ashoka in the 3rd century BCE. Its four magnificent toranas (gateways) are carved with intricate scenes from the life of the Buddha and Jataka tales.",
    shortDesc: "India's oldest stone structures — Buddhist stupas and carved gateways commissioned by Emperor Ashoka.",
    historicalBackground:
      'The site of Sanchi has Buddhist connections dating to the 3rd century BCE, when Emperor Ashoka of the Maurya dynasty is said to have commissioned the original stupa to enshrine relics of the Buddha. The Great Stupa was enlarged during the Shunga period (2nd–1st century BCE) to its present size. The four elaborately carved gateways (toranas) were added during the 1st century BCE to 1st century CE, during the Satavahana period. Sanchi was an important Buddhist religious centre until it was abandoned around the 13th century CE. It was rediscovered by British officer General Taylor in 1818, in a state of considerable ruin. Major conservation work began under the direction of John Marshall in the early 20th century.',
    architecture:
      'The Great Stupa (Stupa No. 1) is a massive hemispherical brick dome 36.6 metres in diameter and 16.46 metres tall, surrounded by a stone railing (vedika) and a circumambulatory path. Its four toranas are among the finest examples of early Buddhist sculptural art, covered in relief carvings depicting the life of the Buddha (represented symbolically, without a human form), the Jataka tales, episodes from the life of Ashoka, and scenes of nature and celebration.',
    culturalSignificance:
      'Sanchi represents the oldest surviving stone architecture in India and the finest examples of early Buddhist art. UNESCO inscribed it for the "outstanding universal value" of its architecture and the insight it provides into the development of Buddhism. The absence of anthropomorphic images of the Buddha in the earliest carvings is of particular scholarly importance.',

    quickFacts: [
      { label: 'Great Stupa diameter', value: '36.6 m' },
      { label: 'Great Stupa height', value: '16.46 m' },
      { label: 'UNESCO inscription', value: '1989' },
      { label: 'Original patron', value: 'Emperor Ashoka (Maurya dynasty)' },
      { label: 'Gateways (toranas)', value: '4 (north, south, east, west)' },
      { label: 'Rediscovered', value: '1818 by General Taylor' },
    ],

    imagePath: '/images/sanchi.png',
    image: '/images/sanchi.png',
    heroImage: '/images/sanchi.png',
    imageAlt: 'The Great Stupa and carved torana gateway at Sanchi, Madhya Pradesh',
    imageAttribution: {
      source: 'Local file (original: "sanchi.png")',
      license: 'Unknown — provenance not established',
      note: 'Original photographer and licence not identifiable from file metadata.',
    },

    modelPath: '/models/Sanchi.glb',

    mapX: 44, mapY: 44,
    tags: ['Buddhist', 'Ashoka', 'Stupa', 'UNESCO', '3rd BCE'],
    facts: ['3rd century BCE', 'Commissioned by Ashoka', 'UNESCO World Heritage since 1989'],

    sources: [
      { label: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/en/list/524' },
      { label: 'Archaeological Survey of India', url: 'https://asi.nic.in/sanchi/' },
    ],
  },
]

// ─── Categories for filter UI ─────────────────────────────────────────────────
export const heritageCategories = [
  { id: 'all', label: 'All Heritage', icon: 'Layers' },
  { id: 'ancient-caves', label: 'Ancient Caves', icon: 'Mountain' },
  { id: 'temples', label: 'Temples', icon: 'Building2' },
  { id: 'monuments', label: 'Monuments', icon: 'Landmark' },
  { id: 'buddhist-heritage', label: 'Buddhist Heritage', icon: 'Circle' },
  { id: 'colonial-heritage', label: 'Colonial Heritage', icon: 'Archive' },
]

// ─── Timeline periods ─────────────────────────────────────────────────────────
export const timelinePeriods = [
  {
    id: 'ancient',
    label: 'ANCIENT INDIA',
    period: '600 BCE – 200 CE',
    color: '#8B6914',
    sites: ['sanchi', 'ajanta'],
    description:
      'The age of the Mauryan Empire and Emperor Ashoka, when Buddhism spread across the subcontinent. Ashoka commissioned the Sanchi Stupa to enshrine relics of the Buddha. The earliest phase of Ajanta was also carved during this era.',
    monuments: ['Sanchi Stupa', 'Early Ajanta Caves (Phase I)', 'Sarnath Pillar'],
  },
  {
    id: 'classical',
    label: 'CLASSICAL INDIA',
    period: '200 – 700 CE',
    color: '#7A5C14',
    sites: ['ajanta', 'elephanta'],
    description:
      'The golden age of Indian civilisation during the Gupta and post-Gupta periods. Sanskrit literature, mathematics, and astronomy flourished. The finest Buddhist cave paintings at Ajanta were created during this era, along with the Elephanta cave temples dedicated to Shiva.',
    monuments: ['Ajanta Cave Paintings (Phase II)', 'Elephanta Caves', 'Udayagiri Caves'],
  },
  {
    id: 'medieval',
    label: 'MEDIEVAL INDIA',
    period: '700 – 1500 CE',
    color: '#6B4E11',
    sites: ['ellora', 'konark', 'hampi'],
    description:
      'An era of powerful regional kingdoms — the Rashtrakutas, Eastern Gangas, and the Vijayanagara Empire. Temple architecture reached its zenith. Ellora\'s Kailasa Temple was carved under the Rashtrakutas; Konark\'s Sun Temple under the Eastern Ganga dynasty; and Hampi flourished as the capital of Vijayanagara.',
    monuments: ['Ellora Caves', 'Konark Sun Temple', 'Hampi', 'Brihadeeswarar Temple'],
  },
  {
    id: 'early-modern',
    label: 'EARLY MODERN',
    period: '1500 – 1800 CE',
    color: '#5C420F',
    sites: ['taj-mahal'],
    description:
      'The Mughal era brought a synthesis of Persian, Islamic, and Indian artistic traditions. The Taj Mahal, built by Shah Jahan in memory of Mumtaz Mahal, stands as the supreme achievement of Mughal architecture.',
    monuments: ['Taj Mahal', 'Red Fort', 'Fatehpur Sikri', "Humayun's Tomb"],
  },
  {
    id: 'colonial',
    label: 'COLONIAL ERA',
    period: '1800 – 1947',
    color: '#4A380D',
    sites: ['gateway-of-india'],
    description:
      'The British colonial period introduced Indo-Saracenic architecture — a fusion of Indian, Islamic, and Gothic styles. The Gateway of India (1924) commemorated the royal visit of 1911 and later witnessed the departure of the last British troops from independent India in 1948.',
    monuments: ['Gateway of India', 'Victoria Memorial', 'Chhatrapati Shivaji Maharaj Terminus'],
  },
  {
    id: 'modern',
    label: 'MODERN INDIA',
    period: '1947 – PRESENT',
    color: '#3A2E0B',
    sites: [],
    description:
      'Independent India undertook extensive conservation of its extraordinary heritage. UNESCO designations, ASI protection, and digital archiving now safeguard these treasures for future generations. India has 42 UNESCO World Heritage Sites as of 2023.',
    monuments: ['Chandigarh Capitol Complex', 'Lotus Temple', 'National Museum, New Delhi'],
  },
]

// ─── Heritage stories (for Story Section) ────────────────────────────────────
export const heritageStories = [
  {
    id: 'science-of-architecture',
    title: 'The Science of Ancient Indian Architecture',
    category: 'ARCHITECTURE',
    readTime: '8 min read',
    description:
      'How ancient Indian builders achieved structural feats that modern engineers still marvel at — without modern tools, machines, or engineering principles as we understand them today.',
    image: '/images/konark.png',
    imageAlt: 'Carved stone chariot wheel at Konark Sun Temple illustrating ancient Indian architectural precision',
  },
  {
    id: 'stories-of-ajanta',
    title: 'The Stories Carved Into Ajanta',
    category: 'ART & CULTURE',
    readTime: '6 min read',
    description:
      "Every wall of the Ajanta Caves tells a story — from the Jataka tales of Buddha's past lives to scenes of court life, love, and enlightenment painted by anonymous masters over centuries.",
    image: '/images/ajanta-caves.png',
    imageAlt: 'Detail of painted murals inside a cave at Ajanta depicting scenes from Buddhist lore',
  },
  {
    id: 'how-ellora-was-built',
    title: 'How Ellora Was Built',
    category: 'ENGINEERING',
    readTime: '7 min read',
    description:
      "The Kailasa Temple at Ellora was carved from top to bottom — a single monolithic rock estimated to weigh 200,000 tonnes. How did craftsmen plan and execute one of the world's greatest engineering feats?",
    image: '/images/ellora-caves.png',
    imageAlt: 'The monolithic Kailasa Temple at Ellora viewed from above, showing its extraordinary rock-cut scale',
  },
  {
    id: 'symbolism-of-konark',
    title: 'The Symbolism of the Konark Wheel',
    category: 'SYMBOLISM',
    readTime: '5 min read',
    description:
      'The 24 wheels of the Konark Sun Temple are not merely decorative — they function as precision sundials and encode the cycles of time, cosmological knowledge, and the philosophy of the Kalinga builders.',
    image: '/images/konark.png',
    imageAlt: 'Close-up of a carved stone wheel at Konark Sun Temple showing intricate spoke detail',
  },
]

// ─── Map markers (derived from heritageSites) ─────────────────────────────────
export const mapMarkers = heritageSites.map((s) => ({
  id: s.id,
  name: s.name,
  state: s.state,
  type: s.type,
  period: s.period,
  mapX: s.mapX,
  mapY: s.mapY,
  coordinates: s.coordinates,
}))
