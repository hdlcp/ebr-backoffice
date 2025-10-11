// src/pages/menus/components/EditMenuModal.tsx
import React, { useState, useEffect } from 'react';
import { Menu } from '../../../types/menu';
import { colors } from '../../../config/colors';

interface EditMenuModalProps {
  menu: Menu;
  categories: string[];
  onClose: () => void;
  onSubmit: (menuId: number, data: {
    nom?: string;
    prix?: number;
    categorie?: string;
    description?: string;
    image?: File | null;
  }) => void;
  isLoading: boolean;
}

const EditMenuModal: React.FC<EditMenuModalProps> = ({ menu, categories, onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    nom: menu.nom,
    prix: menu.prix.toString(),
    categorie: menu.categorie,
    description: menu.description || '',
    image: null as File | null
  });
  const [imagePreview, setImagePreview] = useState<string>('');

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

  const handleSubmit = () => {
    const updateData: any = {};
    
    if (formData.nom !== menu.nom) updateData.nom = formData.nom;
    if (parseFloat(formData.prix) !== menu.prix) updateData.prix = parseFloat(formData.prix);
    if (formData.categorie !== menu.categorie) updateData.categorie = formData.categorie;
    if (formData.description !== (menu.description || '')) updateData.description = formData.description;
    if (formData.image) updateData.image = formData.image;

    if (Object.keys(updateData).length === 0) {
      alert('Aucune modification détectée');
      return;
    }

    onSubmit(menu.id, updateData);
  };

  const formatCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
            Modifier le menu
          </h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Image actuelle */}
          {menu.image && !imagePreview && (
            <div className="mb-4">
              <p className="text-sm font-medium mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Image actuelle :
              </p>
              <img 
                src={`http://146.190.129.166:8000/${menu.image}`}
                alt={menu.nom}
                className="w-32 h-32 rounded-lg object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/default-menu.png';
                }}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="Nom du menu"
              value={formData.nom}
              onChange={(e) => setFormData({...formData, nom: e.target.value})}
              className="w-full h-[56px] px-4 rounded-[10px] border-none outline-none"
              style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif', border: '1px solid #e5e7eb' }}
              disabled={isLoading}
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Prix (FCFA)"
              value={formData.prix}
              onChange={(e) => setFormData({...formData, prix: e.target.value})}
              className="w-full h-[56px] px-4 rounded-[10px] border-none outline-none"
              style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif', border: '1px solid #e5e7eb' }}
              disabled={isLoading}
            />
          </div>

          <div>
            <select
              value={formData.categorie}
              onChange={(e) => setFormData({...formData, categorie: e.target.value})}
              className="w-full h-[56px] px-4 rounded-[10px] border-none outline-none"
              style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif', border: '1px solid #e5e7eb' }}
              disabled={isLoading || menu.categorie === 'pack'}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{formatCategoryLabel(cat)}</option>
              ))}
            </select>
            {menu.categorie === 'pack' && (
              <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                La catégorie d'un pack ne peut pas être modifiée
              </p>
            )}
          </div>

          <div>
            <textarea
              placeholder="Description (optionnel)"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full min-h-[80px] px-4 py-3 rounded-[10px] border-none outline-none resize-y"
              style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif', border: '1px solid #e5e7eb' }}
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
                id="edit-menu-image"
                disabled={isLoading}
              />
              <label htmlFor="edit-menu-image" 
                     className="flex items-center justify-between p-4 cursor-pointer hover:bg-opacity-80">
                <span style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.secondary }}>
                  {formData.image ? formData.image.name : 'Changer l\'image (optionnel)'}
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
              </label>
            </div>
            {imagePreview && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Nouvelle image :
                </p>
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-4">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-3 rounded-lg font-semibold border-2 disabled:opacity-50"
            style={{ borderColor: colors.primary, color: colors.primary, fontFamily: 'Montserrat, sans-serif' }}
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 py-3 rounded-lg font-semibold text-white disabled:opacity-50"
            style={{ backgroundColor: colors.primary, fontFamily: 'Montserrat, sans-serif' }}
          >
            {isLoading ? 'Modification...' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMenuModal;