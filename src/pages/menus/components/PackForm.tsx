// src/pages/menus/components/PackForm.tsx
import React, { useState } from 'react';
import { Menu, PackFormData } from '../../../types/menu';
import { colors } from '../../../config/colors';

interface PackFormProps {
  menus: Menu[];
  onCancel: () => void;
  onSubmit: (data: PackFormData) => void;
  isLoading: boolean;
}

const PackForm: React.FC<PackFormProps> = ({ menus, onCancel, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<PackFormData>({
    selectedMenus: [],
    nom: '',
    prix: '',
    categorie: 'pack',
    description: ''
  });
  const [showMenuSelector, setShowMenuSelector] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Filtrer uniquement les menus actifs (pas les packs)
  const availableMenus = menus.filter(m => m.status === 1 && m.categorie !== 'pack');

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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nom.trim()) newErrors.nom = 'Le nom du pack est requis';
    if (!formData.prix || parseFloat(formData.prix) <= 0) newErrors.prix = 'Le prix doit être supérieur à 0';
    if (formData.selectedMenus.length === 0) newErrors.menus = 'Sélectionnez au moins un menu';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
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
            disabled={isLoading}
            className={`w-full h-[56px] px-4 rounded-[10px] border-none outline-none flex items-center justify-between ${
              errors.menus ? 'ring-2 ring-red-500' : ''
            }`}
            style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}>
            <span>
              {formData.selectedMenus.length > 0 
                ? `${formData.selectedMenus.length} menu(s) sélectionné(s)`
                : 'Choisissez les menus'
              }
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"
                 className={`transition-transform ${showMenuSelector ? 'rotate-180' : ''}`}>
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>
          
          {showMenuSelector && (
            <>
              <div 
                className="fixed inset-0 z-10"
                onClick={() => setShowMenuSelector(false)}
              />
              <div className="absolute top-full left-0 right-0 mt-1 rounded-[10px] max-h-64 overflow-y-auto z-20 shadow-lg"
                   style={{ backgroundColor: colors.container }}>
                {availableMenus.length === 0 ? (
                  <div className="p-4 text-center text-gray-500"
                       style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Aucun menu disponible
                  </div>
                ) : (
                  availableMenus.map(menu => (
                    <div key={menu.id} 
                         className="flex items-center justify-between p-3 hover:bg-opacity-80 cursor-pointer border-b border-gray-200 last:border-b-0"
                         onClick={() => handleMenuSelect(menu)}>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={!!formData.selectedMenus.find(m => m.id === menu.id)}
                          onChange={() => {}}
                          className="w-4 h-4"
                        />
                        <span style={{ fontFamily: 'Montserrat, sans-serif' }}>{menu.nom}</span>
                      </div>
                      <span className="font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {menu.prix} FCFA
                      </span>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
          {errors.menus && <p className="text-red-500 text-sm mt-1">{errors.menus}</p>}
        </div>

        {/* Menus sélectionnés */}
        {formData.selectedMenus.length > 0 && (
          <div className="p-4 rounded-lg" style={{ backgroundColor: colors.container }}>
            <p className="text-sm font-semibold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Menus sélectionnés :
            </p>
            <div className="flex flex-wrap gap-2">
              {formData.selectedMenus.map(menu => (
                <span key={menu.id} 
                      className="px-3 py-1 bg-green-600 text-white rounded-full text-sm flex items-center gap-2"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {menu.nom}
                  <button
                    onClick={() => handleMenuSelect(menu)}
                    className="hover:text-red-200 font-bold">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div>
          <input
            type="text"
            placeholder="Nom du pack"
            value={formData.nom}
            onChange={(e) => setFormData({...formData, nom: e.target.value})}
            className={`w-full h-[56px] px-4 rounded-[10px] border-none outline-none ${
              errors.nom ? 'ring-2 ring-red-500' : ''
            }`}
            style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}
            disabled={isLoading}
          />
          {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
        </div>

        <div>
          <input
            type="number"
            placeholder="Prix du pack (FCFA)"
            value={formData.prix}
            onChange={(e) => setFormData({...formData, prix: e.target.value})}
            className={`w-full h-[56px] px-4 rounded-[10px] border-none outline-none ${
              errors.prix ? 'ring-2 ring-red-500' : ''
            }`}
            style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}
            disabled={isLoading}
          />
          {errors.prix && <p className="text-red-500 text-sm mt-1">{errors.prix}</p>}
        </div>

        <div>
          <select
            value={formData.categorie}
            onChange={(e) => setFormData({...formData, categorie: e.target.value})}
            className="w-full h-[56px] px-4 rounded-[10px] border-none outline-none"
            style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}
            disabled={isLoading}>
            <option value="pack">Pack</option>
          </select>
        </div>

        <div>
          <textarea
            placeholder="Description (optionnel)"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full min-h-[80px] px-4 py-3 rounded-[10px] border-none outline-none resize-y"
            style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}
            disabled={isLoading}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 h-[56px] rounded-[10px] text-white font-bold text-lg disabled:opacity-50"
                  style={{ backgroundColor: colors.primary, fontFamily: 'Montserrat, sans-serif' }}>
            {isLoading ? 'CRÉATION EN COURS...' : 'CRÉER LE PACK'}
          </button>
          <button onClick={onCancel}
                  disabled={isLoading}
                  className="px-8 h-[56px] rounded-[10px] font-bold text-lg disabled:opacity-50"
                  style={{ backgroundColor: colors.danger, fontFamily: 'Montserrat, sans-serif', color: colors.text.white }}>
            ANNULER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackForm;