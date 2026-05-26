"use client";
import { useState } from "react";

const TESTIMONIALE = [
  {
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    nume: "Anne Z.",
    text: "Produs absolut cazac. Se potriveste perfect pe perete. O recomand tuturor iubitorilor de gadgeturi.",
  },
  {
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face",
    nume: "Andrei",
    text: "Cadou super reusit! Baiatele de ziua de nastere este foarte multumit.",
  },
  {
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    nume: "Maria D.",
    text: "Arata exact ca in poze, calitate exceptionala. Livrare rapida si ambalaj ingrijit!",
  },
  {
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    nume: "Radu P.",
    text: "Am luat doua bucati. Ambele perfecte. Design elegant si foarte stabile.",
  },
];

const SLIDE_SIZE = 2;
const TOTAL_SLIDES = Math.ceil(TESTIMONIALE.length / SLIDE_SIZE);

function Stars({ n = 5 }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[...Array(n)].map((_, i) => (
        <span key={i} style={{ color: "#d4a017", fontSize: 18 }}>&#9733;</span>
      ))}
    </div>
  );
}

export default function Recenzii() {
  const [slide, setSlide] = useState(0);
  const visible = TESTIMONIALE.slice(slide * SLIDE_SIZE, slide * SLIDE_SIZE + SLIDE_SIZE);

  return (
    <section style={{ background: "#f7f3ef", padding: "100px 0" }}>
      <div style={{
        maxWidth: 1320,
        margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 72px)",
        display: "grid",
        gridTemplateColumns: "1fr 1.1fr 1.2fr",
        gap: "clamp(32px, 4vw, 64px)",
        alignItems: "start",
      }}>

        {/* ── STANGA: card viral TikTok ── */}
        <div style={{
          borderRadius: 28,
          overflow: "hidden",
          position: "relative",
          aspectRatio: "9/14",
          background: "linear-gradient(160deg, #2a2a2a 0%, #111 100%)",
          boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "28px 24px 32px",
        }}>
          {/* Blur bg image */}
          <img
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=600&h=900&fit=crop"
            alt="viral"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35, filter: "blur(2px)" }}
          />

          {/* Top text */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <p style={{
              color: "#fff",
              fontSize: "clamp(17px, 1.8vw, 24px)",
              fontWeight: 700,
              lineHeight: 1.3,
              margin: 0,
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
            }}>
              Da! Acesta este hit-ul care stii din{" "}
              <span style={{ color: "#ff2d55" }}>TikTok</span>
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
              <span style={{ fontSize: 22 }}>&#9835;</span>
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 600 }}>TikTok</span>
            </div>
          </div>

          {/* Big number */}
          <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <div style={{
              fontSize: "clamp(100px, 14vw, 180px)",
              fontWeight: 900,
              color: "rgba(255,255,255,0.08)",
              lineHeight: 1,
              position: "absolute",
              bottom: -20,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              textAlign: "center",
              userSelect: "none",
            }}>12</div>
            <div style={{ position: "relative", zIndex: 1, paddingBottom: 8 }}>
              <p style={{
                color: "#fff",
                fontSize: "clamp(28px, 3.5vw, 46px)",
                fontWeight: 900,
                margin: 0,
                lineHeight: 1.1,
                textShadow: "0 2px 16px rgba(0,0,0,0.6)",
              }}>Milioane<br />vizualizari</p>
            </div>
          </div>
        </div>

        {/* ── CENTRU: titlu + reviews ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40, paddingTop: 8 }}>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 58px)",
            fontWeight: 900,
            lineHeight: 1.1,
            color: "#111",
            margin: 0,
            letterSpacing: "-0.03em",
          }}>
            Sute pozitiv<br />opinii online
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {visible.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <img
                  src={r.avatar}
                  alt={r.nume}
                  style={{ width: 58, height: 58, borderRadius: "50%", objectFit: "cover", flexShrink: 0, boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}
                />
                <div>
                  <Stars />
                  <p style={{ margin: "4px 0 0", fontSize: 15, fontWeight: 700, color: "#222" }}>{r.nume}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
            <button
              onClick={() => setSlide(s => (s - 1 + TOTAL_SLIDES) % TOTAL_SLIDES)}
              style={{ width: 46, height: 46, borderRadius: "50%", border: "1.5px solid #ccc", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#555", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#111"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "#ccc"; }}
            >&#8249;</button>
            <div style={{ display: "flex", gap: 8 }}>
              {[...Array(TOTAL_SLIDES)].map((_, i) => (
                <div key={i} onClick={() => setSlide(i)} style={{ width: slide === i ? 28 : 8, height: 8, borderRadius: 999, background: slide === i ? "#111" : "#d0c8be", cursor: "pointer", transition: "all 0.3s" }} />
              ))}
            </div>
            <button
              onClick={() => setSlide(s => (s + 1) % TOTAL_SLIDES)}
              style={{ width: 46, height: 46, borderRadius: "50%", border: "1.5px solid #ccc", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#555", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#111"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "#ccc"; }}
            >&#8250;</button>
          </div>
        </div>

        {/* ── DREAPTA: logo-uri fade + testimoniale ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40, paddingTop: 8 }}>
          {/* Logo-uri social media fade */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px", opacity: 0.18 }}>
            {["Google", "LinkedIn", "facebook", "▶ YouTube"].map(logo => (
              <span key={logo} style={{ fontSize: "clamp(20px, 2.2vw, 30px)", fontWeight: 900, color: "#222", lineHeight: 1.2 }}>{logo}</span>
            ))}
          </div>

          {/* Testimoniale italic mari */}
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {visible.map((r, i) => (
              <p key={i} style={{
                fontSize: "clamp(16px, 1.6vw, 22px)",
                fontStyle: "italic",
                color: "#555",
                lineHeight: 1.55,
                margin: 0,
                fontWeight: 400,
              }}>
                "{r.text}"
              </p>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .recenzii-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}