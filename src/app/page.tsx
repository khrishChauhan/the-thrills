"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

interface AttractionItem {
  id: number;
  emoji: string;
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
    emoji: "🎮",
    visualClass: "clay-visual-1",
    indexLabel: "#01 ATTRACTION",
    topBadge: "⭐ POPULAR",
    zoneTag: "✦ THRILLS ADVENTURE ZONE",
    title: "Fun Zone",
    description:
      "A vibrant space packed with playful moments. Jump into action-packed games, interactive challenges, and non-stop excitement for kids, teens, and adults alike.",
    chips: ["🎯 Arcade Challenges", "👨‍👩‍👧‍👦 All Ages Fun", "⚡ High Energy"],
    price: "₹100",
  },
  {
    id: 2,
    emoji: "🪞",
    visualClass: "clay-visual-2",
    indexLabel: "#02 ATTRACTION",
    topBadge: "🎟️ ₹100 ENTRY",
    zoneTag: "✦ OPTICAL WONDER ZONE",
    title: "Mirror House",
    description:
      "Explore a world of playful reflections. Wander through dazzling mirror corridors and hilarious optical reflections that turn every step into a fun surprise.",
    chips: ["✨ Endless Reflections", "📸 Picture Perfect", "🤩 Laugh Out Loud"],
    price: "₹100",
  },
  {
    id: 3,
    emoji: "👻",
    visualClass: "clay-visual-3",
    indexLabel: "#03 ATTRACTION",
    topBadge: "🔥 THRILL SEEKERS",
    zoneTag: "✦ SPOOKY MYSTERY ZONE",
    title: "Horror House",
    description:
      "For brave hearts who love a spooky surprise. Step inside eerie corridors filled with playful scares, mysterious shadows, and heart-racing thrills!",
    chips: ["🕯️ Spooky Surprises", "🔊 Eerie Sound FX", "💓 Brave Hearts"],
    price: "₹100",
  },
  {
    id: 4,
    emoji: "🌀",
    visualClass: "clay-visual-4",
    indexLabel: "#04 ATTRACTION",
    topBadge: "🌟 MUST VISIT",
    zoneTag: "✦ MIND-BENDING ZONE",
    title: "Illusion House",
    description:
      "Let your eyes play tricks on your imagination. Experience gravity-defying rooms, perspective puzzles, and mind-bending visual wonders.",
    chips: ["🧠 Mind-Bending", "📷 Trick Photos", "🎪 Family Favorite"],
    price: "₹100",
  },
  {
    id: 5,
    emoji: "🎬",
    visualClass: "clay-visual-5",
    indexLabel: "#05 ATTRACTION",
    topBadge: "🎬 7D MOTION",
    zoneTag: "✦ IMMERSIVE CINEMA ZONE",
    title: "7D Theatre",
    description:
      "An immersive entertainment experience. Strap in for thrilling 3D visuals paired with motion seats and exciting multi-sensory theatre effects.",
    chips: ["🕶️ 3D Cinema", "💺 Motion Seats", "💨 Sensory Effects"],
    price: "₹100",
  },
  {
    id: 6,
    emoji: "🏖️",
    visualClass: "clay-visual-6",
    indexLabel: "#06 FULL PARK",
    topBadge: "☀️ ALL-DAY JOY",
    zoneTag: "✦ COMPLETE PARK EXPERIENCE",
    title: "And More Fun!",
    description:
      "Explore the park and make a day of it. From refreshing water splashes to relaxing hangout zones, there is always more joy waiting around every corner.",
    chips: ["🌊 Water & Pool Fun", "🎉 Group Outings", "☀️ Full Day Joy"],
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

  // Pinned Attractions Scroll Reel State & Refs
  const attractionsSectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [maxTranslateX, setMaxTranslateX] = useState(0);

  useEffect(() => {
    const updateScrollDistance = () => {
      if (!trackRef.current) return;
      const cards = trackRef.current.children;
      if (cards.length === 0) return;

      const firstCard = cards[0] as HTMLElement;
      const lastCard = cards[cards.length - 1] as HTMLElement;

      const firstCardCenter = firstCard.offsetLeft + firstCard.offsetWidth / 2;
      const lastCardCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;

      setMaxTranslateX(Math.max(0, lastCardCenter - firstCardCenter));
    };

    updateScrollDistance();
    const timer = setTimeout(updateScrollDistance, 150);
    window.addEventListener("resize", updateScrollDistance);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateScrollDistance);
    };
  }, []);

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
            Plan Your Visit →
          </a>

          <button
            className="menu"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="container hero-main">
            <div>
              <div className="eyebrow">
                📍 Begusarai, Bihar &nbsp; • &nbsp; Adventure awaits
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
                  Explore Attractions ↗
                </a>
                <a className="btn btn-white" href="#pricing">
                  View Packages
                </a>
              </div>
            </div>

            <div
              className="hero-art"
              aria-label="Illustrative amusement park graphics"
            >
              <div className="sun"></div>
              <div className="ticket-shape">
                <span className="ticket-text">
                  GOOD VIBES
                  <br />
                  ONLY!
                </span>
                <span className="ride2">🎡</span>
                <span className="ride">🌊</span>
              </div>
              <div className="float one">
                <b>🎉</b> Make happy memories
              </div>
              <div className="float two">
                <b>🎟️</b> Fun starts here!
              </div>
            </div>
          </div>
          <div className="wave"></div>
        </section>

        <div className="container featurestrip">
          <div className="feature">
            <div className="ico">🎢</div>
            <div>
              <strong>Exciting Attractions</strong>
              <span>Something fun for everyone</span>
            </div>
          </div>
          <div className="feature">
            <div className="ico">📸</div>
            <div>
              <strong>Picture-Perfect Moments</strong>
              <span>Capture memories together</span>
            </div>
          </div>
          <div className="feature">
            <div className="ico">📍</div>
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
                            <span className="clay-emoji">{item.emoji}</span>
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
                                  View Full Packages →
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
                                  Book This Ride →
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
                  Enquire About This Package →
                </a>
              </div>

              <div className="package featured">
                <div className="ribbon">⭐ FEATURED</div>
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
                  Enquire About This Package →
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
              <span className="illustration">🎡</span>
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
                <span>🏢</span>
                <div>
                  <strong>Powered by Kali Charan Infra Pvt. Ltd.</strong>
                  <small>
                    Our company proudly presents The Thrills Fun Park.
                  </small>
                </div>
              </div>
              <div className="mini">
                <span>💛</span>
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
                <span>📷</span>
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
                <span>💦</span>
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
                <span>🎠</span>
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
                <span>📍</span> Begusarai, Bihar, India
              </div>
              <div className="details">
                <span>✉️</span> kcsinfra2023@gmail.com
              </div>
              <div className="details">
                <span>🏢</span> Powered by Kali Charan Infra Pvt. Ltd.
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
              <h3>Plan Your Visit 🎟️</h3>
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
                Prepare Email Enquiry ↗
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
          🎟️ Plan Your Visit
        </a>
      </div>
    </>
  );
}
