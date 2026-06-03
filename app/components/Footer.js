"use client";
import Link from "next/link";

const links = {
  "Produse": ["Stative", "Pușculițe", "Reduceri", "Produse Noi", "Populare"],
  "Ajutor": ["Returnare", "Livrare", "FAQ", "Contact"],
  "Companie": ["Despre Zawaz Wood", "Sustenabilitate", "Cariere", "Presă"],
};

export default function Footer() {
  return (
    <footer style={{ background: "#000", color: "#fff", paddingTop: 64, paddingBottom: 32, paddingLeft: 24, paddingRight: 24 }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
        {/* Top grid */}
        <div className="grid-4" style={{ marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>zawaz wood</span>
            <p style={{ marginTop: 16, color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.7, maxWidth: 240 }}>
              Stative și pușculițe din lemn, create cu pasiune pentru calitate și design autentic.
            </p>
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="https://maps.google.com/?q=Sarmizegetusa+92,+Chisinau,Moldova" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "flex-start", gap: 8, color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none", lineHeight: 1.5 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                str. Sarmizegetusa 92,<br />Chișinău, Moldova
              </a>
              <a href="mailto:zawazwood@gmail.com" style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                zawazwood@gmail.com
              </a>
              <a href="tel:+48733150750" style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.12 2.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                +48 733 150 750
              </a>
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
              {["Instagram", "Facebook", "TikTok"].map((s) => (
                <a key={s} href="#" style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none" }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16, color: "rgba(255,255,255,0.7)", marginTop: 0 }}>
                {title}
              </h4>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {items.map((item) => (
                  <li key={item}>
                    <Link href="#" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 40, paddingBottom: 32 }}>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: 0 }}>Abonează-te pentru oferte exclusive:</p>
          <form style={{ display: "flex", width: "100%", maxWidth: 360 }} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email-ul tău"
              style={{ flex: 1, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: 14, padding: "10px 16px", outline: "none" }}
            />
            <button
              type="submit"
              style={{ background: "#fff", color: "#000", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", padding: "10px 20px", border: "none", cursor: "pointer" }}
            >
              OK
            </button>
          </form>
        </div>

        {/* Bottom */}
        <div className="footer-bottom" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24 }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: 0 }}>© {new Date().getFullYear()} Zawaz Wood. Toate drepturile rezervate.</p>
          <div style={{ display: "flex", gap: 16 }}>
            <Link href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Politica de confidențialitate</Link>
            <Link href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Termeni și condiții</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
