"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { produse as toateProdusele } from "../lib/produse";
import ProdusCard from "./ProdusCard";

const reduceri = toateProdusele.filter(p => p.tags?.includes("reduceri"));
const looped = [...reduceri, ...reduceri, ...reduceri];

export default function Reduceri() {
  const scrollRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Start from middle to allow left scroll
    el.scrollLeft = el.scrollWidth / 3;
    let raf;
    const step = () => {
      if (!pausedRef.current) {
        el.scrollLeft -= 0.6;
        if (el.scrollLeft <= 0) el.scrollLeft = el.scrollWidth / 3;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const scroll = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section style={{ background: "#fff", padding: "72px 0", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 48, flexWrap: "nowrap" }}>
        {/* Left: scrolling cards - overflows out of page */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            ref={scrollRef}
            style={{ display: "flex", gap: "clamp(14px, 1.5vw, 24px)", overflowX: "visible", scrollbarWidth: "none", msOverflowStyle: "none", cursor: "grab" }}
            onMouseDown={() => { pausedRef.current = true; }}
            onMouseUp={() => { pausedRef.current = false; }}
            onMouseLeave={() => { pausedRef.current = false; }}
          >
            {looped.map((p, i) => (
              <div key={`${p.id}-${i}`} style={{ flexShrink: 0, width: "clamp(220px, 18vw, 300px)" }}>
                <ProdusCard produs={p} />
              </div>
            ))}
          </div>
        </div>
        {/* Right: text + controls */}
        <div style={{ flexShrink: 0, paddingRight: "clamp(24px, 5vw, 80px)", textAlign: "right" }}>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 56px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 6px", color: "#111", whiteSpace: "nowrap" }}>Oferte Speciale</h2>
          <p style={{ fontSize: "clamp(13px, 1.1vw, 17px)", color: "#666", margin: "0 0 20px", lineHeight: 1.4, whiteSpace: "nowrap" }}>Produse cu reduceri exclusive pentru tine</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => scroll(-1)} style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid #111", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#111"; }}
            >&#8249;</button>
            <button onClick={() => scroll(1)} style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid #111", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#111"; }}
            >&#8250;</button>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 36 }}>
        <Link href="/reduceri" style={{ padding: "12px 36px", border: "2px solid #111", borderRadius: 999, fontSize: 14, fontWeight: 700, color: "#111", textDecoration: "none", transition: "all 0.2s", background: "transparent" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#111"; }}
        >Vezi toate</Link>
      </div>
    </section>
  );
}
