import React, { useState, useEffect } from 'react';
import { authService } from '../../services/api/authService';

const colors = {
  primary: '#007A3F',
  container: '#E4D1B0',
  white: '#FFFFFF',
  text: '#333333',
  error: '#FF4444',
  success: '#10B981'
};

interface EmailValidationPageProps {
  userEmail: string;
  userId: number;
  onValidationSuccess: () => void;
}

const EmailValidationPage: React.FC<EmailValidationPageProps> = ({
  userEmail,
  userId,
  onValidationSuccess
}) => {
  const [validationCode, setValidationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Vérifier si un code de validation est présent dans l'URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeFromUrl = params.get('validation_code') || params.get('code');
    const userIdFromUrl = params.get('user_id');

    if (codeFromUrl) {
      setValidationCode(codeFromUrl);
      // Valider automatiquement si on a le code dans l'URL
      validateWithCode(codeFromUrl);
    }
  }, []);

  const validateWithCode = async (code: string) => {
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const response = await authService.validateEmail(code.trim());
      
      if (response.error) {
        setError(response.error);
      } else {
        setSuccessMessage('Email validé avec succès !');
        setTimeout(() => {
          onValidationSuccess();
        }, 2000);
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la validation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidate = async () => {
    if (!validationCode.trim()) {
      setError('Veuillez entrer le code de validation');
      return;
    }

    await validateWithCode(validationCode);
  };

  const handleResendCode = async () => {
    setError('');
    setSuccessMessage('');
    setIsResending(true);

    try {
      const response = await authService.resendValidationCode(userId);
      
      if (response.error) {
        setError(response.error);
      } else {
        setSuccessMessage('Un nouveau code a été envoyé à votre email');
      }
    } catch (err) {
      setError('Erreur lors du renvoi du code');
    } finally {
      setIsResending(false);
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
        className="relative z-10 rounded-[20px] max-w-[600px] w-full mx-auto p-8 lg:p-12"
        style={{ 
          backgroundColor: colors.container,
          boxShadow: `0 5px 15px ${colors.white}40`
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src="/logos/logo_ebr.png" 
            alt="eBR Logo" 
            className="w-32 h-32 object-contain" 
          />
        </div>

        {/* Titre */}
        <h2 
          className="text-2xl font-bold text-center mb-4"
          style={{ 
            fontFamily: 'Montserrat, sans-serif',
            color: colors.text
          }}
        >
          Validez votre email
        </h2>

        {/* Message informatif */}
        <p 
          className="text-center mb-8"
          style={{ 
            fontFamily: 'Montserrat, sans-serif',
            color: colors.text
          }}
        >
          Un code de validation a été envoyé à <strong>{userEmail}</strong>
        </p>

        {/* Champ code de validation */}
        <div className="space-y-6">
          <div>
            <label 
              htmlFor="validationCode" 
              className="block text-sm font-medium mb-2"
              style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text }}
            >
              Code de validation
            </label>
            <input
              type="text"
              id="validationCode"
              placeholder="Entrez le code reçu par email"
              value={validationCode}
              onChange={(e) => {
                setValidationCode(e.target.value);
                setError('');
                setSuccessMessage('');
              }}
              className={`w-full h-[56px] px-4 rounded-[15px] border-none outline-none text-gray-800 text-center text-lg tracking-wider placeholder-gray-500 transition-all duration-200 ${
                error ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
              }`}
              style={{ 
                backgroundColor: colors.white,
                fontFamily: 'Montserrat, sans-serif'
              }}
            />
          </div>

          {/* Messages d'erreur ou succès */}
          {error && (
            <div 
              className="text-sm text-center p-3 rounded-lg"
              style={{ 
                color: colors.error,
                backgroundColor: `${colors.error}15`,
                fontFamily: 'Montserrat, sans-serif'
              }}
            >
              {error}
            </div>
          )}

          {successMessage && (
            <div 
              className="text-sm text-center p-3 rounded-lg"
              style={{ 
                color: colors.success,
                backgroundColor: `${colors.success}15`,
                fontFamily: 'Montserrat, sans-serif'
              }}
            >
              {successMessage}
            </div>
          )}

          {/* Bouton valider */}
          <button
            onClick={handleValidate}
            disabled={isLoading}
            className="w-full h-[56px] rounded-[20px] text-white font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: colors.primary,
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Validation...
              </div>
            ) : (
              'Valider mon email'
            )}
          </button>

          {/* Bouton renvoyer le code */}
          <div className="text-center pt-4">
            <p className="text-sm mb-2" style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text }}>
              Vous n'avez pas reçu le code ?
            </p>
            <button
              onClick={handleResendCode}
              disabled={isResending}
              className="font-semibold hover:underline disabled:opacity-50"
              style={{ color: colors.primary, fontFamily: 'Montserrat, sans-serif' }}
            >
              {isResending ? 'Envoi en cours...' : 'Renvoyer le code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailValidationPage;