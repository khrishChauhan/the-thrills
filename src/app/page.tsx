"use client";

import React, { useState } from "react";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("General Enquiry");
  const [visitDate, setVisitDate] = useState("");
  const [galleryPreviews, setGalleryPreviews] = useState<
    [string | null, string | null, string | null]
  >([null, null, null]);

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

        <section className="section" id="attractions">
          <div className="container">
            <div className="sectionhead">
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
              <span className="label">5 attractions</span>
            </div>

            <div className="cards">
              <article className="attraction">
                <div className="visual">
                  <span className="big">🎮</span>
                </div>
                <div className="info">
                  <h3>Fun Zone</h3>
                  <p>A vibrant space packed with playful moments.</p>
                  <div className="price">
                    ₹100 <small>/ attraction</small>
                  </div>
                </div>
              </article>

              <article className="attraction">
                <div className="visual">
                  <span className="big">🪞</span>
                </div>
                <div className="info">
                  <h3>Mirror House</h3>
                  <p>Explore a world of playful reflections.</p>
                  <div className="price">
                    ₹100 <small>/ attraction</small>
                  </div>
                </div>
              </article>

              <article className="attraction">
                <div className="visual">
                  <span className="big">👻</span>
                </div>
                <div className="info">
                  <h3>Horror House</h3>
                  <p>For brave hearts who love a spooky surprise.</p>
                  <div className="price">
                    ₹100 <small>/ attraction</small>
                  </div>
                </div>
              </article>

              <article className="attraction">
                <div className="visual">
                  <span className="big">🌀</span>
                </div>
                <div className="info">
                  <h3>Illusion House</h3>
                  <p>Let your eyes play tricks on your imagination.</p>
                  <div className="price">
                    ₹100 <small>/ attraction</small>
                  </div>
                </div>
              </article>

              <article className="attraction">
                <div className="visual">
                  <span className="big">🎬</span>
                </div>
                <div className="info">
                  <h3>7D Theatre</h3>
                  <p>An immersive entertainment experience.</p>
                  <div className="price">
                    ₹100 <small>/ attraction</small>
                  </div>
                </div>
              </article>

              <article className="attraction">
                <div className="visual">
                  <span className="big">🏖️</span>
                </div>
                <div className="info">
                  <h3>And More Fun!</h3>
                  <p>Explore the park and make a day of it.</p>
                  <div className="label">Discover the park</div>
                </div>
              </article>
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
