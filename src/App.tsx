// src/App.tsx
import React, { useState } from 'react';
import { LoginPage } from './pages/auth';
import { EmployeesPage } from './pages/employees';
import { MenusPage } from './pages/menus';
import { TablesPage } from './pages/tables';
import { StatsPage } from './pages/stats';
import './index.css';

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
        return <MenusPage currentPage={currentPage} onNavigate={handleNavigate} />;
      case 'tables':
        return <TablesPage currentPage={currentPage} onNavigate={handleNavigate} />;
      case 'stats':
        return <StatsPage currentPage={currentPage} onNavigate={handleNavigate} />;
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