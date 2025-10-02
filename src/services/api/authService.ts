// src/services/api/authService.ts
import { httpClient, ApiResponse } from '../http/httpClient';
import {
  RegistrationFormData,
  RegistrationApiRequest,
  RegistrationApiResponse,
  EmailValidationResponse
} from '../../types/registration';
import { LoginRequest, LoginResponse } from '../../types/auth';

export const authService = {
  /**
   * Connexion d'un administrateur
   */
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return httpClient.post<LoginResponse>('auth/admin-login', data);
  },

  /**
   * Inscription d'un nouvel utilisateur
   */
  async register(data: RegistrationFormData): Promise<ApiResponse<RegistrationApiResponse>> {
    const apiRequest: RegistrationApiRequest = {
      raison_sociale: data.raison_sociale,
      telephone: data.telephone,
      email: data.email,
      site_web: data.site_web,
      numero_ifu: data.numero_ifu,
      numero_registre_commerce: data.numero_registre_commerce,
      username: data.username,
      firstname: data.firstname,
      lastname: data.lastname,
      role: 'admin',
      is_active: true,
      matricule: '',
      entreprise_id: 0,
      password: data.password
    };

    return httpClient.post<RegistrationApiResponse>('users/inscription', apiRequest);
  },

  /**
   * Validation de l'email avec le code reçu
   */
  async validateEmail(validationCode: string): Promise<ApiResponse<EmailValidationResponse>> {
    return httpClient.get<EmailValidationResponse>(
      `users/validate-email?validation_code=${validationCode}`
    );
  },

  /**
   * Renvoi du code de validation
   */
  async resendValidationCode(userId: number): Promise<ApiResponse<any>> {
    return httpClient.get<any>(`users/resend-validate-email?user_id=${userId}`);
  }
};