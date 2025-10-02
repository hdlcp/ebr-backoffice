// src/types/registration.ts

export interface RegistrationFormData {
  raison_sociale: string;
  telephone: string;
  email: string;
  site_web: string;
  numero_ifu: string;
  numero_registre_commerce: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  confirmPassword: string;
  country: string;
}

export interface RegistrationApiRequest {
  raison_sociale: string;
  telephone: string;
  email: string;
  site_web: string;
  numero_ifu: string;
  numero_registre_commerce: string;
  username: string;
  firstname: string;
  lastname: string;
  role: 'admin';
  is_active: boolean;
  matricule: string;
  entreprise_id: number;
  password: string;
}

export interface RegistrationApiResponse {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  is_active: boolean;
  matricule: string | null;
  id: number;
}

export interface EmailValidationRequest {
  validation_code: string;
}

export interface EmailValidationResponse {
  msg: string;
}

export interface ResendValidationRequest {
  user_id: number;
}

export interface PaymentInfo {
  type: 'card' | 'momo';
  // Pour carte bancaire
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
  // Pour Mobile Money
  phoneNumber?: string;
  momoProvider?: 'mtn' | 'moov' | 'orange';
}

export interface Offer {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  isPopular?: boolean;
  color: string;
}

export interface RegistrationData {
  user: RegistrationFormData;
  selectedOffer: Offer;
  paymentInfo: PaymentInfo;
}