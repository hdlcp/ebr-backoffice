// src/types/employee.ts

export type EmployeeRole = 'gerant' | 'serveur';

export interface Employee {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: EmployeeRole;
  is_active: boolean;
  matricule: string;
  isOpen?: boolean; // Pour l'UI locale (état de la journée)
}

export interface CreateEmployeeRequest {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: EmployeeRole;
  is_active: boolean;
  password: string;
  matricule: string; // Champ vide envoyé lors de la création
  entreprise_id: number;
}

export interface CreateEmployeeResponse {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: EmployeeRole;
  is_active: boolean;
  matricule: string;
  id: number;
}

export interface UpdateEmployeeRequest {
  username?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  role?: EmployeeRole;
  is_active?: boolean;
  password?: string;
}

export interface GetEmployeesParams {
  entreprise_id: number;
  skip?: number;
  limit?: number;
}

export interface EmployeeFormData {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: EmployeeRole;
  password: string;
  confirmPassword: string;
  entreprise_id: number;
}