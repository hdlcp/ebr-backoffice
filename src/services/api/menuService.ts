// src/services/api/menuService.ts
import { httpClient, ApiResponse } from '../http/httpClient';
import { Menu, CreateMenuRequest, CreatePackRequest, UpdateMenuRequest } from '../../types/menu';

const API_BASE_URL = 'http://146.190.129.166:8000';

export const menuService = {
  /**
   * Créer un nouveau menu avec FormData (contient une image)
   */
  async createMenu(data: CreateMenuRequest): Promise<ApiResponse<Menu>> {
    const token = localStorage.getItem('access_token');
    const formData = new FormData();
    
    formData.append('nom', data.nom);
    formData.append('prix', data.prix.toString());
    formData.append('categorie', data.categorie);
    formData.append('entreprise_id', data.entreprise_id.toString());
    formData.append('description', data.description);
    formData.append('menus', JSON.stringify([]));
    
    if (data.image) {
      formData.append('image', data.image);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/menus`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // Pas de Content-Type pour FormData, le navigateur le gère automatiquement
        },
        body: formData
      });

      let result: any = null;
      try {
        result = await response.json();
      } catch (_) {
        result = null;
      }

      if (!response.ok) {
        return {
          error: result?.detail || 'Erreur lors de la création du menu',
          statusCode: response.status
        };
      }

      return {
        data: result,
        statusCode: response.status
      };
    } catch (error) {
      return {
        error: 'Erreur de connexion au serveur',
        statusCode: 500
      };
    }
  },

  /**
   * Créer un pack de menus avec FormData
   */
  async createPack(data: CreatePackRequest): Promise<ApiResponse<Menu>> {
    const token = localStorage.getItem('access_token');
    const formData = new FormData();
    
    formData.append('nom', data.nom);
    formData.append('prix', data.prix.toString());
    formData.append('categorie', 'pack');
    formData.append('entreprise_id', data.entreprise_id.toString());
    formData.append('description', data.description);
    formData.append('menus', JSON.stringify(data.menus));
    
    if (data.image) {
      formData.append('image', data.image);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/menus`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      let result: any = null;
      try {
        result = await response.json();
      } catch (_) {
        result = null;
      }

      if (!response.ok) {
        return {
          error: result?.detail || 'Erreur lors de la création du pack',
          statusCode: response.status
        };
      }

      return {
        data: result,
        statusCode: response.status
      };
    } catch (error) {
      return {
        error: 'Erreur de connexion au serveur',
        statusCode: 500
      };
    }
  },

  /**
   * Récupérer tous les menus d'une entreprise
   */
  async getMenus(entrepriseId: number, skip: number = 0, limit: number = 100): Promise<ApiResponse<Menu[]>> {
    const token = localStorage.getItem('access_token');
    
    const response = await httpClient.get<{ detail: Menu[] }>(
      `menus/${entrepriseId}?skip=${skip}&limit=${limit}`,
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
      error: response.error || 'Erreur lors de la récupération des menus',
      statusCode: response.statusCode
    };
  },

  /**
   * Récupérer les détails d'un pack
   */
  async getPackDetails(packId: number): Promise<ApiResponse<Menu>> {
    const token = localStorage.getItem('access_token');
    
    const response = await httpClient.get<{ detail: Menu[] }>(
      `menus/pack/${packId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (response.data?.detail && response.data.detail.length > 0) {
      return {
        data: response.data.detail[0],
        statusCode: response.statusCode
      };
    }

    return {
      error: response.error || 'Pack non trouvé',
      statusCode: response.statusCode
    };
  },

  /**
   * Mettre à jour un menu avec FormData
   */
  async updateMenu(menuId: number, data: UpdateMenuRequest): Promise<ApiResponse<Menu>> {
    const token = localStorage.getItem('access_token');
    const formData = new FormData();
    
    if (data.nom) formData.append('nom', data.nom);
    if (data.prix !== undefined) formData.append('prix', data.prix.toString());
    if (data.categorie) formData.append('categorie', data.categorie);
    if (data.description) formData.append('description', data.description);
    if (data.image) formData.append('image', data.image);

    try {
      const response = await fetch(`${API_BASE_URL}/menus/${menuId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      let result: any = null;
      try {
        result = await response.json();
      } catch (_) {
        result = null;
      }

      if (!response.ok) {
        return {
          error: result?.detail || 'Erreur lors de la modification du menu',
          statusCode: response.status
        };
      }

      return {
        data: result,
        statusCode: response.status
      };
    } catch (error) {
      return {
        error: 'Erreur de connexion au serveur',
        statusCode: 500
      };
    }
  },

  /**
   * Supprimer un menu (désactiver définitivement)
   */
  async deleteMenu(menuId: number): Promise<ApiResponse<any>> {
    const token = localStorage.getItem('access_token');
    
    return httpClient.delete<any>(`menus/${menuId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  /**
   * Désactiver un menu (status = -1)
   */
  async deactivateMenu(menuId: number): Promise<ApiResponse<any>> {
    const token = localStorage.getItem('access_token');
    
    return httpClient.post<any>(`menusdesactiver/${menuId}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  /**
   * Activer un menu (status = 1)
   */
  async activateMenu(menuId: number): Promise<ApiResponse<any>> {
    const token = localStorage.getItem('access_token');
    
    return httpClient.post<any>(`menusactiver/${menuId}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
};