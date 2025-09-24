// src/App.tsx
import React, { useState } from 'react';
import { LoginPage } from './pages/auth';
import RegistrationPage from './pages/auth/RegistrationPage';
import OffersPage from './pages/auth/OffersPage';
import PaymentModal from './pages/auth/PaymentModal';
import { EmployeesPage } from './pages/employees';
import { MenusPage } from './pages/menus';
import { TablesPage } from './pages/tables';
import { StatsPage } from './pages/stats';
import { RegistrationFormData, Offer, PaymentInfo } from './types/registration';
import './index.css';

type AppState = 'login' | 'registration' | 'offers' | 'payment' | 'dashboard';

function App() {
  const [appState, setAppState] = useState<AppState>('login');
  const [currentPage, setCurrentPage] = useState('employees');
  
  // États pour le processus d'inscription
  const [registrationData, setRegistrationData] = useState<RegistrationFormData | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Navigation dans le dashboard
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  // Gestion de la connexion
  const handleLogin = () => {
    setAppState('dashboard');
  };

  // Navigation entre login et inscription
  const handleSwitchToRegistration = () => {
    setAppState('registration');
  };

  const handleSwitchToLogin = () => {
    setAppState('login');
  };

  // Gestion du processus d'inscription
  const handleRegistration = (data: RegistrationFormData) => {
    setRegistrationData(data);
    setAppState('offers');
  };

  const handleOfferSelected = (offer: Offer) => {
    setSelectedOffer(offer);
    setShowPaymentModal(true);
  };

  const handlePayment = (paymentInfo: PaymentInfo) => {
    console.log('Inscription complète:', {
      user: registrationData,
      offer: selectedOffer,
      payment: paymentInfo
    });
    
    // Fermer le modal et rediriger vers le dashboard
    setShowPaymentModal(false);
    setAppState('dashboard');
    
    // Réinitialiser les données d'inscription
    setRegistrationData(null);
    setSelectedOffer(null);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  // Fonction pour rendre la page actuelle du dashboard
  const renderDashboardPage = () => {
    switch (currentPage) {
      case 'employees':
        return <EmployeesPage currentPage={currentPage} onNavigate={handleNavigate} />;
      case 'menus':
        return <MenusPage currentPage={currentPage} onNavigate={handleNavigate} />;
      case 'tables':
        return <TablesPage currentPage={currentPage} onNavigate={handleNavigate} />;
      case 'stats':
        return <StatsPage currentPage={currentPage} onNavigate={handleNavigate} />;
      default:
        return <EmployeesPage currentPage={currentPage} onNavigate={handleNavigate} />;
    }
  };

  // Rendu principal de l'application
  const renderCurrentView = () => {
    switch (appState) {
      case 'login':
        return (
          <LoginPage 
            onLogin={handleLogin}
            onSwitchToRegistration={handleSwitchToRegistration}
          />
        );

      case 'registration':
        return (
          <RegistrationPage 
            onRegistration={handleRegistration}
            onSwitchToLogin={handleSwitchToLogin}
          />
        );

      case 'offers':
        return registrationData ? (
          <OffersPage 
            registrationData={registrationData}
            onOfferSelected={handleOfferSelected}
          />
        ) : (
          <LoginPage 
            onLogin={handleLogin}
            onSwitchToRegistration={handleSwitchToRegistration}
          />
        );

      case 'dashboard':
        return renderDashboardPage();

      default:
        return (
          <LoginPage 
            onLogin={handleLogin}
            onSwitchToRegistration={handleSwitchToRegistration}
          />
        );
    }
  };

  return (
    <div className="App">
      {renderCurrentView()}
      
      {/* Modal de paiement */}
      {showPaymentModal && selectedOffer && (
        <PaymentModal 
          selectedOffer={selectedOffer}
          onPayment={handlePayment}
          onClose={handleClosePaymentModal}
        />
      )}
    </div>
  );
}

export default App;