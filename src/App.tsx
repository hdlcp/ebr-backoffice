// src/App.tsx
import React, { useState } from 'react';
import { LoginPage } from './pages/auth';
import RegistrationPage from './pages/auth/RegistrationPage';
import EmailValidationPage from './pages/auth/EmailValidationPage';
import OffersPage from './pages/auth/OffersPage';
import PaymentModal from './pages/auth/PaymentModal';
import AddCompanyPage from './pages/auth/AddCompanyPage';
import { EmployeesPage } from './pages/employees';
import { MenusPage } from './pages/menus';
import { TablesPage } from './pages/tables';
import { StatsPage } from './pages/stats';
import { DashboardPage } from './pages/dashboard';
import { RegistrationFormData, Offer, PaymentInfo, RegistrationApiResponse } from './types/registration';
import { CreateCompanyData, Company } from './types/company';
import { LoginResponse, Entreprise } from './types/auth';
import './index.css';

type AppState = 'login' | 'registration' | 'email-validation' | 'offers' | 'payment' | 'dashboard' | 'add-company';

function App() {
  const [appState, setAppState] = useState<AppState>('login');
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // États pour l'utilisateur connecté
  const [loggedInUser, setLoggedInUser] = useState<LoginResponse | null>(null);
  const [activeCompany, setActiveCompany] = useState<Entreprise | null>(null);
  
  // États pour le processus d'inscription
  const [registrationData, setRegistrationData] = useState<RegistrationFormData | null>(null);
  const [registeredUser, setRegisteredUser] = useState<RegistrationApiResponse | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Navigation dans le dashboard
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  // Gestion de la connexion
  const handleLogin = (loginData: LoginResponse) => {
    setLoggedInUser(loginData);
    
    // Définir l'entreprise active (la première entreprise par défaut)
    if (loginData.entreprises && loginData.entreprises.length > 0) {
      setActiveCompany(loginData.entreprises[0]);
    }
    
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
  const handleRegistration = (userData: RegistrationApiResponse, formData: RegistrationFormData) => {
    setRegisteredUser(userData);
    setRegistrationData(formData);
    setAppState('email-validation');
  };

  const handleEmailValidationSuccess = () => {
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
    
    setShowPaymentModal(false);
    setAppState('dashboard');
    
    setRegistrationData(null);
    setSelectedOffer(null);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  // Gestion du changement d'entreprise
  const handleCompanySwitch = (company: Entreprise) => {
    setActiveCompany(company);
  };

  // Gestion des entreprises
  const handleAddCompany = () => {
    setAppState('add-company');
  };

  const handleCompanyAdded = (companyData: CreateCompanyData) => {
    // Créer une nouvelle entreprise
    const newCompany: Entreprise = {
      id: Date.now(),
      raison_sociale: companyData.name,
      telephone: '',
      email: loggedInUser?.user.email || '',
      site_web: '',
      numero_ifu: '',
      numero_registre_commerce: '',
      is_active: true,
      code_entreprise: Date.now().toString()
    };

    // Ajouter à la liste des entreprises de l'utilisateur connecté
    if (loggedInUser) {
      setLoggedInUser({
        ...loggedInUser,
        entreprises: [...loggedInUser.entreprises, newCompany]
      });
      
      // Mettre à jour le localStorage
      localStorage.setItem('entreprises', JSON.stringify([...loggedInUser.entreprises, newCompany]));
    }
    
    console.log('Nouvelle entreprise ajoutée:', newCompany);
    
    setAppState('dashboard');
  };

  const handleCancelAddCompany = () => {
    setAppState('dashboard');
  };

  // Convertir les entreprises au format Company pour le Header
  const getCompaniesForHeader = (): Company[] => {
    if (!loggedInUser) return [];
    
    return loggedInUser.entreprises.map(entreprise => ({
      id: entreprise.id.toString(),
      name: entreprise.raison_sociale,
      isActive: entreprise.is_active,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
  };

  const getActiveCompanyForHeader = (): Company => {
    if (!activeCompany) {
      return {
        id: '0',
        name: 'Aucune entreprise',
        isActive: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
    
    return {
      id: activeCompany.id.toString(),
      name: activeCompany.raison_sociale,
      isActive: activeCompany.is_active,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  };

  // Fonction pour rendre la page actuelle du dashboard
  const renderDashboardPage = () => {
    const userName = loggedInUser ? `${loggedInUser.user.firstname} ${loggedInUser.user.lastname}` : '';
    const userRole = loggedInUser?.user.role === 'admin' ? 'Administrateur' : loggedInUser?.user.role || '';
    const companies = getCompaniesForHeader();
    const activeCompanyData = getActiveCompanyForHeader();

    const commonProps = {
      currentPage,
      onNavigate: handleNavigate,
      onAddCompany: handleAddCompany,
      userName,
      userRole,
      companies,
      activeCompany: activeCompanyData,
      onCompanySwitch: (company: Company) => {
        const entreprise = loggedInUser?.entreprises.find(e => e.id.toString() === company.id);
        if (entreprise) {
          handleCompanySwitch(entreprise);
        }
      }
    };

    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage {...commonProps} />;
      case 'employees':
        return <EmployeesPage {...commonProps} />;
      case 'menus':
        return <MenusPage {...commonProps} />;
      case 'tables':
        return <TablesPage {...commonProps} />;
      case 'stats':
        return <StatsPage {...commonProps} />;
      default:
        return <DashboardPage {...commonProps} />;
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

      case 'email-validation':
        return registeredUser && registrationData ? (
          <EmailValidationPage 
            userEmail={registrationData.email}
            userId={registeredUser.id}
            onValidationSuccess={handleEmailValidationSuccess}
          />
        ) : (
          <LoginPage 
            onLogin={handleLogin}
            onSwitchToRegistration={handleSwitchToRegistration}
          />
        );

      case 'offers':
        return registrationData && registeredUser ? (
          <OffersPage 
            registrationData={registrationData}
            registeredUser={registeredUser}
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