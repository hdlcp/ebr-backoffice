// src/pages/auth/OffersPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegistrationFormData, RegistrationApiResponse, Offer } from '../../types/registration';
import { offreService, OffreApi } from '../../services/api/offreService';

const colors = {
  primary: '#007A3F',
  container: '#E4D1B0',
  white: '#FFFFFF',
  text: '#333333'
};

// Mapping des couleurs par code d'offre
const offerColors: { [key: string]: string } = {
  'B1': '#3B82F6',
  'S1': '#007A3F',
  'P1': '#8B5CF6'
};

interface OffersPageProps {
  registrationData?: RegistrationFormData;
  registeredUser?: RegistrationApiResponse;
  onOfferSelected?: (offer: Offer) => void;
}

const OffersPage: React.FC<OffersPageProps> = ({
  registrationData,
  registeredUser,
  onOfferSelected
}) => {
  const navigate = useNavigate();
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fromAddCompany, setFromAddCompany] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier si on vient de la page d'ajout d'entreprise
    const isFromAddCompany = localStorage.getItem('from_add_company') === 'true';
    setFromAddCompany(isFromAddCompany);

    // Vérifier si l'utilisateur est authentifié
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);

    loadOffers();
  }, []);

  const loadOffers = async () => {
    setLoading(true);
    setError(null);

    const response = await offreService.getOffres();

    if (response.error || !response.data) {
      setError(response.error || 'Impossible de charger les offres');
      setLoading(false);
      return;
    }

    // Transformer les données de l'API en format Offer
    const transformedOffers: Offer[] = response.data.map((offreApi: OffreApi) => ({
      id: offreApi.code,
      name: offreApi.nom,
      price: offreApi.prix,
      duration: '/ mois',
      features: offreApi.fonctionnalites.map(f => f.nom),
      color: offerColors[offreApi.code] || colors.primary,
      isPopular: offreApi.code === 'S1'
    }));

    setOffers(transformedOffers);
    setLoading(false);
  };

  const handleOfferSelect = (offer: Offer) => {
    setSelectedOfferId(offer.id);
    if (onOfferSelected) {
      onOfferSelected(offer);
    }
  };

  const handleSkipOrChooseLater = () => {
    // Nettoyer les flags
    localStorage.removeItem('from_add_company');
    localStorage.removeItem('new_company_id');

    // Si l'utilisateur vient d'ajouter une entreprise et est connecté, rediriger vers le dashboard
    if (fromAddCompany && isAuthenticated) {
      navigate('/dashboard');
    } else {
      // Sinon, rediriger vers la page de connexion (cas d'inscription)
      navigate('/login');
    }
  };

  const handleContinueWithOffer = () => {
    if (!selectedOfferId) {
      setError("Veuillez sélectionner une offre");
      return;
    }

    const selectedOffer = offers.find(o => o.id === selectedOfferId);
    if (selectedOffer && onOfferSelected) {
      onOfferSelected(selectedOffer);
    }

    // Nettoyer les flags
    localStorage.removeItem('from_add_company');
    localStorage.removeItem('new_company_id');

    // Rediriger selon le contexte
    if (fromAddCompany && isAuthenticated) {
      // Utilisateur connecté qui vient d'ajouter une entreprise
      navigate('/dashboard');
    } else {
      // Nouvel utilisateur en cours d'inscription
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/login-background.jpg')`,
            filter: 'blur(1px) brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="relative z-10 text-white text-xl">
          Chargement des offres...
        </div>
      </div>
    );
  }

  if (error && offers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/login-background.jpg')`,
            filter: 'blur(1px) brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="relative z-10 text-center">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadOffers}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Déterminer le prénom à afficher
  const firstName = registeredUser?.firstname || registrationData?.firstname || '';

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
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <img
              src="/logos/logo_ebr_blanc.png"
              alt="eBR Logo"
              className="w-32 h-32 mx-auto object-contain"
            />
          </div>
          <h1
            className="text-3xl font-bold text-white mb-4"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {firstName ? `Bienvenue ${firstName} !` : 'Bienvenue !'}
          </h1>
          <p
            className="text-xl text-white opacity-90"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {fromAddCompany 
              ? "Choisissez l'offre pour votre nouvelle entreprise"
              : "Choisissez l'offre qui convient le mieux à votre entreprise"
            }
          </p>
        </div>

        {/* Message d'erreur si sélection requise */}
        {error && offers.length > 0 && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center max-w-md mx-auto">
            {error}
          </div>
        )}

        {/* Grille des offres */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`relative rounded-[20px] overflow-hidden transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedOfferId === offer.id ? 'ring-4 ring-yellow-400' : ''
              } ${offer.isPopular ? 'scale-110' : ''}`}
              style={{ backgroundColor: colors.white }}
              onClick={() => handleOfferSelect(offer)}
            >
              {/* Badge "Populaire" */}
              {offer.isPopular && (
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 px-6 py-1 rounded-full text-white text-sm font-bold z-10"
                  style={{ backgroundColor: colors.primary }}
                >
                  LE PLUS POPULAIRE
                </div>
              )}

              {/* En-tête colorée */}
              <div
                className="h-32 flex items-center justify-center"
                style={{ backgroundColor: offer.color }}
              >
                <h3
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {offer.name}
                </h3>
              </div>

              {/* Contenu */}
              <div className="p-8">
                {/* Prix */}
                <div className="text-center mb-6">
                  <span
                    className="text-4xl font-bold"
                    style={{ fontFamily: 'Montserrat, sans-serif', color: offer.color }}
                  >
                    {offer.price.toLocaleString()}
                  </span>
                  <span
                    className="text-lg text-gray-600 ml-2"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    FCFA {offer.duration}
                  </span>
                </div>

                {/* Liste des fonctionnalités */}
                <ul className="space-y-3 mb-8">
                  {offer.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div
                        className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5"
                        style={{ backgroundColor: offer.color }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                      </div>
                      <span
                        className="text-sm text-gray-700"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Bouton de sélection */}
                <button
                  onClick={() => handleOfferSelect(offer)}
                  className={`w-full py-3 px-6 rounded-[15px] font-bold text-lg transition-all duration-200 ${
                    selectedOfferId === offer.id
                      ? 'ring-2 ring-yellow-400'
                      : 'hover:opacity-90'
                  }`}
                  style={{
                    backgroundColor: offer.color,
                    color: 'white',
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                >
                  {selectedOfferId === offer.id ? 'SÉLECTIONNÉ' : 'CHOISIR CETTE OFFRE'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Boutons d'action */}
        <div className="text-center mt-12 space-y-4">
          {/* Bouton continuer avec l'offre sélectionnée */}
          {selectedOfferId && (
            <button
              onClick={handleContinueWithOffer}
              className="px-8 py-3 bg-yellow-400 text-gray-900 rounded-[15px] font-bold text-lg hover:bg-yellow-500 transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              CONTINUER AVEC CETTE OFFRE
            </button>
          )}

          {/* Bouton passer */}
          <div>
            <button
              onClick={handleSkipOrChooseLater}
              className="text-white opacity-80 hover:underline text-sm hover:opacity-100 transition-opacity"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Je choisirai plus tard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersPage;