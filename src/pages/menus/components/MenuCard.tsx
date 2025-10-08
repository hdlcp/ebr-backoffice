// src/pages/menus/components/MenuCard.tsx
import React from 'react';
import { Menu } from '../../../types/menu';
import { colors } from '../../../config/colors';

interface MenuCardProps {
  menu: Menu;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, currentStatus: number) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, onEdit, onDelete, onToggleStatus }) => {
  const isActive = menu.status === 1;
  const imageUrl = menu.image ? `http://146.190.129.166:8000/${menu.image}` : '/images/default-menu.png';

  return (
    <div className="w-full max-w-[994px] rounded-[10px] flex items-center justify-between px-6 py-4 mx-auto"
         style={{ backgroundColor: colors.white }}>
      
      <div className="flex items-center gap-4 flex-1">
        <img 
          src={imageUrl} 
          alt={menu.nom}
          className="w-[60px] h-[60px] rounded-lg object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/default-menu.png';
          }}
        />
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-base" 
                  style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
              {menu.nom}
            </span>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
              isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {isActive ? 'Actif' : 'Inactif'}
            </span>
            {menu.categorie === 'pack' && (
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">
                Pack
              </span>
            )}
          </div>
          <span className="text-sm font-semibold"
                style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.secondary }}>
            {menu.prix} FCFA
          </span>
          {menu.description && (
            <span className="text-xs text-gray-500 mt-1 line-clamp-1">
              {menu.description}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggleStatus(menu.id, menu.status)}
          className={`px-3 py-1.5 rounded-lg text-white text-xs font-semibold ${
            isActive ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'
          }`}
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {isActive ? 'Désactiver' : 'Activer'}
        </button>

        <button onClick={() => onEdit(menu.id)}
                className="w-[30px] h-[30px] flex items-center justify-center text-orange-500 hover:text-orange-600"
                title="Modifier">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>

        <button onClick={() => onDelete(menu.id)}
                className="w-[30px] h-[30px] flex items-center justify-center text-red-500 hover:text-red-600"
                title="Supprimer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MenuCard;