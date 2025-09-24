import React, { useState } from 'react';
import { colors } from '../../config/colors';
import { Company } from '../../types/company';

interface HeaderProps {
  userName: string;
  userRole?: string;
  companies: Company[];
  activeCompany: Company;
  onCompanySwitch: (company: Company) => void;
  onAddCompany: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  userName, 
  userRole = "Administrateur",
  companies,
  activeCompany,
  onCompanySwitch,
  onAddCompany
}) => {
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);

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
      
      {/* Section centrale - Sélecteur d'entreprise et nom d'utilisateur */}
      <div className="flex items-center gap-4">
        {/* Sélecteur d'entreprise */}
        <div className="relative">
          <button
            onClick={() => setShowCompanyDropdown(!showCompanyDropdown)}
            className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {/* Icône d'entreprise */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: colors.text.primary }}>
              <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h2v-2h2v-2h2v8zm0-10h-2v-2h2v2z"/>
            </svg>
            
            {/* Nom de l'entreprise active */}
            <span 
              className="text-sm font-semibold max-w-[120px] lg:max-w-[200px] truncate"
              style={{ color: colors.text.primary }}
            >
              {activeCompany.name}
            </span>
            
            {/* Flèche dropdown */}
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className={`transition-transform duration-200 ${showCompanyDropdown ? 'rotate-180' : ''}`}
              style={{ color: colors.text.primary }}
            >
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>

          {/* Dropdown des entreprises */}
          {showCompanyDropdown && (
            <div 
              className="absolute top-full right-0 mt-2 w-64 rounded-lg shadow-lg border border-gray-200 z-20 py-2"
              style={{ backgroundColor: colors.white }}
            >
              {/* Liste des entreprises */}
              <div className="px-3 pb-2 border-b border-gray-100">
                <span 
                  className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Mes entreprises
                </span>
              </div>
              
              <div className="max-h-48 overflow-y-auto">
                {companies.map((company) => (
                  <button
                    key={company.id}
                    onClick={() => {
                      onCompanySwitch(company);
                      setShowCompanyDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between transition-colors ${
                      activeCompany.id === company.id ? 'bg-green-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-2 h-2 rounded-full ${
                          activeCompany.id === company.id ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      />
                      <span 
                        className="text-sm font-medium truncate"
                        style={{ 
                          fontFamily: 'Montserrat, sans-serif',
                          color: activeCompany.id === company.id ? colors.primary : colors.text.primary
                        }}
                      >
                        {company.name}
                      </span>
                    </div>
                    
                    {activeCompany.id === company.id && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: colors.primary }}>
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>

              {/* Bouton ajouter entreprise */}
              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => {
                    onAddCompany();
                    setShowCompanyDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                >
                  <div 
                    className="w-2 h-2 rounded-full border-2 border-dashed"
                    style={{ borderColor: colors.primary }}
                  />
                  <span 
                    className="text-sm font-medium"
                    style={{ 
                      fontFamily: 'Montserrat, sans-serif',
                      color: colors.primary
                    }}
                  >
                    + Ajouter une entreprise
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Séparateur vertical */}
        <div 
          className="w-[1px] h-6 bg-gray-400 opacity-50 hidden sm:block"
        />

        {/* Nom d'utilisateur */}
        <div className="flex items-center gap-2">
          <span 
            className="text-lg font-bold"
            style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}
          >
            {userName}
          </span>
          
          {/* Avatar ou initiales */}
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
            style={{ backgroundColor: colors.primary }}
          >
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Overlay pour fermer le dropdown */}
      {showCompanyDropdown && (
        <div 
          className="fixed inset-0 z-10"
          onClick={() => setShowCompanyDropdown(false)}
        />
      )}
    </div>
  );
};

export default Header;