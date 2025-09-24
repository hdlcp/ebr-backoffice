// src/types/company.ts

export interface Company {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCompanyData {
  name: string;
}