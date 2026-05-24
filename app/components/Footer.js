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
