"use client";
import { useRef, useEffect } from "react";

const recenzii = [
  {
    nume: "Andreea M.",
    rating: 5,
    text: "Suportul pentru telefon e superb! Calitate excelentă a lemnului, se simte durabil și arată foarte bine pe birou.",
    produs: "Stativ Desktop Oak",
    avatar: "/649228640_18071305481541593_2569940497841099335_n.jpg",
  },
  {
    nume: "Mihai T.",
    rating: 5,
    text: "Am cumpărat o pușculiță pentru nepoțica mea și a adorat-o. Finisajul e impecabil, pare un obiect de artizanat de lux.",
    produs: "Pușculiță Fluture",
    avatar: "/652016407_18109972000688293_4732190092152406476_n.jpg",
  },
  {
    nume: "Elena D.",
    rating: 4,
    text: "Produsele Zawaz sunt cu adevărat deosebite. Livrare rapidă, ambalaj îngrijit, recomand cu căldură!",
    produs: "Stativ Walnut Pro",
    avatar: "/651692768_18122850004593018_1980090712385544462_n.jpg",
  },
  {
    nume: "Radu P.",
    rating: 5,
    text: "Am luat două stative — unul pentru birou, unul acasă. Ambele sunt stabile și au un design elegant, minimal.",
    produs: "Stativ Minimal Birch",
    avatar: "/652881912_18086837170958453_3864389683937982320_n.jpg",
  },
  {
    nume: "Cristina V.",
    rating: 5,
    text: "Cadoul perfect! L-am oferit de ziua prietenei mele și a fost încântată. Ambalajul arăta premium.",
    produs: "Pușculiță Premium",
    avatar: "/653684068_18070199012242558_3155586751005660151_n.jpg",
  },
  {
    nume: "Alexandru N.",
    rating: 5,
    text: "Design unic, calitate remarcabilă. Nu am mai văzut nicăieri un suport de telefon atât de bine realizat.",
    produs: "Stativ Bamboo",
    avatar: "/654879146_18156688264441075_4414091056187078662_n.jpg",
  },
  {
    nume: "Ioana S.",
    rating: 5,
    text: "Pușculița arată exact ca în poze, ba chiar mai frumoasă în realitate. O să mai comand cu siguranță!",
    produs: "Pușculiță Clasică",
    avatar: "/655060669_18101437822937639_1214634205534765741_n.jpg",
  },
  {
    nume: "Dan F.",
    rating: 5,
    text: "Foarte mulțumit de achiziție. Calitate superioară, livrare în timp record. Recomand 100%!",
    produs: "Stativ Walnut Pro",
    avatar: "/648893568_18014414480666664_2387728317279334603_n.jpg",
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
