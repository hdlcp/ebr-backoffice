// src/types/menu.ts

export type MenuCategory = string; // Dynamique maintenant

export interface Menu {
  id: number;
  nom: string;
  prix: number;
  categorie: string;
  image: string;
  description: string;
  entreprise_id: number;
  menus: number[]; // Pour les packs
  status: number; // 1 = actif, -1 = désactivé
}

export interface CreateMenuRequest {
  nom: string;
  prix: number;
  categorie: string; // Dynamique
  image: File | null;
  entreprise_id: number;
  description: string;
}

export interface CreatePackRequest {
  nom: string;
  prix: number;
  categorie: 'pack';
  image: File | null;
  entreprise_id: number;
  description: string;
  menus: number[]; // IDs des menus du pack
}

export interface UpdateMenuRequest {
  nom?: string;
  prix?: number;
  categorie?: string;
  image?: File | null;
  description?: string;
  menus?: number[]; // Pour les packs
}

export interface GetMenusResponse {
  detail: Menu[];
}

export interface MenuFormData {
  nom: string;
  prix: string;
  categorie: string;
  image: File | null;
  description: string;
}

export interface PackFormData {
  nom: string;
  prix: string;
  categorie: string;
  selectedMenus: Menu[];
  description: string;
}