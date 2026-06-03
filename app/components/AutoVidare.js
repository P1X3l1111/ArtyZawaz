"use client";
import Image from "next/image";

export default function AutoVidare() {
  return (
    <section style={{
      background: "#f5f0eb",
      padding: "80px 0",
      overflow: "hidden",
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 clamp(24px, 4vw, 64px)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        gap: "clamp(32px, 5vw, 80px)",
      }}>

        {/* LEFT — coins image */}
        <div style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Image
            src="/monety2-1.png"
            alt="Monede"
            width={560}
            height={460}
            style={{ objectFit: "contain", width: "100%", height: "auto", maxWidth: 560 }}
            priority
          />
        </div>

        {/* RIGHT — text */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <h2 style={{
            fontSize: "clamp(36px, 5vw, 72px)",
            fontWeight: 900,
            color: "#111",
            lineHeight: 1.05,
            margin: "0 0 36px",
            letterSpacing: "-0.03em",
            fontFamily: "Inter, system-ui, sans-serif",
          }}>
            Golire<br />Automată
          </h2>

          {/* Icon + stats row */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 20 }}>
            {/* Heart icon */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "linear-gradient(135deg, #e07820 0%, #f5a623 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 16px rgba(224,120,32,0.35)",
              }}>
                <svg width={30} height={30} viewBox="0 0 24 24" fill="white">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <span style={{
                fontSize: "clamp(13px, 1.2vw, 16px)",
                fontWeight: 700,
                color: "#888",
                fontFamily: "Inter, system-ui, sans-serif",
              }}>294K</span>
            </div>

            {/* Highlighted text lines */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[
                "Depui 5 lei zilnic",
                "Umpli toată pușculița",
                "După un an iese 1830 lei",
                "Pușculița Anului cu auto-golire.",
              ].map((line, i) => (
                <span key={i} style={{
                  display: "inline-block",
                  background: "transparent",
                  color: "#111",
                  fontWeight: 600,
                  fontSize: "clamp(13px, 1.3vw, 17px)",
                  padding: "3px 0",
                  borderRadius: 0,
                  lineHeight: 1.6,
                  fontFamily: "Inter, system-ui, sans-serif",
                  letterSpacing: "0.01em",
                }}>{line}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
