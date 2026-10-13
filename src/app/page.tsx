"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import {
  MapPin,
  Sparkles,
  Ticket,
  FerrisWheel,
  Waves,
  Camera,
  Gamepad2,
  Ghost,
  Orbit,
  Clapperboard,
  Palmtree,
  Building2,
  Heart,
  Mail,
  Star,
  Compass,
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

interface AttractionItem {
  id: number;
  icon: React.ReactNode;
  visualClass: string;
  indexLabel: string;
  topBadge: string;
  zoneTag: string;
  title: string;
  description: string;
  chips: string[];
  price?: string;
  isDiscoverCard?: boolean;
}

const ATTRACTIONS_DATA: AttractionItem[] = [
  {
    id: 1,
    icon: <Gamepad2 size={88} strokeWidth={1.8} />,
    visualClass: "clay-visual-1",
    indexLabel: "#01 ATTRACTION",
    topBadge: "POPULAR",
    zoneTag: "✦ THRILLS ADVENTURE ZONE",
    title: "Fun Zone",
    description:
      "A vibrant space packed with playful moments. Jump into action-packed games, interactive challenges, and non-stop excitement for kids, teens, and adults alike.",
    chips: ["Arcade Challenges", "All Ages Fun", "High Energy"],
    price: "₹100",
  },
  {
    id: 2,
    icon: <Sparkles size={88} strokeWidth={1.8} />,
    visualClass: "clay-visual-2",
    indexLabel: "#02 ATTRACTION",
    topBadge: "₹100 ENTRY",
    zoneTag: "✦ OPTICAL WONDER ZONE",
    title: "Mirror House",
    description:
      "Explore a world of playful reflections. Wander through dazzling mirror corridors and hilarious optical reflections that turn every step into a fun surprise.",
    chips: ["Endless Reflections", "Picture Perfect", "Laugh Out Loud"],
    price: "₹100",
  },
  {
    id: 3,
    icon: <Ghost size={88} strokeWidth={1.8} />,
    visualClass: "clay-visual-3",
    indexLabel: "#03 ATTRACTION",
    topBadge: "THRILL SEEKERS",
    zoneTag: "✦ SPOOKY MYSTERY ZONE",
    title: "Horror House",
    description:
      "For brave hearts who love a spooky surprise. Step inside eerie corridors filled with playful scares, mysterious shadows, and heart-racing thrills!",
    chips: ["Spooky Surprises", "Eerie Sound FX", "Brave Hearts"],
    price: "₹100",
  },
  {
    id: 4,
    icon: <Orbit size={88} strokeWidth={1.8} />,
    visualClass: "clay-visual-4",
    indexLabel: "#04 ATTRACTION",
    topBadge: "MUST VISIT",
    zoneTag: "✦ MIND-BENDING ZONE",
    title: "Illusion House",
    description:
      "Let your eyes play tricks on your imagination. Experience gravity-defying rooms, perspective puzzles, and mind-bending visual wonders.",
    chips: ["Mind-Bending", "Trick Photos", "Family Favorite"],
    price: "₹100",
  },
  {
    id: 5,
    icon: <Clapperboard size={88} strokeWidth={1.8} />,
    visualClass: "clay-visual-5",
    indexLabel: "#05 ATTRACTION",
    topBadge: "7D MOTION",
    zoneTag: "✦ IMMERSIVE CINEMA ZONE",
    title: "7D Theatre",
    description:
      "An immersive entertainment experience. Strap in for thrilling 3D visuals paired with motion seats and exciting multi-sensory theatre effects.",
    chips: ["3D Cinema", "Motion Seats", "Sensory Effects"],
    price: "₹100",
  },
  {
    id: 6,
    icon: <Palmtree size={88} strokeWidth={1.8} />,
    visualClass: "clay-visual-6",
    indexLabel: "#06 FULL PARK",
    topBadge: "ALL-DAY JOY",
    zoneTag: "✦ COMPLETE PARK EXPERIENCE",
    title: "And More Fun!",
    description:
      "Explore the park and make a day of it. From refreshing water splashes to relaxing hangout zones, there is always more joy waiting around every corner.",
    chips: ["Water & Pool Fun", "Group Outings", "Full Day Joy"],
    isDiscoverCard: true,
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("General Enquiry");
  const [visitDate, setVisitDate] = useState("");
  const [galleryPreviews, setGalleryPreviews] = useState<
    [string | null, string | null, string | null]
  >([null, null, null]);

  const prefersReducedMotion = useReducedMotion();

  // Hero 3D Clay Fan-Out Scroll State & Refs
  const heroSectionRef = useRef<HTMLElement>(null);
  const [fanSpreadFactor, setFanSpreadFactor] = useState(1);

  // Pinned Attractions Scroll Reel State & Refs
  const attractionsSectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [maxTranslateX, setMaxTranslateX] = useState(0);

  useEffect(() => {
    const updateResponsiveMetrics = () => {
      const vw = window.innerWidth;
      if (vw <= 480) {
        setFanSpreadFactor(0.52);
      } else if (vw <= 740) {
        setFanSpreadFactor(0.62);
      } else if (vw <= 950) {
        setFanSpreadFactor(0.78);
      } else {
        setFanSpreadFactor(1);
      }

      if (!trackRef.current) return;
      const cards = trackRef.current.children;
      if (cards.length === 0) return;

      const firstCard = cards[0] as HTMLElement;
      const lastCard = cards[cards.length - 1] as HTMLElement;

      const firstCardCenter = firstCard.offsetLeft + firstCard.offsetWidth / 2;
      const lastCardCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;

      setMaxTranslateX(Math.max(0, lastCardCenter - firstCardCenter));
    };

    updateResponsiveMetrics();
    const timer = setTimeout(updateResponsiveMetrics, 150);
    window.addEventListener("resize", updateResponsiveMetrics);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateResponsiveMetrics);
    };
  }, []);

  // Hero 4-Scene Scroll Progress (0.00 -> 1.00)
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end end"],
  });

  // Central Turquoise Card (.ticket-shape): Scene A (tilted 8deg) -> Scene B (levels to 2deg & scales 1.05) -> Scene C (holds) -> Scene D (settles)
  const centerCardRotate = useTransform(
    heroScrollProgress,
    [0, 0.05, 0.55, 0.8, 1],
    [8, 8, 2, 2, 0]
  );
  const centerCardScale = useTransform(
    heroScrollProgress,
    [0, 0.05, 0.55, 0.8, 1],
    [1, 1, 1.05, 1.05, 0.98]
  );
  const centerCardY = useTransform(
    heroScrollProgress,
    [0, 0.55, 0.8, 1],
    [0, -6, -6, -18]
  );

  // Sun & Decorative Clay Objects Parallax
  const sunScale = useTransform(
    heroScrollProgress,
    [0, 0.55, 1],
    [1, 1.12, 1.04]
  );
  const sunRotate = useTransform(heroScrollProgress, [0, 1], [0, 45]);
  const sunY = useTransform(heroScrollProgress, [0, 0.6, 1], [0, -18, -30]);

  // Satellite 1: Upper-Left ("Thrilling Rides")
  const satULX = useTransform(
    heroScrollProgress,
    [0, 0.05, 0.52, 0.8, 1],
    [
      -38 * fanSpreadFactor,
      -42 * fanSpreadFactor,
      -172 * fanSpreadFactor,
      -172 * fanSpreadFactor,
      -162 * fanSpreadFactor,
    ]
  );
  const satULY = useTransform(
    heroScrollProgress,
    [0, 0.05, 0.52, 0.8, 1],
    [
      -28 * fanSpreadFactor,
      -32 * fanSpreadFactor,
      -126 * fanSpreadFactor,
      -126 * fanSpreadFactor,
      -138 * fanSpreadFactor,
    ]
  );
  const satULRotate = useTransform(
    heroScrollProgress,
    [0, 0.05, 0.52, 0.8, 1],
    [-4, -4, -10, -10, -8]
  );
  const satULScale = useTransform(
    heroScrollProgress,
    [0, 0.05, 0.52, 0.8, 1],
    [0.82, 0.84, 1, 1, 0.96]
  );

  // Satellite 2: Upper-Right ("Family Fun")
  const satURX = useTransform(
    heroScrollProgress,
    [0, 0.07, 0.54, 0.8, 1],
    [
      38 * fanSpreadFactor,
      44 * fanSpreadFactor,
      168 * fanSpreadFactor,
      168 * fanSpreadFactor,
      158 * fanSpreadFactor,
    ]
  );
  const satURY = useTransform(
    heroScrollProgress,
    [0, 0.07, 0.54, 0.8, 1],
    [
      -26 * fanSpreadFactor,
      -30 * fanSpreadFactor,
      -118 * fanSpreadFactor,
      -118 * fanSpreadFactor,
      -130 * fanSpreadFactor,
    ]
  );
  const satURRotate = useTransform(
    heroScrollProgress,
    [0, 0.07, 0.54, 0.8, 1],
    [5, 5, 9, 9, 7]
  );
  const satURScale = useTransform(
    heroScrollProgress,
    [0, 0.07, 0.54, 0.8, 1],
    [0.82, 0.84, 1, 1, 0.96]
  );

  // Satellite 3: Lower-Left ("Happy Memories")
  const satLLX = useTransform(
    heroScrollProgress,
    [0, 0.09, 0.56, 0.8, 1],
    [
      -40 * fanSpreadFactor,
      -46 * fanSpreadFactor,
      -174 * fanSpreadFactor,
      -174 * fanSpreadFactor,
      -164 * fanSpreadFactor,
    ]
  );
  const satLLY = useTransform(
    heroScrollProgress,
    [0, 0.09, 0.56, 0.8, 1],
    [
      30 * fanSpreadFactor,
      36 * fanSpreadFactor,
      124 * fanSpreadFactor,
      124 * fanSpreadFactor,
      110 * fanSpreadFactor,
    ]
  );
  const satLLRotate = useTransform(
    heroScrollProgress,
    [0, 0.09, 0.56, 0.8, 1],
    [-3, -3, -7, -7, -5]
  );
  const satLLScale = useTransform(
    heroScrollProgress,
    [0, 0.09, 0.56, 0.8, 1],
    [0.82, 0.84, 1, 1, 0.96]
  );

  // Satellite 4: Lower-Right ("Day Packages")
  const satLRX = useTransform(
    heroScrollProgress,
    [0, 0.11, 0.58, 0.8, 1],
    [
      40 * fanSpreadFactor,
      46 * fanSpreadFactor,
      166 * fanSpreadFactor,
      166 * fanSpreadFactor,
      156 * fanSpreadFactor,
    ]
  );
  const satLRY = useTransform(
    heroScrollProgress,
    [0, 0.11, 0.58, 0.8, 1],
    [
      32 * fanSpreadFactor,
      38 * fanSpreadFactor,
      126 * fanSpreadFactor,
      126 * fanSpreadFactor,
      112 * fanSpreadFactor,
    ]
  );
  const satLRRotate = useTransform(
    heroScrollProgress,
    [0, 0.11, 0.58, 0.8, 1],
    [4, 4, 8, 8, 6]
  );
  const satLRScale = useTransform(
    heroScrollProgress,
    [0, 0.11, 0.58, 0.8, 1],
    [0.82, 0.84, 1, 1, 0.96]
  );

  // Floating Sticker Pills Parallax
  const floatOneY = useTransform(
    heroScrollProgress,
    [0, 0.55, 1],
    [0, -28 * fanSpreadFactor, -36 * fanSpreadFactor]
  );
  const floatTwoY = useTransform(
    heroScrollProgress,
    [0, 0.55, 1],
    [0, 26 * fanSpreadFactor, 18 * fanSpreadFactor]
  );

  // Left Copy Subtle Scene D Handoff Lift
  const heroCopyY = useTransform(heroScrollProgress, [0, 0.8, 1], [0, 0, -16]);

  const { scrollYProgress } = useScroll({
    target: attractionsSectionRef,
    offset: ["start start", "end end"],
  });

  // Phase 1: Zoom-in entry (0 -> 0.16) & subtle exit settle (0.90 -> 1.0)
  const scale = useTransform(
    scrollYProgress,
    [0, 0.16, 0.9, 1],
    [0.76, 1, 1, 0.94]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0.55, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.16], [10, 0]);

  // Phase 2: Horizontal card-by-card glide (0.16 -> 0.86) & dwell buffer (0.86 -> 0.95)
  const x = useTransform(
    scrollYProgress,
    [0.16, 0.86, 0.95],
    [0, -maxTranslateX, -maxTranslateX]
  );

  // Clay progress bar fill width
  const progressWidth = useTransform(
    scrollYProgress,
    [0.16, 0.86],
    ["0%", "100%"]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest <= 0.16) {
      setActiveIndex(1);
    } else if (latest >= 0.86) {
      setActiveIndex(6);
    } else {
      const normalized = (latest - 0.16) / 0.7;
      const idx = Math.min(6, Math.max(1, Math.round(normalized * 5) + 1));
      setActiveIndex(idx);
    }
  });

  const scrollToCard = (index: number) => {
    if (!attractionsSectionRef.current) return;
    const sectionTop = attractionsSectionRef.current.offsetTop;
    const scrollableDistance =
      attractionsSectionRef.current.offsetHeight - window.innerHeight;
    const targetProgress = 0.16 + (index / 5) * 0.7;
    window.scrollTo({
      top: sectionTop + scrollableDistance * targetProgress,
      behavior: "smooth",
    });
  };

  const handleSelectPackage = (value: string) => {
    setSelectedPackage(value);
  };

  const handlePreviewImage = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        setGalleryPreviews((prev) => {
          const updated: [string | null, string | null, string | null] = [
            ...prev,
          ];
          updated[index] = result;
          return updated;
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSendEnquiry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const pkg = selectedPackage;
    const date = visitDate || "Not specified";
    const subject = "The Thrills Fun Park - Booking Enquiry";
    const body = `Hello The Thrills Fun Park Team,\n\nI would like to enquire about a visit.\n\nName: ${trimmedName}\nPhone: ${trimmedPhone}\nInterested in: ${pkg}\nPreferred date: ${date}\n\nPlease share booking details.\n\nThank you.`;
    window.location.href = `mailto:kcsinfra2023@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <div className="demo">
        ✦ DESIGN PREVIEW — DEMO WEBSITE · NOT AN OFFICIAL LIVE BOOKING SITE ✦
      </div>

      <header className="header">
        <div className="container nav">
          <a className="brand" href="#home">
            <span className="brandmark">✦</span>
            <span>
              THE THRILLS
              <small>FUN PARK</small>
            </span>
          </a>

          <nav className={`links${menuOpen ? " show" : ""}`} id="links">
            <a href="#home" onClick={() => setMenuOpen(false)}>
              Home
            </a>
            <a href="#attractions" onClick={() => setMenuOpen(false)}>
              Attractions
            </a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>
              Packages
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About Us
            </a>
            <a href="#gallery" onClick={() => setMenuOpen(false)}>
              Gallery
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
          </nav>

          <a className="btn btn-purple" href="#contact">
            Plan Your Visit <ArrowRight size={16} />
          </a>

          <button
            className="menu"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <main>
        <section
          ref={heroSectionRef}
          className={`hero hero-scroll-track${
            prefersReducedMotion ? " hero-reduced-motion" : ""
          }`}
          id="home"
        >
          <div className="hero-sticky-viewport">
            <div className="container hero-main">
              <motion.div
                className="hero-copy-col"
                style={prefersReducedMotion ? undefined : { y: heroCopyY }}
              >
                <div className="eyebrow">
                  <MapPin size={14} /> Begusarai, Bihar &nbsp; • &nbsp; Adventure
                  awaits
                </div>
                <h1>
                  LET THE
                  <br />
                  <em>FUN</em> BEGIN!
                </h1>
                <p>
                  One destination. Endless excitement. Discover unforgettable
                  experiences, joyful moments, and a whole lot of thrills!
                </p>
                <div className="hero-actions">
                  <a className="btn btn-yellow" href="#attractions">
                    Explore Attractions <ArrowUpRight size={16} />
                  </a>
                  <a className="btn btn-white" href="#pricing">
                    View Packages
                  </a>
                </div>
              </motion.div>

              <div
                className="hero-art"
                aria-label="3D Claymorphic amusement park card fan-out showcase"
              >
                {/* Miniature 3D Clay Sun Sphere & Halo Rings */}
                <motion.div
                  className="sun"
                  style={
                    prefersReducedMotion
                      ? undefined
                      : { scale: sunScale, rotate: sunRotate, y: sunY }
                  }
                />

                {/* Miniature Puffy 3D Clay Clouds & Tokens */}
                <div className="clay-cloud cloud-one" aria-hidden="true" />
                <div className="clay-cloud cloud-two" aria-hidden="true" />
                <div className="clay-mini-token token-star" aria-hidden="true">
                  <Star size={16} fill="currentColor" />
                </div>
                <div
                  className="clay-mini-token token-compass"
                  aria-hidden="true"
                >
                  <Compass size={16} />
                </div>

                {/* SATELLITE CARD 1: Upper-Left — Thrilling Rides */}
                <motion.div
                  className="hero-sat-card sat-ul"
                  style={
                    prefersReducedMotion
                      ? undefined
                      : {
                          x: satULX,
                          y: satULY,
                          rotate: satULRotate,
                          scale: satULScale,
                        }
                  }
                >
                  <div className="sat-icon-box sat-purple">
                    <Gamepad2 size={20} color="#ffffff" strokeWidth={2.2} />
                  </div>
                  <div className="sat-meta">
                    <span className="sat-badge">₹100 / Ride</span>
                    <strong>Thrilling Rides</strong>
                  </div>
                </motion.div>

                {/* SATELLITE CARD 2: Upper-Right — Family Fun */}
                <motion.div
                  className="hero-sat-card sat-ur"
                  style={
                    prefersReducedMotion
                      ? undefined
                      : {
                          x: satURX,
                          y: satURY,
                          rotate: satURRotate,
                          scale: satURScale,
                        }
                  }
                >
                  <div className="sat-icon-box sat-gold">
                    <FerrisWheel size={20} color="#142054" strokeWidth={2.2} />
                  </div>
                  <div className="sat-meta">
                    <span className="sat-badge">All Ages</span>
                    <strong>Family Fun</strong>
                  </div>
                </motion.div>

                {/* SATELLITE CARD 3: Lower-Left — Happy Memories */}
                <motion.div
                  className="hero-sat-card sat-ll"
                  style={
                    prefersReducedMotion
                      ? undefined
                      : {
                          x: satLLX,
                          y: satLLY,
                          rotate: satLLRotate,
                          scale: satLLScale,
                        }
                  }
                >
                  <div className="sat-icon-box sat-pink">
                    <Camera size={20} color="#ffffff" strokeWidth={2.2} />
                  </div>
                  <div className="sat-meta">
                    <span className="sat-badge">Photo Spots</span>
                    <strong>Happy Memories</strong>
                  </div>
                </motion.div>

                {/* SATELLITE CARD 4: Lower-Right — Day Packages */}
                <motion.div
                  className="hero-sat-card sat-lr"
                  style={
                    prefersReducedMotion
                      ? undefined
                      : {
                          x: satLRX,
                          y: satLRY,
                          rotate: satLRRotate,
                          scale: satLRScale,
                        }
                  }
                >
                  <div className="sat-icon-box sat-mint">
                    <Ticket size={20} color="#142054" strokeWidth={2.2} />
                  </div>
                  <div className="sat-meta">
                    <span className="sat-badge">From ₹699</span>
                    <strong>Day Packages</strong>
                  </div>
                </motion.div>

                {/* CENTRAL TURQUOISE 3D CLAY HERO CARD */}
                <motion.div
                  className="ticket-shape"
                  style={
                    prefersReducedMotion
                      ? undefined
                      : {
                          rotate: centerCardRotate,
                          scale: centerCardScale,
                          y: centerCardY,
                        }
                  }
                >
                  <span className="ticket-clay-tag">✦ PARK PASS</span>
                  <span className="ticket-text">
                    GOOD VIBES
                    <br />
                    ONLY!
                  </span>
                  <span className="ride2">
                    <FerrisWheel size={42} strokeWidth={2.2} />
                  </span>
                  <span className="ride">
                    <Waves size={140} strokeWidth={1.8} />
                  </span>
                  <span className="ticket-clay-zone-pill">6 ZONES</span>
                </motion.div>

                {/* Floating Clay Stickers */}
                <motion.div
                  className="float one"
                  style={prefersReducedMotion ? undefined : { y: floatOneY }}
                >
                  <b>
                    <Sparkles size={18} color="var(--purple)" />
                  </b>{" "}
                  Make happy memories
                </motion.div>
                <motion.div
                  className="float two"
                  style={prefersReducedMotion ? undefined : { y: floatTwoY }}
                >
                  <b>
                    <Ticket size={18} color="var(--pink)" />
                  </b>{" "}
                  Fun starts here!
                </motion.div>
              </div>
            </div>
            <div className="wave"></div>
          </div>
        </section>

        <div className="container featurestrip">
          <div className="feature">
            <div className="ico">
              <FerrisWheel size={26} color="var(--purple)" strokeWidth={2.2} />
            </div>
            <div>
              <strong>Exciting Attractions</strong>
              <span>Something fun for everyone</span>
            </div>
          </div>
          <div className="feature">
            <div className="ico">
              <Camera size={26} color="var(--purple)" strokeWidth={2.2} />
            </div>
            <div>
              <strong>Picture-Perfect Moments</strong>
              <span>Capture memories together</span>
            </div>
          </div>
          <div className="feature">
            <div className="ico">
              <MapPin size={26} color="var(--purple)" strokeWidth={2.2} />
            </div>
            <div>
              <strong>In Begusarai</strong>
              <span>Find your next day out</span>
            </div>
          </div>
        </div>

        {/* 3D CLAYMORPHIC PINNED ZOOM-IN & HORIZONTAL SCROLL REEL */}
        <section
          ref={attractionsSectionRef}
          className="attractions-pinned-section"
          id="attractions"
        >
          <div className="attractions-sticky-stage">
            {/* Compact Header Inside Sticky Stage */}
            <div className="container attractions-stage-header">
              <div>
                <div className="kicker">Discover the excitement</div>
                <h2>
                  Pick Your Next{" "}
                  <span style={{ color: "var(--purple)" }}>Adventure</span>
                </h2>
                <p className="lede">
                  Explore our attractions and find your kind of fun. Each
                  attraction below is listed at ₹100.
                </p>
              </div>

              <div className="clay-hud-box">
                <div className="clay-counter-pill">
                  <span className="clay-counter-dot" />
                  <span>
                    0{activeIndex} / 06 • 5 Attractions + More
                  </span>
                </div>
                <div className="clay-progress-track">
                  <motion.div
                    className="clay-progress-fill"
                    style={{ width: progressWidth }}
                  />
                </div>
              </div>
            </div>

            {/* 80%–90% Screen 3D Claymorphic Horizontal Reel */}
            <div className="attractions-reel-viewport">
              <motion.div
                className="attractions-zoom-wrapper"
                style={{
                  scale,
                  opacity,
                  rotateX,
                  transformOrigin: "center center",
                }}
              >
                <motion.div
                  ref={trackRef}
                  className="attractions-horizontal-track"
                  style={{ x }}
                >
                  {ATTRACTIONS_DATA.map((item, idx) => (
                    <article
                      key={item.id}
                      className={`clay-card${
                        activeIndex === idx + 1 ? " is-active" : ""
                      }`}
                    >
                      <div className="clay-card-inner">
                        {/* Left / Top: 3D Clay Visual Stage */}
                        <div className={`clay-visual ${item.visualClass}`}>
                          <div className="clay-ring-1" />
                          <div className="clay-ring-2" />
                          <span className="clay-pill-left">
                            {item.indexLabel}
                          </span>
                          <span className="clay-pill-right">
                            {item.topBadge}
                          </span>
                          <div className="clay-emoji-pedestal">
                            <span className="clay-emoji">{item.icon}</span>
                          </div>
                        </div>

                        {/* Right / Bottom: Tactile Clay Info Stage */}
                        <div className="clay-info">
                          <div className="clay-info-top">
                            <span className="clay-zone-tag">
                              {item.zoneTag}
                            </span>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>

                            <div className="clay-chips">
                              {item.chips.map((chip) => (
                                <span key={chip} className="clay-chip">
                                  {chip}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="clay-card-footer">
                            {item.isDiscoverCard ? (
                              <>
                                <span className="label">Discover the park</span>
                                <a href="#pricing" className="btn btn-purple">
                                  View Full Packages <ArrowRight size={16} />
                                </a>
                              </>
                            ) : (
                              <>
                                <div className="price">
                                  {item.price} <small>/ attraction</small>
                                </div>
                                <a
                                  href="#contact"
                                  className="btn btn-purple"
                                  onClick={() =>
                                    handleSelectPackage("Individual Attractions")
                                  }
                                >
                                  Book This Ride <ArrowRight size={16} />
                                </a>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Bottom Stage Controls */}
            <div className="container attractions-stage-footer">
              <div className="clay-dots" role="tablist" aria-label="Attractions">
                {ATTRACTIONS_DATA.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Jump to ${item.title}`}
                    className={`clay-dot${
                      activeIndex === idx + 1 ? " active" : ""
                    }`}
                    onClick={() => scrollToCard(idx)}
                  />
                ))}
              </div>
              <div className="clay-scroll-hint">
                <span>↕</span>
                <span>Scroll down to glide through all 6 cards</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section pricing" id="pricing">
          <div className="container">
            <div style={{ textAlign: "center" }}>
              <div className="kicker">Choose your experience</div>
              <h2>
                Packages Made for{" "}
                <span style={{ color: "var(--purple)" }}>Fun</span>
              </h2>
              <p className="lede" style={{ margin: "auto" }}>
                Two ways to enjoy The Thrills Fun Park. Choose the package that
                suits your visit.
              </p>
            </div>

            <div className="packages">
              <div className="package">
                <span className="label">STANDARD</span>
                <h3>Without Food</h3>
                <p>Fun park booking package without meals.</p>
                <div className="amount">₹699</div>
                <ul>
                  <li>Fun park booking package</li>
                  <li>Locker included free</li>
                  <li>Swimming costume included free</li>
                  <li>Take your provided costume home</li>
                </ul>
                <a
                  href="#contact"
                  className="btn btn-purple"
                  onClick={() => handleSelectPackage("Without Food — ₹699")}
                >
                  Enquire About This Package <ArrowRight size={16} />
                </a>
              </div>

              <div className="package featured">
                <div className="ribbon">
                  <Star size={12} fill="currentColor" /> FEATURED
                </div>
                <span className="label">WITH MEAL</span>
                <h3>With Food</h3>
                <p>Fun park booking package with lunch or dinner.</p>
                <div className="amount">₹999</div>
                <ul>
                  <li>Fun park booking package</li>
                  <li>Lunch or dinner included</li>
                  <li>Locker included free</li>
                  <li>Swimming costume included free</li>
                  <li>Take your provided costume home</li>
                </ul>
                <a
                  href="#contact"
                  className="btn btn-purple"
                  onClick={() => handleSelectPackage("With Food — ₹999")}
                >
                  Enquire About This Package <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <p className="note">
              Demo prices supplied for website design. Confirm whether package
              prices are per person, which attractions are included, and other
              booking conditions before making the website public.
            </p>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="container aboutgrid">
            <div className="aboutimage">
              <span className="illustration">
                <FerrisWheel size={150} color="#ffffff" strokeWidth={1.5} />
              </span>
            </div>
            <div>
              <div className="kicker">Who we are</div>
              <h2>
                Good Times.{" "}
                <span style={{ color: "var(--purple)" }}>Great Memories.</span>
              </h2>
              <p className="lede">
                Welcome to <strong>The Thrills Fun Park</strong>, a destination
                for fun and entertainment in Begusarai, Bihar. We aim to bring
                together exciting attractions and memorable experiences for
                families, friends and groups.
              </p>
              <div className="mini">
                <span>
                  <Building2 size={22} color="var(--purple)" />
                </span>
                <div>
                  <strong>Powered by Kali Charan Infra Pvt. Ltd.</strong>
                  <small>
                    Our company proudly presents The Thrills Fun Park.
                  </small>
                </div>
              </div>
              <div className="mini">
                <span>
                  <Heart size={22} color="var(--pink)" />
                </span>
                <div>
                  <strong>Fun For Every Occasion</strong>
                  <small>
                    Discover exciting activities and share joyful moments with
                    your loved ones.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section gallery" id="gallery">
          <div className="container">
            <div className="sectionhead">
              <div>
                <div className="kicker">A glimpse of the fun</div>
                <h2>
                  Moments from{" "}
                  <span style={{ color: "var(--purple)" }}>The Thrills</span>
                </h2>
                <p className="lede">
                  Add your real fun park photographs here — click each box to
                  select a picture from your computer.
                </p>
              </div>
            </div>

            <div className="gallerygrid">
              <label className="photobox">
                <span>
                  <Camera size={36} color="var(--navy)" strokeWidth={1.8} />
                </span>
                <strong>Park Overview</strong>
                <small>Click to upload a photo</small>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Park overview uploaded preview"
                  src={galleryPreviews[0] || undefined}
                  style={{ display: galleryPreviews[0] ? "block" : "none" }}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePreviewImage(0, e)}
                />
              </label>

              <label className="photobox">
                <span>
                  <Waves size={36} color="var(--navy)" strokeWidth={1.8} />
                </span>
                <strong>Water &amp; Pool Area</strong>
                <small>Click to upload a photo</small>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Pool area uploaded preview"
                  src={galleryPreviews[1] || undefined}
                  style={{ display: galleryPreviews[1] ? "block" : "none" }}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePreviewImage(1, e)}
                />
              </label>

              <label className="photobox">
                <span>
                  <FerrisWheel size={36} color="var(--navy)" strokeWidth={1.8} />
                </span>
                <strong>Attractions</strong>
                <small>Click to upload a photo</small>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Attractions uploaded preview"
                  src={galleryPreviews[2] || undefined}
                  style={{ display: galleryPreviews[2] ? "block" : "none" }}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePreviewImage(2, e)}
                />
              </label>
            </div>

            <p className="gallerytip">
              Note: Photo uploads are for this browser preview only. They are
              not saved into the downloaded HTML file.
            </p>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="container contactgrid">
            <div>
              <div className="kicker">Get in touch</div>
              <h2>
                Let&apos;s Make Your Next Day{" "}
                <span style={{ color: "var(--yellow)" }}>Amazing!</span>
              </h2>
              <p className="lede">
                Have a question about our attractions or packages? Send an
                enquiry using the form.
              </p>
              <div className="details">
                <span>
                  <MapPin size={20} color="var(--mint)" />
                </span>{" "}
                Begusarai, Bihar, India
              </div>
              <div className="details">
                <span>
                  <Mail size={20} color="var(--mint)" />
                </span>{" "}
                kcsinfra2023@gmail.com
              </div>
              <div className="details">
                <span>
                  <Building2 size={20} color="var(--mint)" />
                </span>{" "}
                Powered by Kali Charan Infra Pvt. Ltd.
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#b7c4e7",
                  marginTop: "35px",
                }}
              >
                This demo does not accept payments or confirm reservations.
              </p>
            </div>

            <form className="formbox" id="enquiry" onSubmit={handleSendEnquiry}>
              <h3>Plan Your Visit</h3>
              <p>
                Fill in the details. Your email app will open with the message
                ready to send.
              </p>

              <div className="fields">
                <div>
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    placeholder="Your number"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <label htmlFor="package">Interested In</label>
              <select
                id="package"
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
              >
                <option value="General Enquiry">General Enquiry</option>
                <option value="Without Food — ₹699">Without Food — ₹699</option>
                <option value="With Food — ₹999">With Food — ₹999</option>
                <option value="Individual Attractions">
                  Individual Attractions
                </option>
              </select>

              <label htmlFor="visit">Preferred Visit Date (optional)</label>
              <input
                id="visit"
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
              />

              <button className="btn btn-yellow" type="submit">
                Prepare Email Enquiry <ArrowUpRight size={16} />
              </button>
              <p className="helper">
                Your email application will open; sending is completed from
                there.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <strong>✦ THE THRILLS FUN PARK</strong>
          <span>Powered by Kali Charan Infra Pvt. Ltd. · Begusarai, Bihar</span>
          <span>
            Demo website design • Not an official booking confirmation platform
          </span>
        </div>
      </footer>

      <div className="stickybar">
        <a className="btn btn-yellow" href="#contact">
          Plan Your Visit
        </a>
      </div>
    </>
  );
}
