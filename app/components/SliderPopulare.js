"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import ProdusCard from "./ProdusCard";

export default function SliderPopulare() {
  const scrollRef = useRef(null);
  const pausedRef = useRef(false);
  const dragRef = useRef({ dragging: false, startX: 0, startScroll: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [looped, setLooped] = useState([]);

  useEffect(() => {
    fetch("/api/produse").then(r => r.json()).then(data => {
      const filtered = data.filter(p => p.tags?.includes("populare"));
      setLooped([...filtered, ...filtered, ...filtered]);
    });
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const el = scrollRef.current;
    if (!el) return;
    let raf;
    const step = () => {
      if (!pausedRef.current) {
        el.scrollLeft += 0.6;
        if (el.scrollLeft >= el.scrollWidth / 3) el.scrollLeft = 0;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isMobile]);

  const scroll = (dir) => {
    if (scrollRef.current) {
      pausedRef.current = true;
      scrollRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
      setTimeout(() => { pausedRef.current = false; }, 500);
    }
  };

  return (
    <section style={{ background: "#f5f3f0", padding: isMobile ? "48px 0" : "72px 0", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 48, flexWrap: "nowrap" }} className="ps-row">
        {/* Left: text + controls */}
        <div style={{ flexShrink: 0, paddingLeft: "clamp(24px, 5vw, 80px)" }} className="ps-panel">
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 56px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 6px", color: "#111", whiteSpace: "nowrap" }}>Produse Populare</h2>
          <p style={{ fontSize: "clamp(13px, 1.1vw, 17px)", color: "#666", margin: "0 0 20px", lineHeight: 1.4, whiteSpace: "nowrap" }}>Cele mai apreciate produse din colecția noastră</p>
          <div style={{ display: "flex", gap: 10 }}>
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
        {/* Right: scrolling cards - overflows out of page */}
        <div style={{ flex: 1, minWidth: 0 }} className="ps-cards-wrap">
          <div
            ref={scrollRef}
            className="ps-cards"
            style={isMobile ? {
              display: "flex", gap: 14, overflowX: "auto", scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch", scrollbarWidth: "none",
              paddingLeft: 16, paddingRight: 16, paddingBottom: 12,
            } : {
              display: "flex", gap: "clamp(14px, 1.5vw, 24px)", overflowX: "hidden",
              scrollbarWidth: "none", msOverflowStyle: "none", cursor: "grab", userSelect: "none",
            }}
            onMouseDown={e => { dragRef.current = { dragging: true, startX: e.pageX, startScroll: scrollRef.current.scrollLeft }; pausedRef.current = true; e.currentTarget.style.cursor = "grabbing"; }}
            onMouseMove={e => { if (!dragRef.current.dragging) return; const dx = e.pageX - dragRef.current.startX; scrollRef.current.scrollLeft = dragRef.current.startScroll - dx; }}
            onMouseUp={e => { dragRef.current.dragging = false; pausedRef.current = false; e.currentTarget.style.cursor = "grab"; }}
            onMouseLeave={e => { dragRef.current.dragging = false; pausedRef.current = false; e.currentTarget.style.cursor = "grab"; }}
          >
            {looped.map((p, i) => (
              <div key={`${p.id}-${i}`} style={isMobile ? {
                flexShrink: 0, width: "calc(75vw)", scrollSnapAlign: "start",
              } : {
                flexShrink: 0, width: "clamp(220px, 18vw, 300px)",
              }}>
                <ProdusCard produs={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 36 }}>
        <Link href="/populare" style={{ padding: "12px 36px", border: "2px solid #111", borderRadius: 999, fontSize: 14, fontWeight: 700, color: "#111", textDecoration: "none", transition: "all 0.2s", background: "transparent" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#111"; }}
        >Vezi toate</Link>
      </div>
    </section>
  );
}
