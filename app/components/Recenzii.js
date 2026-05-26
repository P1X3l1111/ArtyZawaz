"use client";
import { useState } from "react";

const TESTIMONIALE = [
  {
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
    nume: "Anne Z.",
    rating: 5,
    data: "12 mai 2025",
    text: "Produs absolut fantastic. Se potriveste perfect pe perete si arata superb. O recomand cu caldura tuturor!",
  },
  {
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&crop=face",
    nume: "Andrei M.",
    rating: 5,
    data: "3 apr 2025",
    text: "Cadou super reusit! Baietelul de ziua de nastere este absolut incantat. Calitate premium la un pret excelent.",
  },
  {
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
    nume: "Maria D.",
    rating: 5,
    data: "28 mar 2025",
    text: "Arata exact ca in poze, calitate exceptionala. Livrare rapida si ambalaj super ingrijit. Voi mai comanda!",
  },
  {
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
    nume: "Radu P.",
    rating: 5,
    data: "15 feb 2025",
    text: "Am luat doua bucati. Ambele perfecte. Design elegant si foarte stabile. Toata lumea m-a intrebat de unde!",
  },
  {
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    nume: "Dan F.",
    rating: 5,
    data: "8 ian 2025",
    text: "Exact ceea ce cautam! Produsul este de calitate inalta, materialele sunt excelente. Livrat in 2 zile.",
  },
  {
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face",
    nume: "Ioana S.",
    rating: 5,
    data: "22 dec 2024",
    text: "Minunat! L-am cumparat ca si cadou de Craciun si a fost o surpriza perfecta. Multumesc pentru calitate!",
  },
];

const SLIDE_SIZE = 2;
const TOTAL_SLIDES = Math.ceil(TESTIMONIALE.length / SLIDE_SIZE);

function Stars({ n = 5, size = 16 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[...Array(n)].map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#f5a623">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#eaf7ee", borderRadius: 20, padding: "2px 8px" }}>
      <svg width={12} height={12} viewBox="0 0 24 24" fill="#22a85a">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z"/>
      </svg>
      <span style={{ fontSize: 11, fontWeight: 600, color: "#22a85a" }}>Cumparat verificat</span>
    </div>
  );
}

const SOCIAL_LOGOS = [
  { name: "Google", color: "#4285F4", letter: "G" },
  { name: "Facebook", color: "#1877F2", letter: "f" },
  { name: "TikTok", color: "#010101", letter: "T" },
  { name: "YouTube", color: "#FF0000", letter: "▶" },
];

export default function Recenzii() {
  const [slide, setSlide] = useState(0);
  const visible = TESTIMONIALE.slice(slide * SLIDE_SIZE, slide * SLIDE_SIZE + SLIDE_SIZE);

  return (
    <section style={{ background: "#f7f3ef", padding: "100px 0", overflow: "hidden" }}>
      <div style={{
        maxWidth: 1360,
        margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 72px)",
        display: "grid",
        gridTemplateColumns: "0.85fr 1fr 1.1fr",
        gap: "clamp(28px, 4vw, 60px)",
        alignItems: "start",
      }}>

        {/* ── STANGA: card viral TikTok ── */}
        <div style={{
          borderRadius: 32,
          overflow: "hidden",
          position: "relative",
          aspectRatio: "9/16",
          background: "linear-gradient(160deg, #1a1a2e 0%, #0f0f1a 100%)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "28px 24px 36px",
        }}>
          <img
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=600&h=900&fit=crop"
            alt="viral"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.3, filter: "blur(3px)" }}
          />
          {/* Gradient overlay */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.6) 100%)" }} />

          {/* Top badge */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", borderRadius: 20, padding: "6px 14px", marginBottom: 16, border: "1px solid rgba(255,255,255,0.15)" }}>
              <span style={{ fontSize: 16 }}>♪</span>
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em" }}>VIRAL PE TIKTOK</span>
            </div>
            <p style={{
              color: "#fff",
              fontSize: "clamp(16px, 1.6vw, 22px)",
              fontWeight: 700,
              lineHeight: 1.35,
              margin: 0,
              textShadow: "0 2px 16px rgba(0,0,0,0.5)",
            }}>
              Da! Acesta este hit-ul pe care l-ai vazut pe{" "}
              <span style={{ color: "#ff2d55", textShadow: "0 0 20px rgba(255,45,85,0.5)" }}>TikTok</span>
            </p>
          </div>

          {/* Bottom stat */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{
              fontSize: "clamp(72px, 10vw, 120px)",
              fontWeight: 900,
              color: "rgba(255,255,255,0.06)",
              lineHeight: 1,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              textAlign: "center",
              userSelect: "none",
              letterSpacing: "-0.05em",
            }}>12M</div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{
                color: "#fff",
                fontSize: "clamp(36px, 4.5vw, 56px)",
                fontWeight: 900,
                margin: "0 0 4px",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                textShadow: "0 2px 24px rgba(0,0,0,0.6)",
              }}>12 Mil.</p>
              <p style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "clamp(13px, 1.2vw, 16px)",
                fontWeight: 500,
                margin: 0,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>vizualizari</p>
              <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                {["❤️ 2.4M", "💬 18K", "🔁 340K"].map(s => (
                  <span key={s} style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", borderRadius: 20, padding: "4px 10px", color: "#fff", fontSize: 12, fontWeight: 600, border: "1px solid rgba(255,255,255,0.15)" }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── CENTRU: titlu + reviews ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingTop: 4 }}>
          {/* Rating summary */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: "clamp(40px, 4.5vw, 56px)", fontWeight: 900, color: "#111", lineHeight: 1, letterSpacing: "-0.03em" }}>4.9</span>
              <div>
                <Stars n={5} size={20} />
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "#888", fontWeight: 500 }}>din 200+ recenzii</p>
              </div>
            </div>
            <h2 style={{
              fontSize: "clamp(28px, 3.2vw, 46px)",
              fontWeight: 900,
              lineHeight: 1.1,
              color: "#111",
              margin: 0,
              letterSpacing: "-0.03em",
            }}>
              Sute de opinii<br />
              <span style={{ color: "#d4a017" }}>pozitive</span> online
            </h2>
          </div>

          {/* Bara rating vizuala */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[["5 ★", 87], ["4 ★", 9], ["3 ★", 3], ["2 ★", 1]].map(([label, pct]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#888", minWidth: 28 }}>{label}</span>
                <div style={{ flex: 1, height: 6, background: "#e8e2da", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: "#f5a623", borderRadius: 99, transition: "width 0.6s ease" }} />
                </div>
                <span style={{ fontSize: 12, color: "#aaa", minWidth: 28, textAlign: "right" }}>{pct}%</span>
              </div>
            ))}
          </div>

          {/* Review cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {visible.map((r, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 20, padding: "18px 20px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <img src={r.avatar} alt={r.nume} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111" }}>{r.nume}</p>
                      <span style={{ fontSize: 11, color: "#bbb" }}>{r.data}</span>
                    </div>
                    <Stars n={r.rating} size={13} />
                  </div>
                </div>
                <p style={{ margin: "0 0 10px", fontSize: 14, color: "#555", lineHeight: 1.6 }}>{r.text}</p>
                <VerifiedBadge />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => setSlide(s => (s - 1 + TOTAL_SLIDES) % TOTAL_SLIDES)}
              style={{ width: 44, height: 44, borderRadius: "50%", border: "1.5px solid #ddd", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#555", transition: "all 0.2s", flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#111"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "#ddd"; }}
            >&#8249;</button>
            <div style={{ display: "flex", gap: 6 }}>
              {[...Array(TOTAL_SLIDES)].map((_, i) => (
                <div key={i} onClick={() => setSlide(i)} style={{ width: slide === i ? 24 : 8, height: 8, borderRadius: 999, background: slide === i ? "#111" : "#d0c8be", cursor: "pointer", transition: "all 0.3s" }} />
              ))}
            </div>
            <button
              onClick={() => setSlide(s => (s + 1) % TOTAL_SLIDES)}
              style={{ width: 44, height: 44, borderRadius: "50%", border: "1.5px solid #ddd", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#555", transition: "all 0.2s", flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#111"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "#ddd"; }}
            >&#8250;</button>
          </div>
        </div>

        {/* ── DREAPTA: logo-uri + testimoniale mari ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 44, paddingTop: 4 }}>
          {/* Social logo-uri */}
          <div>
            <p style={{ margin: "0 0 16px", fontSize: 12, fontWeight: 600, color: "#bbb", letterSpacing: "0.12em", textTransform: "uppercase" }}>Recenzii verificate pe</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {SOCIAL_LOGOS.map(({ name, color, letter }) => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "#fff", borderRadius: 14, border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 900, flexShrink: 0 }}>{letter}</div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#333" }}>{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimoniale italic mari */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <p style={{ margin: "0 0 -16px", fontSize: 12, fontWeight: 600, color: "#bbb", letterSpacing: "0.12em", textTransform: "uppercase" }}>Ce spun clientii</p>
            {visible.map((r, i) => (
              <div key={i} style={{ borderLeft: "3px solid #f5a623", paddingLeft: 18 }}>
                <p style={{
                  fontSize: "clamp(15px, 1.4vw, 19px)",
                  fontStyle: "italic",
                  color: "#444",
                  lineHeight: 1.6,
                  margin: "0 0 10px",
                  fontWeight: 400,
                }}>
                  "{r.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <img src={r.avatar} alt={r.nume} style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#888" }}>— {r.nume}</span>
                  <Stars n={r.rating} size={11} />
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a href="/produse" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#111", color: "#fff", borderRadius: 14, padding: "16px 28px", textDecoration: "none", fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em", transition: "all 0.2s", alignSelf: "flex-start" }}
            onMouseEnter={e => e.currentTarget.style.background = "#333"}
            onMouseLeave={e => e.currentTarget.style.background = "#111"}>
            Cumpara acum
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}