// src/components/layout/Layout.tsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { colors } from '../../config/colors';

interface LayoutProps {
  children: React.ReactNode;
  userName: string;
  userRole?: string;
  currentPage: string; // Page actuelle
  onNavigate: (page: string) => void; // Fonction de navigation
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  userName, 
  userRole = "Administrateur",
  currentPage,
  onNavigate
}) => {
  const handleMenuChange = (menuId: string) => {
    console.log(`Navigation vers: ${menuId}`);
    onNavigate(menuId); // Déclenche la navigation dans le composant parent
  };

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: colors.background.primary }}
    >
      {/* Sidebar */}
      <Sidebar 
        activeMenu={currentPage} 
        onMenuChange={handleMenuChange} 
      />
      
      {/* Header */}
      <Header userName={userName} userRole={userRole} />
      
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