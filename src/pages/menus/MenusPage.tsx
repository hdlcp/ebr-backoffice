// src/pages/menus/MenusPage.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import MenuForm from './components/MenuForm';
import PackForm from './components/PackForm';
import MenuList from './components/MenuList';
import PackDetailsModal from './components/PackDetailsModal';
import EditMenuModal from './components/EditMenuModal';
import { CommonPageProps } from '../../types/common';
import { Menu, MenuFormData, PackFormData } from '../../types/menu';
import { menuService } from '../../services/api/menuService';
import { colors } from '../../config/colors';

type ViewMode = 'list' | 'add-menu' | 'add-pack';

const MenusPage: React.FC<CommonPageProps> = ({ 
  userName,
  userRole,
  companies,
  activeCompany,
  onCompanySwitch,
  onAddCompany,
  onLogout
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [activeTab, setActiveTab] = useState<string>('tous');
  const [menus, setMenus] = useState<Menu[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [error, setError] = useState('');
  const [selectedPackId, setSelectedPackId] = useState<number | null>(null);
  const [selectedMenuForEdit, setSelectedMenuForEdit] = useState<Menu | null>(null);

  useEffect(() => {
    loadMenus();
    loadCategories();
  }, [activeCompany]);

  const loadCategories = async () => {
    try {
      const response = await menuService.getCategories();
      if (response.data) {
        setCategories(response.data);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des catégories:', err);
    }
  };

  const loadMenus = async () => {
    setIsLoadingList(true);
    setError('');
    
    try {
      const entrepriseId = activeCompany.id;
      const response = await menuService.getMenus(entrepriseId);

      if (response.data) {
        const activeMenus = response.data.filter(m => m.status !== -1);
        setMenus(activeMenus);
      } else if (response.error) {
        setError(response.error);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des menus:', err);
      setError('Erreur lors du chargement des menus');
    } finally {
      setIsLoadingList(false);
    }
  };

  const handleAddMenu = async (formData: MenuFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await menuService.createMenu({
        nom: formData.nom,
        prix: parseFloat(formData.prix),
        categorie: formData.categorie,
        image: formData.image,
        entreprise_id: activeCompany.id,
        description: formData.description
      });

      if (response.data) {
        setMenus([...menus, response.data]);
        setViewMode('list');
        alert(`Menu "${response.data.nom}" ajouté avec succès!`);
      } else if (response.error) {
        alert(`Erreur: ${response.error}`);
      }
    } catch (err) {
      console.error('Erreur lors de l\'ajout:', err);
      alert('Erreur lors de l\'ajout du menu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePack = async (formData: PackFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const menuIds = formData.selectedMenus.map(m => m.id);
      
      const response = await menuService.createPack({
        nom: formData.nom,
        prix: parseFloat(formData.prix),
        categorie: 'pack',
        image: null,
        entreprise_id: activeCompany.id,
        description: formData.description,
        menus: menuIds
      });

      if (response.data) {
        setMenus([...menus, response.data]);
        setViewMode('list');
        alert(`Pack "${response.data.nom}" créé avec succès!`);
      } else if (response.error) {
        alert(`Erreur: ${response.error}`);
      }
    } catch (err) {
      console.error('Erreur lors de la création:', err);
      alert('Erreur lors de la création du pack');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (menuId: number, currentStatus: number) => {
    try {
      const isActive = currentStatus === 1;
      const response = isActive 
        ? await menuService.deactivateMenu(menuId)
        : await menuService.activateMenu(menuId);

      if (response.data || response.statusCode === 200) {
        setMenus(menus.map(m => 
          m.id === menuId ? { ...m, status: isActive ? -1 : 1 } : m
        ));
        alert(response.data?.detail || (isActive ? 'Menu désactivé' : 'Menu activé'));
      } else if (response.error) {
        alert(`Erreur: ${response.error}`);
      }
    } catch (err) {
      console.error('Erreur:', err);
      alert('Erreur lors du changement de statut');
    }
  };

  const handleEdit = (menuId: number) => {
    const menu = menus.find(m => m.id === menuId);
    if (menu) {
      setSelectedMenuForEdit(menu);
    }
  };

  const handleEditSubmit = async (menuId: number, updateData: any) => {
    setIsLoading(true);

    try {
      const response = await menuService.updateMenu(menuId, updateData);

      if (response.data || response.statusCode === 200) {
        await loadMenus();
        setSelectedMenuForEdit(null);
        alert('Menu modifié avec succès!');
      } else if (response.error) {
        alert(`Erreur: ${response.error}`);
      }
    } catch (err) {
      console.error('Erreur lors de la modification:', err);
      alert('Erreur lors de la modification du menu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (menuId: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce menu ?')) {
      return;
    }

    try {
      const response = await menuService.deleteMenu(menuId);

      if (response.statusCode === 200 || response.data) {
        setMenus(menus.filter(m => m.id !== menuId));
        alert('Menu supprimé avec succès');
      } else if (response.error) {
        alert(`Erreur: ${response.error}`);
      }
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert('Erreur lors de la suppression du menu');
    }
  };

  const handleViewPackDetails = (packId: number) => {
    setSelectedPackId(packId);
  };

  const filteredMenus = activeTab === 'tous' 
    ? menus 
    : menus.filter(menu => menu.categorie === activeTab);

  const tabs = [
    { key: 'tous', label: 'TOUS' },
    ...categories.map(cat => ({
      key: cat,
      label: cat.toUpperCase()
    }))
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar onLogout={onLogout} />
      <Header 
        userName={userName}
        userRole={userRole}
        companies={companies}
        activeCompany={activeCompany}
        onCompanySwitch={onCompanySwitch}
      />
      
      <div className="ml-0 lg:ml-[236px] mt-[68px] p-6">
        {viewMode === 'list' && (
          <>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
              <h1 className="text-2xl font-bold"
                  style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
                GESTION DES MENUS
              </h1>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <button onClick={() => setViewMode('add-pack')}
                        className="px-6 h-[46px] rounded-[20px] font-bold text-sm hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: colors.container, fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
                  CRÉER UN PACK +
                </button>
                <button onClick={() => setViewMode('add-menu')}
                        className="px-6 h-[46px] rounded-[20px] font-bold text-sm hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: colors.container, fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
                  AJOUTER UN MENU +
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {error}
              </div>
            )}

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-2 rounded-[20px] font-semibold text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.key ? 'text-white' : 'text-gray-700 hover:opacity-80'
                  }`}
                  style={{
                    backgroundColor: activeTab === tab.key ? colors.primary : colors.white,
                    fontFamily: 'Montserrat, sans-serif'
                  }}>
                  {tab.label}
                </button>
              ))}
            </div>

            {isLoadingList ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <MenuList 
                menus={filteredMenus}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
                onViewPackDetails={handleViewPackDetails}
              />
            )}
          </>
        )}

        {viewMode === 'add-menu' && (
          <MenuForm 
            onCancel={() => setViewMode('list')}
            onSubmit={handleAddMenu}
            isLoading={isLoading}
          />
        )}

        {viewMode === 'add-pack' && (
          <PackForm 
            menus={menus}
            onCancel={() => setViewMode('list')}
            onSubmit={handleCreatePack}
            isLoading={isLoading}
          />
        )}
      </div>

      {selectedPackId && (
        <PackDetailsModal 
          packId={selectedPackId}
          onClose={() => setSelectedPackId(null)}
        />
      )}

      {selectedMenuForEdit && (
        <EditMenuModal 
          menu={selectedMenuForEdit}
          categories={categories}
          onClose={() => setSelectedMenuForEdit(null)}
          onSubmit={handleEditSubmit}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default MenusPage;