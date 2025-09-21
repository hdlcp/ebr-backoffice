// src/types/table.ts

export interface Table {
  id: string;
  name: string;
  order: number;
  isActive: boolean;
  isOccupied?: boolean;
  capacity?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTableData {
  name: string;
  order: number;
  capacity?: number;
}

export interface TableFormData {
  name: string;
  order: string;
  capacity?: string;
}

export enum TableStatus {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
  RESERVED = 'reserved',
  INACTIVE = 'inactive'
}