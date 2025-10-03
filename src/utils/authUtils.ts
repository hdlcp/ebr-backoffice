// src/utils/authUtils.ts
import { LoginResponse } from '../types/auth';

export const authUtils = {
  /**
   * Vérifie si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return token !== null;
  },

  /**
   * Récupère le token d'accès
   */
  getToken(): string | null {
    return localStorage.getItem('access_token');
  },

  /**
   * Récupère les données utilisateur stockées
   */
  getUserData(): LoginResponse | null {
    try {
      const user = localStorage.getItem('user');
      const entreprises = localStorage.getItem('entreprises');
      const token = localStorage.getItem('access_token');

      if (!user || !entreprises || !token) {
        return null;
      }

      return {
        access_token: token,
        token_type: 'bearer',
        user: JSON.parse(user),
        entreprises: JSON.parse(entreprises)
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      return null;
    }
  },

  /**
   * Déconnecte l'utilisateur
   */
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('entreprises');
  },

  /**
   * Vérifie si le token est expiré (optionnel, nécessite de décoder le JWT)
   */
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      // Décoder le JWT pour vérifier l'expiration
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // Convertir en millisecondes
      return Date.now() >= exp;
    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error);
      return true;
    }
  }
};