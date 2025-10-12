// src/services/api/employeeService.ts
import { httpClient, ApiResponse } from '../http/httpClient';
import { 
  CreateEmployeeRequest, 
  CreateEmployeeResponse, 
  Employee,
  GetEmployeesParams,
  UpdateEmployeeRequest 
} from '../../types/employee';

export const employeeService = {
  /**
   * Créer un nouvel employé (serveur ou gérant)
   */
  async createEmployee(data: CreateEmployeeRequest): Promise<ApiResponse<CreateEmployeeResponse>> {
    const token = localStorage.getItem('access_token');
    
    return httpClient.post<CreateEmployeeResponse>('users', data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  /**
   * Récupérer tous les employés d'une entreprise
   */
  async getEmployees(params: GetEmployeesParams): Promise<ApiResponse<Employee[]>> {
    const token = localStorage.getItem('access_token');
    const { entreprise_id, skip = 0, limit = 100 } = params;
    
    return httpClient.get<Employee[]>(
      `users/?entreprise_id=${entreprise_id}&skip=${skip}&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
  },

  /**
   * Mettre à jour un employé
   */
  async updateEmployee(id: number, data: UpdateEmployeeRequest): Promise<ApiResponse<Employee>> {
    const token = localStorage.getItem('access_token');
    
    return httpClient.put<Employee>(`users/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  /**
   * Supprimer un employé
   */
  async deleteEmployee(id: number): Promise<ApiResponse<any>> {
    const token = localStorage.getItem('access_token');
    
    return httpClient.delete<any>(`users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  /**
   * Ouvrir la journée d'un gérant
   */
  async openJournee(userId: number): Promise<ApiResponse<any>> {
    const token = localStorage.getItem('access_token');
    
    return httpClient.post<any>('journees/ouvrir', {
      etat: 'ouverte',
      user_id: userId
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  /**
   * Fermer la journée d'un gérant
   */
  async closeJournee(userId: number): Promise<ApiResponse<any>> {
    const token = localStorage.getItem('access_token');
    
    return httpClient.post<any>(`journees/fermer/${userId}`, {
      etat: 'fermer',
      user_id: userId
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
};