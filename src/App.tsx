// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/auth';
import RegistrationPage from './pages/auth/RegistrationPage';
import EmailValidationPage from './pages/auth/EmailValidationPage';
import OffersPage from './pages/auth/OffersPage';
import AddCompanyPage from './pages/auth/AddCompanyPage';
import { EmployeesPage } from './pages/employees';
import { MenusPage } from './pages/menus';
import { TablesPage } from './pages/tables';
import { StatsPage } from './pages/stats';
import { DashboardPage } from './pages/dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { RegistrationFormData, RegistrationApiResponse } from './types/registration';
import { Company } from './types/company';
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

  // Gestion du changement d'entreprise
  const handleCompanySwitch = (company: Entreprise) => {
    setActiveCompany(company);
  };

  // Fonction pour rafraîchir la liste des entreprises après ajout
  const refreshUserCompanies = async () => {
    try {
      // Récupérer les données utilisateur mises à jour
      const userData = authUtils.getUserData();
      if (userData) {
        // Vous pouvez ajouter ici un appel API pour récupérer la liste actualisée des entreprises
        // Pour l'instant, on utilise les données du localStorage
        setLoggedInUser(userData);
        
        if (userData.entreprises && userData.entreprises.length > 0) {
          // Définir la dernière entreprise ajoutée comme active
          const newCompanyId = localStorage.getItem('new_company_id');
          if (newCompanyId) {
            const newCompany = userData.entreprises.find(e => e.id.toString() === newCompanyId);
            if (newCompany) {
              setActiveCompany(newCompany);
            }
          }
        }
      }
    } catch (error) {
      console.error("Erreur lors du rafraîchissement des entreprises:", error);
    }
  };

  // Convertir les entreprises au format Company pour le Header
  const getCompaniesForHeader = (): Company[] => {
    if (!loggedInUser) return [];
    
    return loggedInUser.entreprises.map(entreprise => ({
      id: entreprise.id,
      raison_sociale: entreprise.raison_sociale,
      telephone: entreprise.telephone,
      email: entreprise.email,
      site_web: entreprise.site_web,
      numero_ifu: entreprise.numero_ifu,
      numero_registre_commerce: entreprise.numero_registre_commerce,
      is_active: entreprise.is_active,
      code_entreprise: entreprise.code_entreprise
    }));
  };

  const getActiveCompanyForHeader = (): Company => {
    if (!activeCompany) {
      return {
        id: 0,
        raison_sociale: 'Aucune entreprise',
        telephone: '',
        email: '',
        site_web: '',
        numero_ifu: '',
        numero_registre_commerce: '',
        is_active: false,
        code_entreprise: ''
      };
    }
    
    return {
      id: activeCompany.id,
      raison_sociale: activeCompany.raison_sociale,
      telephone: activeCompany.telephone,
      email: activeCompany.email,
      site_web: activeCompany.site_web,
      numero_ifu: activeCompany.numero_ifu,
      numero_registre_commerce: activeCompany.numero_registre_commerce,
      is_active: activeCompany.is_active,
      code_entreprise: activeCompany.code_entreprise
    };
  };

  // Gestion de l'ajout d'entreprise (navigation gérée par le Header directement)
  const handleAddCompany = () => {
    // Cette fonction n'est plus nécessaire car la navigation est gérée dans le Header
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
        const entreprise = loggedInUser.entreprises.find(e => e.id === company.id);
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
          
          {/* Route des offres - accessible pour inscription ET après ajout entreprise */}
          <Route 
            path="/offre" 
            element={
              <OffersPage 
                registrationData={registrationData || undefined}
                registeredUser={registeredUser || undefined}
                onOfferSelected={(offer) => {
                  console.log('Offre sélectionnée:', offer);
                }}
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
                <AddCompanyPage />
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
      </div>
    </Router>
  );
}

export default App;