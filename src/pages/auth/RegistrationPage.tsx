// src/pages/auth/RegistrationPage.tsx
import React, { useState } from 'react';
import { RegistrationFormData, RegistrationApiResponse } from '../../types/registration';
import { authService } from '../../services/api/authService';

const colors = {
  primary: '#007A3F',
  container: '#E4D1B0',
  white: '#FFFFFF',
  text: '#333333',
  error: '#FF4444'
};

const countries = [
  'Bénin', 'Burkina Faso', 'Côte d\'Ivoire', 'Ghana', 'Mali', 'Niger', 
  'Nigeria', 'Sénégal', 'Togo', 'France', 'Allemagne', 'Canada', 'États-Unis'
];

interface RegistrationPageProps {
  onRegistration: (userData: RegistrationApiResponse, formData: RegistrationFormData) => void;
  onSwitchToLogin: () => void;
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ onRegistration, onSwitchToLogin }) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    raison_sociale: '',
    telephone: '',
    email: '',
    site_web: '',
    numero_ifu: '',
    numero_registre_commerce: '',
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    country: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.raison_sociale.trim()) newErrors.raison_sociale = 'La raison sociale est requise';
    if (!formData.telephone.trim()) newErrors.telephone = 'Le téléphone est requis';
    if (!formData.email) newErrors.email = 'L\'email est requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'L\'email n\'est pas valide';
    if (!formData.username.trim()) newErrors.username = 'Le nom d\'utilisateur est requis';
    if (!formData.firstname.trim()) newErrors.firstname = 'Le prénom est requis';
    if (!formData.lastname.trim()) newErrors.lastname = 'Le nom est requis';
    if (!formData.password) newErrors.password = 'Le mot de passe est requis';
    else if (formData.password.length < 6) newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    if (!formData.country) newErrors.country = 'Veuillez sélectionner un pays';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setErrors({});

    try {
      const response = await authService.register(formData);
      if (response.error) {
        setErrors({ general: response.error });
      } else if (response.data) {
        onRegistration(response.data, formData);
      }
    } catch (err) {
      setErrors({ general: 'Erreur lors de l\'inscription. Veuillez réessayer.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/login-background.jpg')`, filter: 'blur(1px) brightness(0.7)' }} />
      <div className="absolute inset-0 bg-black bg-opacity-30" />

      <div className="relative z-10 flex flex-col lg:flex-row rounded-[20px] overflow-hidden max-w-[1200px] w-full mx-auto"
        style={{ backgroundColor: colors.container, minHeight: '700px', boxShadow: `0 5px 15px ${colors.white}40` }}>
        
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
          <img src="/logos/logo_ebr.png" alt="eBR Logo" className="w-[300px] h-[300px] object-contain" />
        </div>

        <div className="hidden lg:block w-[5px] self-stretch mx-4 my-8" style={{ backgroundColor: colors.white }} />
        <div className="lg:hidden h-[5px] self-stretch mx-8 my-4" style={{ backgroundColor: colors.white }} />

        <div className="flex-1 flex flex-col justify-center p-8 lg:p-12">
          <div className="w-full max-w-[450px] mx-auto">
            <h2 className="text-lg font-semibold text-center mb-6"
              style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text, fontSize: '18px' }}>
              Créez votre compte eBR
            </h2>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {/* Raison sociale */}
              <div>
                <input type="text" name="raison_sociale" placeholder="Nom de l'entreprise *" value={formData.raison_sociale}
                  onChange={handleInputChange}
                  className={`w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all ${
                    errors.raison_sociale ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
                  }`} style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }} />
                {errors.raison_sociale && <p className="text-red-500 text-xs mt-1">{errors.raison_sociale}</p>}
              </div>

              {/* Téléphone */}
              <div>
                <input type="tel" name="telephone" placeholder="Téléphone *" value={formData.telephone}
                  onChange={handleInputChange}
                  className={`w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all ${
                    errors.telephone ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
                  }`} style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }} />
                {errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>}
              </div>

              {/* Email */}
              <div>
                <input type="email" name="email" placeholder="Email *" value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all ${
                    errors.email ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
                  }`} style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Site web */}
              <div>
                <input type="url" name="site_web" placeholder="Site web (optionnel)" value={formData.site_web}
                  onChange={handleInputChange}
                  className="w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }} />
              </div>

              {/* Numéro IFU */}
              <div>
                <input type="text" name="numero_ifu" placeholder="Numéro IFU (optionnel)" value={formData.numero_ifu}
                  onChange={handleInputChange}
                  className="w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }} />
              </div>

              {/* Numéro registre de commerce */}
              <div>
                <input type="text" name="numero_registre_commerce" placeholder="N° Registre de commerce (optionnel)" value={formData.numero_registre_commerce}
                  onChange={handleInputChange}
                  className="w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }} />
              </div>

              {/* Username */}
              <div>
                <input type="text" name="username" placeholder="Nom d'utilisateur *" value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all ${
                    errors.username ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
                  }`} style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }} />
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
              </div>

              {/* Prénom et Nom */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input type="text" name="firstname" placeholder="Prénom *" value={formData.firstname}
                    onChange={handleInputChange}
                    className={`w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all ${
                      errors.firstname ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
                    }`} style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }} />
                  {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>}
                </div>
                <div>
                  <input type="text" name="lastname" placeholder="Nom *" value={formData.lastname}
                    onChange={handleInputChange}
                    className={`w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all ${
                      errors.lastname ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
                    }`} style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }} />
                  {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>}
                </div>
              </div>

              {/* Mot de passe */}
              <div>
                <input type="password" name="password" placeholder="Mot de passe *" value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all ${
                    errors.password ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
                  }`} style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }} />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Confirmation mot de passe */}
              <div>
                <input type="password" name="confirmPassword" placeholder="Confirmer le mot de passe *" value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all ${
                    errors.confirmPassword ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
                  }`} style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }} />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Pays */}
              <div>
                <select name="country" value={formData.country} onChange={handleInputChange}
                  className={`w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 transition-all ${
                    errors.country ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
                  }`} style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}>
                  <option value="">Sélectionner un pays *</option>
                  {countries.map(country => <option key={country} value={country}>{country}</option>)}
                </select>
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
              </div>

              {errors.general && (
                <div className="text-sm text-center p-2 rounded-lg"
                  style={{ color: colors.error, backgroundColor: `${colors.error}15`, fontFamily: 'Montserrat, sans-serif' }}>
                  {errors.general}
                </div>
              )}

              <div className="flex justify-center pt-4">
                <button onClick={handleSubmit} disabled={isLoading}
                  className="w-[174px] h-[49px] rounded-[20px] text-white font-semibold transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: colors.primary, fontFamily: 'Montserrat, sans-serif' }}>
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Inscription...
                    </div>
                  ) : 'S\'inscrire'}
                </button>
              </div>

              <div className="text-center pt-4">
                <p style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text }}>
                  Vous avez déjà un compte ?{' '}
                  <button onClick={onSwitchToLogin} className="font-semibold hover:underline"
                    style={{ color: colors.primary, fontFamily: 'Montserrat, sans-serif' }}>
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