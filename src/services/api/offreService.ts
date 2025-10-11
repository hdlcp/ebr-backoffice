// src/services/api/offreService.ts
import { httpClient, ApiResponse } from '../http/httpClient';

export interface Fonctionnalite {
  id: number;
  code: string;
  nom: string;
  description: string;
}

export interface OffreApi {
  id: number;
  code: string;
  nom: string;
  nbr_user: number;
  nbr_commande: number;
  prix: number;
  description: string;
  fonctionnalites: Fonctionnalite[];
}

export const offreService = {
  /**
   * Récupération de toutes les offres disponibles
   */
  async getOffres(): Promise<ApiResponse<OffreApi[]>> {
    return httpClient.post<OffreApi[]>('entreprises/offres', {});
  }
};