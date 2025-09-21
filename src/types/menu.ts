// src/types/menu.ts

export interface Menu {
  id: string;
  name: string;
  price: number;
  category: 'boissons' | 'repas';
  image?: string;
  description?: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Pack {
  id: string;
  name: string;
  price: number;
  category: string;
  menus: Menu[];
  description?: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMenuData {
  name: string;
  price: number;
  category: 'boissons' | 'repas';
  image?: File;
  description?: string;
}

export interface CreatePackData {
  name: string;
  price: number;
  category: string;
  menuIds: string[];
  description?: string;
}

export interface MenuFormData {
  name: string;
  price: string;
  category: 'boissons' | 'repas' | '';
  image?: File;
}

export interface PackFormData {
  name: string;
  price: string;
  category: string;
  selectedMenus: Menu[];
}

export enum MenuCategory {
  BOISSONS = 'boissons',
  REPAS = 'repas'
}

export enum PackCategory {
  LUNCH = 'lunch',
  DINNER = 'dinner',
  BREAKFAST = 'breakfast',
  SPECIAL = 'special'
}