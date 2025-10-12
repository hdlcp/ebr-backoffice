// src/pages/auth/AddCompanyPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateCompanyRequest } from '../../types/company';
import { companyService } from '../../services/api/companyService';

const colors = {
  primary: '#007A3F',
  container: '#E4D1B0',
  white: '#FFFFFF',
  text: '#333333',
  error: '#FF4444'
};

const AddCompanyPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateCompanyRequest>({
    raison_sociale: '',
    telephone: '',
    email: '',
    site_web: '',
    numero_ifu: '',
    numero_registre_commerce: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validation des champs requis
      if (!formData.raison_sociale.trim()) {
        setError("La raison sociale est requise");
        setIsLoading(false);
        return;
      }

      if (!formData.email.trim()) {
        setError("L'email est requis");
        setIsLoading(false);
        return;
      }

      if (!formData.telephone.trim()) {
        setError("Le téléphone est requis");
        setIsLoading(false);
        return;
      }

      // Appel API pour créer l'entreprise
      const response = await companyService.createCompany(formData);

      if (response.data && response.statusCode >= 200 && response.statusCode < 300) {
        // Stocker l'ID de l'entreprise nouvellement créée et marquer qu'on vient d'ajouter une entreprise
        localStorage.setItem('new_company_id', response.data.id.toString());
        localStorage.setItem('from_add_company', 'true');
        
        // Redirection vers la page d'offre
        navigate('/offre');
      } else {
        setError(response.error || "Erreur lors de l'ajout de l'entreprise");
      }
    } catch (err: any) {
      console.error("Erreur lors de l'ajout de l'entreprise:", err);
      setError(err.message || "Une erreur est survenue lors de l'ajout de l'entreprise");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
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
        className="relative z-10 flex flex-col lg:flex-row rounded-[20px] overflow-hidden max-w-[1100px] w-full mx-auto"
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
        <div className="flex-1 flex flex-col justify-center p-8 lg:p-12 overflow-y-auto">
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
              Ajouter une nouvelle entreprise
            </h2>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Raison sociale */}
              <div>
                <input
                  type="text"
                  name="raison_sociale"
                  placeholder="Raison sociale *"
                  value={formData.raison_sociale}
                  onChange={handleInputChange}
                  className="w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-green-500"
                  style={{ 
                    backgroundColor: colors.white,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-green-500"
                  style={{ 
                    backgroundColor: colors.white,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                  required
                />
              </div>

              {/* Téléphone */}
              <div>
                <input
                  type="tel"
                  name="telephone"
                  placeholder="Téléphone *"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  className="w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-green-500"
                  style={{ 
                    backgroundColor: colors.white,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                  required
                />
              </div>

              {/* Site web */}
              <div>
                <input
                  type="url"
                  name="site_web"
                  placeholder="Site web"
                  value={formData.site_web}
                  onChange={handleInputChange}
                  className="w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-green-500"
                  style={{ 
                    backgroundColor: colors.white,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                />
              </div>

              {/* Numéro IFU */}
              <div>
                <input
                  type="text"
                  name="numero_ifu"
                  placeholder="Numéro IFU"
                  value={formData.numero_ifu}
                  onChange={handleInputChange}
                  className="w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-green-500"
                  style={{ 
                    backgroundColor: colors.white,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                />
              </div>

              {/* Numéro registre commerce */}
              <div>
                <input
                  type="text"
                  name="numero_registre_commerce"
                  placeholder="Numéro registre de commerce"
                  value={formData.numero_registre_commerce}
                  onChange={handleInputChange}
                  className="w-full h-[44px] px-4 rounded-[15px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-green-500"
                  style={{ 
                    backgroundColor: colors.white,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
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

              {/* Boutons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex-1 h-[49px] rounded-[20px] font-semibold transition-all duration-200 hover:opacity-90 focus:ring-2 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    backgroundColor: colors.white,
                    color: colors.text,
                    fontFamily: 'Montserrat, sans-serif',
                    border: `2px solid ${colors.text}`
                  }}
                >
                  Annuler
                </button>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 h-[49px] rounded-[20px] text-white font-semibold transition-all duration-200 hover:opacity-90 focus:ring-2 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    "Ajouter"
                  )}
                </button>
              </div>

              {/* Note champs requis */}
              <p 
                className="text-xs text-center pt-2"
                style={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  color: colors.text,
                  opacity: 0.7
                }}
              >
                * Champs obligatoires
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyPage;