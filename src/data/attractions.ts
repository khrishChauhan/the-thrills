export interface AttractionSpecs {
  heightDrop?: string;
  topSpeed?: string;
  inversions?: string;
  gForce?: string;
  capacity?: string;
  manufacturer?: string;
  ageRecommendation?: string;
  safetyRestraints?: string;
  surfaceArea?: string;
  mirrorPanels?: string;
  lightingFX?: string;
  soundEngine?: string;
  photoZones?: string;
  chambers?: string;
  animatronics?: string;
  haptics?: string;
  environmentalFX?: string;
  rooms?: string;
  specialTech?: string;
  vortexTunnel?: string;
  cameraFriendly?: string;
  motionSystem?: string;
  projectors?: string;
  fxPneumatics?: string;
  theatreCapacity?: string;
  waterSlides?: string;
  wavePool?: string;
  lazyRiver?: string;
  waterQuality?: string;
  villas?: string;
  perks?: string;
  wellness?: string;
  concierge?: string;
  cuisine?: string;
  seating?: string;
  specialty?: string;
  beverages?: string;
}

export interface Attraction {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  category: "Adrenaline" | "Sensory Houses" | "Water Park" | "Resort & Dining";
  tagBadge: string;
  scheduleBadge: string;
  intensity: string;
  minHeight: string;
  duration: string;
  description: string;
  highlights: string[];
  visualOrder: "left" | "right";
  bgClass: string;
  radialClass: string;
  hasGrid: boolean;
  specs: AttractionSpecs;
  svg: string;
}

export const ATTRACTIONS: Attraction[] = [
  {
    "id": "fun-zone",
    "number": 1,
    "title": "Fun Zone",
    "subtitle": "High-Velocity Adrenaline & Gravity-Defying Loops",
    "category": "Adrenaline",
    "tagBadge": "Marquee Thrill",
    "scheduleBadge": "10:00 AM – 9:00 PM",
    "intensity": "Extreme Intensity",
    "minHeight": "Min: 120 cm",
    "duration": "2 - 4 mins per ride",
    "description": "Home to the park’s marquee roller coasters, rotating gyro drops, and high-g centrifugal spinners engineered for maximum euphoria.",
    "highlights": [
      "48m Summit Drop",
      "0 to 90 km/h in 2.8s",
      "Triple Inversions",
      "Night Glow Tracks"
    ],
    "visualOrder": "right",
    "bgClass": "bg-[#050B14]",
    "radialClass": "bg-radial from-[#002244]/40 via-[#071328] to-[#050B14]",
    "hasGrid": true,
    "specs": {
      "heightDrop": "48 meters (157 ft)",
      "topSpeed": "90 km/h (56 mph)",
      "inversions": "3 Inversions (Heartline Roll, Cobra Roll)",
      "gForce": "4.2 Gs",
      "capacity": "1,200 riders / hour",
      "manufacturer": "Intamin Amusement Rides",
      "ageRecommendation": "Ages 10+ with minimum 120cm height requirement",
      "safetyRestraints": "Hydraulic over-the-shoulder lap bars with dual locking sensors"
    },
    "svg": "<svg viewBox=\"0 0 1440 900\" fill=none xmlns=http://www.w3.org/2000/svg class=\"absolute inset-0 w-full h-full object-cover preserve-3d\" preserveAspectRatio=\"xMidYMid slice\"><defs><lineargradient id=skyGrad x1=0% y1=0% x2=100% y2=100%><stop offset=0% stop-color=#0B132B></stop><stop offset=60% stop-color=#071328></stop><stop offset=100% stop-color=#050B14></stop></lineargradient><lineargradient id=trackCobalt x1=0% y1=0% x2=100% y2=0%><stop offset=0% stop-color=#0066FF></stop><stop offset=50% stop-color=#38BDF8></stop><stop offset=100% stop-color=#FF5500></stop></lineargradient><lineargradient id=railOrange x1=0% y1=0% x2=100% y2=0%><stop offset=0% stop-color=#FF5500></stop><stop offset=70% stop-color=#FFAA00></stop><stop offset=100% stop-color=#FF3300></stop></lineargradient><filter id=glowCobalt x=-20% y=-20% width=140% height=140%><fegaussianblur stdDeviation=8 result=blur></fegaussianblur><fecomposite in=SourceGraphic in2=blur operator=over></fecomposite></filter><filter id=softGlow x=-30% y=-30% width=160% height=160%><fegaussianblur stdDeviation=16 result=blur></fegaussianblur><fecomposite in=SourceGraphic in2=blur operator=over></fecomposite></filter><radialgradient id=summitGlow cx=68% cy=25% r=35%><stop offset=0% stop-color=#0066FF stop-opacity=0.35></stop><stop offset=50% stop-color=#FF5500 stop-opacity=0.15></stop><stop offset=100% stop-color=#000000 stop-opacity=0></stop></radialgradient></defs><circle cx=980 cy=220 r=340 fill=url(#summitGlow)></circle><g opacity=0.25 stroke=#38BDF8 stroke-width=1.5><circle cx=280 cy=420 r=160 stroke-dasharray=\"6 6\"></circle><circle cx=280 cy=420 r=140 stroke-width=1></circle><circle cx=280 cy=420 r=20 fill=#0066FF></circle><line x1=280 y1=260 x2=280 y2=580></line><line x1=120 y1=420 x2=440 y2=420></line><line x1=167 y1=307 x2=393 y2=533></line><line x1=167 y1=533 x2=393 y2=307></line><path d=\"M280 420 L220 620 M280 420 L340 620\" stroke-width=2.5></path></g><g opacity=0.3 stroke=#FF5500 stroke-width=2><line x1=480 y1=180 x2=480 y2=680 stroke-width=3></line><line x1=490 y1=180 x2=490 y2=680 stroke-width=1></line><circle cx=485 cy=175 r=4 fill=#FF5500 filter=url(#glowCobalt)></circle><rect x=465 y=320 width=40 height=12 rx=3 fill=#FF5500></rect></g><g stroke=\"rgba(255, 255, 255, 0.12)\" stroke-width=3 stroke-linecap=round><line x1=720 y1=280 x2=720 y2=780></line><line x1=940 y1=140 x2=940 y2=820></line><line x1=1120 y1=310 x2=1120 y2=780></line><line x1=1300 y1=480 x2=1300 y2=850></line><line x1=720 y1=450 x2=940 y2=350 stroke-width=1.5 stroke-opacity=0.4></line><line x1=940 y1=350 x2=1120 y2=450 stroke-width=1.5 stroke-opacity=0.4></line><line x1=720 y1=620 x2=940 y2=520 stroke-width=1.5 stroke-opacity=0.4></line><line x1=940 y1=520 x2=1120 y2=620 stroke-width=1.5 stroke-opacity=0.4></line></g><path d=\"M380 720 C 500 680, 620 400, 780 320 C 900 250, 1020 180, 1180 340 C 1300 460, 1380 620, 1440 680\" stroke=#0066FF stroke-width=6 stroke-opacity=0.4 filter=url(#glowCobalt)></path><path d=\"M -100 850 C 200 820, 480 720, 700 480 C 860 300, 940 120, 1060 160 C 1200 210, 1260 480, 1380 620 C 1440 680, 1500 700, 1560 720\" stroke=url(#trackCobalt) stroke-width=7 stroke-linecap=round filter=url(#glowCobalt)></path><path d=\"M -100 838 C 200 808, 480 708, 700 468 C 860 288, 940 108, 1060 148 C 1200 198, 1260 468, 1380 608 C 1440 668, 1500 688, 1560 708\" stroke=url(#railOrange) stroke-width=3.5 stroke-linecap=round></path><g stroke=\"rgba(255, 255, 255, 0.4)\" stroke-width=2><line x1=290 y1=768 x2=310 y2=752 stroke-opacity=0.6></line><line x1=327.5 y1=692.2948085123701 x2=347.5 y2=676.2948085123701 stroke-opacity=0.6></line><line x1=365 y1=617.884953840538 x2=385 y2=601.884953840538 stroke-opacity=0.6></line><line x1=402.5 y1=546.043609228248 x2=422.5 y2=530.043609228248 stroke-opacity=0.6></line><line x1=440 y1=478.00000000000006 x2=460 y2=462.00000000000006 stroke-opacity=0.6></line><line x1=477.5 y1=414.918371174942 x2=497.5 y2=398.918371174942 stroke-opacity=0.6></line><line x1=515 y1=357.8780669118025 x2=535 y2=341.8780669118025 stroke-opacity=0.6></line><line x1=552.5 y1=307.8550626310836 x2=572.5 y2=291.8550626310836 stroke-opacity=0.6></line><line x1=590 y1=265.7052658050256 x2=610 y2=249.7052658050256 stroke-opacity=0.6></line><line x1=627.5 y1=232.14987114345365 x2=647.5 y2=216.14987114345365 stroke-opacity=0.6></line><line x1=665 y1=207.76302075234037 x2=685 y2=191.76302075234037 stroke-opacity=0.6></line><line x1=702.5 y1=192.96198040318995 x2=722.5 y2=176.96198040318995 stroke-opacity=0.6></line><line x1=740 y1=188 x2=760 y2=172 stroke-opacity=0.6></line><line x1=777.5 y1=192.96198040318995 x2=797.5 y2=176.96198040318995 stroke-opacity=0.6></line><line x1=815 y1=207.76302075234037 x2=835 y2=191.76302075234037 stroke-opacity=0.6></line><line x1=852.5 y1=232.14987114345365 x2=872.5 y2=216.14987114345365 stroke-opacity=0.6></line><line x1=890 y1=265.70526580502553 x2=910 y2=249.70526580502553 stroke-opacity=0.6></line><line x1=927.5 y1=307.8550626310836 x2=947.5 y2=291.8550626310836 stroke-opacity=0.6></line><line x1=965 y1=357.8780669118024 x2=985 y2=341.8780669118024 stroke-opacity=0.6></line><line x1=1002.5 y1=414.9183711749419 x2=1022.5 y2=398.9183711749419 stroke-opacity=0.6></line><line x1=1040 y1=478.00000000000006 x2=1060 y2=462.00000000000006 stroke-opacity=0.6></line><line x1=1077.5 y1=546.0436092282479 x2=1097.5 y2=530.0436092282479 stroke-opacity=0.6></line><line x1=1115 y1=617.8849538405378 x2=1135 y2=601.8849538405378 stroke-opacity=0.6></line><line x1=1152.5 y1=692.2948085123701 x2=1172.5 y2=676.2948085123701 stroke-opacity=0.6></line></g><g transform=\"translate(970, 135) rotate(14)\"><rect x=-40 y=-12 width=34 height=18 rx=5 fill=#FF5500 filter=url(#glowCobalt)></rect><polygon points=\"-40,-6 -140,-25 -140,20 -40,6\" fill=url(#trackCobalt) opacity=0.3></polygon><rect x=-2 y=-12 width=30 height=18 rx=4 fill=#0066FF></rect><rect x=34 y=-12 width=30 height=18 rx=4 fill=#38BDF8></rect><rect x=70 y=-12 width=30 height=18 rx=4 fill=#FF5500></rect><circle cx=-24 cy=-6 r=4 fill=#050B14></circle><circle cx=12 cy=-6 r=4 fill=#050B14></circle><circle cx=48 cy=-6 r=4 fill=#050B14></circle><circle cx=84 cy=-6 r=4 fill=#050B14></circle><line x1=-30 y1=-3 x2=140 y2=-3 stroke=#FFAA00 stroke-width=2 stroke-dasharray=\"12 6\"></line></g><path d=\"M 0 820 Q 360 760 720 800 T 1440 790 L 1440 900 L 0 900 Z\" fill=#050B14></path><g filter=url(#glowCobalt)><circle cx=180 cy=810 r=5 fill=#FFAA00></circle><circle cx=360 cy=790 r=6 fill=#0066FF></circle><circle cx=580 cy=805 r=5 fill=#38BDF8></circle><circle cx=820 cy=800 r=7 fill=#FFAA00></circle><circle cx=1060 cy=815 r=6 fill=#0066FF></circle><circle cx=1280 cy=805 r=6 fill=#FF5500></circle></g></svg>"
  },
  {
    "id": "mirror-house",
    "number": 2,
    "title": "Mirror House",
    "subtitle": "Infinite Reflections & Mind-Bending Labyrinths",
    "category": "Sensory Houses",
    "tagBadge": "Visual Marvel",
    "scheduleBadge": "10:00 AM – 8:30 PM",
    "intensity": "Moderate Intensity",
    "minHeight": "Min: All heights welcome",
    "duration": "15 - 20 mins",
    "description": "An architectural maze of 1,200 optical-grade infinity mirrors illuminated by programmable ambient LED matrices and spatial acoustics.",
    "highlights": [
      "1,200 Optical Glass Mirrors",
      "Spatial 360° Soundscape",
      "Interactive Prism Chambers",
      "Prism Glow Photography Spots"
    ],
    "visualOrder": "left",
    "bgClass": "bg-[#030E18]",
    "radialClass": "bg-radial from-cyan-500/30 via-sky-950/40 to-[#030E18]",
    "hasGrid": false,
    "specs": {
      "surfaceArea": "8,500 sq ft mirror labyrinth",
      "mirrorPanels": "1,200 German optical-coated beamsplitter panels",
      "lightingFX": "16.8 million RGB pixel mapping with reactive pulse sensors",
      "soundEngine": "64-channel binaural spatial audio grid",
      "ageRecommendation": "All ages welcome (Socks required upon entry)",
      "photoZones": "4 Dedicated High-Dynamic Range Infinity Photo Chambers"
    },
    "svg": "<svg viewBox=\"0 0 1000 600\" fill=none xmlns=http://www.w3.org/2000/svg class=\"w-full h-full object-cover\" preserveAspectRatio=\"xMidYMid slice\"><g stroke=#38BDF8 stroke-opacity=0.4 stroke-width=2><line x1=500 y1=300 x2=0 y2=0></line><line x1=500 y1=300 x2=250 y2=0></line><line x1=500 y1=300 x2=500 y2=0></line><line x1=500 y1=300 x2=750 y2=0></line><line x1=500 y1=300 x2=1000 y2=0></line><line x1=500 y1=300 x2=0 y2=600></line><line x1=500 y1=300 x2=250 y2=600></line><line x1=500 y1=300 x2=500 y2=600></line><line x1=500 y1=300 x2=750 y2=600></line><line x1=500 y1=300 x2=1000 y2=600></line><line x1=500 y1=300 x2=0 y2=300></line><line x1=500 y1=300 x2=1000 y2=300></line></g><rect x=420 y=240 width=160 height=120 stroke=#00D2FF stroke-width=2 stroke-opacity=0.8 fill=none></rect><rect x=340 y=180 width=320 height=240 stroke=#00D2FF stroke-width=2.5 stroke-opacity=0.6 fill=none></rect><rect x=220 y=90 width=560 height=420 stroke=#00D2FF stroke-width=3 stroke-opacity=0.4 fill=none></rect><rect x=80 y=0 width=840 height=600 stroke=#00D2FF stroke-width=4 stroke-opacity=0.2 fill=none></rect><circle cx=500 cy=300 r=28 fill=#00D2FF opacity=0.9></circle><circle cx=500 cy=300 r=14 fill=#FFFFFF></circle></svg>"
  },
  {
    "id": "horror-house",
    "number": 3,
    "title": "Horror House",
    "subtitle": "The Crypt of Whispers: Cinematic Psychological Dread",
    "category": "Sensory Houses",
    "tagBadge": "Dare to Enter",
    "scheduleBadge": "11:00 AM – 9:00 PM",
    "intensity": "Extreme Intensity",
    "minHeight": "Min: 130 cm (Parental guidance recommended)",
    "duration": "12 mins",
    "description": "A 12-chamber gothic horror odyssey featuring hyper-realistic animatronics, chilling sensory illusions, and interactive jump encounters.",
    "highlights": [
      "12 Atmospheric Chambers",
      "Sub-Bass Haptic Flooring",
      "Hollywood-Grade Animatronics",
      "Sensory Fog & Cryo FX"
    ],
    "visualOrder": "right",
    "bgClass": "bg-[#0F0505]",
    "radialClass": "bg-radial from-red-600/30 via-rose-950/40 to-[#0F0505]",
    "hasGrid": false,
    "specs": {
      "chambers": "12 Narratively Driven Cinematic Vaults",
      "animatronics": "28 Pneumatic Hollywood SFX puppets & animatronics",
      "haptics": "Underfloor electromagnetic bass transducers (15Hz - 40Hz)",
      "environmentalFX": "Cryogenic air blasts, scents of old crypt moss, liquid mist",
      "ageRecommendation": "Recommended for ages 13+ (Not for heart/epilepsy patients)"
    },
    "svg": "<svg viewBox=\"0 0 1000 600\" fill=none xmlns=http://www.w3.org/2000/svg class=\"w-full h-full object-cover\" preserveAspectRatio=\"xMidYMid slice\"><g stroke=#EF4444 stroke-opacity=0.4 stroke-width=2><line x1=500 y1=300 x2=0 y2=0></line><line x1=500 y1=300 x2=250 y2=0></line><line x1=500 y1=300 x2=500 y2=0></line><line x1=500 y1=300 x2=750 y2=0></line><line x1=500 y1=300 x2=1000 y2=0></line><line x1=500 y1=300 x2=0 y2=600></line><line x1=500 y1=300 x2=250 y2=600></line><line x1=500 y1=300 x2=500 y2=600></line><line x1=500 y1=300 x2=750 y2=600></line><line x1=500 y1=300 x2=1000 y2=600></line><line x1=500 y1=300 x2=0 y2=300></line><line x1=500 y1=300 x2=1000 y2=300></line></g><rect x=420 y=240 width=160 height=120 stroke=#DC2626 stroke-width=2 stroke-opacity=0.8 fill=none></rect><rect x=340 y=180 width=320 height=240 stroke=#DC2626 stroke-width=2.5 stroke-opacity=0.6 fill=none></rect><rect x=220 y=90 width=560 height=420 stroke=#DC2626 stroke-width=3 stroke-opacity=0.4 fill=none></rect><rect x=80 y=0 width=840 height=600 stroke=#DC2626 stroke-width=4 stroke-opacity=0.2 fill=none></rect><circle cx=500 cy=300 r=28 fill=#DC2626 opacity=0.9></circle><circle cx=500 cy=300 r=14 fill=#FFFFFF></circle></svg>"
  },
  {
    "id": "illusion-house",
    "number": 4,
    "title": "Illusion House",
    "subtitle": "Defying Physics with Perspective & Anti-Gravity Rooms",
    "category": "Sensory Houses",
    "tagBadge": "Must-See Sensory",
    "scheduleBadge": "10:00 AM – 8:30 PM",
    "intensity": "Mild Intensity",
    "minHeight": "Min: All heights welcome",
    "duration": "25 mins",
    "description": "Gravity-defying tilted chambers, Ames rooms, upside-down living suites, and optical vortex tunnels designed for impossible photos.",
    "highlights": [
      "Inverted 180° Living Rooms",
      "Stroboscopic Water Levitation",
      "Ames Perspective Chamber",
      "Infinity Vortex Tunnel"
    ],
    "visualOrder": "left",
    "bgClass": "bg-[#0B0616]",
    "radialClass": "bg-radial from-purple-600/30 via-indigo-950/40 to-[#0B0616]",
    "hasGrid": false,
    "specs": {
      "rooms": "9 Immersive Perspective Chambers",
      "specialTech": "Stroboscopic ultrasound water droplet levitator",
      "vortexTunnel": "12-meter rotating neon optical cylindrical bridge",
      "ageRecommendation": "Fun for all age groups & families",
      "cameraFriendly": "Pre-calibrated phone stands at optimal optical focal points"
    },
    "svg": "<svg viewBox=\"0 0 1000 600\" fill=none xmlns=http://www.w3.org/2000/svg class=\"w-full h-full object-cover\" preserveAspectRatio=\"xMidYMid slice\"><g stroke=#A78BFA stroke-opacity=0.4 stroke-width=2><line x1=500 y1=300 x2=0 y2=0></line><line x1=500 y1=300 x2=250 y2=0></line><line x1=500 y1=300 x2=500 y2=0></line><line x1=500 y1=300 x2=750 y2=0></line><line x1=500 y1=300 x2=1000 y2=0></line><line x1=500 y1=300 x2=0 y2=600></line><line x1=500 y1=300 x2=250 y2=600></line><line x1=500 y1=300 x2=500 y2=600></line><line x1=500 y1=300 x2=750 y2=600></line><line x1=500 y1=300 x2=1000 y2=600></line><line x1=500 y1=300 x2=0 y2=300></line><line x1=500 y1=300 x2=1000 y2=300></line></g><rect x=420 y=240 width=160 height=120 stroke=#8B5CF6 stroke-width=2 stroke-opacity=0.8 fill=none></rect><rect x=340 y=180 width=320 height=240 stroke=#8B5CF6 stroke-width=2.5 stroke-opacity=0.6 fill=none></rect><rect x=220 y=90 width=560 height=420 stroke=#8B5CF6 stroke-width=3 stroke-opacity=0.4 fill=none></rect><rect x=80 y=0 width=840 height=600 stroke=#8B5CF6 stroke-width=4 stroke-opacity=0.2 fill=none></rect><circle cx=500 cy=300 r=28 fill=#8B5CF6 opacity=0.9></circle><circle cx=500 cy=300 r=14 fill=#FFFFFF></circle></svg>"
  },
  {
    "id": "theatre-7d",
    "number": 5,
    "title": "7D Theatre",
    "subtitle": "Hyper-Immersive Cinema with Full Physical Sensation",
    "category": "Adrenaline",
    "tagBadge": "Cinematic Sensation",
    "scheduleBadge": "Shows every 20 mins from 10:30 AM",
    "intensity": "High Intensity",
    "minHeight": "Min: 105 cm",
    "duration": "15 mins per show",
    "description": "Multi-axis pneumatic motion seats paired with wind gusts, water mist, atmospheric scents, leg ticklers, and 4K stereoscopic visuals.",
    "highlights": [
      "6-DOF Pneumatic Motion Base",
      "Stereoscopic Active 3D",
      "Real Wind, Rain, Snow & Scent",
      "Sub-frequency Bass Pulsing"
    ],
    "visualOrder": "right",
    "bgClass": "bg-[#040C1A]",
    "radialClass": "bg-radial from-blue-600/30 via-slate-900/40 to-[#040C1A]",
    "hasGrid": false,
    "specs": {
      "motionSystem": "6-Degrees-of-Freedom Hydraulic & Electric Actuator Platform",
      "projectors": "Dual 4K Laser Barco Projection with 144Hz Active Stereoscopy",
      "fxPneumatics": "Real-time pressurized air blast, water droplets, aromatic scents",
      "theatreCapacity": "64 Synchronized motion seats per auditorium"
    },
    "svg": "<svg viewBox=\"0 0 1000 600\" fill=none xmlns=http://www.w3.org/2000/svg class=\"w-full h-full object-cover\" preserveAspectRatio=\"xMidYMid slice\"><g stroke=#60A5FA stroke-opacity=0.4 stroke-width=2><line x1=500 y1=300 x2=0 y2=0></line><line x1=500 y1=300 x2=250 y2=0></line><line x1=500 y1=300 x2=500 y2=0></line><line x1=500 y1=300 x2=750 y2=0></line><line x1=500 y1=300 x2=1000 y2=0></line><line x1=500 y1=300 x2=0 y2=600></line><line x1=500 y1=300 x2=250 y2=600></line><line x1=500 y1=300 x2=500 y2=600></line><line x1=500 y1=300 x2=750 y2=600></line><line x1=500 y1=300 x2=1000 y2=600></line><line x1=500 y1=300 x2=0 y2=300></line><line x1=500 y1=300 x2=1000 y2=300></line></g><rect x=420 y=240 width=160 height=120 stroke=#2563EB stroke-width=2 stroke-opacity=0.8 fill=none></rect><rect x=340 y=180 width=320 height=240 stroke=#2563EB stroke-width=2.5 stroke-opacity=0.6 fill=none></rect><rect x=220 y=90 width=560 height=420 stroke=#2563EB stroke-width=3 stroke-opacity=0.4 fill=none></rect><rect x=80 y=0 width=840 height=600 stroke=#2563EB stroke-width=4 stroke-opacity=0.2 fill=none></rect><circle cx=500 cy=300 r=28 fill=#2563EB opacity=0.9></circle><circle cx=500 cy=300 r=14 fill=#FFFFFF></circle></svg>"
  },
  {
    "id": "water-park",
    "number": 6,
    "title": "Water Park: Atlantis Lagoon",
    "subtitle": "Tropical Oasis of Colossal Wave Pools & Freefall Slides",
    "category": "Water Park",
    "tagBadge": "Ultimate Summer Thrill",
    "scheduleBadge": "10:00 AM – 6:30 PM",
    "intensity": "High Intensity",
    "minHeight": "Min: 110 cm for speed slides",
    "duration": "Unlimited daytime access",
    "description": "A sun-drenched aquatic wonderland with 24 high-speed slides, a 2.5-meter swell tidal wave pool, and an 800-meter scenic lazy river.",
    "highlights": [
      "24 Extreme & Family Slides",
      "Mega Tidal Wave Pool (2.5m Swells)",
      "800m Scenic Lazy River",
      "VIP Cabanas with Butler Service"
    ],
    "visualOrder": "left",
    "bgClass": "bg-[#031626]",
    "radialClass": "bg-radial from-[#0284c7]/30 via-[#07243b] to-[#031626]",
    "hasGrid": false,
    "specs": {
      "waterSlides": "24 Engineered Speed Slides (including 20m Freefall Drop)",
      "wavePool": "6,000 sq meter Atlantis wave reservoir generating 2.5m swells",
      "lazyRiver": "800m thermal temperature-controlled scenic float stream",
      "waterQuality": "Continuous UV + Ozonation multi-barrier filtration system"
    },
    "svg": "<svg viewBox=\"0 0 1000 600\" fill=none xmlns=http://www.w3.org/2000/svg class=\"w-full h-full object-cover\" preserveAspectRatio=\"xMidYMid slice\"><defs><lineargradient id=waterFlow x1=0% y1=0% x2=100% y2=100%><stop offset=0% stop-color=#38BDF8></stop><stop offset=50% stop-color=#0284C7></stop><stop offset=100% stop-color=#0369A1></stop></lineargradient><lineargradient id=slideSpiral x1=0% y1=0% x2=100% y2=0%><stop offset=0% stop-color=#F97316></stop><stop offset=50% stop-color=#FACC15></stop><stop offset=100% stop-color=#06B6D4></stop></lineargradient><radialgradient id=sunPool cx=50% cy=30% r=50%><stop offset=0% stop-color=#38BDF8 stop-opacity=0.4></stop><stop offset=100% stop-color=#031626 stop-opacity=0></stop></radialgradient></defs><rect width=1000 height=600 fill=#031626></rect><circle cx=500 cy=200 r=300 fill=url(#sunPool)></circle><path d=\"M150 80 C 350 40, 520 220, 320 300 C 120 380, 260 520, 680 480 C 820 460, 920 400, 960 500\" stroke=url(#slideSpiral) stroke-width=28 stroke-linecap=round stroke-opacity=0.9></path><path d=\"M150 80 C 350 40, 520 220, 320 300 C 120 380, 260 520, 680 480 C 820 460, 920 400, 960 500\" stroke=#FFFFFF stroke-width=3 stroke-dasharray=\"16 12\" stroke-opacity=0.6></path><path d=\"M800 60 C 650 120, 550 260, 720 340 C 860 400, 800 520, 500 520\" stroke=#00D2FF stroke-width=22 stroke-linecap=round stroke-opacity=0.8></path><g stroke=#38BDF8 stroke-width=2 stroke-opacity=0.5><path d=\"M 50 440 Q 250 400 450 440 T 850 440 T 1000 440\"></path><path d=\"M 0 480 Q 200 440 400 480 T 800 480 T 1000 480\" stroke-width=3 stroke-opacity=0.7></path><path d=\"M 80 520 Q 280 490 480 520 T 880 520 T 1050 520\" stroke-width=3 stroke-opacity=0.8></path><path d=\"M 20 560 Q 220 530 420 560 T 820 560 T 1020 560\" stroke-width=4 stroke=#7DD3FC></path></g><g fill=#020E18 opacity=0.9><path d=\"M 0 600 Q 80 480 120 320 C 130 310, 160 300, 210 320 C 180 340, 160 380, 140 460 L 0 600 Z\"></path><path d=\"M 120 320 Q 240 260 320 280 C 270 310, 220 340, 140 370 Z\"></path><path d=\"M 120 320 Q 180 220 240 210 C 200 250, 170 290, 130 330 Z\"></path><path d=\"M 1000 600 Q 920 460 880 300 C 870 290, 820 310, 780 340 C 820 360, 850 410, 870 480 L 1000 600 Z\"></path><path d=\"M 880 300 Q 760 250 690 280 C 740 300, 800 330, 860 350 Z\"></path></g><circle cx=280 cy=460 r=6 fill=#FACC15 opacity=0.8></circle><circle cx=720 cy=430 r=7 fill=#F97316 opacity=0.8></circle><circle cx=480 cy=380 r=5 fill=#38BDF8 opacity=0.9></circle></svg>"
  },
  {
    "id": "sanctuary-resort",
    "number": 7,
    "title": "The Thrills Sanctuary Resort",
    "subtitle": "Five-Star Luxury Villas & Serene Botanical Haven",
    "category": "Resort & Dining",
    "tagBadge": "Luxury Hospitality",
    "scheduleBadge": "24/7 Concierge & Reception",
    "intensity": "Mild Intensity",
    "minHeight": "Min: All guests welcome",
    "duration": "Overnight & Weekend Staycations",
    "description": "Private poolside pavilions, botanical garden suites, and world-class spa facilities designed for tranquil retreats alongside the park.",
    "highlights": [
      "Private Plunge Pools",
      "1-Hour Early Park Access",
      "Full-Service Ayurvedic Spa",
      "Bespoke Butler Service"
    ],
    "visualOrder": "right",
    "bgClass": "bg-[#0A1118]",
    "radialClass": "bg-radial from-[#d97706]/15 via-[#0e1722] to-[#0a1118]",
    "hasGrid": false,
    "specs": {
      "villas": "48 Private Pool Villas & Botanical Garden Pavilions",
      "perks": "Complimentary VIP Fast-Track bands and 60-min early park access",
      "wellness": "Signature Ayurvedic Holistic Spa & Himalayan salt steam suites",
      "concierge": "24/7 Dedicated buggy transit and personal resort butler"
    },
    "svg": "<svg viewBox=\"0 0 1000 600\" fill=none xmlns=http://www.w3.org/2000/svg class=\"w-full h-full object-cover\" preserveAspectRatio=\"xMidYMid slice\"><defs><lineargradient id=villaGlass x1=0% y1=0% x2=0% y2=100%><stop offset=0% stop-color=#F59E0B stop-opacity=0.8></stop><stop offset=100% stop-color=#B45309 stop-opacity=0.4></stop></lineargradient><lineargradient id=infinityWater x1=0% y1=0% x2=0% y2=100%><stop offset=0% stop-color=#0284C7 stop-opacity=0.7></stop><stop offset=100% stop-color=#042F2E stop-opacity=0.9></stop></lineargradient></defs><rect width=1000 height=600 fill=#0A1118></rect><g stroke=#334155 stroke-width=2><polygon points=\"180,240 820,240 760,200 240,200\" fill=#1E293B stroke=#475569 stroke-width=2></polygon><rect x=220 y=240 width=160 height=180 fill=url(#villaGlass) stroke=#F59E0B stroke-width=1.5></rect><rect x=420 y=240 width=160 height=180 fill=url(#villaGlass) stroke=#F59E0B stroke-width=1.5></rect><rect x=620 y=240 width=160 height=180 fill=url(#villaGlass) stroke=#F59E0B stroke-width=1.5></rect><line x1=200 y1=200 x2=200 y2=420 stroke=#94A3B8 stroke-width=4></line><line x1=400 y1=200 x2=400 y2=420 stroke=#94A3B8 stroke-width=4></line><line x1=600 y1=200 x2=600 y2=420 stroke=#94A3B8 stroke-width=4></line><line x1=800 y1=200 x2=800 y2=420 stroke=#94A3B8 stroke-width=4></line></g><g fill=#451A03 opacity=0.6><rect x=250 y=320 width=100 height=60 rx=4></rect><rect x=450 y=310 width=100 height=70 rx=4></rect><rect x=650 y=330 width=90 height=50 rx=4></rect></g><polygon points=\"120,420 880,420 940,580 60,580\" fill=url(#infinityWater) stroke=#38BDF8 stroke-width=1.5></polygon><line x1=240 y1=460 x2=420 y2=460 stroke=#F59E0B stroke-width=2 stroke-opacity=0.6 stroke-dasharray=\"18 12\"></line><line x1=480 y1=490 x2=720 y2=490 stroke=#F59E0B stroke-width=2 stroke-opacity=0.5 stroke-dasharray=\"24 16\"></line><line x1=180 y1=520 x2=520 y2=520 stroke=#38BDF8 stroke-width=2 stroke-opacity=0.7 stroke-dasharray=\"30 15\"></line><line x1=580 y1=540 x2=840 y2=540 stroke=#F59E0B stroke-width=2 stroke-opacity=0.6 stroke-dasharray=\"20 10\"></line><circle cx=160 cy=400 r=5 fill=#F59E0B></circle><circle cx=840 cy=400 r=5 fill=#F59E0B></circle></svg>"
  },
  {
    "id": "carousel-bistro",
    "number": 8,
    "title": "The Grand Carousel Bistro",
    "subtitle": "Artisanal Culinary Experiences with Parkside Panoramas",
    "category": "Resort & Dining",
    "tagBadge": "Gourmet Dining",
    "scheduleBadge": "11:30 AM – 10:30 PM",
    "intensity": "Mild Intensity",
    "minHeight": "Min: All guests welcome",
    "duration": "Lunch, Sunset & Dinner Service",
    "description": "Fine dining crafted by master chefs featuring wood-fired artisanal pizzas, coastal seafood grills, craft mocktails, and panoramic vistas.",
    "highlights": [
      "Panoramic Coaster Skyline Views",
      "Wood-Fired Hearth & Open Kitchen",
      "Craft Mocktail & Beverage Bar",
      "Executive Chef Tasting Menus"
    ],
    "visualOrder": "left",
    "bgClass": "bg-[#100D09]",
    "radialClass": "bg-radial from-[#f59e0b]/20 via-[#19140d] to-[#100d09]",
    "hasGrid": false,
    "specs": {
      "cuisine": "Modern Euro-Continental & Coastal Fusion Craft Gastronomy",
      "seating": "220-Seat panoramic terrace overlooking illuminated coaster tracks",
      "specialty": "72-Hour fermented Neapolitan sourdough & flame-seared steaks",
      "beverages": "Zero-proof molecular cocktail lounge and artisanal gelateria"
    },
    "svg": "<svg viewBox=\"0 0 1000 600\" fill=none xmlns=http://www.w3.org/2000/svg class=\"w-full h-full object-cover\" preserveAspectRatio=\"xMidYMid slice\"><defs><radialgradient id=hearthGlow cx=50% cy=40% r=50%><stop offset=0% stop-color=#EA580C stop-opacity=0.8></stop><stop offset=60% stop-color=#78350F stop-opacity=0.4></stop><stop offset=100% stop-color=#100D09 stop-opacity=0></stop></radialgradient></defs><rect width=1000 height=600 fill=#100D09></rect><circle cx=500 cy=280 r=320 fill=url(#hearthGlow)></circle><g stroke=#3F3F46 stroke-width=2><line x1=100 y1=100 x2=900 y2=100></line><line x1=100 y1=360 x2=900 y2=360></line><line x1=300 y1=100 x2=300 y2=360></line><line x1=500 y1=100 x2=500 y2=360></line><line x1=700 y1=100 x2=700 y2=360></line><path d=\"M 120 280 Q 300 160 500 240 T 880 180\" stroke=#0066FF stroke-width=2.5 stroke-opacity=0.6 stroke-dasharray=\"6 4\"></path><path d=\"M 240 260 Q 420 180 620 260 T 880 200\" stroke=#FF5500 stroke-width=1.5 stroke-opacity=0.5></path></g><ellipse cx=260 cy=460 rx=90 ry=24 fill=#27272A stroke=#52525B stroke-width=2></ellipse><line x1=260 y1=460 x2=260 y2=550 stroke=#3F3F46 stroke-width=6></line><ellipse cx=260 cy=454 rx=8 ry=4 fill=#FEF08A></ellipse><circle cx=260 cy=446 r=4 fill=#F59E0B></circle><ellipse cx=500 cy=480 rx=120 ry=32 fill=#27272A stroke=#71717A stroke-width=2></ellipse><line x1=500 y1=480 x2=500 y2=580 stroke=#3F3F46 stroke-width=8></line><ellipse cx=500 cy=472 rx=14 ry=6 fill=#FEF08A></ellipse><circle cx=500 cy=462 r=5 fill=#EA580C></circle><ellipse cx=440 cy=478 rx=20 ry=8 fill=#D4D4D8 stroke=#A1A1AA></ellipse><ellipse cx=560 cy=478 rx=20 ry=8 fill=#D4D4D8 stroke=#A1A1AA></ellipse><ellipse cx=740 cy=460 rx=90 ry=24 fill=#27272A stroke=#52525B stroke-width=2></ellipse><line x1=740 y1=460 x2=740 y2=550 stroke=#3F3F46 stroke-width=6></line><circle cx=740 cy=446 r=4 fill=#F59E0B></circle><g stroke=#D97706 stroke-width=2><line x1=260 y1=0 x2=260 y2=240></line><polygon points=\"245,240 275,240 260,260\" fill=#F59E0B></polygon><circle cx=260 cy=265 r=4 fill=#FEF08A></circle><line x1=500 y1=0 x2=500 y2=210></line><polygon points=\"480,210 520,210 500,235\" fill=#F59E0B></polygon><circle cx=500 cy=242 r=6 fill=#FEF08A></circle><line x1=740 y1=0 x2=740 y2=240></line><polygon points=\"725,240 755,240 740,260\" fill=#F59E0B></polygon><circle cx=740 cy=265 r=4 fill=#FEF08A></circle></g></svg>"
  }
];
