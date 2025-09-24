import React, { useState } from 'react';
import { colors } from '../../config/colors';
import { CreateCompanyData } from '../../types/company';

interface AddCompanyPageProps {
  onAddCompany: (companyData: CreateCompanyData) => void;
  onCancel: () => void;
}

const AddCompanyPage: React.FC<AddCompanyPageProps> = ({ onAddCompany, onCancel }) => {
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!companyName.trim()) {
        setError('Veuillez entrer le nom de l\'entreprise');
        return;
      }

      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Ajout nouvelle entreprise:', companyName);
      onAddCompany({ name: companyName.trim() });
      
    } catch (err) {
      setError('Erreur lors de l\'ajout de l\'entreprise. Veuillez réessayer.');
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
        className="relative z-10 flex flex-col lg:flex-row rounded-[20px] overflow-hidden max-w-[800px] w-full mx-auto"
        style={{ 
          backgroundColor: colors.container,
          minHeight: '500px',
          boxShadow: `0 5px 15px ${colors.white}40`
        }}
      >
        {/* Section Logo - Gauche */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
          <div className="w-[250px] h-[250px] flex items-center justify-center">
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
          <div className="w-full max-w-[400px] mx-auto">
            {/* Titre */}
            <h2 
              className="text-xl font-bold text-center mb-8"
              style={{ 
                fontFamily: 'Montserrat, sans-serif',
                color: colors.text.primary
              }}
            >
              Ajouter une nouvelle entreprise
            </h2>

            {/* Formulaire */}
            <div className="space-y-6">
              {/* Champ nom de l'entreprise */}
              <div>
                <label 
                  htmlFor="companyName" 
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}
                >
                  Nom de l'entreprise
                </label>
                <input
                  type="text"
                  id="companyName"
                  placeholder="Entrez le nom de votre nouvelle entreprise"
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                    if (error) setError('');
                  }}
                  className={`w-full h-[48px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all duration-200 ${
                    error ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
                  }`}
                  style={{ 
                    backgroundColor: colors.white,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                  required
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {error}
                  </p>
                )}
              </div>

              {/* Boutons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 h-[48px] rounded-[20px] text-white font-semibold transition-all duration-200 hover:opacity-90 focus:ring-2 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    backgroundColor: colors.primary,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Ajout...
                    </div>
                  ) : (
                    'Ajouter l\'entreprise'
                  )}
                </button>

                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 h-[48px] rounded-[20px] font-semibold transition-all duration-200 hover:opacity-90"
                  style={{ 
                    backgroundColor: colors.white,
                    color: colors.text.primary,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                >
                  Annuler
                </button>
              </div>
            </div>

            {/* Note informative */}
            <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: `${colors.primary}15` }}>
              <p className="text-sm text-center" style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.secondary }}>
                Vous pourrez basculer entre vos entreprises à tout moment depuis le header.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyPage;