// src/types/menu.ts

export type MenuCategory = 'repas' | 'boissons' | 'pack';

export interface Menu {
  id: number;
  nom: string;
  prix: number;
  categorie: MenuCategory;
  image: string;
  description: string;
  entreprise_id: number;
  menus: number[]; // Pour les packs
  status: number; // 1 = actif, -1 = désactivé
}

export interface CreateMenuRequest {
  nom: string;
  prix: number;
  categorie: 'repas' | 'boissons';
  image: File | null;
  entreprise_id: number;
  description: string;
  menus: number[];
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
  categorie?: MenuCategory;
  image?: File | null;
  description?: string;
}

export interface GetMenusResponse {
  detail: Menu[];
}

export interface MenuFormData {
  nom: string;
  prix: string;
  categorie: 'repas' | 'boissons' | '';
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