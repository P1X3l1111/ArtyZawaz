"use client";
import { useState, useEffect } from "react";

const TABS = ["Produse", "Categorii", "Utilizatori", "Hero Slider", "Blog"];

const inputStyle = {
  width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: 8,
  fontSize: 14, outline: "none", boxSizing: "border-box", background: "#fafafa",
};
const labelStyle = { fontSize: 12, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4, display: "block" };
const btnPrimary = { background: "#111", color: "#fff", border: "none", borderRadius: 8, padding: "10px 22px", fontWeight: 700, fontSize: 13, cursor: "pointer" };
const btnDanger = { background: "#ef4444", color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer" };
const btnSecondary = { background: "#f3f4f6", color: "#111", border: "1px solid #ddd", borderRadius: 8, padding: "10px 22px", fontWeight: 700, fontSize: 13, cursor: "pointer" };
const card = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20, display: "flex", gap: 16, alignItems: "flex-start" };

const emptyProdus = { id: "", name: "", price: "", oldPrice: "", category: "femei", tags: [], img: "", descriere: "", culori: [], imaginiCulori: {} };
const emptyCategorie = { slug: "", label: "", descriere: "", img: "" };
const emptyUtilizator = { id: "", nume: "", email: "", parola: "", rol: "Admin" };

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState("Produse");
  const [produse, setProduse] = useState([]);
  const [categorii, setCategorii] = useState([]);
  const [utilizatori, setUtilizatori] = useState([]);
  const [editProdus, setEditProdus] = useState(null);
  const [editCategorie, setEditCategorie] = useState(null);
  const [editUtilizator, setEditUtilizator] = useState(null);
  const [heroSlides, setHeroSlides] = useState([]);
  const [editHero, setEditHero] = useState(null);
  const [blogArticole, setBlogArticole] = useState([]);
  const [editBlog, setEditBlog] = useState(null);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [produseCat, setProduseCat] = useState("stative");

  useEffect(() => {
    sessionStorage.removeItem("admin_auth");
  }, []);

  useEffect(() => {
    if (loggedIn) { loadProduse(); loadCategorii(); loadUtilizatori(); loadHero(); loadBlog(); }
  }, [loggedIn]);

  if (!loggedIn) return <LoginPage onLogin={() => { setLoggedIn(true); }} />;

  async function loadProduse() {
    const r = await fetch("/api/produse"); setProduse(await r.json());
  }
  async function loadCategorii() {
    const r = await fetch("/api/categorii"); setCategorii(await r.json());
  }
  async function loadUtilizatori() {
    const r = await fetch("/api/utilizatori"); setUtilizatori(await r.json());
  }
  async function loadHero() {
    const r = await fetch("/api/hero"); setHeroSlides(await r.json());
  }
  async function loadBlog() {
    const r = await fetch("/api/blog"); setBlogArticole(await r.json());
  }

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  }

  async function saveProdus(data) {
    const isNew = !produse.find(p => p.id === data.id);
    const method = isNew ? "POST" : "PUT";
    const url = isNew ? "/api/produse" : `/api/produse/${data.id}`;
    const payload = { ...data, price: Number(data.price), oldPrice: data.oldPrice ? Number(data.oldPrice) : undefined };
    if (!payload.oldPrice) delete payload.oldPrice;
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    await loadProduse(); setEditProdus(null);
    showToast(isNew ? "Produs adaugat!" : "Produs salvat!");
  }

  async function deleteProdus(id) {
    if (!confirm("Stergi produsul?")) return;
    await fetch(`/api/produse/${id}`, { method: "DELETE" });
    await loadProduse(); showToast("Produs sters!", "error");
  }

  async function saveCategorie(data) {
    const isNew = !categorii.find(c => c.slug === data.slug);
    const method = isNew ? "POST" : "PUT";
    const url = isNew ? "/api/categorii" : `/api/categorii/${data.slug}`;
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    await loadCategorii(); setEditCategorie(null);
    showToast(isNew ? "Categorie adaugata!" : "Categorie salvata!");
  }

  async function deleteCategorie(slug) {
    if (!confirm("Stergi categoria?")) return;
    await fetch(`/api/categorii/${slug}`, { method: "DELETE" });
    await loadCategorii(); showToast("Categorie stersa!", "error");
  }

  async function saveUtilizator(data) {
    const isNew = !utilizatori.find(u => u.id === data.id);
    const method = isNew ? "POST" : "PUT";
    const url = isNew ? "/api/utilizatori" : `/api/utilizatori/${data.id}`;
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    await loadUtilizatori(); setEditUtilizator(null);
    showToast(isNew ? "Utilizator adaugat!" : "Utilizator salvat!");
  }

  async function deleteUtilizator(id) {
    if (utilizatori.length <= 1) { showToast("Nu poti sterge singurul admin!", "error"); return; }
    if (!confirm("Stergi utilizatorul?")) return;
    await fetch(`/api/utilizatori/${id}`, { method: "DELETE" });
    await loadUtilizatori(); showToast("Utilizator sters!", "error");
  }

  const filteredProduse = produse
    .filter(p => p.category === produseCat)
    .filter(p =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.id?.toLowerCase().includes(search.toLowerCase())
    );

  const ICONS = {
    "Produse": <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline strokeLinecap="round" strokeLinejoin="round" points="3.27,6.96 12,12.01 20.73,6.96"/><line strokeLinecap="round" x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    "Categorii": <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    "Utilizatori": <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    "Hero Slider": <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="5" width="20" height="14" rx="2"/><polyline strokeLinecap="round" strokeLinejoin="round" points="8,12 12,8 16,12"/></svg>,
    "Blog": <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9"/><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "system-ui, sans-serif", display: "flex" }}>
      <div style={{ width: 240, background: "#111", display: "flex", flexDirection: "column", minHeight: "100vh", flexShrink: 0, position: "sticky", top: 0, height: "100vh" }}>
        <div style={{ padding: "18px 14px 10px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", lineHeight: 1.3 }}>Zawaz Wood</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2, letterSpacing: "0.08em", textTransform: "uppercase" }}>Admin Panel</div>
        </div>
        <nav style={{ flex: 1, padding: "10px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: tab === t ? "rgba(255,255,255,0.12)" : "none",
              border: "none", borderRadius: 7, padding: "9px 12px",
              fontWeight: 700, fontSize: 13, cursor: "pointer",
              color: tab === t ? "#fff" : "rgba(255,255,255,0.5)",
              textAlign: "left", display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ display: "flex", alignItems: "center" }}>{ICONS[t]}</span> {t}
            </button>
          ))}
        </nav>
        <div style={{ padding: "12px 8px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", gap: 4 }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, padding: "7px 10px", borderRadius: 7 }}>← Site</a>
          <button onClick={() => { sessionStorage.removeItem("admin_auth"); setLoggedIn(false); }} style={{ background: "none", border: "none", color: "rgba(255,100,100,0.7)", fontSize: 12, cursor: "pointer", textAlign: "left", padding: "7px 10px", borderRadius: 7, fontWeight: 700 }}>Deconectare</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: "28px 28px", overflowY: "auto" }}>

        {tab === "Produse" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, gap: 16, flexWrap: "wrap" }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Produse ({produse.length})</h2>
              <div style={{ display: "flex", gap: 12 }}>
                <input placeholder="Cauta produs..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputStyle, width: 220 }} />
                <button style={btnPrimary} onClick={() => setEditProdus({ ...emptyProdus, category: produseCat })}>+ Produs Nou</button>
              </div>
            </div>
            {/* Sub-tabs */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {[{ slug: "stative", label: "Stative" }, { slug: "pusculate", label: "Pu\u0219culi\u021be" }].map(cat => (
                <button key={cat.slug} onClick={() => { setProduseCat(cat.slug); setSearch(""); setEditProdus(null); }} style={{
                  padding: "8px 22px", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer", border: "2px solid #111",
                  background: produseCat === cat.slug ? "#111" : "#fff",
                  color: produseCat === cat.slug ? "#fff" : "#111",
                  transition: "all 0.15s",
                }}>{cat.label} ({produse.filter(p => p.category === cat.slug).length})</button>
              ))}
            </div>
            {editProdus && <ProdusForm data={editProdus} categorii={categorii} onSave={saveProdus} onCancel={() => setEditProdus(null)} />}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {filteredProduse.map(p => (
                <div key={p.id} style={card}>
                  <img src={p.img} alt={p.name} style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8, flexShrink: 0, background: "#f3f4f6" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 16 }}>{p.name}</div>
                    <div style={{ color: "#888", fontSize: 13, marginTop: 2 }}>ID: {p.id} · {p.category} · {p.price} lei{p.oldPrice ? ` (vechi: ${p.oldPrice} lei)` : ""}</div>
                    <div style={{ marginTop: 6, display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {p.tags?.map(t => <span key={t} style={{ background: "#f3f4f6", borderRadius: 6, padding: "2px 8px", fontSize: 12, fontWeight: 600 }}>{t}</span>)}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <button style={btnSecondary} onClick={() => setEditProdus({ ...p, oldPrice: p.oldPrice || "", imaginiCulori: p.imaginiCulori || {} })}>Editeaza</button>
                    <button style={btnDanger} onClick={() => deleteProdus(p.id)}>Sterge</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Categorii" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Categorii ({categorii.length})</h2>
              <button style={btnPrimary} onClick={() => setEditCategorie({ ...emptyCategorie })}>+ Categorie Noua</button>
            </div>
            {editCategorie && <CategorieForm data={editCategorie} onSave={saveCategorie} onCancel={() => setEditCategorie(null)} />}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {categorii.map(c => (
                <div key={c.slug} style={{ ...card, flexDirection: "column", alignItems: "stretch" }}>
                  <img src={c.img} alt={c.label} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8, background: "#f3f4f6" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 16 }}>{c.label}</div>
                    <div style={{ color: "#888", fontSize: 12, marginTop: 2 }}>slug: {c.slug}</div>
                    <div style={{ color: "#555", fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>{c.descriere}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <button style={{ ...btnSecondary, flex: 1 }} onClick={() => setEditCategorie({ ...c })}>Editeaza</button>
                    <button style={btnDanger} onClick={() => deleteCategorie(c.slug)}>Sterge</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Hero Slider" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Hero Slider ({heroSlides.length} imagini)</h2>
              <button style={btnPrimary} onClick={() => setEditHero({ id: "", img: "", titlu: "", subtitlu: "", alt: "" })}>+ Slide Nou</button>
            </div>
            {editHero && (
              <HeroForm
                data={editHero}
                onSave={async (form) => {
                  const isNew = !heroSlides.find(s => s.id === form.id);
                  try {
                    let res;
                    if (isNew) {
                      res = await fetch("/api/hero", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: Date.now().toString() }) });
                    } else {
                      res = await fetch(`/api/hero/${form.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
                    }
                    if (!res.ok) {
                      const err = await res.json();
                      showToast("Eroare: " + (err.error || res.status), "error"); return;
                    }
                    await loadHero(); setEditHero(null);
                    showToast(isNew ? "Slide adaugat!" : "Slide salvat!");
                  } catch (e) {
                    showToast("Eroare retea: " + e.message, "error");
                  }
                }}
                onCancel={() => setEditHero(null)}
              />
            )}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
              {heroSlides.map((slide, idx) => (
                <div key={slide.id} style={{ ...card, flexDirection: "column", alignItems: "stretch", position: "relative" }}>
                  <div style={{ position: "relative", width: "100%", paddingBottom: "50%", borderRadius: 8, overflow: "hidden", background: "#f3f4f6" }}>
                    {slide.img && <img src={slide.img} alt={slide.alt || slide.titlu} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
                    <div style={{ position: "absolute", top: 8, left: 8, background: "rgba(0,0,0,0.6)", color: "#fff", borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>#{idx + 1}</div>
                  </div>
                  <div style={{ flex: 1, marginTop: 10 }}>
                    <div style={{ fontWeight: 800, fontSize: 15 }}>{slide.titlu || <span style={{ color: "#bbb" }}>Fara titlu</span>}</div>
                    {slide.subtitlu && <div style={{ color: "#888", fontSize: 13, marginTop: 2 }}>{slide.subtitlu}</div>}
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <button style={{ ...btnSecondary, flex: 1 }} onClick={() => setEditHero({ ...slide })}>Editeaza</button>
                    <button style={btnDanger} onClick={async () => {
                      if (!confirm("Stergi slide-ul?")) return;
                      await fetch(`/api/hero/${slide.id}`, { method: "DELETE" });
                      await loadHero(); showToast("Slide sters!", "error");
                    }}>Sterge</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Utilizatori" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Utilizatori Admin ({utilizatori.length})</h2>
              <button style={btnPrimary} onClick={() => setEditUtilizator({ ...emptyUtilizator })}>+ Utilizator Nou</button>
            </div>
            {editUtilizator && <UtilizatorForm data={editUtilizator} onSave={saveUtilizator} onCancel={() => setEditUtilizator(null)} />}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {utilizatori.map(u => (
                <div key={u.id} style={card}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#111", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 18, flexShrink: 0 }}>
                    {u.nume ? u.nume[0].toUpperCase() : "?"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 16 }}>{u.nume}</div>
                    <div style={{ color: "#888", fontSize: 13, marginTop: 2 }}>{u.email}</div>
                    <div style={{ marginTop: 6 }}>
                      <span style={{ background: "#f3f4f6", borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{u.rol}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <button style={btnSecondary} onClick={() => setEditUtilizator({ ...u })}>Editeaza</button>
                    <button style={btnDanger} onClick={() => deleteUtilizator(u.id)}>Sterge</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Blog" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Blog ({blogArticole.length} articole)</h2>
              <button style={btnPrimary} onClick={() => setEditBlog({ slug: "", titlu: "", rezumat: "", continut: "", categorie: "", citire: "", data: new Date().toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" }), img: "" })}>+ Articol Nou</button>
            </div>
            {editBlog && (
              <BlogForm
                data={editBlog}
                onSave={async (form) => {
                  const isNew = !blogArticole.find(a => a.slug === form.slug);
                  if (isNew) {
                    await fetch("/api/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
                  } else {
                    await fetch(`/api/blog/${form.slug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
                  }
                  await loadBlog(); setEditBlog(null);
                  showToast(isNew ? "Articol adaugat!" : "Articol salvat!");
                }}
                onCancel={() => setEditBlog(null)}
              />
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {blogArticole.map(a => (
                <div key={a.slug} style={card}>
                  <img src={a.img} alt={a.titlu} style={{ width: 100, height: 70, objectFit: "cover", borderRadius: 8, flexShrink: 0, background: "#f3f4f6" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#c8a96e", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{a.categorie}</div>
                    <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>{a.titlu}</div>
                    <div style={{ color: "#888", fontSize: 13 }}>{a.data} · {a.citire} citire</div>
                    <div style={{ color: "#555", fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>{a.rezumat?.slice(0, 100)}{a.rezumat?.length > 100 ? "..." : ""}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <button style={btnSecondary} onClick={() => setEditBlog({ ...a })}>Editeaza</button>
                    <button style={btnDanger} onClick={async () => {
                      if (!confirm("Stergi articolul?")) return;
                      await fetch(`/api/blog/${a.slug}`, { method: "DELETE" });
                      await loadBlog(); showToast("Articol sters!", "error");
                    }}>Sterge</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: 32, right: 32, background: toast.type === "error" ? "#ef4444" : "#22c55e", color: "#fff", padding: "14px 24px", borderRadius: 10, fontWeight: 700, fontSize: 14, boxShadow: "0 4px 20px rgba(0,0,0,0.2)", zIndex: 9999 }}>{toast.msg}</div>
      )}
    </div>
  );
}
function ProdusForm({ data, categorii, onSave, onCancel }) {
  const [form, setForm] = useState(data);

  return (
    <div style={{ background: "#fff", border: "2px solid #111", borderRadius: 14, padding: 28, marginBottom: 28 }}>
      <h3 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 800 }}>{data.id && data.name ? `Editeaza: ${data.name}` : "Produs Nou"}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div><label style={labelStyle}>ID</label><input style={inputStyle} value={form.id} onChange={e => set("id", e.target.value)} placeholder="f1, b2..." /></div>
        <div><label style={labelStyle}>Nume</label><input style={inputStyle} value={form.name} onChange={e => set("name", e.target.value)} /></div>
        <div><label style={labelStyle}>Pret (lei)</label><input style={inputStyle} type="number" value={form.price} onChange={e => set("price", e.target.value)} /></div>
        <div><label style={labelStyle}>Pret Vechi (optional)</label><input style={inputStyle} type="number" value={form.oldPrice} onChange={e => set("oldPrice", e.target.value)} /></div>
        <div>
          <label style={labelStyle}>Categorie</label>
          <select style={inputStyle} value={form.category} onChange={e => set("category", e.target.value)}>
            {categorii.map(c => <option key={c.slug} value={c.slug}>{c.label} ({c.slug})</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Imagine</label>
          <input type="file" accept="image/*" style={{ ...inputStyle, padding: "6px" }} onChange={async e => {
            const file = e.target.files[0];
            if (!file) return;
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const data = await res.json();
            if (data.url) set("img", data.url);
          }} />
          {form.img && <img src={form.img} alt="" style={{ marginTop: 8, width: 64, height: 64, objectFit: "cover", borderRadius: 6, border: "1px solid #ddd" }} />}
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          <label style={labelStyle}>Descriere</label>
          <textarea style={{ ...inputStyle, height: 80, resize: "vertical" }} value={form.descriere} onChange={e => set("descriere", e.target.value)} />
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          <label style={labelStyle}>Taguri</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["stative","pusculate","fete","baieti","copii","sport","reduceri","produse-noi","populare"].map(t => (
              <button key={t} type="button" onClick={() => toggleTag(t)} style={{ padding: "5px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "1.5px solid #111", background: form.tags.includes(t) ? "#111" : "#fff", color: form.tags.includes(t) ? "#fff" : "#111" }}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          <label style={labelStyle}>Culori disponibile</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Negru","Alb","Gri","Argintiu","Cappuccino","Bej","Navy","Cognac","Maro","Kaki","Verde","Albastru","Portocaliu","Roz","Violet","Coral","Roz pudrat","Rosu"].map(c => (
              <button key={c} type="button" onClick={() => toggleCuloare(c)} style={{ padding: "5px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "1.5px solid #111", background: form.culori.includes(c) ? "#111" : "#fff", color: form.culori.includes(c) ? "#fff" : "#111" }}>{c}</button>
            ))}
          </div>
        </div>
        {form.culori.length > 0 && (
          <div style={{ gridColumn: "1/-1" }}>
            <label style={labelStyle}>Imagini per culoare</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {form.culori.map(c => (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, minWidth: 80 }}>{c}:</span>
                  <input style={{ ...inputStyle, flex: 1 }} value={form.imaginiCulori?.[c] || ""} onChange={e => setForm(f => ({ ...f, imaginiCulori: { ...f.imaginiCulori, [c]: e.target.value } }))} placeholder="/img.jpg" />
                  {form.imaginiCulori?.[c] && <img src={form.imaginiCulori[c]} alt="" style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 5 }} />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <button style={btnPrimary} onClick={() => onSave(form)}>Salveaza</button>
        <button style={btnSecondary} onClick={onCancel}>Anuleaza</button>
      </div>
    </div>
  );
}

function CategorieForm({ data, onSave, onCancel }) {
  const [form, setForm] = useState(data);
  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }
  return (
    <div style={{ background: "#fff", border: "2px solid #111", borderRadius: 14, padding: 28, marginBottom: 28 }}>
      <h3 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 800 }}>{data.slug && data.label ? `Editeaza: ${data.label}` : "Categorie Noua"}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div><label style={labelStyle}>Slug (URL)</label><input style={inputStyle} value={form.slug} onChange={e => set("slug", e.target.value)} /></div>
        <div><label style={labelStyle}>Nume afisat</label><input style={inputStyle} value={form.label} onChange={e => set("label", e.target.value)} /></div>
        <div style={{ gridColumn: "1/-1" }}><label style={labelStyle}>Descriere</label><textarea style={{ ...inputStyle, height: 72, resize: "vertical" }} value={form.descriere} onChange={e => set("descriere", e.target.value)} /></div>
        <div style={{ gridColumn: "1/-1" }}>
          <label style={labelStyle}>Imagine</label>
          <input type="file" accept="image/*" style={{ ...inputStyle, padding: "6px" }} onChange={async e => {
            const file = e.target.files[0];
            if (!file) return;
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const data = await res.json();
            if (data.url) set("img", data.url);
          }} />
          {form.img && <img src={form.img} alt="" style={{ marginTop: 8, width: 80, height: 56, objectFit: "cover", borderRadius: 6, border: "1px solid #ddd" }} />}
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <button style={btnPrimary} onClick={() => onSave(form)}>Salveaza</button>
        <button style={btnSecondary} onClick={onCancel}>Anuleaza</button>
      </div>
    </div>
  );
}

function UtilizatorForm({ data, onSave, onCancel }) {
  const [form, setForm] = useState(data);
  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }
  return (
    <div style={{ background: "#fff", border: "2px solid #111", borderRadius: 14, padding: 28, marginBottom: 28 }}>
      <h3 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 800 }}>{data.id && data.nume ? `Editeaza: ${data.nume}` : "Utilizator Nou"}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div><label style={labelStyle}>Nume complet</label><input style={inputStyle} value={form.nume} onChange={e => set("nume", e.target.value)} placeholder="Ion Popescu" /></div>
        <div><label style={labelStyle}>Email</label><input style={inputStyle} type="email" value={form.email} onChange={e => set("email", e.target.value)} /></div>
        <div><label style={labelStyle}>Parola</label><input style={inputStyle} type="password" value={form.parola} onChange={e => set("parola", e.target.value)} autoComplete="new-password" /></div>
        <div>
          <label style={labelStyle}>Rol</label>
          <select style={inputStyle} value={form.rol} onChange={e => set("rol", e.target.value)}>
            <option value="Super Admin">Super Admin</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <button style={btnPrimary} onClick={() => onSave(form)}>Salveaza</button>
        <button style={btnSecondary} onClick={onCancel}>Anuleaza</button>
      </div>
    </div>
  );
}

function BlogForm({ data, onSave, onCancel }) {
  const [form, setForm] = useState(data);
  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }
  return (
    <div style={{ background: "#fff", border: "2px solid #111", borderRadius: 14, padding: 28, marginBottom: 28 }}>
      <h3 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 800 }}>{data.titlu ? `Editeaza: ${data.titlu}` : "Articol Nou"}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ gridColumn: "1/-1" }}><label style={labelStyle}>Titlu</label><input style={inputStyle} value={form.titlu} onChange={e => set("titlu", e.target.value)} placeholder="Titlul articolului" /></div>
        <div><label style={labelStyle}>Categorie</label><input style={inputStyle} value={form.categorie} onChange={e => set("categorie", e.target.value)} placeholder="Ghid, Materiale, Inspirație..." /></div>
        <div><label style={labelStyle}>Timp citire</label><input style={inputStyle} value={form.citire} onChange={e => set("citire", e.target.value)} placeholder="5 min" /></div>
        <div><label style={labelStyle}>Data</label><input style={inputStyle} value={form.data} onChange={e => set("data", e.target.value)} placeholder="8 Mai 2026" /></div>
        <div><label style={labelStyle}>Slug (URL)</label><input style={inputStyle} value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="auto-generat din titlu" /></div>
        <div style={{ gridColumn: "1/-1" }}><label style={labelStyle}>Rezumat</label><textarea style={{ ...inputStyle, height: 72, resize: "vertical" }} value={form.rezumat} onChange={e => set("rezumat", e.target.value)} placeholder="Un scurt rezumat al articolului..." /></div>
        <div style={{ gridColumn: "1/-1" }}><label style={labelStyle}>Continut</label><textarea style={{ ...inputStyle, height: 160, resize: "vertical" }} value={form.continut} onChange={e => set("continut", e.target.value)} placeholder="Textul complet al articolului..." /></div>
        <div style={{ gridColumn: "1/-1" }}>
          <label style={labelStyle}>Imagine principala</label>
          <input type="file" accept="image/*" style={{ ...inputStyle, padding: "6px" }} onChange={async e => {
            const file = e.target.files[0];
            if (!file) return;
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const d = await res.json();
            if (d.url) set("img", d.url);
          }} />
          {form.img && <img src={form.img} alt="" style={{ marginTop: 10, width: 160, height: 100, objectFit: "cover", borderRadius: 8, border: "1px solid #ddd" }} />}
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <button style={{ ...btnPrimary, opacity: form.titlu && form.img ? 1 : 0.5 }} disabled={!form.titlu || !form.img} onClick={() => onSave(form)}>Salveaza</button>
        <button style={btnSecondary} onClick={onCancel}>Anuleaza</button>
      </div>
    </div>
  );
}

function HeroForm({ data, onSave, onCancel }) {
  const [form, setForm] = useState(data);
  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }
  return (
    <div style={{ background: "#fff", border: "2px solid #111", borderRadius: 14, padding: 28, marginBottom: 28 }}>
      <h3 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 800 }}>{data.img ? "Editeaza Slide" : "Slide Nou"}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div><label style={labelStyle}>Titlu (optional)</label><input style={inputStyle} value={form.titlu} onChange={e => set("titlu", e.target.value)} placeholder="Colecție Nouă" /></div>
        <div><label style={labelStyle}>Subtitlu (optional)</label><input style={inputStyle} value={form.subtitlu} onChange={e => set("subtitlu", e.target.value)} placeholder="Primăvara 2026" /></div>
        <div style={{ gridColumn: "1/-1" }}>
          <label style={labelStyle}>Imagine</label>
          <input type="file" accept="image/*" style={{ ...inputStyle, padding: "6px" }} onChange={async e => {
            const file = e.target.files[0];
            if (!file) return;
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const d = await res.json();
            if (d.url) set("img", d.url);
          }} />
          {form.img && (
            <div style={{ marginTop: 10, position: "relative", width: "100%", paddingBottom: "40%", borderRadius: 8, overflow: "hidden", background: "#f3f4f6" }}>
              <img src={form.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <button style={{ ...btnPrimary, opacity: form.img ? 1 : 0.5 }} disabled={!form.img} onClick={() => onSave(form)}>Salveaza</button>
        <button style={btnSecondary} onClick={onCancel}>Anuleaza</button>
      </div>
    </div>
  );
}

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [eroare, setEroare] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const r = await fetch("/api/utilizatori");
      const lista = await r.json();
      const user = lista.find(u => u.email === email && u.parola === parola);
      if (user) { onLogin(); } else { setEroare("Email sau parola incorecta."); }
    } catch { setEroare("Eroare de conexiune."); }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#111", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: "40px 36px", width: 360, boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: "0.15em", textTransform: "uppercase" }}>Zawaz Wood</div>
          <div style={{ color: "#888", fontSize: 13, marginTop: 4 }}>Autentificare Admin</div>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div><label style={labelStyle}>Email</label><input style={inputStyle} type="email" value={email} onChange={e => { setEmail(e.target.value); setEroare(""); }} autoFocus /></div>
          <div><label style={labelStyle}>Parola</label><input style={inputStyle} type="password" value={parola} onChange={e => { setParola(e.target.value); setEroare(""); }} /></div>
          {eroare && <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", borderRadius: 8, padding: "8px 12px", fontSize: 13, fontWeight: 600 }}>{eroare}</div>}
          <button type="submit" style={{ background: "#111", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Intra in Admin</button>
        </form>
      </div>
    </div>
  );
}
