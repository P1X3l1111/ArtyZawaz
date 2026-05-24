"use client";
import { useState, useRef } from "react";

const PASI = [
  { titlu: "Monteaza", video: "/1Zamontuj-ezgif.com-resize-video.mp4" },
  { titlu: "Introduce monede", video: "/2Wrzucaj-ezgif.com-resize-video.mp4" },
  { titlu: "Retrage banii", video: "/3Wyciagaj-ezgif.com-resize-video.mp4" },
];

export default function CumFunctioneaza() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const scrollRef = useRef(null);

  const scrollTo = (index) => {
    setActive(index);
    if (scrollRef.current) {
      const cardWidth = 524; // 500px card + 24px gap
      scrollRef.current.scrollTo({ left: index * cardWidth, behavior: "smooth" });
    }
  };

  return (
    <section style={{ background: "#f9f8f6", padding: "80px 0 100px", overflow: "hidden" }}>
      {/* Single row: left panel + scrollable cards */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 48,
      }}>
        {/* LEFT PANEL - fixed, doesn't scroll */}
        <div style={{
          flexShrink: 0,
          width: "50vw",
          display: "flex",
          flexDirection: "column",
          gap: 44,
          paddingTop: 8,
          paddingLeft: "clamp(32px, 6vw, 96px)",
        }}>
          <h2 style={{
            fontSize: "clamp(52px, 6vw, 96px)",
            fontWeight: 900,
            lineHeight: 1.0,
            color: "#111",
            margin: 0,
            letterSpacing: "-0.04em",
            fontFamily: "'Montserrat', 'Poppins', sans-serif",
          }}>
            Cum<br />functioneaza?
          </h2>

          <p style={{
            fontSize: "clamp(28px, 3.2vw, 52px)",
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#ccc9c0",
            margin: 0,
            letterSpacing: "-0.02em",
            fontFamily: "'Montserrat', 'Poppins', sans-serif",
          }}>
            "Simplu<br />si rapid!"
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                overflow: "hidden", flexShrink: 0,
                boxShadow: "0 2px 16px rgba(0,0,0,0.14)",
              }}>
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                  alt="Maria"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{ display: "flex", gap: 3 }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "#d4a843", fontSize: 22, lineHeight: 1 }}>&#9733;</span>
                ))}
              </div>
            </div>
            <p style={{ fontSize: 15, color: "#aaa", margin: 0, fontWeight: 600, letterSpacing: "0.02em" }}>
              Maria, Cluj-Napoca
            </p>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => scrollTo((active - 1 + PASI.length) % PASI.length)}
              style={{
                width: 56, height: 56, borderRadius: "50%",
                border: "none", background: "#eceae5",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, color: "#555", transition: "all 0.2s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#e0ddd5"; e.currentTarget.style.transform = "scale(1.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#eceae5"; e.currentTarget.style.transform = "scale(1)"; }}
            >&#8249;</button>
            <button
              onClick={() => scrollTo((active + 1) % PASI.length)}
              style={{
                width: 56, height: 56, borderRadius: "50%",
                border: "none", background: "#eceae5",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, color: "#555", transition: "all 0.2s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#e0ddd5"; e.currentTarget.style.transform = "scale(1.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#eceae5"; e.currentTarget.style.transform = "scale(1)"; }}
            >&#8250;</button>
          </div>
        </div>

        {/* CARDS - bleed off screen right */}
        <div ref={scrollRef} style={{
          display: "flex",
          gap: 24,
          alignItems: "flex-start",
          flex: 1,
          minWidth: 0,
          overflowX: "hidden",
          scrollBehavior: "smooth",
        }}>
          {PASI.map((pas, i) => (
            <div
              key={pas.titlu}
              onClick={() => scrollTo(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                flexShrink: 0,
                width: 500,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                cursor: "pointer",
                transition: "transform 0.3s ease",
                transform: hovered === i ? "translateY(-8px)" : "translateY(0)",
              }}
            >
              <h3 style={{
                fontSize: 28,
                fontWeight: 900,
                color: active === i ? "#111" : "#bbb",
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                transition: "color 0.3s",
                fontFamily: "'Montserrat', 'Poppins', sans-serif",
              }}>{pas.titlu}</h3>

              <div style={{
                borderRadius: 28,
                overflow: "hidden",
                position: "relative",
                width: 500,
                height: 500,
                boxShadow: active === i
                  ? "0 24px 56px rgba(0,0,0,0.16)"
                  : hovered === i
                    ? "0 16px 40px rgba(0,0,0,0.11)"
                    : "0 6px 24px rgba(0,0,0,0.07)",
                transition: "box-shadow 0.3s ease",
                background: "#e8e4de",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0,
                  height: "40%",
                  background: "linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)",
                  zIndex: 1,
                  pointerEvents: "none",
                }} />
                <video
                  src={pas.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        section div::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Dot indicator */}
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 48 }}>
        {PASI.map((_, i) => (
          <div
            key={i}
            onClick={() => scrollTo(i)}
            style={{
              width: active === i ? 36 : 10,
              height: 10,
              borderRadius: 999,
              background: active === i ? "#c8c4bb" : "#ddd",
              cursor: "pointer",
              transition: "all 0.35s ease",
            }}
          />
        ))}
      </div>
    </section>
  );
}