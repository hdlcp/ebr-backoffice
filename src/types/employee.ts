// src/types/employee.ts

export interface Employee {
  id: string;
  name: string;
  role: 'gerant' | 'serveur';
  isOpen?: boolean;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEmployeeData {
  name: string;
  role: 'gerant' | 'serveur';
  password: string;
  email?: string;
}

export interface EmployeeFormData {
  name: string;
  role: 'gerant' | 'serveur';
  password: string;
  confirmPassword: string;
}

export enum EmployeeRole {
  GERANT = 'gerant',
  SERVEUR = 'serveur'
}