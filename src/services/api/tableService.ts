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
    
    const response = await httpClient.get<Table[]>(
      `tables/${entrepriseId}?skip=${skip}&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    // La réponse est directement un tableau, pas un objet avec detail
    if (response.data) {
      return {
        data: response.data,
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
   * Activer plusieurs tables en une seule requête
   */
  async activateTables(tableIds: number[]): Promise<ApiResponse<any>> {
    const token = localStorage.getItem('access_token');
    
    return httpClient.post<any>('tables/activer', tableIds, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  /**
   * Désactiver plusieurs tables en une seule requête
   */
  async deactivateTables(tableIds: number[]): Promise<ApiResponse<any>> {
    const token = localStorage.getItem('access_token');
    
    return httpClient.post<any>('tables/desactiver', tableIds, {
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