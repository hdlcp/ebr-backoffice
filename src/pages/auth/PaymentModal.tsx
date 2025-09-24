import React, { useState } from 'react';
import { Offer, PaymentInfo } from '../../types/registration';

const colors = {
  primary: '#007A3F',
  container: '#E4D1B0',
  white: '#FFFFFF',
  text: '#333333',
  error: '#FF4444'
};

interface PaymentModalProps {
  selectedOffer: Offer;
  onPayment: (paymentInfo: PaymentInfo) => void;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ selectedOffer, onPayment, onClose }) => {
  const [paymentType, setPaymentType] = useState<'card' | 'momo'>('card');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const [momoData, setMomoData] = useState<{
    phoneNumber: string;
    momoProvider: 'mtn' | 'moov' | 'orange' | undefined;
  }>({
    phoneNumber: '',
    momoProvider: undefined
  });

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
      setCardData(prev => ({ ...prev, [name]: formatted }));
    }
    else if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2').slice(0, 5);
      setCardData(prev => ({ ...prev, [name]: formatted }));
    }
    else if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '').slice(0, 3);
      setCardData(prev => ({ ...prev, [name]: formatted }));
    }
    else {
      setCardData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleMomoInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMomoData(prev => ({
      ...prev,
      [name]: value === '' ? undefined : (value as 'mtn' | 'moov' | 'orange')
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateCardPayment = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Numéro de carte invalide';
    }

    if (!cardData.cardHolder.trim()) {
      newErrors.cardHolder = 'Nom du titulaire requis';
    }

    if (!cardData.expiryDate || cardData.expiryDate.length < 5) {
      newErrors.expiryDate = 'Date d\'expiration invalide';
    }

    if (!cardData.cvv || cardData.cvv.length < 3) {
      newErrors.cvv = 'CVV invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateMomoPayment = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!momoData.phoneNumber || momoData.phoneNumber.length < 8) {
      newErrors.phoneNumber = 'Numéro de téléphone invalide';
    }

    if (!momoData.momoProvider) {
      newErrors.momoProvider = 'Veuillez sélectionner un opérateur';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      let isValid = false;
      let paymentInfo: PaymentInfo;

      if (paymentType === 'card') {
        isValid = validateCardPayment();
        paymentInfo = {
          type: 'card',
          ...cardData
        };
      } else {
        isValid = validateMomoPayment();
        paymentInfo = {
          type: 'momo',
          ...momoData
        };
      }

      if (isValid) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Paiement traité:', paymentInfo);
        onPayment(paymentInfo);
      }
    } catch (err) {
      setErrors({ general: 'Erreur lors du paiement. Veuillez réessayer.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white rounded-[20px] w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête du modal */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 
              className="text-2xl font-bold"
              style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text }}
            >
              Finaliser votre commande
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Résumé de l'offre */}
        <div className="p-6 border-b border-gray-200" style={{ backgroundColor: `${selectedOffer.color}10` }}>
          <h3 
            className="text-lg font-semibold mb-2"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {selectedOffer.name}
          </h3>
          <div className="flex justify-between items-center">
            <span style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text }}>
              Montant à payer :
            </span>
            <span 
              className="text-2xl font-bold"
              style={{ fontFamily: 'Montserrat, sans-serif', color: selectedOffer.color }}
            >
              {selectedOffer.price.toLocaleString()} FCFA {selectedOffer.duration}
            </span>
          </div>
        </div>

        {/* Sélection du mode de paiement */}
        <div className="p-6">
          <h3 
            className="text-lg font-semibold mb-4"
            style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text }}
          >
            Mode de paiement
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setPaymentType('card')}
              className={`p-4 border-2 rounded-[15px] transition-all duration-200 ${
                paymentType === 'card' 
                  ? `border-${colors.primary} bg-green-50` 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">💳</div>
                <span 
                  className="font-semibold"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Carte bancaire
                </span>
              </div>
            </button>

            <button
              onClick={() => setPaymentType('momo')}
              className={`p-4 border-2 rounded-[15px] transition-all duration-200 ${
                paymentType === 'momo' 
                  ? `border-${colors.primary} bg-green-50` 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">📱</div>
                <span 
                  className="font-semibold"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Mobile Money
                </span>
              </div>
            </button>
          </div>

          {/* Formulaire de paiement par carte */}
          {paymentType === 'card' && (
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Numéro de carte (1234 5678 9012 3456)"
                  value={cardData.cardNumber}
                  onChange={handleCardInputChange}
                  className={`w-full h-[48px] px-4 rounded-[10px] border outline-none transition-all duration-200 ${
                    errors.cardNumber ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="cardHolder"
                  placeholder="Nom du titulaire"
                  value={cardData.cardHolder}
                  onChange={handleCardInputChange}
                  className={`w-full h-[48px] px-4 rounded-[10px] border outline-none transition-all duration-200 ${
                    errors.cardHolder ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                />
                {errors.cardHolder && (
                  <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {errors.cardHolder}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/AA"
                    value={cardData.expiryDate}
                    onChange={handleCardInputChange}
                    className={`w-full h-[48px] px-4 rounded-[10px] border outline-none transition-all duration-200 ${
                      errors.expiryDate ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                    }`}
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {errors.expiryDate}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={cardData.cvv}
                    onChange={handleCardInputChange}
                    className={`w-full h-[48px] px-4 rounded-[10px] border outline-none transition-all duration-200 ${
                      errors.cvv ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                    }`}
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {errors.cvv}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Formulaire de paiement Mobile Money */}
          {paymentType === 'momo' && (
            <div className="space-y-4">
              <div>
                <select
                  name="momoProvider"
                  value={momoData.momoProvider ?? ''}
                  onChange={handleMomoInputChange}
                  className={`w-full h-[48px] px-4 rounded-[10px] border outline-none transition-all duration-200 ${
                    errors.momoProvider ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  <option value="">Sélectionner un opérateur</option>
                  <option value="mtn">MTN Mobile Money</option>
                  <option value="moov">Moov Money</option>
                  <option value="orange">Orange Money</option>
                </select>
                {errors.momoProvider && (
                  <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {errors.momoProvider}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Numéro de téléphone (ex: 97123456)"
                  value={momoData.phoneNumber}
                  onChange={handleMomoInputChange}
                  className={`w-full h-[48px] px-4 rounded-[10px] border outline-none transition-all duration-200 ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Message d'erreur général */}
          {errors.general && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm text-center">
              {errors.general}
            </div>
          )}

          {/* Boutons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={onClose}
              className="flex-1 h-[48px] rounded-[15px] border-2 border-gray-300 font-semibold hover:bg-gray-50 transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Annuler
            </button>
            
            <button
              onClick={handlePayment}
              disabled={isLoading}
              className="flex-1 h-[48px] rounded-[15px] text-white font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50"
              style={{ 
                backgroundColor: colors.primary,
                fontFamily: 'Montserrat, sans-serif'
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Traitement...
                </div>
              ) : (
                `Payer ${selectedOffer.price.toLocaleString()} FCFA`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
