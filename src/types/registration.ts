// src/types/registration.ts

export interface RegistrationFormData {
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
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