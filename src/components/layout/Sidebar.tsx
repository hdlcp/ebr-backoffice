// src/components/layout/Sidebar.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Users, Menu, Settings, BarChart3, LayoutDashboard, LogOut } from 'lucide-react';
import { colors } from '../../config/colors';
import { authUtils } from '../../utils/authUtils';

// Interface pour les éléments du menu
interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

// Configuration des menus de la sidebar
const menuItems: MenuItem[] = [
  { id: "dashboard", label: "TABLEAU DE BORD", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
  { id: "employees", label: "GESTION DES EMPLOYÉS", icon: <Users size={20} />, path: "/employees" },
  { id: "menus", label: "GESTION DES MENUS", icon: <Menu size={20} />, path: "/menus" },
  { id: "tables", label: "GESTION DES TABLES", icon: <Settings size={20} />, path: "/tables" },
  { id: "stats", label: "VOIR LES STATS", icon: <BarChart3 size={20} />, path: "/stats" }
];

interface SidebarProps {
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Déterminer le menu actif basé sur l'URL actuelle
  const activeMenu = menuItems.find(item => item.path === location.pathname)?.id || 'dashboard';

  const handleMenuClick = (item: MenuItem) => {
    navigate(item.path);
  };

  const handleLogout = () => {
    // Nettoyer le localStorage
    authUtils.logout();
    
    // Appeler la fonction de déconnexion du parent si elle existe
    if (onLogout) {
      onLogout();
    }
    
    // Rediriger vers la page de connexion
    navigate('/login');
  };

  return (
    <>
      {/* Version Desktop - Sidebar fixe */}
      <div 
        className="fixed left-0 top-0 h-screen w-[236px] flex flex-col py-6 z-10 lg:block hidden"
        style={{ backgroundColor: colors.container }}
      >
        {/* Logo - Centré horizontalement */}
        <div className="mb-8 w-full flex justify-center">
          <div className="w-[148px] h-[148px] flex items-center justify-center">
            <img 
              src="/logos/logo_ebr.png" 
              alt="eBR Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
        </div>

        {/* Menu Items - Centrés */}
        <div className="flex flex-col gap-3 items-center px-4 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item)}
              className={`
                w-[182px] h-[45px] rounded-[20px] flex items-center justify-start gap-3 px-4
                text-sm font-medium transition-all duration-200 relative hover:opacity-80
                ${activeMenu === item.id ? 'text-gray-700' : 'text-gray-600 hover:text-gray-700'}
              `}
              style={{ 
                backgroundColor: colors.white,
                fontFamily: 'Montserrat, sans-serif',
                borderLeft: activeMenu === item.id ? `5px solid ${colors.primary}` : 'none'
              }}
            >
              {item.icon}
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          ))}

          {/* Bouton de déconnexion - en bas */}
          <div className="mt-auto pt-4">
            <button
              onClick={handleLogout}
              className="w-[182px] h-[45px] rounded-[20px] flex items-center justify-start gap-3 px-4
                text-sm font-medium transition-all duration-200 relative hover:opacity-80
                text-gray-600 hover:text-gray-700"
              style={{ 
                backgroundColor: colors.white,
                fontFamily: 'Montserrat, sans-serif'
              }}
            >
              <LogOut size={20} />
              <span className="text-xs font-semibold">DÉCONNEXION</span>
            </button>
          </div>
        </div>
      </div>

      {/* Version mobile - Bottom navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-20">
        <div 
          className="h-16 flex items-center justify-around px-4"
          style={{ backgroundColor: colors.container }}
        >
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item)}
              className={`
                flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors
                ${activeMenu === item.id ? 'text-gray-700' : 'text-gray-600'}
              `}
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {item.icon}
              <span className="text-xs font-medium text-center leading-tight">
                {item.label.split(' ')[1] || item.label.split(' ')[0]}
              </span>
            </button>
          ))}
          
          {/* Bouton déconnexion mobile */}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors text-gray-600"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <LogOut size={20} />
            <span className="text-xs font-medium text-center leading-tight">DÉCO</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;