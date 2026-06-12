"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllCulori, getAllTeme, getAllOcazii, slugify } from "../lib/produse";

// Map color names to CSS colors
const COLOR_MAP = {
  "Negru": "#1a1a1a",
  "Alb": "#f5f5f5",
  "Gri": "#9e9e9e",
  "Argintiu": "#c0c0c0",
  "Roz": "#f48fb1",
  "Albastru": "#42a5f5",
  "Verde": "#66bb6a",
  "Portocaliu": "#ffa726",
  "Rosu": "#ef5350",
  "Galben": "#ffee58",
  "Mov": "#ab47bc",
  "Maro": "#8d6e63",
  "Bej": "#d7ccc8",
};

const TEMA_ICONS = { "Minimalist": "○", "Premium": "◈", "Industrial": "⬡", "Sport": "◎", "Studio": "◉", "Outdoor": "◬" };
const OCAZIE_ICONS = { "Cadou": "🎁", "Zi de naștere": "🎂", "Crăciun": "🎄", "Valentine's Day": "❤️", "Birou": "💼" };

const TYPE_LABELS = { culoare: "După culoare:", tema: "După motiv:", ocazie: "După circumstanțe:" };

function FilterDropdown({ options, onSelect, onClose, type }) {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (!e.target.closest(".gaseste-card")) onClose(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div ref={ref} style={{
      position: "absolute", top: "calc(100% + 8px)", left: 0,
      background: "#fff", borderRadius: 16, boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
      zIndex: 200, minWidth: 200, padding: "20px 24px 16px",
    }}>
      <p style={{ margin: "0 0 12px", fontWeight: 700, fontSize: 16, color: "#111" }}>
        {TYPE_LABELS[type]}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map((opt) => (
          <button key={opt} onClick={() => onSelect(opt)} style={{
            background: "none", border: "none", cursor: "pointer",
            textAlign: "left", fontSize: 15, fontWeight: 500,
            color: "#e6a817", padding: 0, lineHeight: 1.4,
          }}
            onMouseEnter={e => e.currentTarget.style.color = "#c8900f"}
            onMouseLeave={e => e.currentTarget.style.color = "#e6a817"}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function GasesteCard({ title, desc, btn, icon, type, options, accentColor }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isAccent = !!accentColor;
  const handleSelect = (val) => { setOpen(false); router.push(`/${type}/${slugify(val)}`); };

  return (
    <div className="gaseste-card" style={{
      background: accentColor || "#fff", borderRadius: 20, padding: "28px 24px 24px",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      minHeight: 280, position: "relative", overflow: "visible",
      boxShadow: isAccent ? "0 8px 32px rgba(245,166,35,0.3)" : "0 2px 16px rgba(0,0,0,0.06)",
      transition: "transform 0.25s ease, box-shadow 0.25s ease",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = isAccent ? "0 16px 40px rgba(245,166,35,0.4)" : "0 12px 32px rgba(0,0,0,0.12)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = isAccent ? "0 8px 32px rgba(245,166,35,0.3)" : "0 2px 16px rgba(0,0,0,0.06)"; }}
    >
      <div style={{ position: "absolute", top: 16, right: 16 }}>{icon}</div>
      <div style={{ flex: 1, paddingRight: 80 }}>
        <h3 style={{ fontSize: "clamp(18px, 1.8vw, 24px)", fontWeight: 800, color: isAccent ? "#fff" : "#111", margin: "0 0 10px", lineHeight: 1.2, whiteSpace: "pre-line" }}>{title}</h3>
        <p style={{ fontSize: 14, color: isAccent ? "rgba(255,255,255,0.85)" : "#777", margin: 0, lineHeight: 1.5 }}>{desc}</p>
      </div>
      <div style={{ position: "relative", marginTop: 24 }}>
        {isAccent ? (
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", padding: "8px 20px", borderRadius: 999, background: "#c0392b", color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>{btn}</Link>
        ) : (
          <>
            <button onClick={() => setOpen(o => !o)} style={{
              display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 999,
              border: "1.5px solid " + (open ? "#111" : "#ccc"), background: open ? "#111" : "transparent",
              color: open ? "#fff" : "#333", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
            }}>
              {btn}
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}><path d="M6 9l6 6 6-6"/></svg>
            </button>
            {open && <FilterDropdown options={options} onSelect={handleSelect} onClose={() => setOpen(false)} type={type} />}
          </>
        )}
      </div>
    </div>
  );
}

export default function GasestePerfect() {
  const culori = getAllCulori();
  const teme = getAllTeme();
  const ocazii = getAllOcazii();

  const colorIcon = (
    <div style={{ width: 110, height: 110, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 5 }}>
      {culori.map(c => <span key={c} title={c} style={{ width: 24, height: 24, borderRadius: "50%", background: COLOR_MAP[c] || "#ccc", border: c === "Alb" ? "1.5px solid #ddd" : "none", display: "inline-block", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }} />)}
    </div>
  );

  const temaIcon = (
    <div style={{ width: 100, height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 80 80" width={100} height={100}>
        <rect x="8" y="18" width="64" height="48" rx="8" fill="url(#igr)"/>
        <defs><linearGradient id="igr" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#74b9ff"/><stop offset="100%" stopColor="#0984e3"/></linearGradient></defs>
        <circle cx="26" cy="34" r="8" fill="#fdcb6e"/>
        <path d="M8 52l18-16 14 12 10-8 18 14" fill="none" stroke="#fff" strokeWidth="3" strokeLinejoin="round"/>
        <rect x="52" y="8" width="22" height="18" rx="4" fill="#ff7675" transform="rotate(-15 63 17)"/>
      </svg>
    </div>
  );

  const ocazieIcon = (
    <div style={{ width: 100, height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 80 80" width={100} height={100}>
        <ellipse cx="36" cy="58" rx="22" ry="8" fill="#b2bec3" opacity="0.3"/>
        <path d="M14 52 L28 20 L50 20 L64 52 Z" fill="url(#mgr)"/>
        <defs><linearGradient id="mgr" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f5f6fa"/><stop offset="100%" stopColor="#dcdde1"/></linearGradient></defs>
        <rect x="28" y="50" width="8" height="18" rx="4" fill="#636e72"/>
        <circle cx="60" cy="14" r="6" fill="#fd79a8"/>
        <circle cx="72" cy="22" r="4" fill="#fdcb6e"/>
        <circle cx="66" cy="28" r="3" fill="#6c5ce7"/>
      </svg>
    </div>
  );

  const customIcon = (
    <div style={{ width: 100, height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 80 80" width={100} height={100}>
        <ellipse cx="40" cy="60" rx="20" ry="16" fill="#ff7043"/>
        <circle cx="40" cy="32" r="16" fill="#ffccbc"/>
        <ellipse cx="40" cy="18" rx="14" ry="5" fill="#ff5722"/>
        <rect x="32" y="10" width="16" height="10" rx="4" fill="#ff7043"/>
        <rect x="24" y="50" width="22" height="16" rx="4" fill="#37474f"/>
        <circle cx="35" cy="58" r="5" fill="#546e7a"/>
        <circle cx="35" cy="58" r="3" fill="#263238"/>
      </svg>
    </div>
  );

  return (
    <section style={{ background: "#f0ece6", padding: "clamp(48px, 8vw, 80px) 0 clamp(48px, 8vw, 100px)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px, 4vw, 60px)" }}>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 900, color: "#111", margin: "0 0 clamp(24px, 4vw, 48px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
          Găsiți modelul perfect
        </h2>
        <div className="gaseste-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <GasesteCard title={"Găsi\ndupă culoare"} desc="Potriviți-vă la culoarea interiorului" btn="+ Selectați culoarea" icon={colorIcon} type="culoare" options={culori} />
          <GasesteCard title={"Găsi\ndupă motiv"} desc="Potrivește-te obiectivului tău" btn="+ Selectați o temă" icon={temaIcon} type="tema" options={teme} />
          <GasesteCard title={"Găsi\ndupă circumstanțe"} desc="Alege ca un cadou" btn="+ Alege o oportunitate" icon={ocazieIcon} type="ocazie" options={ocazii} />
          <GasesteCard title={"Proprie\nmodel?"} desc="70×50 cm" btn="Design" icon={customIcon} type="contact" options={[]} accentColor="#f5a623" />
        </div>
      </div>
    </section>
  );
}
