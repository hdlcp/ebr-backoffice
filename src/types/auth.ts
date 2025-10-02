// src/types/auth.ts

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserInfo {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  is_active: boolean;
  matricule: string | null;
  id: number;
}

export interface Entreprise {
  id: number;
  raison_sociale: string;
  telephone: string;
  email: string;
  site_web: string;
  numero_ifu: string;
  numero_registre_commerce: string;
  is_active: boolean;
  code_entreprise: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: UserInfo;
  entreprises: Entreprise[];
}

export interface LoginError {
  detail: string;
}