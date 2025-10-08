// src/pages/menus/components/MenuList.tsx
import React from 'react';
import MenuCard from './MenuCard';
import { Menu } from '../../../types/menu';

interface MenuListProps {
  menus: Menu[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, currentStatus: number) => void;
}

const MenuList: React.FC<MenuListProps> = ({ menus, onEdit, onDelete, onToggleStatus }) => {
  if (menus.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg">
        <p className="text-gray-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Aucun menu trouvé. Cliquez sur "AJOUTER UN MENU +" pour en créer un.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {menus.map(menu => (
        <MenuCard
          key={menu.id}
          menu={menu}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
};

export default MenuList;