// src/pages/employees/components/EmployeeForm.tsx
import React, { useState } from 'react';
import { Employee, EmployeeFormData } from '../../../types/employee';
import { colors } from '../../../config/colors';

interface EmployeeFormProps {
  onCancel: () => void;
  onSubmit: (employee: Omit<Employee, 'id'>) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: '',
    role: 'serveur',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        name: formData.name.trim(),
        role: formData.role
      });
      // Reset form
      setFormData({ name: '', role: 'serveur', password: '', confirmPassword: '' });
      setErrors({});
    }
  };

  const handleInputChange = (field: keyof EmployeeFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
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
        AJOUT D'UN EMPLOYÉ
      </h2>

      <div className="space-y-4">
        {/* Nom et prénom */}
        <div>
          <input
            type="text"
            placeholder="Entrez le nom et prénom"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full h-[56px] px-4 rounded-[10px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all duration-200 ${
              errors.name ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
            }`}
            style={{ 
              backgroundColor: colors.white,
              fontFamily: 'Montserrat, sans-serif'
            }}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {errors.name}
            </p>
          )}
        </div>

        {/* Rôle */}
        <div>
          <select
            value={formData.role}
            onChange={(e) => handleInputChange('role', e.target.value as 'gerant' | 'serveur')}
            className="w-full h-[56px] px-4 rounded-[10px] border-none outline-none text-gray-800 focus:ring-2 focus:ring-green-500"
            style={{ 
              backgroundColor: colors.white,
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            <option value="" disabled>Choisissez le rôle</option>
            <option value="serveur">Serveur(se)</option>
            <option value="gerant">Gérant(e)</option>
          </select>
        </div>

        {/* Mot de passe */}
        <div>
          <input
            type="password"
            placeholder="Entrez son mot de passe"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`w-full h-[56px] px-4 rounded-[10px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all duration-200 ${
              errors.password ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
            }`}
            style={{ 
              backgroundColor: colors.white,
              fontFamily: 'Montserrat, sans-serif'
            }}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirmation mot de passe */}
        <div>
          <input
            type="password"
            placeholder="Confirmez le mot de passe"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className={`w-full h-[56px] px-4 rounded-[10px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all duration-200 ${
              errors.confirmPassword ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
            }`}
            style={{ 
              backgroundColor: colors.white,
              fontFamily: 'Montserrat, sans-serif'
            }}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Boutons */}
        <div className="flex flex-col lg:flex-row gap-4 pt-4">
          {/* Bouton Ajouter */}
          <button
            onClick={handleSubmit}
            className="w-full lg:flex-1 h-[56px] rounded-[10px] text-white font-bold text-lg hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: colors.primary,
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            AJOUTER
          </button>
          
          {/* Bouton Annuler */}
          <button
            onClick={onCancel}
            className="w-full lg:w-auto lg:px-8 h-[56px] rounded-[10px] font-bold text-lg hover:opacity-90 transition-opacity"
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

export default EmployeeForm;