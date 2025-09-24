// src/pages/auth/LoginPage.tsx
import React, { useState } from 'react';

// Types
interface LoginFormData {
  email: string;
  password: string;
}

interface LoginPageProps {
  onLogin: () => void;
  onSwitchToRegistration: () => void;
}

// Configuration des couleurs selon vos spécifications
const colors = {
  primary: '#007A3F',
  container: '#E4D1B0',
  white: '#FFFFFF',
  text: '#333333',
  error: '#FF4444'
};

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSwitchToRegistration }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur quand l'utilisateur tape
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validation basique
      if (!formData.email || !formData.password) {
        setError('Veuillez remplir tous les champs');
        return;
      }

      // Simulation d'appel API - à remplacer par votre vraie API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ici vous intégrerez votre API de connexion
      console.log('Données de connexion:', formData);
      
      // Appel de la fonction onLogin après une connexion réussie
      onLogin();
      
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Image de fond - utilisant une image temporaire */}
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
        className="relative z-10 flex flex-col lg:flex-row rounded-[20px] overflow-hidden max-w-[969px] w-full mx-auto"
        style={{ 
          backgroundColor: colors.container,
          minHeight: '630px',
          boxShadow: `0 5px 15px ${colors.white}40`
        }}
      >
        {/* Section Logo - Gauche */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
          <div className="w-[370px] h-[370px] flex items-center justify-center">
            <img 
                src="/logos/logo_ebr.png" 
                alt="eBR Logo" 
                className="w-[370px] h-[370px] object-contain" 
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
          <div className="w-full max-w-[400px] mx-auto">
            {/* Titre */}
            <h2 
              className="text-lg font-semibold text-center mb-8"
              style={{ 
                fontFamily: 'Montserrat, sans-serif',
                color: colors.text,
                fontSize: '18px'
              }}
            >
              Entrez votre email et mot de passe<br />
              pour continuer
            </h2>

            {/* Formulaire */}
            <div className="space-y-4">
              {/* Champ Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-green-500"
                  style={{ 
                    backgroundColor: colors.white,
                    fontFamily: 'Montserrat, sans-serif',
                    maxWidth: '367px'
                  }}
                  required
                />
              </div>

              {/* Champ Mot de passe */}
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-green-500"
                  style={{ 
                    backgroundColor: colors.white,
                    fontFamily: 'Montserrat, sans-serif',
                    maxWidth: '367px'
                  }}
                  required
                />
              </div>

              {/* Message d'erreur */}
              {error && (
                <div 
                  className="text-sm text-center p-2 rounded-lg"
                  style={{ 
                    color: colors.error,
                    backgroundColor: `${colors.error}15`,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                >
                  {error}
                </div>
              )}

              {/* Bouton Se connecter */}
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
                      Connexion...
                    </div>
                  ) : (
                    'Se connecter'
                  )}
                </button>
              </div>

              {/* Lien vers inscription */}
              <div className="text-center pt-4">
                <p style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text }}>
                  Vous n'avez pas de compte ?{' '}
                  <button
                    onClick={onSwitchToRegistration}
                    className="font-semibold hover:underline"
                    style={{ color: colors.primary, fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Inscrivez-vous ici
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

export default LoginPage;