// src/components/layout/Layout.tsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { colors } from '../../config/colors';
import { Company } from '../../types/company';

// Données d'exemple pour les entreprises
const mockCompanies: Company[] = [
  { id: '1', name: 'Restaurant Le Palmier', isActive: true, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '2', name: 'Café des Arts', isActive: false, createdAt: '2024-01-15', updatedAt: '2024-01-15' }
];

interface LayoutProps {
  children: React.ReactNode;
  userName: string;
  userRole?: string;
  currentPage: string;
  onNavigate: (page: string) => void;
  onAddCompany?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  userName, 
  userRole = "Administrateur",
  currentPage,
  onNavigate,
  onAddCompany
}) => {
  const [companies] = useState<Company[]>(mockCompanies);
  const [activeCompany, setActiveCompany] = useState<Company>(companies[0]);

  const handleMenuChange = (menuId: string) => {
    console.log(`Navigation vers: ${menuId}`);
    onNavigate(menuId);
  };

  const handleCompanySwitch = (company: Company) => {
    setActiveCompany(company);
    console.log('Changement d\'entreprise vers:', company.name);
    // Ici vous pourrez implémenter la logique de changement de contexte d'entreprise
  };

  const handleAddCompany = () => {
    if (onAddCompany) {
      onAddCompany();
    }
    console.log('Ajouter une nouvelle entreprise');
  };

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: colors.background.primary }}
    >
      {/* Sidebar */}
      <Sidebar activeMenu={currentPage} onMenuChange={handleMenuChange} />
      
      {/* Header avec gestion des entreprises */}
      <Header 
        userName={userName} 
        userRole={userRole}
        companies={companies}
        activeCompany={activeCompany}
        onCompanySwitch={handleCompanySwitch}
        onAddCompany={handleAddCompany}
      />
      
      {/* Contenu principal */}
      <main className="lg:ml-[250px] pt-[74px] lg:pt-[74px] px-4 lg:px-6 pb-20 lg:pb-8 min-h-screen">
        <div className="max-w-[1014px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;