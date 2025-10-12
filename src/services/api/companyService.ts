// src/services/api/companyService.ts
import { httpClient, ApiResponse } from '../http/httpClient';
import { CreateCompanyRequest, CreateCompanyResponse } from '../../types/company';

export const companyService = {
  /**
   * Ajouter une nouvelle entreprise
   */
  async createCompany(data: CreateCompanyRequest): Promise<ApiResponse<CreateCompanyResponse>> {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('Token d\'authentification non trouvé');
    }

    return httpClient.post<CreateCompanyResponse>('entreprises/', data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  /**
   * Récupérer toutes les entreprises de l'utilisateur
   */
  async getUserCompanies(): Promise<ApiResponse<CreateCompanyResponse[]>> {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('Token d\'authentification non trouvé');
    }

    return httpClient.get<CreateCompanyResponse[]>('entreprises/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
};