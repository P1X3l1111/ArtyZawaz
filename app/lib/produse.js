import produseData from "../../data/produse.json";
import categoriiData from "../../data/categorii.json";

export const produse = produseData;
export const categorii = categoriiData;

export function getProduseByCategorie(slug) {
  if (slug === "copii") return produse.filter(p => p.tags.includes("fete") || p.tags.includes("baieti"));
  return produse.filter(p => p.tags.includes(slug));
}

export function getProdusById(id) {
  return produse.find(p => p.id === id);
}

export function getCategorieBySlug(slug) {
  return categorii.find(c => c.slug === slug);
}

export function getProduseByculoare(culoare) {
  return produse.filter(p => p.culori?.includes(culoare));
}

export function getProduseByTema(tema) {
  return produse.filter(p => p.tema?.includes(tema));
}

export function getProduseByOcazie(ocazie) {
  return produse.filter(p => p.ocazie?.includes(ocazie));
}

export function getAllCulori() {
  return [...new Set(produse.flatMap(p => p.culori || []))].sort();
}

export function getAllTeme() {
  return [...new Set(produse.flatMap(p => p.tema || []))].sort();
}

export function getAllOcazii() {
  return [...new Set(produse.flatMap(p => p.ocazie || []))].sort();
}

export function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function deslugify(slug) {
  // Try to find original value from data
  const allCulori = getAllCulori();
  const allTeme = getAllTeme();
  const allOcazii = getAllOcazii();
  const all = [...allCulori, ...allTeme, ...allOcazii];
  return all.find(v => slugify(v) === slug) || slug;
}
