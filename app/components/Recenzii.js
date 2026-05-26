"use client";
import { useState } from "react";

const TESTIMONIALE = [
  {
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
    nume: "Anne Z.",
    rating: 5,
    text: "Produs absolut cazac. Se potriveste perfect pe perete. O recomand tuturor iubitorilor de gadgeturi.",
  },
  {
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&crop=face",
    nume: "Andrei",
    rating: 5,
    text: "Cadou super reusit! Baiatele de ziua de nastere este foarte multumit \uD83D\uDE0A",
  },
  {
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
    nume: "Maria D.",
    rating: 5,
    text: "Arata exact ca in poze, calitate exceptionala. Livrare rapida si ambalaj ingrijit!",
  },
  {
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
    nume: "Radu P.",
    rating: 5,
    text: "Am luat doua bucati. Ambele perfecte. Design elegant si foarte stabile.",
  },
  {
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    nume: "Dan F.",
    rating: 5,
    text: "Exact ceea ce cautam! Produsul este de calitate inalta. Livrat in 2 zile.",
  },
  {
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face",
    nume: "Ioana S.",
    rating: 5,
    text: "Minunat! L-am cumparat ca si cadou de Craciun si a fost o surpriza perfecta!",
  },
];

const SLIDE_SIZE = 2;
const TOTAL_SLIDES = Math.ceil(TESTIMONIALE.length / SLIDE_SIZE);

function Stars({ n = 5 }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[...Array(n)].map((_, i) => (
        <svg key={i} width={18} height={18} viewBox="0 0 24 24" fill="#f5a623">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Recenzii() {
  const [slide, setSlide] = useState(0);
  const visible = TESTIMONIALE.slice(slide * SLIDE_SIZE, slide * SLIDE_SIZE + SLIDE_SIZE);
  const prev = () => setSlide(s => (s - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
  const next = () => setSlide(s => (s + 1) % TOTAL_SLIDES);

  return (
    <section style={{ background: "#f5f2ec", padding: "80px 0" }}>
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 clamp(20px, 4vw, 60px)",
        display: "grid",
        gridTemplateColumns: "420px 1fr 1fr",
        gap: "clamp(24px, 3.5vw, 56px)",
        alignItems: "center",
      }}>

        {/* ── STANGA: card TikTok ── */}
        <div style={{
          borderRadius: 20,
          overflow: "hidden",
          position: "relative",
          aspectRatio: "9/16",
          background: "#f5f2ec",
          maxWidth: 420,
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}>
          {/* WHITE TOP: text */}
          <div style={{ background: "#fff", padding: "22px 20px 18px", borderRadius: "20px 20px 0 0", zIndex: 2, position: "relative" }}>
            <p style={{
              color: "#111",
              fontSize: "clamp(17px, 1.9vw, 24px)",
              fontWeight: 800,
              lineHeight: 1.3,
              margin: 0,
            }}>
              Da! Acesta este hit-ul care stii din{" "}
              <span style={{ color: "#c850c0" }}>TikTok</span>
            </p>
          </div>

          {/* IMAGE BOTTOM: fills rest */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            <img
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=600&h=900&fit=crop"
              alt="viral tiktok"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* gradient only at bottom */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.82) 100%)" }} />

          {/* TikTok branding */}
          <div style={{ position: "absolute", top: 16, left: 16, zIndex: 2, display: "flex", alignItems: "center", gap: 8 }}>
            <svg width={26} height={26} viewBox="0 0 24 24" fill="#fff">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.78 1.52V6.82a4.85 4.85 0 01-1.01-.13z"/>
            </svg>
            <div>
              <p style={{ margin: 0, color: "#fff", fontSize: 14, fontWeight: 700, lineHeight: 1 }}>TikTok</p>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", fontSize: 11 }}>@krzysztof.sobi</p>
            </div>
          </div>

          {/* Big 12 */}
          <div style={{
            position: "absolute",
            bottom: "10%",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 1,
            fontSize: "clamp(90px, 16vw, 160px)",
            fontWeight: 900,
            color: "rgba(255,255,255,0.13)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
            userSelect: "none",
          }}>12</div>

          {/* Milioane vizualizari */}
          <div style={{ position: "absolute", bottom: 24, left: 20, right: 20, zIndex: 2 }}>
            <p style={{
              color: "#fff",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 900,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              textShadow: "0 2px 16px rgba(0,0,0,0.5)",
            }}>Milioane<br />vizualizari</p>
          </div>
          </div>{/* end image div */}
        </div>{/* end card */}

        {/* ── CENTRU: titlu + reviews ── */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", minHeight: 520 }}>
          <h2 style={{
            fontSize: "clamp(36px, 4.5vw, 64px)",
            fontWeight: 900,
            lineHeight: 1.05,
            color: "#111",
            margin: "0 0 48px",
            letterSpacing: "-0.03em",
          }}>
            Sute<br />pozitiv<br />opinii online
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 36, flex: 1 }}>
            {visible.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <img
                  src={r.avatar}
                  alt={r.nume}
                  style={{ width: 68, height: 68, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                />
                <div>
                  <Stars />
                  <p style={{ margin: "6px 0 0", fontSize: 16, fontWeight: 700, color: "#222" }}>{r.nume}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 48 }}>
            <button
              onClick={prev}
              style={{ width: 48, height: 48, borderRadius: "50%", border: "1.5px solid #bbb", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#555", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#111"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "#bbb"; }}
            >&#8249;</button>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {[...Array(TOTAL_SLIDES)].map((_, i) => (
                <div key={i} onClick={() => setSlide(i)} style={{ width: slide === i ? 32 : 8, height: 8, borderRadius: 999, background: slide === i ? "#111" : "#ccc", cursor: "pointer", transition: "all 0.3s" }} />
              ))}
            </div>
            <button
              onClick={next}
              style={{ width: 48, height: 48, borderRadius: "50%", border: "1.5px solid #bbb", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#555", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#111"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "#bbb"; }}
            >&#8250;</button>
          </div>
        </div>

        {/* ── DREAPTA: logos fade + testimoniale ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {/* Logos fade - huge */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px", marginBottom: 44 }}>
            <span style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 900, color: "rgba(0,0,0,0.12)", lineHeight: 1.2, fontFamily: "Arial, sans-serif" }}>Google</span>
            <span style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 900, color: "rgba(0,0,0,0.12)", lineHeight: 1.2, fontFamily: "Arial, sans-serif" }}>Linked<span style={{ background: "rgba(0,0,0,0.12)", color: "transparent", WebkitBackgroundClip: "text" }}>in</span></span>
            <span style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 900, color: "rgba(0,0,0,0.12)", lineHeight: 1.2, fontFamily: "Arial, sans-serif" }}>facebook</span>
            <span style={{ fontSize: "clamp(22px, 2.8vw, 38px)", fontWeight: 900, color: "rgba(0,0,0,0.12)", lineHeight: 1.2, fontFamily: "Arial, sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ display: "inline-block", width: "1em", height: "1em", background: "rgba(0,0,0,0.12)", borderRadius: 4, lineHeight: 1, textAlign: "center", fontSize: "0.7em", color: "transparent" }}>▶</span>
              YouTube
            </span>
          </div>

          {/* Testimoniale */}
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {visible.map((r, i) => (
              <p key={i} style={{
                fontSize: "clamp(16px, 1.5vw, 22px)",
                fontStyle: "italic",
                color: "#888",
                lineHeight: 1.6,
                margin: 0,
                fontWeight: 400,
                fontFamily: "Georgia, serif",
              }}>
                {r.text}
              </p>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}