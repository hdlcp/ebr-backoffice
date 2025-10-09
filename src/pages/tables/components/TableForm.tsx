// src/pages/tables/components/TableForm.tsx
import React, { useState } from 'react';
import { TableFormData } from '../../../types/table';
import { colors } from '../../../config/colors';

interface TableFormProps {
  onCancel: () => void;
  onSubmit: (data: TableFormData) => void;
  isLoading: boolean;
}

const TableForm: React.FC<TableFormProps> = ({ onCancel, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<TableFormData>({
    nom: '',
    ordre: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom de la table est requis';
    }

    if (!formData.ordre) {
      newErrors.ordre = 'L\'ordre de la table est requis';
    } else if (parseInt(formData.ordre) <= 0) {
      newErrors.ordre = 'L\'ordre doit être supérieur à 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof TableFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="w-full max-w-[994px] mx-auto mt-4 lg:mt-8">
      <h2 
        className="text-xl lg:text-2xl font-bold text-center mb-6 lg:mb-8"
        style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}
      >
        AJOUT D'UNE TABLE
      </h2>

      <div className="space-y-4">
        {/* Nom de la table */}
        <div>
          <input
            type="text"
            placeholder="Entrez le nom de la table (ex: Table 1)"
            value={formData.nom}
            onChange={(e) => handleInputChange('nom', e.target.value)}
            className={`w-full h-[56px] px-4 rounded-[10px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all duration-200 ${
              errors.nom ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
            }`}
            style={{ 
              backgroundColor: colors.white,
              fontFamily: 'Montserrat, sans-serif'
            }}
            disabled={isLoading}
          />
          {errors.nom && (
            <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {errors.nom}
            </p>
          )}
        </div>

        {/* Ordre de la table */}
        <div>
          <select
            value={formData.ordre}
            onChange={(e) => handleInputChange('ordre', e.target.value)}
            className={`w-full h-[56px] px-4 rounded-[10px] border-none outline-none text-gray-800 transition-all duration-200 ${
              errors.ordre ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
            }`}
            style={{ 
              backgroundColor: colors.white,
              fontFamily: 'Montserrat, sans-serif'
            }}
            disabled={isLoading}
          >
            <option value="" disabled>Choisissez l'ordre de la table</option>
            {[...Array(20)].map((_, i) => {
              const num = i + 1;
              return (
                <option key={num} value={num}>Ordre {num}</option>
              );
            })}
          </select>
          {errors.ordre && (
            <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {errors.ordre}
            </p>
          )}
        </div>

        {/* Boutons */}
        <div className="flex flex-col lg:flex-row gap-4 pt-4">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full lg:flex-1 h-[56px] rounded-[10px] text-white font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{
              backgroundColor: colors.primary,
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            {isLoading ? 'AJOUT EN COURS...' : 'AJOUTER'}
          </button>
          
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="w-full lg:w-auto lg:px-8 h-[56px] rounded-[10px] font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{
              backgroundColor: colors.danger,
              fontFamily: 'Montserrat, sans-serif',
              color: colors.text.white
            }}
          >
            ANNULER
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableForm;