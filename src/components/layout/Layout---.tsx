// src/components/layout/Layout.tsx
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { colors } from '../../config/colors';
import { Company } from '../../types/company';

interface LayoutProps {
  children: React.ReactNode;
  userName: string;
  userRole?: string;
  companies: Company[];
  activeCompany: Company;
  onCompanySwitch: (company: Company) => void;
  onAddCompany?: () => void;
  onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  userName, 
  userRole = "Administrateur",
  companies,
  activeCompany,
  onCompanySwitch,
  onAddCompany,
  onLogout
}) => {
  const handleAddCompany = () => {
    if (onAddCompany) {
      onAddCompany();
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: colors.background.primary }}
    >
      {/* Sidebar avec React Router */}
      <Sidebar onLogout={onLogout} />
      
      {/* Header avec gestion des entreprises */}
      <Header 
        userName={userName} 
        userRole={userRole}
        companies={companies}
        activeCompany={activeCompany}
        onCompanySwitch={onCompanySwitch}
        onAddCompany={handleAddCompany}
      />
      
      {/* Contenu principal */}
      <main className="lg:ml-[236px] pt-[74px] lg:pt-[74px] px-4 lg:px-6 pb-20 lg:pb-8 min-h-screen">
        <div className="max-w-[1200px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;