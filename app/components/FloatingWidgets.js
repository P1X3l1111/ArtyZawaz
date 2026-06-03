"use client";
import { useState, useEffect } from "react";

const MENU_LINKS = [
  { label: "Verifica certificatul", href: "#" },
  { label: "Criterii de calitate", href: "#" },
  { label: "Conditii de garantie", href: "#" },
  { label: "Toate opiniile", href: "#" },
  { label: "Date despre firma", href: "#" },
  { label: "Protectia datelor personale", href: "#" },
  { label: "Opinii autentice", href: "#" },
];

function Star({ filled }) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill={filled ? "#f5a623" : "#ddd"}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}

export default function FloatingWidgets() {
  const [showPhone, setShowPhone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLicenses, setShowLicenses] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowPhone(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (!e.target.closest("#ts-badge")) setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen]);

  return (
    <>
      {/* -- STANGA JOS: Trusted Shops badge -- */}
      <div id="ts-badge" style={{ position: "fixed", bottom: 24, left: 20, zIndex: 1000 }}>

        {/* Dropdown menu */}
        {menuOpen && (
          <div style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: 0,
            background: "#1e2235",
            borderRadius: 12,
            padding: "8px 0",
            minWidth: 280,
            boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
            zIndex: 1001,
          }}>
            {MENU_LINKS.map((item, i) => (
              <a key={i} href={item.href} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "9px 18px", color: "#fff", fontSize: 13, fontWeight: 500,
                textDecoration: "none", lineHeight: 1.35, transition: "background 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                {item.label}
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={2} style={{ flexShrink: 0, marginLeft: 8 }}>
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            ))}
            {/* Licente furnizori externi */}
            <button onClick={() => { setMenuOpen(false); setShowLicenses(true); }} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              width: "100%", padding: "9px 18px", color: "#fff", fontSize: 13, fontWeight: 500,
              background: "none", border: "none", cursor: "pointer", textAlign: "left",
            }}
              onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.06)"}
              onMouseLeave={e => e.currentTarget.style.background="transparent"}
            >
              Licențe furnizori externi
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={2} style={{ flexShrink: 0, marginLeft: 8 }}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </button>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", margin: "6px 0" }} />
            <button onClick={() => { setMenuOpen(false); setShowModal(true); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 18px", color: "#fff", fontSize: 13, fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>+ Mărește</button>
          </div>
        )}

        {isMobile ? (
          /* -- MOBILE: just the TS logo circle -- */
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            background: "#1e2235",
            boxShadow: "0 4px 16px rgba(0,0,0,0.28)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }} onClick={() => setMenuOpen(o => !o)}>
            <svg viewBox="0 0 64 64" width={34} height={34}>
              <circle cx={32} cy={32} r={31} fill="#f5a623"/>
              <circle cx={32} cy={32} r={27} fill="#1e2235"/>
              <circle cx={32} cy={32} r={24} fill="none" stroke="#f5a623" strokeWidth={1.2}/>
              <text x="32" y="22" textAnchor="middle" fontSize={6} fontWeight="800" fill="#f5a623" fontFamily="Arial, sans-serif" letterSpacing="1">TRUSTED</text>
              <text x="32" y="36" textAnchor="middle" fontSize={16} fontWeight="900" fill="#fff" fontFamily="Georgia, serif" dominantBaseline="middle">e</text>
              <text x="32" y="46" textAnchor="middle" fontSize={6} fontWeight="800" fill="#f5a623" fontFamily="Arial, sans-serif" letterSpacing="1">SHOPS</text>
            </svg>
          </div>
        ) : (
          /* -- DESKTOP: full badge card -- */
          <div style={{
            background: "#1e2235", borderRadius: 14, padding: "14px 16px 12px",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)", width: 130, position: "relative", userSelect: "none",
          }}>
            <button onClick={() => setMenuOpen(o => !o)} style={{
              position: "absolute", top: 8, right: 8, background: "none", border: "none",
              cursor: "pointer", color: "rgba(255,255,255,0.45)", fontSize: 16, lineHeight: 1, padding: "2px 4px", letterSpacing: "1px",
            }}>...</button>

            <div style={{ position: "relative", width: 60, height: 60, marginTop: 4 }}>
              <svg viewBox="0 0 64 64" width={60} height={60}>
                <circle cx={32} cy={32} r={31} fill="#f5a623"/>
                <circle cx={32} cy={32} r={27} fill="#1e2235"/>
                <circle cx={32} cy={32} r={24} fill="none" stroke="#f5a623" strokeWidth={1.2}/>
                <text x="32" y="22" textAnchor="middle" fontSize={6} fontWeight="800" fill="#f5a623" fontFamily="Arial, sans-serif" letterSpacing="1">TRUSTED</text>
                <text x="32" y="36" textAnchor="middle" fontSize={16} fontWeight="900" fill="#fff" fontFamily="Georgia, serif" dominantBaseline="middle">e</text>
                <text x="32" y="46" textAnchor="middle" fontSize={6} fontWeight="800" fill="#f5a623" fontFamily="Arial, sans-serif" letterSpacing="1">SHOPS</text>
              </svg>
              <div style={{
                position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)",
                background: "#f5a623", borderRadius: 6, padding: "2px 7px",
                fontSize: 8, fontWeight: 800, color: "#1e2235", whiteSpace: "nowrap",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              }}>GUARANTEE</div>
            </div>

            <p style={{ margin: "8px 0 0", fontSize: 12, fontWeight: 700, color: "#fff", textAlign: "center", lineHeight: 1.3 }}>
              Protectia<br />Cumparatorului
            </p>
            <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
              {[1,2,3,4,5].map(i => <Star key={i} filled={true} />)}
            </div>
            <p style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1 }}>4,91</p>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#f5a623" }}>Excelent</p>
          </div>
        )}
      </div>

      {/* -- DREAPTA JOS: buton telefon -- */}
      <a
        href="tel:+37368559911"
        style={{
          position: "fixed",
          bottom: 28,
          right: 24,
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          gap: isMobile ? 0 : 14,
          background: isMobile ? "transparent" : "#f5f0e8",
          border: isMobile ? "none" : "2.5px solid #111",
          borderRadius: 999,
          padding: isMobile ? 0 : "12px 22px 12px 12px",
          textDecoration: "none",
          boxShadow: isMobile ? "none" : "0 8px 32px rgba(0,0,0,0.18)",
          transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
          transform: showPhone ? "translateY(0) scale(1)" : "translateY(120px) scale(0.85)",
          opacity: showPhone ? 1 : 0,
          pointerEvents: showPhone ? "auto" : "none",
        }}
      >
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          background: "#111",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          boxShadow: isMobile ? "0 4px 16px rgba(0,0,0,0.28)" : "none",
        }}>
          <svg width={20} height={20} viewBox="0 0 24 24" fill="#fff">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </div>
        {!isMobile && (
          <div>
            <p style={{ margin: 0, fontSize: 11, color: "#888", fontWeight: 500, lineHeight: 1 }}>Ai nevoie de ajutor?</p>
            <p style={{ margin: "3px 0 0", fontSize: 17, fontWeight: 800, color: "#111", lineHeight: 1, letterSpacing: "-0.02em" }}>068 559 911</p>
          </div>
        )}
      </a>
      {/* -- MODAL Trusted Shops -- */}
      {showModal && (
        <div onClick={() => setShowModal(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 2000,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "#1e2235", borderRadius: 16, width: "100%", maxWidth: 380,
            overflow: "hidden", boxShadow: "0 16px 64px rgba(0,0,0,0.5)",
            display: "flex", flexDirection: "column",
          }}>
            {/* Header */
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>ArtyZawaz</span>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: 20, lineHeight: 1 }}>×</button>
            </div>

            {/* Row 1 */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.04)"}
              onMouseLeave={e => e.currentTarget.style.background="transparent"}>
              <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 10, background: "rgba(245,166,35,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg viewBox="0 0 64 64" width={32} height={32}>
                  <circle cx={32} cy={32} r={31} fill="#f5a623"/>
                  <circle cx={32} cy={32} r={27} fill="#1e2235"/>
                  <text x="32" y="36" textAnchor="middle" fontSize={16} fontWeight="900" fill="#fff" fontFamily="Georgia, serif" dominantBaseline="middle">e</text>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 700, color: "#fff", fontSize: 14, lineHeight: 1.3 }}>Cumpărături sigure</p>
                <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.55)", fontSize: 12, lineHeight: 1.4 }}>Acest magazin îndeplinește criteriile de calitate Trusted Shops</p>
              </div>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={2.5}><path d="M9 18l6-6-6-6"/></svg>
            </div>

            {/* Row 2 */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.04)"}
              onMouseLeave={e => e.currentTarget.style.background="transparent"}>
              <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 10, background: "rgba(100,200,100,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 700, color: "#fff", fontSize: 14, lineHeight: 1.3 }}>Garanție gratuită independentă</p>
                <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.55)", fontSize: 12, lineHeight: 1.4 }}>Comanda ta este protejată gratuit până la 10.000 lei, indiferent de metoda de plată</p>
              </div>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={2.5}><path d="M9 18l6-6-6-6"/></svg>
            </div>

            {/* Row 3 - Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.04)"}
              onMouseLeave={e => e.currentTarget.style.background="transparent"}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 700, color: "#fff", fontSize: 14 }}>Evaluare: <span style={{ color: "#f5a623" }}>Excelent</span></p>
                <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "6px 0 2px" }}>
                  {[1,2,3,4,5].map(i => <Star key={i} filled={true} />)}
                  <span style={{ color: "#fff", fontWeight: 800, fontSize: 15, marginLeft: 4 }}>4,91</span>
                </div>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.45)", fontSize: 12 }}>Bazat pe recenziile clienților noștri</p>
              </div>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={2.5}><path d="M9 18l6-6-6-6"/></svg>
            </div>

            {/* Footer */}
            <div style={{ padding: "10px 18px 14px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>•••</span>
              <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>Date firmă & Protecția datelor personale</span>
            </div>
          </div>
        </div>
      )}
      {/* -- MODAL Licente furnizori externi -- */
      {showLicenses && (
        <div onClick={() => setShowLicenses(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 2000,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "#1e2235", borderRadius: 16, width: "100%", maxWidth: 380,
            overflow: "hidden", boxShadow: "0 16px 64px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", maxHeight: "80vh",
          }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}>
              <button onClick={() => setShowLicenses(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", fontSize: 18, lineHeight: 1, padding: "2px 6px 2px 0" }}>‹</button>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, color: "#f5a623", fontWeight: 700, fontSize: 14 }}>Licențe furnizori externi</p>
              </div>
              <button onClick={() => setShowLicenses(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: 20, lineHeight: 1 }}>×</button>
            </div>

            {/* Scrollable content */}
            <div style={{ overflowY: "auto", padding: "20px 18px", flex: 1 }}>
              <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 800, margin: "0 0 20px" }}>Licențe terțe</h2>

              {[
                {
                  name: "Next.js",
                  url: "https://nextjs.org/",
                  license: "Licența MIT",
                  copyright: "Copyright (c) 2016-prezent Vercel, Inc.",
                },
                {
                  name: "React",
                  url: "https://react.dev/",
                  license: "Licența MIT",
                  copyright: "Copyright (c) Meta Platforms, Inc. și asociații",
                },
                {
                  name: "Tailwind CSS",
                  url: "https://tailwindcss.com/",
                  license: "Licența MIT",
                  copyright: "Copyright (c) Tailwind Labs, Inc.",
                },
                {
                  name: "Vercel",
                  url: "https://vercel.com/",
                  license: "Licența MIT",
                  copyright: "Copyright (c) 2024 Vercel, Inc.",
                },
              ].map((lib, i) => (
                <div key={i} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                  <h3 style={{ margin: "0 0 4px", color: "#fff", fontSize: 16, fontWeight: 700 }}>{lib.name}</h3>
                  <a href={lib.url} target="_blank" rel="noopener noreferrer" style={{ color: "#f5a623", fontSize: 12, display: "block", marginBottom: 6 }}>{lib.url}</a>
                  <p style={{ margin: "0 0 4px", color: "rgba(255,255,255,0.7)", fontSize: 13 }}>{lib.license}</p>
                  <p style={{ margin: "0 0 10px", color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{lib.copyright}</p>
                  <p style={{ margin: 0, color: "rgba(255,255,255,0.45)", fontSize: 12, lineHeight: 1.6 }}>
                    Prin prezenta se acordă gratuit oricărei persoane care obține o copie a acestui software și a fișierelor de documentație asociate dreptul de a utiliza, copia, modifica, îmbina, publica, distribui, sublicenția și/sau vinde copii ale software-ului, fără restricții, cu condiția includerii notificării de copyright în toate copiile.
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ padding: "10px 18px 14px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>•••</span>
              <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>Date firmă & Protecția datelor personale</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}