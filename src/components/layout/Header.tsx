// src/components/layout/Header.tsx
import React from 'react';
import { colors } from '../../config/colors';

interface HeaderProps {
  userName: string;
  userRole?: string;
}

const Header: React.FC<HeaderProps> = ({ userName, userRole = "Administrateur" }) => {
  return (
    <div 
      className="fixed top-2 left-4 lg:left-[254px] right-4 h-[52px] rounded-[10px] flex items-center justify-between px-6 z-10"
      style={{ backgroundColor: colors.container }}
    >
      {/* Informations utilisateur à gauche */}
      <div className="flex items-center gap-2">
        <span 
          className="text-sm font-medium hidden sm:block"
          style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}
        >
          Bienvenue / {userRole}
        </span>
        <span 
          className="text-sm font-medium sm:hidden"
          style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}
        >
          Bienvenue
        </span>
      </div>
      
      {/* Nom d'utilisateur à droite */}
      <div className="flex items-center gap-3">
        <span 
          className="text-lg font-bold"
          style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}
        >
          {userName}
        </span>
      </div>
    </div>
  );
};

export default Header;