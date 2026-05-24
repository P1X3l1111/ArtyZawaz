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
