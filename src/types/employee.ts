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
  entreprise_id: number;
  isOpen?: boolean; // Pour l'UI locale
}

export interface CreateEmployeeRequest {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: EmployeeRole;
  matricule: string;
  entreprise_id: number;
  password: string;
}

export interface CreateEmployeeResponse {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: EmployeeRole;
  is_active: boolean;
  matricule: string;
  entreprise_id: number;
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
  matricule: string;
  entreprise_id: number;
  password: string;
  confirmPassword: string;
}
