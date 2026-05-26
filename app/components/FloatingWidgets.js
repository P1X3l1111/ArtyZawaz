"use client";
import { useState, useEffect } from "react";

export default function FloatingWidgets() {
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowPhone(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── STANGA JOS: Trusted Shops badge ── */}
      <div style={{
        position: "fixed",
        bottom: 24,
        left: 20,
        zIndex: 999,
        background: "#2b2b2b",
        borderRadius: 18,
        padding: "16px 18px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
        minWidth: 130,
        userSelect: "none",
      }}>
        {/* Trusted Shops circular logo */}
        <div style={{ position: "relative", width: 64, height: 64 }}>
          <svg viewBox="0 0 64 64" width={64} height={64}>
            <circle cx={32} cy={32} r={30} fill="#ffbe00" />
            <circle cx={32} cy={32} r={26} fill="none" stroke="#2b2b2b" strokeWidth={1.5} />
            <text x="50%" y="34%" textAnchor="middle" fontSize={7} fontWeight="700" fill="#2b2b2b" fontFamily="Arial" dominantBaseline="middle">TRUSTED</text>
            <text x="50%" y="50%" textAnchor="middle" fontSize={7} fontWeight="700" fill="#2b2b2b" fontFamily="Arial" dominantBaseline="middle">SHOPS</text>
            {/* e letter */}
            <text x="50%" y="68%" textAnchor="middle" fontSize={14} fontWeight="900" fill="#2b2b2b" fontFamily="Georgia, serif" dominantBaseline="middle">e</text>
          </svg>
          {/* Small shield bottom */}
          <div style={{ position: "absolute", bottom: -4, right: -4, background: "#ffbe00", borderRadius: 6, padding: "2px 5px", fontSize: 8, fontWeight: 900, color: "#2b2b2b", boxShadow: "0 2px 6px rgba(0,0,0,0.3)" }}>✓</div>
        </div>

        <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "#fff", textAlign: "center", lineHeight: 1.3 }}>Ochrona<br />Kupującego</p>

        {/* Stars */}
        <div style={{ display: "flex", gap: 2 }}>
          {[...Array(5)].map((_, i) => (
            <svg key={i} width={14} height={14} viewBox="0 0 24 24" fill={i < 5 ? "#ffbe00" : "#555"}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 1 }}>4,91</p>
          <p style={{ margin: "2px 0 0", fontSize: 11, fontWeight: 600, color: "#ffbe00" }}>Doskonały</p>
        </div>
      </div>

      {/* ── DREAPTA JOS: buton telefon cu animatie ── */}
      <a
        href="tel:+48733150750"
        style={{
          position: "fixed",
          bottom: 28,
          right: 24,
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: "#f5f0e8",
          border: "2.5px solid #111",
          borderRadius: 999,
          padding: "12px 22px 12px 12px",
          textDecoration: "none",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease, box-shadow 0.2s",
          transform: showPhone ? "translateY(0) scale(1)" : "translateY(120px) scale(0.85)",
          opacity: showPhone ? 1 : 0,
          pointerEvents: showPhone ? "auto" : "none",
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.22)"}
        onMouseLeave={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.16)"}
      >
        {/* Phone icon circle */}
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#111", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width={20} height={20} viewBox="0 0 24 24" fill="#fff">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 11, color: "#888", fontWeight: 500, lineHeight: 1 }}>Ai nevoie de ajutor?</p>
          <p style={{ margin: "3px 0 0", fontSize: 17, fontWeight: 800, color: "#111", lineHeight: 1, letterSpacing: "-0.02em" }}>+48733150750</p>
        </div>
      </a>
    </>
  );
}
