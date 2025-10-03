// src/pages/auth/EmailValidationPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  onValidationSuccess: () => void;
}

const EmailValidationPage: React.FC<EmailValidationPageProps> = ({
  userEmail,
  onValidationSuccess
}) => {
  const navigate = useNavigate();
  const [validationCode, setValidationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Vérifier si un code est présent dans l'URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeFromUrl = params.get('validation_code') || params.get('code');

    if (codeFromUrl) {
      setValidationCode(codeFromUrl);
      validateWithCode(codeFromUrl);
    }
  }, []);

  const validateWithCode = async (code: string) => {
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const response = await authService.validateEmail(code.trim());
      if (response.data) {
        setSuccessMessage('Email validé avec succès !');
        setTimeout(() => {
          onValidationSuccess();
          navigate('/offers'); // ✅ redirection après succès
        }, 2000);
      } else if (response.error) {
        setError(response.error);
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la validation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
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
      // ⚠️ Ici il faudra peut-être adapter ton API si elle attend l'email ou l'userId
      // Pour l'instant je mets un placeholder car ton service n'était pas clair
      const response = await authService.resendValidationCode(0);
      if (response.data) {
        setSuccessMessage('Un nouveau code a été envoyé à votre email');
      } else if (response.error) {
        setError(response.error);
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
          style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text }}
        >
          Validez votre email
        </h2>

        {/* Message */}
        <p
          className="text-center mb-8"
          style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text }}
        >
          Un code de validation a été envoyé à <strong>{userEmail}</strong>
        </p>

        {/* Formulaire */}
        <form onSubmit={handleValidate} className="space-y-6">
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
              className={`w-full h-[56px] px-4 rounded-[15px] border-none outline-none text-center text-lg tracking-wider placeholder-gray-500 transition-all duration-200 ${
                error ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
              }`}
              style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}
              required
            />
          </div>

          {/* Messages */}
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
            type="submit"
            disabled={isLoading}
            className="w-full h-[56px] rounded-[20px] text-white font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: colors.primary, fontFamily: 'Montserrat, sans-serif' }}
          >
            {isLoading ? 'Validation...' : 'Valider mon email'}
          </button>

          {/* Bouton renvoyer */}
          <div className="text-center pt-4">
            <p className="text-sm mb-2" style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text }}>
              Vous n'avez pas reçu le code ?
            </p>
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isResending}
              className="font-semibold hover:underline disabled:opacity-50"
              style={{ color: colors.primary, fontFamily: 'Montserrat, sans-serif' }}
            >
              {isResending ? 'Envoi en cours...' : 'Renvoyer le code'}
            </button>
          </div>

          {/* Bouton retour connexion */}
          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              Retour à la connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailValidationPage;
