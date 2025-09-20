// src/components/layout/Layout.tsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { colors } from '../../config/colors';

interface LayoutProps {
  children: React.ReactNode;
  userName: string;
  userRole?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, userName, userRole = "Administrateur" }) => {
  const [activeMenu, setActiveMenu] = useState('employees');

  const handleMenuChange = (menuId: string) => {
    setActiveMenu(menuId);
    // Ici vous pourrez ajouter la logique de navigation/routing plus tard
    console.log('Navigation vers:', menuId);
  };

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: colors.background.primary }}
    >
      {/* Sidebar */}
      <Sidebar activeMenu={activeMenu} onMenuChange={handleMenuChange} />
      
      {/* Header */}
      <Header userName={userName} userRole={userRole} />
      
      {/* Contenu principal */}
      <main className="lg:ml-[250px] pt-[70px] lg:pt-[70px] px-4 lg:px-6 pb-20 lg:pb-8 min-h-screen">
        <div className="max-w-[1014px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;