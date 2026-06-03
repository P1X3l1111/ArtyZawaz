"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

const SLIDES = [
  {
    src: "/imageeee.avif",
    alt: "Hero 1",
    titlu: "Oferă un cadou\nde nota 10!\nProdusul anului\npentru toți.",
    subtitlu: "Există 1830 de motive pentru care merită să alegi produsul anului. Calitate **premium**, design **elegant** și confort **garantat**.",
    buton: "Bestsellers",
    butonHref: "/populare",
  },
  {
    src: "/imagee.avif",
    alt: "Hero 2",
    titlu: "Stil & Calitate\nPentru Fiecare\nOcazie Specială.",
    subtitlu: "Descoperă colecția noastră **exclusivă**. Produse atent alese pentru un **stil desăvârșit** la prețuri accesibile.",
    buton: "Explorează",
    butonHref: "/produse",
  },
  {
    src: "/imageeeeee.avif",
    alt: "Hero 3",
    titlu: "Colecție Nouă\nPrimăvara-Vara\n2026 — Acum\nDisponibilă.",
    subtitlu: "Cele mai noi tendințe au sosit! Reduceri de până la **50%** la **produse selectate** din noua colecție.",
    buton: "Vezi Reducerile",
    butonHref: "/reduceri",
  },
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
