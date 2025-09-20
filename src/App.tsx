// src/App.tsx
import React, { useState } from 'react';
import { LoginPage } from './pages/auth';
import { EmployeesPage } from './pages/employees';
// Import des autres pages (à créer plus tard)
// import { MenusPage } from './pages/menus';
// import { TablesPage } from './pages/tables';
// import { StatsPage } from './pages/stats';
import './index.css';

// Composants temporaires pour les pages non créées
const MenusPage: React.FC = () => <div className="p-8"><h1 style={{fontFamily: 'Montserrat, sans-serif'}}>Page Gestion des Menus - En cours de développement</h1></div>;
const TablesPage: React.FC = () => <div className="p-8"><h1 style={{fontFamily: 'Montserrat, sans-serif'}}>Page Gestion des Tables - En cours de développement</h1></div>;
const StatsPage: React.FC = () => <div className="p-8"><h1 style={{fontFamily: 'Montserrat, sans-serif'}}>Page Statistiques - En cours de développement</h1></div>;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('employees'); // Page par défaut

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('employees'); // Reset vers la page par défaut
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  // Fonction pour rendre la page actuelle
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'employees':
        return <EmployeesPage currentPage={currentPage} onNavigate={handleNavigate} />;
      case 'menus':
        return <MenusPage />;
      case 'tables':
        return <TablesPage />;
      case 'stats':
        return <StatsPage />;
      default:
        return <EmployeesPage currentPage={currentPage} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        renderCurrentPage()
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;