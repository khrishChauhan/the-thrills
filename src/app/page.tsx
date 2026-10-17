"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
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
  CheckCircle2,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ImagePlus,
} from "lucide-react";

interface AttractionItem {
  id: number;
  icon: React.ReactNode;
  visualClass: string;
  image: string;
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
    icon: <Gamepad2 size={36} strokeWidth={2.2} />,
    visualClass: "clay-visual-1",
    image: "/images/attractions/fun-zone.jpg",
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
    icon: <Sparkles size={36} strokeWidth={2.2} />,
    visualClass: "clay-visual-2",
    image: "/images/attractions/mirror-house.jpg",
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
    icon: <Ghost size={36} strokeWidth={2.2} />,
    visualClass: "clay-visual-3",
    image: "/images/attractions/horror-house.jpg",
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
    icon: <Orbit size={36} strokeWidth={2.2} />,
    visualClass: "clay-visual-4",
    image: "/images/attractions/illusion-house.jpg",
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
    icon: <Clapperboard size={36} strokeWidth={2.2} />,
    visualClass: "clay-visual-5",
    image: "/images/attractions/7d-theatre.jpg",
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
    icon: <Palmtree size={36} strokeWidth={2.2} />,
    visualClass: "clay-visual-6",
    image: "/images/attractions/more-fun.jpg",
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

type GalleryCategory =
  | "All Photos"
  | "Park Overview"
  | "Attractions"
  | "Water & Pool Area"
  | "Park Moments";

interface GalleryPhotoItem {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  category: Exclude<GalleryCategory, "All Photos">;
  span: "feature" | "tall" | "wide" | "standard";
  isCustomUpload?: boolean;
}

const GALLERY_CATEGORIES: GalleryCategory[] = [
  "All Photos",
  "Park Overview",
  "Attractions",
  "Water & Pool Area",
  "Park Moments",
];

const INITIAL_GALLERY_ITEMS: GalleryPhotoItem[] = [
  {
    id: "park-entrance-arch",
    src: "/images/park-entrance-arch.jpg",
    title: "The Grand Park Entrance Arch",
    subtitle: "Welcome gateway to The Thrills Fun Park in Begusarai",
    category: "Park Overview",
    span: "feature",
  },
  {
    id: "waterfall-lagoon",
    src: "/images/waterfall-lagoon.jpg",
    title: "Waterfall & Pool Lagoon",
    subtitle: "Refreshing water splashes and poolside family fun",
    category: "Water & Pool Area",
    span: "tall",
  },
  {
    id: "attractions-complex",
    src: "/images/attractions-complex.jpg",
    title: "The Thrills Attractions Arena",
    subtitle: "Action-packed rides and playful adventure zones",
    category: "Attractions",
    span: "standard",
  },
  {
    id: "concept-facades",
    src: "/images/concept-facades.jpg",
    title: "Sensory & Illusion Houses",
    subtitle: "Mirror House, Horror House, Illusion House & 7D Theatre",
    category: "Attractions",
    span: "wide",
  },
  {
    id: "resort-amphitheater",
    src: "/images/resort-amphitheater.jpg",
    title: "Open-Air Park Plaza & Promenade",
    subtitle: "Spacious gathering zones built for group outings",
    category: "Park Moments",
    span: "standard",
  },
  {
    id: "thrill-grill-exterior",
    src: "/images/thrill-grill-exterior.jpg",
    title: "The Thrill Grill & Dining Courtyard",
    subtitle: "Delicious meals and refreshments for With-Food package guests",
    category: "Park Moments",
    span: "standard",
  },
  {
    id: "vip-reception",
    src: "/images/vip-reception.jpg",
    title: "Guest Welcome & Ticketing Pavilion",
    subtitle: "Smooth entry, free lockers, and complimentary costume pickup",
    category: "Park Overview",
    span: "standard",
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("General Enquiry");
  const [visitDate, setVisitDate] = useState("");

  // Editorial Masonry Gallery State & Lightbox
  const [activeGalleryCategory, setActiveGalleryCategory] =
    useState<GalleryCategory>("All Photos");
  const [customGalleryItems, setCustomGalleryItems] = useState<
    GalleryPhotoItem[]
  >([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lastFocusedCardRef = useRef<HTMLButtonElement | null>(null);

  const prefersReducedMotion = useReducedMotion();

  // Hero 3D Clay Fan-Out Scroll State & Refs
  const heroSectionRef = useRef<HTMLElement>(null);
  const [fanSpreadFactor, setFanSpreadFactor] = useState(1);

  // Pinned Attractions Scroll Reel State & Refs
  const attractionsSectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [maxTranslateX, setMaxTranslateX] = useState(0);

  // Pinned Pricing ("Unfold Your Fun") State & Refs
  const pricingSectionRef = useRef<HTMLElement>(null);
  const [isDesktopPricing, setIsDesktopPricing] = useState(true);

  // About Us Section Ref for Subtle Ring Parallax
  const aboutSectionRef = useRef<HTMLElement>(null);

  // Contact Section Parallax & Living Form State
  const contactSectionRef = useRef<HTMLElement>(null);
  const [enquiryPrepared, setEnquiryPrepared] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  useEffect(() => {
    const updateMetrics = () => {
      const vw = window.innerWidth;
      setIsDesktopPricing(vw > 950);
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

    updateMetrics();
    const timer1 = setTimeout(updateMetrics, 120);
    const timer2 = setTimeout(updateMetrics, 450);
    window.addEventListener("resize", updateMetrics);
    window.addEventListener("orientationchange", updateMetrics);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("resize", updateMetrics);
      window.removeEventListener("orientationchange", updateMetrics);
    };
  }, []);

  // Hero 4-Scene Scroll Progress (0.00 -> 1.00)
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end end"],
  });

  // Subtle Hero Background Parallax & Depth
  const heroBgY = useTransform(heroScrollProgress, [0, 1], [0, 48]);
  const heroBgScale = useTransform(heroScrollProgress, [0, 1], [1.04, 1.12]);

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

  // =========================================================================
  // Pricing ("Unfold Your Fun") 4-Phase Scroll-Scrubbed Transforms (0.00 -> 1.00)
  // Phase 1 (0.00 -> 0.25): Full Centered Card Hold (Package A dead-center, upright)
  // Phase 2 (0.25 -> 0.48): Package B Peeks Out from Behind (zero negative Y)
  // Phase 3 (0.48 -> 0.80): Smooth Side-by-Side Unfold into 2-Column Grid
  // Phase 4 (0.80 -> 1.00): Final 2-Column Side-by-Side Hold Before Unpin
  // =========================================================================
  const shouldUnfoldPricing = !prefersReducedMotion && isDesktopPricing;

  const { scrollYProgress: pricingScrollProgress } = useScroll({
    target: pricingSectionRef,
    offset: ["start start", "end end"],
  });

  // Package A (Without Food — ₹699, Left Column, Foreground z-index: 3)
  const pkgAX = useTransform(
    pricingScrollProgress,
    [0, 0.25, 0.48, 0.8, 1],
    [238, 238, 175, 0, 0]
  );
  const pkgAY = useTransform(
    pricingScrollProgress,
    [0, 0.25, 0.48, 0.8, 1],
    [0, 0, 0, 0, 0]
  );
  const pkgARotateX = useTransform(
    pricingScrollProgress,
    [0, 0.25, 0.8, 1],
    [0, 0, 0, 0]
  );
  const pkgARotateZ = useTransform(
    pricingScrollProgress,
    [0, 0.25, 0.48, 0.8, 1],
    [0, 0, -1.5, 0, 0]
  );
  const pkgAScale = useTransform(
    pricingScrollProgress,
    [0, 0.25, 0.48, 0.8, 1],
    [1, 1, 1, 1, 1]
  );

  // Package B (With Food — ₹999, Right Column, Behind Package A z-index: 2)
  const pkgBX = useTransform(
    pricingScrollProgress,
    [0, 0.22, 0.48, 0.8, 1],
    [-238, -238, -115, 0, 0]
  );
  const pkgBY = useTransform(
    pricingScrollProgress,
    [0, 0.25, 0.48, 0.8, 1],
    [0, 0, 0, 0, 0]
  );
  const pkgBRotateZ = useTransform(
    pricingScrollProgress,
    [0, 0.25, 0.48, 0.8, 1],
    [0, 0, 3.5, 0, 0]
  );
  const pkgBScale = useTransform(
    pricingScrollProgress,
    [0, 0.25, 0.48, 0.8, 1],
    [0.92, 0.92, 0.97, 1, 1]
  );
  const pkgBOpacity = useTransform(
    pricingScrollProgress,
    [0, 0.18, 0.28, 1],
    [0, 0, 1, 1]
  );

  // Decorative 3D Clay Admission Ticket Stub on the upper-right side edge of Package B
  const admitStubX = useTransform(
    pricingScrollProgress,
    [0, 0.25, 0.48, 0.8, 1],
    [-24, -18, 12, 6, 6]
  );
  const admitStubY = useTransform(
    pricingScrollProgress,
    [0, 0.25, 0.48, 0.8, 1],
    [0, 0, 0, 0, 0]
  );
  const admitStubRotate = useTransform(
    pricingScrollProgress,
    [0, 0.25, 0.48, 0.8, 1],
    [0, 2, 10, 6, 6]
  );

  // Parallax Background Clay Rings & Spheres
  const pricingBgRing1Y = useTransform(pricingScrollProgress, [0, 1], [36, -42]);
  const pricingBgRing2Y = useTransform(pricingScrollProgress, [0, 1], [-28, 38]);

  // About Us Section Subtle Ring Scroll Parallax
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutSectionRef,
    offset: ["start end", "end start"],
  });
  const aboutRingPrimaryY = useTransform(aboutScrollProgress, [0, 1], [18, -18]);
  const aboutRingSecondaryY = useTransform(
    aboutScrollProgress,
    [0, 1],
    [-14, 14]
  );

  // Contact Section Restrained Scroll Parallax
  const { scrollYProgress: contactScrollProgress } = useScroll({
    target: contactSectionRef,
    offset: ["start end", "end start"],
  });
  const contactRing1Y = useTransform(contactScrollProgress, [0, 1], [18, -18]);
  const contactRing2Y = useTransform(contactScrollProgress, [0, 1], [-14, 14]);
  const contactRibbonY = useTransform(contactScrollProgress, [0, 1], [10, -10]);

  const handleSelectPackage = (value: string) => {
    setSelectedPackage(value);
  };

  const allGalleryItems = [...customGalleryItems, ...INITIAL_GALLERY_ITEMS];
  const filteredGalleryItems =
    activeGalleryCategory === "All Photos"
      ? allGalleryItems
      : allGalleryItems.filter(
          (item) => item.category === activeGalleryCategory
        );

  const getCategoryCount = (cat: GalleryCategory) => {
    if (cat === "All Photos") return allGalleryItems.length;
    return allGalleryItems.filter((item) => item.category === cat).length;
  };

  const handleCustomGalleryUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        const cleanName = file.name.replace(/\.[^/.]+$/, "");
        const newItem: GalleryPhotoItem = {
          id: `custom-${Date.now()}`,
          src: result,
          title: cleanName ? `Guest Preview — ${cleanName}` : "Custom Park Photo Preview",
          subtitle: "Browser preview photo uploaded from your computer",
          category: "Park Moments",
          span: "standard",
          isCustomUpload: true,
        };
        setCustomGalleryItems((prev) => [newItem, ...prev]);
        setActiveGalleryCategory("All Photos");
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const openLightbox = (index: number, buttonEl: HTMLButtonElement) => {
    lastFocusedCardRef.current = buttonEl;
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setTimeout(() => {
      lastFocusedCardRef.current?.focus();
    }, 20);
  };

  const navigateLightbox = (direction: -1 | 1) => {
    if (lightboxIndex === null || filteredGalleryItems.length === 0) return;
    setLightboxIndex(
      (lightboxIndex + direction + filteredGalleryItems.length) %
        filteredGalleryItems.length
    );
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setLightboxIndex(null);
        setTimeout(() => {
          lastFocusedCardRef.current?.focus();
        }, 20);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredGalleryItems.length) %
              filteredGalleryItems.length
        );
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev + 1) % filteredGalleryItems.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, filteredGalleryItems.length]);

  // Mobile Navigation Drawer Refs & Focus Management
  const drawerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstDrawerLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = setTimeout(() => {
      firstDrawerLinkRef.current?.focus();
    }, 40);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const closeDrawer = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  const handleSendEnquiry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const pkg = selectedPackage;
    const date = visitDate || "Not specified";
    const subject = "The Thrills Fun Park - Booking Enquiry";
    const body = `Hello The Thrills Fun Park Team,\n\nI would like to enquire about a visit.\n\nName: ${trimmedName}\nPhone: ${trimmedPhone}\nInterested in: ${pkg}\nPreferred date: ${date}\n\nPlease share booking details.\n\nThank you.`;
    setEnquiryPrepared(true);
    window.location.href = `mailto:kcsinfra2023@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <div className="demo">
        ✦ DESIGN PREVIEW — DEMO WEBSITE · NOT AN OFFICIAL LIVE BOOKING SITE ✦
      </div>

      {/* Accessible Left-Side Slide-In Mobile Navigation Drawer */}
      <div
        className={`mobile-menu-backdrop drawer-backdrop${menuOpen ? " is-open" : ""}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <aside
        id="mobile-drawer"
        ref={drawerRef}
        className={`drawer-panel${menuOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        tabIndex={-1}
      >
        <div className="drawer-header">
          <a
            className="brand"
            href="#home"
            onClick={handleNavClick}
            aria-label="The Thrills Fun Park — Home"
          >
            <span className="brandmark brandmark-sm" aria-hidden="true">
              <svg
                className="brandmark-svg"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1.5"
                  y="1.5"
                  width="33"
                  height="33"
                  rx="8"
                  fill="#FFCE46"
                  stroke="#141D47"
                  strokeWidth="2"
                />
                <path
                  d="M 18 7 Q 18 18 29 18 Q 18 18 18 29 Q 18 18 7 18 Q 18 18 18 7 Z"
                  fill="#141D47"
                />
              </svg>
            </span>
            <span className="brand-copy">
              <span className="brand-title">THE THRILLS</span>
              <small className="brand-tagline">FUN PARK</small>
            </span>
          </a>

          <button
            className="drawer-close-btn"
            onClick={closeDrawer}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="drawer-divider" aria-hidden="true" />

        <nav className="drawer-nav" aria-label="Mobile Navigation Links">
          <a
            ref={firstDrawerLinkRef}
            href="#home"
            onClick={handleNavClick}
            className="drawer-link"
          >
            <span>Home</span>
            <span className="drawer-link-arrow">→</span>
          </a>
          <a
            href="#attractions"
            onClick={handleNavClick}
            className="drawer-link"
          >
            <span>Attractions</span>
            <span className="drawer-link-arrow">→</span>
          </a>
          <a
            href="#pricing"
            onClick={handleNavClick}
            className="drawer-link"
          >
            <span>Packages</span>
            <span className="drawer-link-arrow">→</span>
          </a>
          <a
            href="#about"
            onClick={handleNavClick}
            className="drawer-link"
          >
            <span>About Us</span>
            <span className="drawer-link-arrow">→</span>
          </a>
          <a
            href="#gallery"
            onClick={handleNavClick}
            className="drawer-link"
          >
            <span>Gallery</span>
            <span className="drawer-link-arrow">→</span>
          </a>
          <a
            href="#contact"
            onClick={handleNavClick}
            className="drawer-link"
          >
            <span>Contact</span>
            <span className="drawer-link-arrow">→</span>
          </a>
        </nav>

        <div className="drawer-footer">
          <a
            className="btn btn-purple drawer-cta"
            href="#contact"
            onClick={handleNavClick}
          >
            Plan Your Visit →
          </a>
          <p className="drawer-location">
            <MapPin size={13} /> Begusarai, Bihar · Open 10 AM – 7 PM
          </p>
        </div>
      </aside>

      <header className="header">
        <div className="container nav">
          <a
            className="brand"
            href="#home"
            aria-label="The Thrills Fun Park — Home"
          >
            <span className="brandmark" aria-hidden="true">
              <svg
                className="brandmark-svg"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1.5"
                  y="1.5"
                  width="33"
                  height="33"
                  rx="8"
                  fill="#FFCE46"
                  stroke="#141D47"
                  strokeWidth="2"
                />
                <path
                  d="M 18 7 Q 18 18 29 18 Q 18 18 18 29 Q 18 18 7 18 Q 18 18 18 7 Z"
                  fill="#141D47"
                />
              </svg>
            </span>
            <span className="brand-copy">
              <span className="brand-title">THE THRILLS</span>
              <small className="brand-tagline">FUN PARK</small>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="links" id="links" aria-label="Main Navigation">
            <a href="#home">Home</a>
            <a href="#attractions">Attractions</a>
            <a href="#pricing">Packages</a>
            <a href="#about">About Us</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
          </nav>

          <a className="btn btn-purple" href="#contact">
            Plan Your Visit <ArrowRight size={16} />
          </a>

          {/* Accessible Mobile Menu Hamburger Button */}
          <button
            ref={menuButtonRef}
            className="menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
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
            {/* CINEMATIC COMPOSITE BACKGROUND: Authentic Park & Restaurant Facade */}
            <div className="hero-bg-container" aria-hidden="true">
              <motion.div
                className="hero-bg-media"
                style={
                  prefersReducedMotion
                    ? undefined
                    : { y: heroBgY, scale: heroBgScale }
                }
              >
                <Image
                  src="/images/hero-park-facade.png"
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  quality={88}
                  className="hero-bg-img"
                />
              </motion.div>
              {/* Tonal Brand Blend Overlay (Harmonizes photo with #141d47 navy & #6650ac purple) */}
              <div className="hero-bg-brand-overlay" />
              {/* Left-Side Contrast Vignette (Ensures 100% WCAG AAA text legibility) */}
              <div className="hero-bg-text-vignette" />
              {/* Warm Golden Neon Ambient Glow (Echoes the building's illuminated arches) */}
              <div className="hero-bg-neon-glow" />
              {/* Bottom Wave Transition Gradient */}
              <div className="hero-bg-bottom-fade" />
            </div>

            <div className="container hero-main">
              <motion.div
                className="hero-copy-col"
                style={prefersReducedMotion ? undefined : { y: heroCopyY }}
              >
                <div className="eyebrow">
                  <MapPin size={14} /> Begusarai, Bihar · Adventure awaits
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
            <div className="wave" aria-hidden="true">
              {/* Back Atmospheric Wave Layer (Translucent Lavender-White) */}
              <svg
                className="wave-track wave-track-back"
                viewBox="0 0 2880 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,58 C180,22 360,84 540,42 C720,14 900,78 1080,36 C1260,8 1350,76 1440,58 C1620,22 1800,84 1980,42 C2160,14 2340,78 2520,36 C2700,8 2790,76 2880,58 L2880,100 L0,100 Z"
                  fill="rgba(235, 228, 255, 0.26)"
                />
              </svg>

              {/* Front Main Wave Layer (Solid var(--bg) #f7f9ff) */}
              <svg
                className="wave-track wave-track-front"
                viewBox="0 0 2880 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,64 L144,84 L288,50 L461,75 L648,40 L864,70 L1051,44 L1224,68 L1340,34 L1440,64 L1584,84 L1728,50 L1901,75 L2088,40 L2304,70 L2491,44 L2664,68 L2780,34 L2880,64 L2880,100 L0,100 Z"
                  fill="var(--bg)"
                />
              </svg>
            </div>
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
                        {/* Left / Top: 3D Clay Visual Stage with Real Photography */}
                        <div className={`clay-visual ${item.visualClass}`}>
                          {/* Real Photo Media Layer */}
                          <div className="clay-visual-media">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="(max-width: 740px) 90vw, 42vw"
                              className="clay-visual-img"
                            />
                            {/* Tonal Theme Tint & Dark Contrast Vignette */}
                            <div className="clay-visual-overlay" />
                          </div>
                          {/* Decorative Clay Rings (Subtle Depth) */}
                          <div className="clay-ring-1" />
                          <div className="clay-ring-2" />
                          {/* Top Clay Badges */}
                          <span className="clay-pill-left">
                            {item.indexLabel}
                          </span>
                          <span className="clay-pill-right">
                            {item.topBadge}
                          </span>
                          {/* Refined Floating 3D Clay Icon Token (Corner Anchor) */}
                          <div
                            className="clay-visual-icon-token"
                            aria-hidden="true"
                          >
                            {item.icon}
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

        <section
          className={`section pricing pricing-pinned-section${
            !shouldUnfoldPricing ? " pricing-unpinned" : ""
          }`}
          id="pricing"
          ref={pricingSectionRef}
        >
          <div className="pricing-sticky-stage">
            {/* Multi-Layer Parallax Background Objects (Pure 3D Clay) */}
            <div className="pricing-bg-decor" aria-hidden="true">
              <div className="pricing-bg-glow pricing-bg-glow-violet" />
              <div className="pricing-bg-glow pricing-bg-glow-yellow" />
              <motion.div
                className="pricing-clay-ring pricing-clay-ring-left"
                style={{ y: shouldUnfoldPricing ? pricingBgRing1Y : 0 }}
              />
              <motion.div
                className="pricing-clay-ring pricing-clay-ring-right"
                style={{ y: shouldUnfoldPricing ? pricingBgRing2Y : 0 }}
              />
              <motion.div
                className="pricing-clay-sphere pricing-clay-sphere-top"
                style={{ y: shouldUnfoldPricing ? pricingBgRing2Y : 0 }}
              />
            </div>

            <div className="container pricing-stage-container">
              <div className="pricing-header" style={{ textAlign: "center" }}>
                <div className="kicker">Choose your experience</div>
                <h2>
                  Packages Made for{" "}
                  <span style={{ color: "var(--purple)" }}>Fun</span>
                </h2>
                <p className="lede" style={{ margin: "auto" }}>
                  Two ways to enjoy The Thrills Fun Park. Choose the package
                  that suits your visit.
                </p>
              </div>

              <div className="packages packages-unfold-stage">
                {/* Package A (Without Food — ₹699): Foreground Layer (z-index: 3) */}
                <motion.div
                  className="package-motion-slot package-slot-a"
                  style={{
                    x: shouldUnfoldPricing ? pkgAX : 0,
                    y: shouldUnfoldPricing ? pkgAY : 0,
                    rotateX: shouldUnfoldPricing ? pkgARotateX : 0,
                    rotateZ: shouldUnfoldPricing ? pkgARotateZ : 0,
                    scale: shouldUnfoldPricing ? pkgAScale : 1,
                    zIndex: 3,
                  }}
                >
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
                      onClick={() =>
                        handleSelectPackage("Without Food — ₹699")
                      }
                    >
                      Enquire About This Package <ArrowRight size={16} />
                    </a>
                  </div>
                </motion.div>

                {/* Package B (With Food — ₹999): Emerges from Behind Package A (z-index: 2) */}
                <motion.div
                  className="package-motion-slot package-slot-b"
                  style={{
                    x: shouldUnfoldPricing ? pkgBX : 0,
                    y: shouldUnfoldPricing ? pkgBY : 0,
                    rotateZ: shouldUnfoldPricing ? pkgBRotateZ : 0,
                    scale: shouldUnfoldPricing ? pkgBScale : 1,
                    opacity: shouldUnfoldPricing ? pkgBOpacity : 1,
                    zIndex: 2,
                  }}
                >
                  {/* Decorative 3D Clay Admission Ticket Stub peeking from behind Package B */}
                  <motion.div
                    className="clay-admit-stub"
                    aria-hidden="true"
                    style={{
                      x: shouldUnfoldPricing ? admitStubX : 0,
                      y: shouldUnfoldPricing ? admitStubY : 0,
                      rotate: shouldUnfoldPricing ? admitStubRotate : 8,
                    }}
                  >
                    <span className="clay-admit-stub-icon">
                      <Ticket size={14} strokeWidth={2.4} />
                    </span>
                    <span className="clay-admit-stub-text">
                      ADMIT ONE • ALL DAY FUN
                    </span>
                  </motion.div>

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
                </motion.div>
              </div>

              <p className="note">
                Demo prices supplied for website design. Confirm whether package
                prices are per person, which attractions are included, and other
                booking conditions before making the website public.
              </p>
            </div>
          </div>
        </section>

        <section
          className="section about"
          id="about"
          ref={aboutSectionRef}
        >
          <div className="container aboutgrid">
            <motion.div
              className="aboutimage"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Real Photo Media Layer */}
              <div className="about-visual-media">
                <Image
                  src="/images/park-entrance-arch.jpg"
                  alt="The Thrills Fun Park Grand Entrance Arch in Begusarai"
                  fill
                  sizes="(max-width: 740px) 92vw, 48vw"
                  className="about-visual-img"
                  priority
                />
                {/* Tonal Brand Tint & Contrast Vignette */}
                <div className="about-visual-overlay" />
              </div>

              {/* Decorative Subtle Parallax Rings */}
              <motion.span
                className="about-ring about-ring-primary"
                aria-hidden="true"
                style={{
                  y:
                    prefersReducedMotion || !isDesktopPricing
                      ? 0
                      : aboutRingPrimaryY,
                }}
              />
              <motion.span
                className="about-ring about-ring-secondary"
                aria-hidden="true"
                style={{
                  y:
                    prefersReducedMotion || !isDesktopPricing
                      ? 0
                      : aboutRingSecondaryY,
                }}
              />

              {/* Top Clay Badges */}
              <span className="about-pill-left">
                ✦ THE THRILLS FUN PARK
              </span>
              <span className="about-pill-right">
                BEGUSARAI, BIHAR
              </span>

              {/* Floating 3D Clay Icon Token (Corner Anchor) */}
              <div
                className="about-visual-icon-token"
                aria-hidden="true"
              >
                <FerrisWheel size={30} strokeWidth={2.2} />
              </div>

              {/* Bottom Clay Caption Badge */}
              <div className="about-visual-badge">
                <span className="about-badge-dot" aria-hidden="true" />
                <span>Grand Entrance Gateway</span>
              </div>
            </motion.div>

            {/* Right Column: Simple, Elegant Fade-Up Content Reveal */}
            <motion.div
              className="about-copy-col"
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
            >
              <motion.div
                className="kicker"
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                Who we are
              </motion.div>

              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                Good Times.{" "}
                <span style={{ color: "var(--purple)" }}>Great Memories.</span>
              </motion.h2>

              <motion.p
                className="lede"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                Welcome to <strong>The Thrills Fun Park</strong>, a destination
                for fun and entertainment in Begusarai, Bihar. We aim to bring
                together exciting attractions and memorable experiences for
                families, friends and groups.
              </motion.p>

              <motion.div
                className="mini"
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <span>
                  <Building2 size={22} color="var(--purple)" />
                </span>
                <div>
                  <strong>Powered by Kali Charan Infra Pvt. Ltd.</strong>
                  <small>
                    Our company proudly presents The Thrills Fun Park.
                  </small>
                </div>
              </motion.div>

              <motion.div
                className="mini"
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
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
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="section gallery" id="gallery">
          <div className="container">
            <div className="sectionhead gallery-sectionhead">
              <div>
                <div className="kicker">A glimpse of the fun</div>
                <h2>
                  Moments from{" "}
                  <span style={{ color: "var(--purple)" }}>The Thrills</span>
                </h2>
                <p className="lede">
                  Explore real moments, vibrant attractions, and refreshing
                  water zones across our Begusarai destination.
                </p>
              </div>

              <label className="clay-upload-pill">
                <ImagePlus size={16} strokeWidth={2.2} />
                <span>Preview Custom Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCustomGalleryUpload}
                />
              </label>
            </div>

            {/* Functional 3D Claymorphic Category Filter Bar */}
            <div
              className="gallery-filter-bar"
              role="toolbar"
              aria-label="Filter gallery photos by category"
            >
              {GALLERY_CATEGORIES.map((category) => {
                const isActive = activeGalleryCategory === category;
                const count = getCategoryCount(category);
                return (
                  <button
                    key={category}
                    type="button"
                    className={`gallery-filter-pill${
                      isActive ? " active" : ""
                    }`}
                    aria-pressed={isActive}
                    onClick={() => {
                      setActiveGalleryCategory(category);
                      setLightboxIndex(null);
                    }}
                  >
                    <span>{category}</span>
                    <span className="gallery-filter-count">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Editorial Asymmetrical Masonry Grid */}
            <motion.div
              layout={!prefersReducedMotion}
              className={`gallerygrid${
                activeGalleryCategory !== "All Photos"
                  ? " gallerygrid-filtered"
                  : ""
              }`}
            >
              <AnimatePresence mode="popLayout">
                {filteredGalleryItems.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    layout={!prefersReducedMotion}
                    type="button"
                    className={`gallery-clay-card gallery-card-${item.span}`}
                    aria-label={`View ${item.title} in full size`}
                    onClick={(e) => openLightbox(idx, e.currentTarget)}
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, y: 24, scale: 0.97 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.95 }
                    }
                    transition={{
                      duration: 0.42,
                      delay: prefersReducedMotion ? 0 : idx * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="gallery-card-frame">
                      <Image
                        src={item.src}
                        alt={`${item.title} — ${item.subtitle}`}
                        fill
                        sizes={
                          item.span === "feature" || item.span === "wide"
                            ? "(max-width: 740px) 100vw, (max-width: 950px) 100vw, 65vw"
                            : "(max-width: 740px) 100vw, (max-width: 950px) 50vw, 35vw"
                        }
                        className="gallery-card-img"
                        unoptimized={Boolean(item.isCustomUpload)}
                      />

                      {/* Top Category Clay Tag */}
                      <span className="gallery-card-tag">{item.category}</span>

                      {/* Expand 3D Clay Badge */}
                      <span className="gallery-expand-badge" aria-hidden="true">
                        <Maximize2 size={16} strokeWidth={2.4} />
                      </span>

                      {/* Deep Navy Opaque/Gradient Caption Overlay (Zero Backdrop Blur) */}
                      <div className="gallery-card-caption">
                        <strong>{item.title}</strong>
                        <small>{item.subtitle}</small>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>

            <p className="gallerytip">
              Click any photograph to open the full-size lightbox view, or use
              &ldquo;Preview Custom Photo&rdquo; to test your own park images in
              this browser preview.
            </p>
          </div>

          {/* Accessible Full-Size Lightbox Modal (Zero Glassmorphism) */}
          <AnimatePresence>
            {lightboxIndex !== null &&
              filteredGalleryItems[lightboxIndex] && (
                <motion.div
                  className="gallery-lightbox-backdrop"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Photo Lightbox"
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  onClick={closeLightbox}
                >
                  <div
                    className="gallery-lightbox-shell"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Lightbox Top Bar */}
                    <div className="gallery-lightbox-topbar">
                      <div className="gallery-lightbox-meta">
                        <span className="gallery-lightbox-counter">
                          {lightboxIndex + 1} of {filteredGalleryItems.length}
                        </span>
                        <span className="gallery-lightbox-cat">
                          {filteredGalleryItems[lightboxIndex].category}
                        </span>
                      </div>

                      <button
                        type="button"
                        className="gallery-lightbox-close"
                        aria-label="Close lightbox"
                        onClick={closeLightbox}
                      >
                        <X size={20} strokeWidth={2.5} />
                      </button>
                    </div>

                    {/* Lightbox Main Stage + Prev/Next Clay Buttons */}
                    <div className="gallery-lightbox-stage">
                      {filteredGalleryItems.length > 1 && (
                        <button
                          type="button"
                          className="gallery-lightbox-nav prev"
                          aria-label="Previous photograph"
                          onClick={() => navigateLightbox(-1)}
                        >
                          <ChevronLeft size={24} strokeWidth={2.5} />
                        </button>
                      )}

                      <motion.div
                        key={filteredGalleryItems[lightboxIndex].id}
                        className="gallery-lightbox-card"
                        initial={
                          prefersReducedMotion
                            ? false
                            : { opacity: 0, scale: 0.96, y: 10 }
                        }
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="gallery-lightbox-img-wrap">
                          <Image
                            src={filteredGalleryItems[lightboxIndex].src}
                            alt={`${filteredGalleryItems[lightboxIndex].title} — ${filteredGalleryItems[lightboxIndex].subtitle}`}
                            fill
                            sizes="90vw"
                            className="gallery-lightbox-img"
                            unoptimized={Boolean(
                              filteredGalleryItems[lightboxIndex].isCustomUpload
                            )}
                            priority
                          />
                        </div>
                        <div className="gallery-lightbox-caption">
                          <h3>{filteredGalleryItems[lightboxIndex].title}</h3>
                          <p>{filteredGalleryItems[lightboxIndex].subtitle}</p>
                        </div>
                      </motion.div>

                      {filteredGalleryItems.length > 1 && (
                        <button
                          type="button"
                          className="gallery-lightbox-nav next"
                          aria-label="Next photograph"
                          onClick={() => navigateLightbox(1)}
                        >
                          <ChevronRight size={24} strokeWidth={2.5} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
          </AnimatePresence>
        </section>

        <section
          className="section contact"
          id="contact"
          ref={contactSectionRef}
        >
          {/* Ambient Spotlights, Parallax 3D Clay Shapes & Flowing Mint Ribbon */}
          <div className="contact-bg-decor" aria-hidden="true">
            <div className="contact-bg-glow contact-bg-glow-purple" />
            <div className="contact-bg-glow contact-bg-glow-mint" />

            <motion.div
              className="contact-clay-ring contact-clay-ring-left"
              style={{ y: prefersReducedMotion ? 0 : contactRing1Y }}
            />
            <motion.div
              className="contact-clay-ring contact-clay-ring-right"
              style={{ y: prefersReducedMotion ? 0 : contactRing2Y }}
            />
            <motion.div
              className="contact-clay-sphere"
              style={{ y: prefersReducedMotion ? 0 : contactRing2Y }}
            />

            <motion.div
              className="contact-ribbon-wrap"
              style={{ y: prefersReducedMotion ? 0 : contactRibbonY }}
            >
              <svg
                className="contact-ribbon-svg"
                viewBox="0 0 1440 420"
                preserveAspectRatio="none"
              >
                <path
                  className="contact-ribbon-path-lavender"
                  d="M-80,310 C220,180 480,380 780,230 C1060,90 1260,290 1520,150"
                  fill="none"
                  stroke="#714ad4"
                  strokeOpacity="0.11"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  className="contact-ribbon-path-mint"
                  d="M-60,260 C240,390 520,120 820,270 C1100,400 1280,160 1520,240"
                  fill="none"
                  stroke="var(--mint)"
                  strokeOpacity="0.15"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </div>

          <div className="container contactgrid">
            {/* Left Column: Coordinated Staggered Split Reveal */}
            <motion.div
              className="contact-copy-col"
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.09,
                  },
                },
              }}
            >
              <motion.div
                className="kicker"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                Get in touch
              </motion.div>

              <h2>
                <span className="contact-heading-line">
                  <motion.span
                    className="contact-heading-line-inner"
                    variants={{
                      hidden: { y: "105%", opacity: 0 },
                      visible: {
                        y: "0%",
                        opacity: 1,
                        transition: {
                          duration: 0.55,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      },
                    }}
                  >
                    Let&apos;s Make Your Next Day{" "}
                  </motion.span>
                </span>
                <span className="contact-heading-line">
                  <motion.span
                    className="contact-heading-line-inner"
                    style={{ color: "var(--yellow)" }}
                    variants={{
                      hidden: { y: "105%", opacity: 0 },
                      visible: {
                        y: "0%",
                        opacity: 1,
                        transition: {
                          duration: 0.55,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      },
                    }}
                  >
                    Amazing!
                  </motion.span>
                </span>
              </h2>

              <motion.p
                className="lede"
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                Have a question about our attractions or packages? Send an
                enquiry using the form.
              </motion.p>

              <motion.div
                className="details"
                variants={{
                  hidden: { opacity: 0, x: -18 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <span className="contact-clay-ico">
                  <MapPin size={20} color="var(--mint)" />
                </span>{" "}
                Begusarai, Bihar, India
              </motion.div>

              <motion.div
                className="details"
                variants={{
                  hidden: { opacity: 0, x: -18 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <span className="contact-clay-ico">
                  <Mail size={20} color="var(--mint)" />
                </span>{" "}
                kcsinfra2023@gmail.com
              </motion.div>

              <motion.div
                className="details"
                variants={{
                  hidden: { opacity: 0, x: -18 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <span className="contact-clay-ico">
                  <Building2 size={20} color="var(--mint)" />
                </span>{" "}
                Powered by Kali Charan Infra Pvt. Ltd.
              </motion.div>

              <motion.p
                style={{
                  fontSize: "12px",
                  color: "#b7c4e7",
                  marginTop: "35px",
                }}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                This demo does not accept payments or confirm reservations.
              </motion.p>
            </motion.div>

            {/* Right Column: Stable Elevated 3D Clay Form Stage */}
            <motion.div
              className="contact-form-stage"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Decorative 3D Clay Admission Ticket Badge behind .formbox */}
              <motion.div
                className="contact-vip-stub"
                aria-hidden="true"
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, y: 10, rotate: 2 }
                }
                whileInView={{ opacity: 1, y: 0, rotate: 5 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="contact-vip-stub-icon">
                  <Ticket size={14} strokeWidth={2.4} />
                </span>
                <span>VIP GUEST ENQUIRY</span>
              </motion.div>

              <form
                className="formbox"
                id="enquiry"
                onSubmit={handleSendEnquiry}
              >
                <h3>Plan Your Visit</h3>
                <p>
                  Fill in the details. Your email app will open with the message
                  ready to send.
                </p>

                <div className="fields">
                  <div className="field-group">
                    <label
                      htmlFor="name"
                      className={
                        activeField === "name" ? "field-label-active" : ""
                      }
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onFocus={() => setActiveField("name")}
                      onBlur={() => setActiveField(null)}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <label
                      htmlFor="phone"
                      className={
                        activeField === "phone" ? "field-label-active" : ""
                      }
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      placeholder="Your number"
                      inputMode="tel"
                      value={phone}
                      onFocus={() => setActiveField("phone")}
                      onBlur={() => setActiveField(null)}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label
                    htmlFor="package"
                    className={
                      activeField === "package" ? "field-label-active" : ""
                    }
                  >
                    Interested In
                  </label>
                  <select
                    id="package"
                    value={selectedPackage}
                    onFocus={() => setActiveField("package")}
                    onBlur={() => setActiveField(null)}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Without Food — ₹699">
                      Without Food — ₹699
                    </option>
                    <option value="With Food — ₹999">With Food — ₹999</option>
                    <option value="Individual Attractions">
                      Individual Attractions
                    </option>
                  </select>
                </div>

                <div className="field-group">
                  <label
                    htmlFor="visit"
                    className={
                      activeField === "visit" ? "field-label-active" : ""
                    }
                  >
                    Preferred Visit Date (optional)
                  </label>
                  <input
                    id="visit"
                    type="date"
                    value={visitDate}
                    onFocus={() => setActiveField("visit")}
                    onBlur={() => setActiveField(null)}
                    onChange={(e) => setVisitDate(e.target.value)}
                  />
                </div>

                <button className="btn btn-yellow" type="submit">
                  Prepare Email Enquiry{" "}
                  <ArrowUpRight size={16} className="cta-arrow-icon" />
                </button>

                {enquiryPrepared && (
                  <div className="enquiry-feedback-banner" role="status">
                    <CheckCircle2 size={16} className="enquiry-feedback-ico" />
                    <span>
                      Your email app has been opened with your enquiry details
                      ready — please press Send in your mail app.
                    </span>
                  </div>
                )}

                <p className="helper">
                  Your email application will open; sending is completed from
                  there.
                </p>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <a
            className="brand brand-dark"
            href="#home"
            aria-label="The Thrills Fun Park — Back to top"
          >
            <span className="brandmark brandmark-sm" aria-hidden="true">
              <svg
                className="brandmark-svg"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1.5"
                  y="1.5"
                  width="33"
                  height="33"
                  rx="8"
                  fill="#FFCE46"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                <path
                  d="M 18 7 Q 18 18 29 18 Q 18 18 18 29 Q 18 18 7 18 Q 18 18 18 7 Z"
                  fill="#141D47"
                />
              </svg>
            </span>
            <span className="brand-copy">
              <span className="brand-title">THE THRILLS</span>
              <small className="brand-tagline">FUN PARK</small>
            </span>
          </a>
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
