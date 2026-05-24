"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

const SLIDES = [
  { src: "/imageeee.avif",   alt: "Hero 1", titlu: "Colecția Nouă", subtitlu: "Descoperă cele mai noi tendințe" },
  { src: "/imagee.avif",     alt: "Hero 2", titlu: "Stil & Calitate", subtitlu: "Produse premium pentru fiecare ocazie" },
  { src: "/imageeeeee.avif", alt: "Hero 3", titlu: "Oferte Speciale", subtitlu: "Reduceri de până la 50% la produse selectate" },
];
const IMG_W = 1924;
const IMG_H = 725;

export default function HeroSection() {
  const slides = SLIDES;
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [slides.length, next]);

  return (
    <section style={{
      position: "relative",
      width: "100vw",
      aspectRatio: `${IMG_W} / ${IMG_H}`,
      overflow: "hidden",
      display: "block",
      marginLeft: "calc(-50vw + 50%)",
    }}>
      {slides.map((slide, i) => (
        <div key={slide.src} style={{
          position: "absolute", inset: 0,
          opacity: i === current ? 1 : 0,
          transition: "opacity 0.8s ease",
          pointerEvents: i === current ? "auto" : "none",
        }}>
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {/* Text overlay - left */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center",
            paddingLeft: "clamp(24px, 6vw, 100px)",
            background: "linear-gradient(90deg, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)",
          }}>
            <div style={{ maxWidth: 520 }}>
              {slide.titlu && (
                <h1 style={{
                  fontSize: "clamp(28px, 4.5vw, 68px)",
                  fontWeight: 900,
                  color: "#fff",
                  margin: "0 0 16px",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  textShadow: "0 2px 16px rgba(0,0,0,0.4)",
                }}>{slide.titlu}</h1>
              )}
              {slide.subtitlu && (
                <p style={{
                  fontSize: "clamp(14px, 1.6vw, 22px)",
                  color: "rgba(255,255,255,0.88)",
                  margin: "0 0 32px",
                  fontWeight: 400,
                  textShadow: "0 1px 8px rgba(0,0,0,0.35)",
                }}>{slide.subtitlu}</p>
              )}
              <a href="/produse" style={{
                display: "inline-block",
                padding: "14px 36px",
                background: "#fff",
                color: "#111",
                fontWeight: 700,
                fontSize: "clamp(13px, 1.2vw, 16px)",
                borderRadius: 999,
                textDecoration: "none",
                letterSpacing: "0.03em",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#111"; }}
              >Explorează</a>
            </div>
          </div>
        </div>
      ))}

      {slides.length > 1 && (
        <div style={{
          position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: 10, zIndex: 10,
        }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`} style={{
              width: i === current ? 28 : 10, height: 10, borderRadius: 5,
              background: i === current ? "#fff" : "rgba(255,255,255,0.5)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "all 0.3s",
            }} />
          ))}
        </div>
      )}
    </section>
  );
}
