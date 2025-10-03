import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import { CommonPageProps } from '../../types/common';
import { Menu, MenuCategory } from '../../types/menu';
import { colors } from '../../config/colors';

// Données d'exemple pour les menus
const initialMenus: Menu[] = [
  {
    id: '1',
    name: 'Riz au gras',
    price: 1000,
    category: 'repas',
    image: '/images/riz.png',
    isAvailable: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '2', 
    name: 'La Béninoise',
    price: 1000,
    category: 'boissons',
    image: '/images/beninoise.png',
    isAvailable: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '3',
    name: 'Flag',
    price: 800,
    category: 'boissons',
    image: '/images/flag.png',
    isAvailable: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '4',
    name: 'Kom et moyo',
    price: 2500,
    category: 'repas',
    image: '/images/moyo.png',
    isAvailable: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
];

// Composant pour un élément de menu
const MenuCard: React.FC<{
  menu: Menu;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ menu, onEdit, onDelete }) => {
  return (
    <div className="w-full max-w-[994px] h-[79px] rounded-[10px] flex items-center justify-between px-6 mx-auto"
         style={{ backgroundColor: colors.white }}>
      
      {/* Image et informations du menu */}
      <div className="flex items-center gap-4">
        <img 
          src={menu.image} 
          alt={menu.name}
          className="w-[60px] h-[60px] rounded-lg object-cover"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-base" 
                style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
            {menu.name}
          </span>
          <span className="text-sm"
                style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.secondary }}>
            {menu.price} fcfa
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Icône de modification */}
        <button onClick={() => onEdit(menu.id)}
                className="w-[30px] h-[30px] flex items-center justify-center text-orange-500 hover:text-orange-600 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>

        {/* Icône de suppression */}
        <button onClick={() => onDelete(menu.id)}
                className="w-[30px] h-[30px] flex items-center justify-center text-red-500 hover:text-red-600 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

// Composant Formulaire d'ajout de menu
const MenuForm: React.FC<{
  onCancel: () => void;
  onSubmit: (menu: Omit<Menu, 'id' | 'isAvailable' | 'createdAt' | 'updatedAt'>) => void;
}> = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '' as '' | 'boissons' | 'repas',
    image: null as File | null
  });

  const handleSubmit = () => {
    if (formData.name && formData.price && formData.category) {
      onSubmit({
        name: formData.name,
        price: parseInt(formData.price),
        category: formData.category
      });
    }
  };

  return (
    <div className="w-full max-w-[994px] mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-8"
          style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
        AJOUT D'UN MENU
      </h2>

      <div className="space-y-4">
        {/* Nom du menu */}
        <input
          type="text"
          placeholder="Entrez le nom du menu"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full h-[56px] px-4 rounded-[10px] border-none outline-none text-gray-800 placeholder-gray-500"
          style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}
        />

        {/* Prix du menu */}
        <input
          type="number"
          placeholder="Entrez le prix du menu"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})}
          className="w-full h-[56px] px-4 rounded-[10px] border-none outline-none text-gray-800 placeholder-gray-500"
          style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}
        />

        {/* Catégorie */}
        <select
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value as 'boissons' | 'repas'})}
          className="w-full h-[56px] px-4 rounded-[10px] border-none outline-none text-gray-800"
          style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}>
          <option value="">Choisissez la catégorie</option>
          <option value="boissons">Boissons</option>
          <option value="repas">Repas</option>
        </select>

        {/* Upload d'image */}
        <div className="w-full h-[56px] rounded-[10px] flex items-center px-4"
             style={{ backgroundColor: colors.container }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})}
            className="hidden"
            id="menu-image"
          />
          <label htmlFor="menu-image" 
                 className="flex items-center justify-between w-full cursor-pointer">
            <span style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.secondary }}>
              Importez une image du menu
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
          </label>
        </div>

        {/* Boutons */}
        <div className="flex gap-4 pt-4">
          <button onClick={handleSubmit}
                  className="flex-1 h-[56px] rounded-[10px] text-white font-bold text-lg"
                  style={{ backgroundColor: colors.primary, fontFamily: 'Montserrat, sans-serif' }}>
            AJOUTER
          </button>
          <button onClick={onCancel}
                  className="px-8 h-[56px] rounded-[10px] font-bold text-lg"
                  style={{ backgroundColor: colors.danger, fontFamily: 'Montserrat, sans-serif', color: colors.text.white }}>
            ANNULER
          </button>
        </div>
      </div>
    </div>
  );
};

// Composant Formulaire de création de pack
const PackForm: React.FC<{
  menus: Menu[];
  onCancel: () => void;
  onSubmit: (pack: any) => void;
}> = ({ menus, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    selectedMenus: [] as Menu[],
    name: '',
    price: '',
    category: ''
  });
  const [showMenuSelector, setShowMenuSelector] = useState(false);

  const handleMenuSelect = (menu: Menu) => {
    const isSelected = formData.selectedMenus.find(m => m.id === menu.id);
    if (isSelected) {
      setFormData({
        ...formData,
        selectedMenus: formData.selectedMenus.filter(m => m.id !== menu.id)
      });
    } else {
      setFormData({
        ...formData,
        selectedMenus: [...formData.selectedMenus, menu]
      });
    }
  };

  const handleSubmit = () => {
    if (formData.name && formData.price && formData.category && formData.selectedMenus.length > 0) {
      onSubmit({
        name: formData.name,
        price: parseInt(formData.price),
        category: formData.category,
        menus: formData.selectedMenus
      });
    }
  };

  return (
    <div className="w-full max-w-[994px] mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-8"
          style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
        CRÉATION D'UN PACK
      </h2>

      <div className="space-y-4">
        {/* Sélection des menus */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMenuSelector(!showMenuSelector)}
            className="w-full h-[56px] px-4 rounded-[10px] border-none outline-none text-gray-800 flex items-center justify-between"
            style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}>
            <span>
              {formData.selectedMenus.length > 0 
                ? `${formData.selectedMenus.length} menu(s) sélectionné(s)`
                : 'Choisissez les menus'
              }
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>
          
          {showMenuSelector && (
            <div className="absolute top-full left-0 right-0 mt-1 rounded-[10px] max-h-48 overflow-y-auto z-20"
                 style={{ backgroundColor: colors.container }}>
              {menus.map(menu => (
                <div key={menu.id} 
                     className="flex items-center justify-between p-3 hover:bg-opacity-80 cursor-pointer"
                     onClick={() => handleMenuSelect(menu)}>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!formData.selectedMenus.find(m => m.id === menu.id)}
                      onChange={() => {}}
                      className="w-4 h-4"
                    />
                    <span style={{ fontFamily: 'Montserrat, sans-serif' }}>{menu.name}</span>
                  </div>
                  <span style={{ fontFamily: 'Montserrat, sans-serif' }}>{menu.price} fcfa</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nom du pack */}
        <input
          type="text"
          placeholder="Entrez le nom du pack"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full h-[56px] px-4 rounded-[10px] border-none outline-none text-gray-800 placeholder-gray-500"
          style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}
        />

        {/* Prix du pack */}
        <input
          type="number"
          placeholder="Entrez le prix du pack"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})}
          className="w-full h-[56px] px-4 rounded-[10px] border-none outline-none text-gray-800 placeholder-gray-500"
          style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}
        />

        {/* Catégorie du pack */}
        <select
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          className="w-full h-[56px] px-4 rounded-[10px] border-none outline-none text-gray-800"
          style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}>
          <option value="">Choisissez la catégorie</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="breakfast">Breakfast</option>
          <option value="special">Special</option>
        </select>

        {/* Boutons */}
        <div className="flex gap-4 pt-4">
          <button onClick={handleSubmit}
                  className="flex-1 h-[56px] rounded-[10px] text-white font-bold text-lg"
                  style={{ backgroundColor: colors.primary, fontFamily: 'Montserrat, sans-serif' }}>
            CRÉER
          </button>
          <button onClick={onCancel}
                  className="px-8 h-[56px] rounded-[10px] font-bold text-lg"
                  style={{ backgroundColor: colors.danger, fontFamily: 'Montserrat, sans-serif', color: colors.text.white }}>
            ANNULER
          </button>
        </div>
      </div>
    </div>
  );
};

// Composant principal de la page
const MenusPage: React.FC<CommonPageProps> = ({ 
  userName,
  userRole,
  companies,
  activeCompany,
  onCompanySwitch,
  onAddCompany,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'tous' | 'boissons' | 'repas'>('tous');
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [showPackForm, setShowPackForm] = useState(false);
  const [menus, setMenus] = useState<Menu[]>(initialMenus);

  const filteredMenus = activeTab === 'tous' 
    ? menus 
    : menus.filter(menu => menu.category === activeTab);

  const handleAddMenu = (newMenu: Omit<Menu, 'id' | 'isAvailable' | 'createdAt' | 'updatedAt'>) => {
    const menu: Menu = {
      ...newMenu,
      id: Date.now().toString(),
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setMenus([...menus, menu]);
    setShowMenuForm(false);
  };

  const handleCreatePack = (packData: any) => {
    console.log('Création du pack:', packData);
    setShowPackForm(false);
  };

  const handleEdit = (id: string) => {
    console.log('Modifier menu:', id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce menu ?')) {
      setMenus(menus.filter(menu => menu.id !== id));
    }
  };

  if (showMenuForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar onLogout={onLogout} />
        <Header 
          userName={userName}
          userRole={userRole}
          companies={companies}
          activeCompany={activeCompany}
          onCompanySwitch={onCompanySwitch}
          onAddCompany={onAddCompany}
        />
        <div className="ml-0 lg:ml-[236px] mt-[68px] p-6">
          <MenuForm onCancel={() => setShowMenuForm(false)} onSubmit={handleAddMenu} />
        </div>
      </div>
    );
  }

  if (showPackForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar onLogout={onLogout} />
        <Header 
          userName={userName}
          userRole={userRole}
          companies={companies}
          activeCompany={activeCompany}
          onCompanySwitch={onCompanySwitch}
          onAddCompany={onAddCompany}
        />
        <div className="ml-0 lg:ml-[236px] mt-[68px] p-6">
          <PackForm menus={menus} onCancel={() => setShowPackForm(false)} onSubmit={handleCreatePack} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar onLogout={onLogout} />
      <Header 
        userName={userName}
        userRole={userRole}
        companies={companies}
        activeCompany={activeCompany}
        onCompanySwitch={onCompanySwitch}
        onAddCompany={onAddCompany}
      />
      
      <div className="ml-0 lg:ml-[236px] mt-[68px] p-6">
        {/* En-tête avec boutons */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl font-bold"
              style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
            GESTION DES MENUS
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button onClick={() => setShowPackForm(true)}
                    className="px-6 h-[46px] rounded-[20px] font-bold text-sm"
                    style={{ backgroundColor: colors.container, fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
              CRÉER UN PACK +
            </button>
            <button onClick={() => setShowMenuForm(true)}
                    className="px-6 h-[46px] rounded-[20px] font-bold text-sm"
                    style={{ backgroundColor: colors.container, fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
              AJOUTER UN MENU +
            </button>
          </div>
        </div>

        {/* Onglets de filtrage */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'tous', label: 'TOUS' },
            { key: 'boissons', label: 'BOISSONS' },
            { key: 'repas', label: 'REPAS' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-6 py-2 rounded-[20px] font-semibold text-sm transition-colors ${
                activeTab === tab.key ? 'text-white' : 'text-gray-700'
              }`}
              style={{
                backgroundColor: activeTab === tab.key ? colors.primary : colors.white,
                fontFamily: 'Montserrat, sans-serif'
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Liste des menus */}
        <div className="space-y-4">
          {filteredMenus.map(menu => (
            <MenuCard key={menu.id} menu={menu} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenusPage;