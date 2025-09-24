// src/App.tsx
import React, { useState } from 'react';
import { LoginPage } from './pages/auth';
import RegistrationPage from './pages/auth/RegistrationPage';
import OffersPage from './pages/auth/OffersPage';
import PaymentModal from './pages/auth/PaymentModal';
import AddCompanyPage from './pages/auth/AddCompanyPage';
import { EmployeesPage } from './pages/employees';
import { MenusPage } from './pages/menus';
import { TablesPage } from './pages/tables';
import { StatsPage } from './pages/stats';
import { DashboardPage } from './pages/dashboard';
import { RegistrationFormData, Offer, PaymentInfo } from './types/registration';
import { CreateCompanyData, Company } from './types/company';
import './index.css';

type AppState = 'login' | 'registration' | 'offers' | 'payment' | 'dashboard' | 'add-company';

// Données d'exemple pour les entreprises
const mockCompanies: Company[] = [
  { id: '1', name: 'Restaurant Le Palmier', isActive: true, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '2', name: 'Café des Arts', isActive: false, createdAt: '2024-01-15', updatedAt: '2024-01-15' }
];

function App() {
  const [appState, setAppState] = useState<AppState>('login');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  
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

  // Gestion des entreprises
  const handleAddCompany = () => {
    setAppState('add-company');
  };

  const handleCompanyAdded = (companyData: CreateCompanyData) => {
    // Créer une nouvelle entreprise
    const newCompany: Company = {
      id: Date.now().toString(),
      name: companyData.name,
      isActive: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Ajouter à la liste des entreprises
    setCompanies([...companies, newCompany]);
    
    console.log('Nouvelle entreprise ajoutée:', newCompany);
    
    // Retourner au dashboard
    setAppState('dashboard');
  };

  const handleCancelAddCompany = () => {
    setAppState('dashboard');
  };

  // Fonction pour rendre la page actuelle du dashboard
  const renderDashboardPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage currentPage={currentPage} onNavigate={handleNavigate} />;
      case 'employees':
        return <EmployeesPage currentPage={currentPage} onNavigate={handleNavigate} />;
      case 'menus':
        return <MenusPage currentPage={currentPage} onNavigate={handleNavigate} />;
      case 'tables':
        return <TablesPage currentPage={currentPage} onNavigate={handleNavigate} />;
      case 'stats':
        return <StatsPage currentPage={currentPage} onNavigate={handleNavigate} />;
      default:
        return <DashboardPage currentPage={currentPage} onNavigate={handleNavigate} />;
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

      case 'add-company':
        return (
          <AddCompanyPage 
            onAddCompany={handleCompanyAdded}
            onCancel={handleCancelAddCompany}
          />
        );

      case 'dashboard':
        return (
          <div>
            {React.cloneElement(renderDashboardPage(), { 
              onAddCompany: handleAddCompany 
            })}
          </div>
        );

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