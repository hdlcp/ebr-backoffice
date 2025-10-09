// src/services/api/tableService.ts
import { httpClient, ApiResponse } from '../http/httpClient';
import { Table, CreateTableRequest, UpdateTableRequest } from '../../types/table';

export const tableService = {
  /**
   * Créer une nouvelle table
   */
  async createTable(data: CreateTableRequest): Promise<ApiResponse<Table>> {
    const token = localStorage.getItem('access_token');
    
    return httpClient.post<Table>('tables/', data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  /**
   * Récupérer toutes les tables d'une entreprise
   */
  async getTables(entrepriseId: number, skip: number = 0, limit: number = 100): Promise<ApiResponse<Table[]>> {
    const token = localStorage.getItem('access_token');
    
    const response = await httpClient.get<{ detail: Table[] }>(
      `tables/${entrepriseId}?skip=${skip}&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (response.data?.detail) {
      return {
        data: response.data.detail,
        statusCode: response.statusCode
      };
    }

    return {
      error: response.error || 'Erreur lors de la récupération des tables',
      statusCode: response.statusCode
    };
  },

  /**
   * Mettre à jour une table
   */
  async updateTable(tableId: number, data: UpdateTableRequest): Promise<ApiResponse<Table>> {
    const token = localStorage.getItem('access_token');
    
    return httpClient.put<Table>(`tables/${tableId}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  /**
   * Activer une table
   */
  async activateTable(tableId: number): Promise<ApiResponse<any>> {
    const token = localStorage.getItem('access_token');
    
    return httpClient.post<any>(`tablesactiver/${tableId}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  /**
   * Désactiver une table
   */
  async deactivateTable(tableId: number): Promise<ApiResponse<any>> {
    const token = localStorage.getItem('access_token');
    
    return httpClient.post<any>(`tablesdesactiver/${tableId}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  /**
   * Supprimer une table
   */
  async deleteTable(tableId: number): Promise<ApiResponse<any>> {
    const token = localStorage.getItem('access_token');
    
    return httpClient.delete<any>(`tables/${tableId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
};