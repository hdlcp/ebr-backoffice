// src/services/http/httpClient.ts

const API_BASE_URL = 'http://146.190.129.166:8000';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  statusCode: number;
}

class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers, // merge avec headers custom
        },
      });

      // Si le body est vide (DELETE par ex.), éviter une erreur
      let data: any = null;
      try {
        data = await response.json();
      } catch (_) {
        data = null;
      }

      if (!response.ok) {
        return {
          error: data?.detail || 'Une erreur est survenue',
          statusCode: response.status,
        };
      }

      return {
        data,
        statusCode: response.status,
      };
    } catch (error) {
      return {
        error: 'Erreur de connexion au serveur',
        statusCode: 500,
      };
    }
  }

  async get<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', ...options });
  }

  async post<T>(endpoint: string, body: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    });
  }

  async put<T>(endpoint: string, body: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    });
  }

  async delete<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', ...options });
  }
}

export const httpClient = new HttpClient(API_BASE_URL);
