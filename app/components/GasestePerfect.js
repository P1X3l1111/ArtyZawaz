"use client";
import Link from "next/link";

const CARDS = [
  {
    title: "Găsi\ndupă culoare",
    desc: "Potriviți-vă la culoarea interiorului",
    btn: "+ Selectați culoarea",
    href: "/cautare?tip=culoare",
    bg: "#fff",
    icon: (
      <div style={{
        width: 110, height: 110, borderRadius: "50%",
        background: "conic-gradient(from 180deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff, #c77dff, #ff6b6b)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
        flexShrink: 0,
      }} />
    ),
  },
  {
    title: "Găsi\ndupă motiv",
    desc: "Potrivește-te obiectivului tău de salvare",
    btn: "+ Selectați o temă",
    href: "/cautare?tip=motiv",
    bg: "#fff",
    icon: (
      <div style={{ width: 100, height: 100, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 80 80" width={100} height={100}>
          <rect x="8" y="18" width="64" height="48" rx="8" fill="#5b9bd5"/>
          <rect x="8" y="18" width="64" height="48" rx="8" fill="url(#imggrad)"/>
          <defs>
            <linearGradient id="imggrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#74b9ff"/>
              <stop offset="100%" stopColor="#0984e3"/>
            </linearGradient>
          </defs>
          <circle cx="26" cy="34" r="8" fill="#fdcb6e"/>
          <path d="M8 52l18-16 14 12 10-8 18 14" fill="none" stroke="#fff" strokeWidth="3" strokeLinejoin="round"/>
          <rect x="52" y="8" width="22" height="18" rx="4" fill="#ff7675" transform="rotate(-15 63 17)"/>
          <rect x="54" y="10" width="18" height="14" rx="3" fill="#fd79a8" transform="rotate(-15 63 17)"/>
        </svg>
      </div>
    ),
  },
  {
    title: "Găsi\ndupă circumstanțe",
    desc: "Alege ca un cadou",
    btn: "+ Alege o oportunitate",
    href: "/cautare?tip=ocazie",
    bg: "#fff",
    icon: (
      <div style={{ width: 100, height: 100, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 80 80" width={100} height={100}>
          <ellipse cx="36" cy="58" rx="22" ry="8" fill="#b2bec3" opacity="0.3"/>
          <path d="M14 52 L28 20 L50 20 L64 52 Z" fill="#dfe6e9"/>
          <path d="M28 20 L50 20 L64 52 L14 52 Z" fill="url(#megagrad)"/>
          <defs>
            <linearGradient id="megagrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f5f6fa"/>
              <stop offset="100%" stopColor="#dcdde1"/>
            </linearGradient>
          </defs>
          <rect x="28" y="50" width="8" height="18" rx="4" fill="#636e72"/>
          <circle cx="60" cy="14" r="6" fill="#fd79a8"/>
          <circle cx="72" cy="22" r="4" fill="#fdcb6e"/>
          <circle cx="66" cy="28" r="3" fill="#6c5ce7"/>
          <circle cx="56" cy="8" r="3" fill="#00b894"/>
        </svg>
      </div>
    ),
  },
  {
    title: "Proprie\nmodel?",
    desc: "70×50 cm",
    btn: "Design",
    href: "/contact",
    bg: "#f5a623",
    accent: true,
    icon: (
      <div style={{ width: 100, height: 100, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 80 80" width={100} height={100}>
          {/* Body */}
          <ellipse cx="40" cy="60" rx="20" ry="16" fill="#ff7043"/>
          {/* Head */}
          <circle cx="40" cy="32" r="16" fill="#ffccbc"/>
          {/* Hat */}
          <ellipse cx="40" cy="18" rx="14" ry="5" fill="#ff5722"/>
          <rect x="32" y="10" width="16" height="10" rx="4" fill="#ff7043"/>
          <ellipse cx="40" cy="10" rx="6" ry="4" fill="#ff5722"/>
          {/* Camera */}
          <rect x="24" y="50" width="22" height="16" rx="4" fill="#37474f"/>
          <circle cx="35" cy="58" r="5" fill="#546e7a"/>
          <circle cx="35" cy="58" r="3" fill="#263238"/>
          <rect x="40" y="52" width="5" height="3" rx="1" fill="#607d8b"/>
        </svg>
      </div>
    ),
  },
];

export default function GasestePerfect() {
  return (
    <section style={{ background: "#f0ece6", padding: "80px 0 100px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px, 4vw, 60px)" }}>
        <h2 style={{
          fontSize: "clamp(32px, 5vw, 64px)",
          fontWeight: 900,
          color: "#111",
          margin: "0 0 48px",
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
        }}>
          Găsiți modelul perfect
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}>
          {CARDS.map((card, i) => (
            <div key={i} style={{
              background: card.bg,
              borderRadius: 20,
              padding: "28px 24px 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 280,
              position: "relative",
              overflow: "hidden",
              boxShadow: card.accent ? "0 8px 32px rgba(245,166,35,0.3)" : "0 2px 16px rgba(0,0,0,0.06)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              cursor: "pointer",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = card.accent ? "0 16px 40px rgba(245,166,35,0.4)" : "0 12px 32px rgba(0,0,0,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = card.accent ? "0 8px 32px rgba(245,166,35,0.3)" : "0 2px 16px rgba(0,0,0,0.06)"; }}
            >
              {/* Icon top right */}
              <div style={{ position: "absolute", top: 16, right: 16 }}>
                {card.icon}
              </div>

              {/* Text */}
              <div style={{ flex: 1, paddingRight: 80 }}>
                <h3 style={{
                  fontSize: "clamp(18px, 1.8vw, 24px)",
                  fontWeight: 800,
                  color: card.accent ? "#fff" : "#111",
                  margin: "0 0 10px",
                  lineHeight: 1.2,
                  whiteSpace: "pre-line",
                }}>{card.title}</h3>
                <p style={{
                  fontSize: 14,
                  color: card.accent ? "rgba(255,255,255,0.85)" : "#777",
                  margin: 0,
                  lineHeight: 1.5,
                }}>{card.desc}</p>
              </div>

              {/* Button */}
              <Link href={card.href} style={{
                display: "inline-flex",
                alignItems: "center",
                marginTop: 24,
                padding: card.accent ? "8px 20px" : "8px 16px",
                borderRadius: 999,
                border: card.accent ? "none" : "1.5px solid #ccc",
                background: card.accent ? "#c0392b" : "transparent",
                color: card.accent ? "#fff" : "#333",
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
                alignSelf: "flex-start",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = card.accent ? "#a93226" : "#111"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = card.accent ? "transparent" : "#111"; }}
                onMouseLeave={e => { e.currentTarget.style.background = card.accent ? "#c0392b" : "transparent"; e.currentTarget.style.color = card.accent ? "#fff" : "#333"; e.currentTarget.style.borderColor = card.accent ? "transparent" : "#ccc"; }}
              >
                {card.btn}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .gaseste-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .gaseste-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
