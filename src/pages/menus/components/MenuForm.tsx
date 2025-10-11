// src/pages/menus/components/MenuForm.tsx
import React, { useState, useEffect } from 'react';
import { MenuFormData } from '../../../types/menu';
import { menuService } from '../../../services/api/menuService';
import { colors } from '../../../config/colors';

interface MenuFormProps {
  onCancel: () => void;
  onSubmit: (data: MenuFormData) => void;
  isLoading: boolean;
}

const MenuForm: React.FC<MenuFormProps> = ({ onCancel, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<MenuFormData>({
    nom: '',
    prix: '',
    categorie: '',
    image: null,
    description: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Charger les catégories au montage
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await menuService.getCategories();
      if (response.data) {
        // Filtrer pour exclure "pack" des catégories normales
        const filteredCategories = response.data.filter(cat => cat.toLowerCase() !== 'pack');
        setCategories(filteredCategories);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des catégories:', err);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.prix || parseFloat(formData.prix) <= 0) newErrors.prix = 'Le prix doit être supérieur à 0';
    if (!formData.categorie) newErrors.categorie = 'La catégorie est requise';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const formatCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="w-full max-w-[994px] mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-8"
          style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
        AJOUT D'UN MENU
      </h2>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Nom du menu"
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
            placeholder="Prix (FCFA)"
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
            className={`w-full h-[56px] px-4 rounded-[10px] border-none outline-none ${
              errors.categorie ? 'ring-2 ring-red-500' : ''
            }`}
            style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}
            disabled={isLoading || loadingCategories}>
            <option value="">
              {loadingCategories ? 'Chargement des catégories...' : 'Choisissez la catégorie'}
            </option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{formatCategoryLabel(cat)}</option>
            ))}
          </select>
          {errors.categorie && <p className="text-red-500 text-sm mt-1">{errors.categorie}</p>}
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

        <div>
          <div className="w-full rounded-[10px] overflow-hidden"
               style={{ backgroundColor: colors.container }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="menu-image"
              disabled={isLoading}
            />
            <label htmlFor="menu-image" 
                   className="flex items-center justify-between p-4 cursor-pointer hover:bg-opacity-80">
              <span style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.secondary }}>
                {formData.image ? formData.image.name : 'Importez une image du menu'}
              </span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
            </label>
          </div>
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
            </div>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button onClick={handleSubmit}
                  disabled={isLoading || loadingCategories}
                  className="flex-1 h-[56px] rounded-[10px] text-white font-bold text-lg disabled:opacity-50"
                  style={{ backgroundColor: colors.primary, fontFamily: 'Montserrat, sans-serif' }}>
            {isLoading ? 'AJOUT EN COURS...' : 'AJOUTER'}
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


export default MenuForm;