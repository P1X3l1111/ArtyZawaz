"use client";
import { useState } from "react";
import Link from "next/link";
import { useCos } from "../context/CosContext";

const culoaraPaleta = {
  "Alb": "#ffffff",
  "Negru": "#111111",
  "Cappuccino": "#c6a880",
  "Bej": "#e8d5b7",
  "Navy": "#1e3a5f",
  "Cognac": "#8b4513",
  "Maro": "#6b3a2a",
  "Gri": "#9e9e9e",
  "Kaki": "#8a7d55",
  "Verde": "#4a7c59",
  "Albastru": "#2563eb",
  "Portocaliu": "#ea580c",
  "Roz": "#f472b6",
  "Violet": "#9333ea",
  "Coral": "#f87171",
  "Roz pudrat": "#f9a8d4",
};



export default function ProdusCard({ produs }) {
  const [favorit, setFavorit] = useState(false);
  const [adaugat, setAdaugat] = useState(false);
  const [selectedCuloare, setSelectedCuloare] = useState(produs.culori?.[0] || null);
  const { adaugaInCos } = useCos();

  const hasDiscount = produs.oldPrice;
  const discount = hasDiscount ? `-${Math.round((1 - produs.price / produs.oldPrice) * 100)}%` : null;
  const currentImg = (selectedCuloare && produs.imaginiCulori?.[selectedCuloare]) || produs.img;

  const handleCart = (e) => {
    e.preventDefault();
    adaugaInCos(produs, selectedCuloare, null);
    setAdaugat(true);
    setTimeout(() => setAdaugat(false), 1800);
  };

  const handleFavorit = (e) => {
    e.preventDefault();
    setFavorit(f => !f);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, position: "relative" }}>
      <Link href={`/produse/${produs.id}`} style={{ textDecoration: "none" }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", overflow: "hidden", borderRadius: 12, background: "#f5f5f5" }}>
          <img
            src={currentImg}
            alt={produs.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" }}
            onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
          />

          {/* Badge */}
          {discount && (
            <span className="pcard-badge" style={{ position: "absolute", top: 12, right: 12, background: "#dc2626", color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 4, textTransform: "uppercase" }}>
              {discount}
            </span>
          )}
          {produs.tags?.includes("produse-noi") && !discount && (
            <span className="pcard-badge" style={{ position: "absolute", top: 12, right: 12, background: "#111", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              NOU
            </span>
          )}

          {/* Add to cart button - visible on hover via CSS trick with group */}
          <div className="pcard-cart-wrap" style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "0 10px 10px",
          }}>
            <button
              onClick={handleCart}
              className="pcard-cart-btn"
              style={{
                width: "100%", padding: "10px 0",
                background: adaugat ? "#16a34a" : "rgba(17,17,17,0.85)",
                color: "#fff", fontSize: 12, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.12em",
                border: "none", borderRadius: 8, cursor: "pointer",
                transition: "background 0.3s",
                backdropFilter: "blur(4px)"
              }}
            >
              {adaugat ? "✓ Adăugat!" : "Adaugă în coș"}
            </button>
          </div>
        </div>
      </Link>

      {/* Favorite button */}
      <button
        onClick={handleFavorit}
        className="pcard-fav"
        style={{
          position: "absolute", top: 10, left: 10, width: 36, height: 36,
          background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)", transition: "transform 0.2s",
          zIndex: 10
        }}
        aria-label="Adaugă la favorite"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill={favorit ? "#dc2626" : "none"} stroke={favorit ? "#dc2626" : "#555"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
      <div className="pcard-info" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Link href={`/produse/${produs.id}`} style={{ textDecoration: "none" }}>
          <p className="pcard-name" style={{ fontSize: 15, fontWeight: 700, color: "#111", margin: 0 }}>{produs.name}</p>
        </Link>

        {/* Color swatches removed */}

        <div className="pcard-price-row" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <p className="pcard-price" style={{ fontSize: 15, fontWeight: 700, color: hasDiscount ? "#dc2626" : "#111", margin: 0 }}>
            {produs.price.toLocaleString("ro-RO")} lei
          </p>
          {hasDiscount && (
            <p style={{ fontSize: 13, color: "#999", textDecoration: "line-through", margin: 0 }}>
              {produs.oldPrice.toLocaleString("ro-RO")} lei
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

