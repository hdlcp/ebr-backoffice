// src/types/table.ts

export interface Table {
  id: number;
  nom: string;
  ordre: number;
  entreprise_id?: number;
  est_occupee: boolean;
}

export interface CreateTableRequest {
  nom: string;
  ordre: number;
  entreprise_id: number;
}

export interface UpdateTableRequest {
  nom?: string;
  ordre?: number;
}

export interface GetTablesResponse {
  detail: Table[];
}

export interface TableFormData {
  nom: string;
  ordre: string;
}