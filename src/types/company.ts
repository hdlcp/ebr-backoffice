// src/types/company.ts

export interface Company {
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

export interface CreateCompanyRequest {
  raison_sociale: string;
  telephone: string;
  email: string;
  site_web: string;
  numero_ifu: string;
  numero_registre_commerce: string;
}

export interface CreateCompanyResponse {
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

// Type pour la compatibilité avec l'ancien code
export interface CreateCompanyData {
  name: string;
}