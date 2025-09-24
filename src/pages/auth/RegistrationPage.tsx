import React, { useState } from 'react';
import { RegistrationFormData } from '../../types/registration';

// Configuration des couleurs
const colors = {
  primary: '#007A3F',
  container: '#E4D1B0',
  white: '#FFFFFF',
  text: '#333333',
  error: '#FF4444'
};

// Liste des pays
const countries = [
  'Bénin', 'Burkina Faso', 'Côte d\'Ivoire', 'Ghana', 'Mali', 'Niger', 
  'Nigeria', 'Sénégal', 'Togo', 'France', 'Allemagne', 'Canada', 'États-Unis'
];

interface RegistrationPageProps {
  onRegistration: (data: RegistrationFormData) => void;
  onSwitchToLogin: () => void;
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ onRegistration, onSwitchToLogin }) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    companyName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur quand l'utilisateur tape
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Le nom de l\'entreprise est requis';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }

    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (!formData.country) {
      newErrors.country = 'Veuillez sélectionner un pays';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (validateForm()) {
        // Simulation d'appel API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('Données d\'inscription:', formData);
        onRegistration(formData);
      }
    } catch (err) {
      setErrors({ general: 'Erreur lors de l\'inscription. Veuillez réessayer.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Image de fond */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('/images/login-background.jpg')`,
          filter: 'blur(1px) brightness(0.7)'
        }}
      />
      
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />

      {/* Container principal */}
      <div 
        className="relative z-10 flex flex-col lg:flex-row rounded-[20px] overflow-hidden max-w-[1200px] w-full mx-auto"
        style={{ 
          backgroundColor: colors.container,
          minHeight: '700px',
          boxShadow: `0 5px 15px ${colors.white}40`
        }}
      >
        {/* Section Logo - Gauche */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
          <div className="w-[300px] h-[300px] flex items-center justify-center">
            <img 
              src="/logos/logo_ebr.png" 
              alt="eBR Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
        </div>

        {/* Séparateur vertical */}
        <div 
          className="hidden lg:block w-[5px] self-stretch mx-4 my-8"
          style={{ backgroundColor: colors.white }}
        />
        
        {/* Séparateur horizontal pour mobile */}
        <div 
          className="lg:hidden h-[5px] self-stretch mx-8 my-4"
          style={{ backgroundColor: colors.white }}
        />

        {/* Section Formulaire - Droite */}
        <div className="flex-1 flex flex-col justify-center p-8 lg:p-12">
          <div className="w-full max-w-[450px] mx-auto">
            {/* Titre */}
            <h2 
              className="text-lg font-semibold text-center mb-6"
              style={{ 
                fontFamily: 'Montserrat, sans-serif',
                color: colors.text,
                fontSize: '18px'
              }}
            >
              Créez votre compte eBR
            </h2>

            {/* Formulaire */}
            <div className="space-y-4">
              {/* Nom de l'entreprise */}
              <div>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Nom de l'entreprise"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all duration-200 ${
                    errors.companyName ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
                  }`}
                  style={{ 
                    backgroundColor: colors.white,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {errors.companyName}
                  </p>
                )}
              </div>

              {/* Prénom et Nom */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Prénom"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all duration-200 ${
                      errors.firstName ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
                    }`}
                    style={{ 
                      backgroundColor: colors.white,
                      fontFamily: 'Montserrat, sans-serif'
                    }}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Nom"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all duration-200 ${
                      errors.lastName ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
                    }`}
                    style={{ 
                      backgroundColor: colors.white,
                      fontFamily: 'Montserrat, sans-serif'
                    }}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Adresse email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all duration-200 ${
                    errors.email ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
                  }`}
                  style={{ 
                    backgroundColor: colors.white,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Mot de passe */}
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all duration-200 ${
                    errors.password ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
                  }`}
                  style={{ 
                    backgroundColor: colors.white,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirmation mot de passe */}
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmer le mot de passe"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all duration-200 ${
                    errors.confirmPassword ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
                  }`}
                  style={{ 
                    backgroundColor: colors.white,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Pays */}
              <div>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 transition-all duration-200 ${
                    errors.country ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
                  }`}
                  style={{ 
                    backgroundColor: colors.white,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                >
                  <option value="">Sélectionner un pays</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {errors.country}
                  </p>
                )}
              </div>

              {/* Message d'erreur général */}
              {errors.general && (
                <div 
                  className="text-sm text-center p-2 rounded-lg"
                  style={{ 
                    color: colors.error,
                    backgroundColor: `${colors.error}15`,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                >
                  {errors.general}
                </div>
              )}

              {/* Bouton S'inscrire */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-[174px] h-[49px] rounded-[20px] text-white font-semibold transition-all duration-200 hover:opacity-90 focus:ring-2 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    backgroundColor: colors.primary,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Inscription...
                    </div>
                  ) : (
                    'S\'inscrire'
                  )}
                </button>
              </div>

              {/* Lien vers connexion */}
              <div className="text-center pt-4">
                <p style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text }}>
                  Vous avez déjà un compte ?{' '}
                  <button
                    onClick={onSwitchToLogin}
                    className="font-semibold hover:underline"
                    style={{ color: colors.primary, fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Connectez-vous ici
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;