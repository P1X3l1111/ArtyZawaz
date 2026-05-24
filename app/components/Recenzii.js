"use client";
import { useRef, useEffect } from "react";

const recenzii = [
  {
    nume: "Andreea M.",
    rating: 5,
    text: "Suportul pentru telefon e superb! Calitate excelentă a lemnului, se simte durabil și arată foarte bine pe birou.",
    produs: "Stativ Desktop Oak",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face",
  },
  {
    nume: "Mihai T.",
    rating: 5,
    text: "Am cumpărat o pușculiță pentru nepoțica mea și a adorat-o. Finisajul e impecabil, pare un obiect de artizanat de lux.",
    produs: "Pușculiță Fluture",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  },
  {
    nume: "Elena D.",
    rating: 4,
    text: "Produsele Zawaz sunt cu adevărat deosebite. Livrare rapidă, ambalaj îngrijit, recomand cu căldură!",
    produs: "Stativ Walnut Pro",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop&crop=face",
  },
  {
    nume: "Radu P.",
    rating: 5,
    text: "Am luat două stative — unul pentru birou, unul acasă. Ambele sunt stabile și au un design elegant, minimal.",
    produs: "Stativ Minimal Birch",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  },
  {
    nume: "Cristina V.",
    rating: 5,
    text: "Cadoul perfect! L-am oferit de ziua prietenei mele și a fost încântată. Ambalajul arăta premium.",
    produs: "Pușculiță Premium",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  },
  {
    nume: "Alexandru N.",
    rating: 5,
    text: "Design unic, calitate remarcabilă. Nu am mai văzut nicăieri un suport de telefon atât de bine realizat.",
    produs: "Stativ Bamboo",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
  },
  {
    nume: "Ioana S.",
    rating: 5,
    text: "Pușculița arată exact ca în poze, ba chiar mai frumoasă în realitate. O să mai comand cu siguranță!",
    produs: "Pușculiță Clasică",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
  },
  {
    nume: "Dan F.",
    rating: 5,
    text: "Foarte mulțumit de achiziție. Calitate superioară, livrare în timp record. Recomand 100%!",
    produs: "Stativ Walnut Pro",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  },
];

const looped = [...recenzii, ...recenzii, ...recenzii];

function Stars({ count }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i <= count ? "#c8a96e" : "#e0e0e0"} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Recenzii() {
  const scrollRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf;
    const step = () => {
      if (!pausedRef.current) {
        el.scrollLeft += 0.5;
        if (el.scrollLeft >= el.scrollWidth / 3) el.scrollLeft = 0;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section style={{ padding: "var(--section-padding)", background: "#faf9f7", overflow: "hidden" }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8a96e", marginBottom: 10 }}>Testimoniale</p>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#111", margin: 0 }}>Ce spun clienții noștri</h2>
        </div>
      </div>
      <div
        ref={scrollRef}
        style={{ display: "flex", gap: 24, overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none", paddingLeft: "clamp(24px, 5vw, 80px)", paddingRight: "clamp(24px, 5vw, 80px)", cursor: "grab" }}
        onMouseDown={() => { pausedRef.current = true; }}
        onMouseUp={() => { pausedRef.current = false; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        {looped.map((r, i) => (
          <div key={i} style={{ flexShrink: 0, width: 300, background: "#fff", borderRadius: 16, padding: "28px 24px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: 14 }}>
            <Stars count={r.rating} />
            <p style={{ fontSize: 15, color: "#444", lineHeight: 1.65, margin: 0, flex: 1 }}>"{r.text}"</p>
            <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                <img src={r.avatar} alt={r.nume} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: "#111" }}>{r.nume}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#999" }}>{r.produs}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
