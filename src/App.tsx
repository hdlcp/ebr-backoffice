// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import ProtectedRoute from './components/ProtectedRoute';
import { RegistrationFormData, Offer, PaymentInfo, RegistrationApiResponse } from './types/registration';
import { CreateCompanyData, Company } from './types/company';
import { LoginResponse, Entreprise } from './types/auth';
import { authUtils } from './utils/authUtils';
import './index.css';

function App() {
  const defaultRegistrationData: RegistrationFormData = {
    raison_sociale: '',
    telephone: '',
    email: 'votre mail',
    site_web: '',
    numero_ifu: '',
    numero_registre_commerce: '',
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    country: ''
  };

  const defaultRegisteredUser: RegistrationApiResponse = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    is_active: false,
    matricule: null,
    id: 0
  };

  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // États pour l'utilisateur connecté
  const [loggedInUser, setLoggedInUser] = useState<LoginResponse | null>(null);
  const [activeCompany, setActiveCompany] = useState<Entreprise | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // États pour le processus d'inscription
  const [registrationData, setRegistrationData] = useState<RegistrationFormData | null>(null);
  const [registeredUser, setRegisteredUser] = useState<RegistrationApiResponse | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const userData = authUtils.getUserData();
    if (userData && !authUtils.isTokenExpired()) {
      setLoggedInUser(userData);
      setIsAuthenticated(true);
      
      // Définir l'entreprise active
      if (userData.entreprises && userData.entreprises.length > 0) {
        setActiveCompany(userData.entreprises[0]);
      }
    } else {
      // Token expiré ou invalide, nettoyer
      authUtils.logout();
      setIsAuthenticated(false);
    }
  }, []);

  // Navigation dans le dashboard
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  // Gestion de la connexion
  const handleLogin = (loginData: LoginResponse) => {
    setLoggedInUser(loginData);
    setIsAuthenticated(true);
    
    // Définir l'entreprise active (la première entreprise par défaut)
    if (loginData.entreprises && loginData.entreprises.length > 0) {
      setActiveCompany(loginData.entreprises[0]);
    }
  };

  // Gestion de la déconnexion
  const handleLogout = () => {
    authUtils.logout();
    setLoggedInUser(null);
    setActiveCompany(null);
    setIsAuthenticated(false);
  };

  // Gestion du processus d'inscription
  const handleRegistration = (userData: RegistrationApiResponse, formData: RegistrationFormData) => {
    setRegisteredUser(userData);
    setRegistrationData(formData);
  };

  const handleEmailValidationSuccess = () => {
    // La navigation sera gérée par React Router
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
    
    // Réinitialiser les données d'inscription
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
    // La navigation sera gérée par React Router
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
      const updatedUser = {
        ...loggedInUser,
        entreprises: [...loggedInUser.entreprises, newCompany]
      };
      setLoggedInUser(updatedUser);
      
      // Mettre à jour le localStorage
      localStorage.setItem('entreprises', JSON.stringify(updatedUser.entreprises));
    }
    
    console.log('Nouvelle entreprise ajoutée:', newCompany);
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

  // Props communes pour les pages protégées
  const getCommonProps = () => {
    if (!loggedInUser) return null;

    const userName = `${loggedInUser.user.firstname} ${loggedInUser.user.lastname}`;
    const userRole = loggedInUser.user.role === 'admin' ? 'Administrateur' : loggedInUser.user.role;
    const companies = getCompaniesForHeader();
    const activeCompanyData = getActiveCompanyForHeader();

    return {
      currentPage,
      onNavigate: handleNavigate,
      onAddCompany: handleAddCompany,
      userName,
      userRole,
      companies,
      activeCompany: activeCompanyData,
      onCompanySwitch: (company: Company) => {
        const entreprise = loggedInUser.entreprises.find(e => e.id.toString() === company.id);
        if (entreprise) {
          handleCompanySwitch(entreprise);
        }
      },
      onLogout: handleLogout
    };
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Routes publiques */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage 
                  onLogin={handleLogin}
                  onSwitchToRegistration={() => {}}
                />
              )
            } 
          />
          
          <Route 
            path="/register" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <RegistrationPage 
                  onRegistration={handleRegistration}
                  onSwitchToLogin={() => {}}
                />
              )
            } 
          />
          
          <Route 
            path="/verification-code" 
            element={
                <EmailValidationPage 
                  userEmail={registrationData?.email || defaultRegistrationData.email}
                  onValidationSuccess={handleEmailValidationSuccess}
                />
            } 
          />
          
          <Route 
            path="/offers" 
            element={
              <OffersPage 
                  registrationData={registrationData || defaultRegistrationData} 
                  registeredUser={registeredUser || defaultRegisteredUser} 
                  onOfferSelected={handleOfferSelected}
              />
            } 
          />


          {/* Routes protégées */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <DashboardPage {...getCommonProps()!} />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/employees" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <EmployeesPage {...getCommonProps()!} />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/menus" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MenusPage {...getCommonProps()!} />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/tables" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <TablesPage {...getCommonProps()!} />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/stats" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <StatsPage {...getCommonProps()!} />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/add-company" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AddCompanyPage 
                  onAddCompany={handleCompanyAdded}
                  onCancel={() => {}}
                />
              </ProtectedRoute>
            } 
          />

          {/* Redirection par défaut */}
          <Route 
            path="/" 
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
            } 
          />
          
          {/* Route 404 */}
          <Route 
            path="*" 
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
            } 
          />
        </Routes>

        {/* Modal de paiement */}
        {showPaymentModal && selectedOffer && (
          <PaymentModal 
            selectedOffer={selectedOffer}
            onPayment={handlePayment}
            onClose={handleClosePaymentModal}
          />
        )}
      </div>
    </Router>
  );
}

export default App;