// src/services/api/employeeService.ts
import { httpClient, ApiResponse } from '../http/httpClient';
import { 
  CreateEmployeeRequest, 
  CreateEmployeeResponse, 
  Employee,
  GetEmployeesParams 
} from '../../types/employee';

function getAuthHeaders() {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}

export const employeeService = {
  /**
   * Créer un nouvel employé (gérant ou serveur)
   */
  async createEmployee(data: CreateEmployeeRequest): Promise<ApiResponse<CreateEmployeeResponse>> {
    return httpClient.post<CreateEmployeeResponse>('users', data, {
      headers: getAuthHeaders()
    });
  },

  /**
   * Récupérer tous les employés d'une entreprise
   */
  async getEmployees(params: GetEmployeesParams): Promise<ApiResponse<Employee[]>> {
    const { entreprise_id, skip = 0, limit = 100 } = params;
    
    return httpClient.get<Employee[]>(
      `users/?entreprise_id=${entreprise_id}&skip=${skip}&limit=${limit}`,
      {
        headers: getAuthHeaders()
      }
    );
  },

  /**
   * Mettre à jour un employé
   */
  async updateEmployee(id: number, data: Partial<CreateEmployeeRequest>): Promise<ApiResponse<Employee>> {
    return httpClient.put<Employee>(`users/${id}`, data, {
      headers: getAuthHeaders()
    });
  },

  /**
   * Supprimer un employé
   */
  async deleteEmployee(id: number): Promise<ApiResponse<any>> {
    return httpClient.delete<any>(`users/${id}`, {
      headers: getAuthHeaders()
    });
  }
};
