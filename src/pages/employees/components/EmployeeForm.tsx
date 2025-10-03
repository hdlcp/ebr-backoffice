// src/pages/employees/components/EmployeeForm.tsx
import React, { useState } from 'react';
import { EmployeeFormData, EmployeeRole } from '../../../types/employee';
import { colors } from '../../../config/colors';

interface EmployeeFormProps {
  onCancel: () => void;
  onSubmit: (employee: EmployeeFormData) => void;
  isLoading?: boolean;
  entrepriseId: number; // ➝ ajouté pour envoyer l'ID de l'entreprise
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onCancel, onSubmit, isLoading = false, entrepriseId }) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    role: 'serveur',
    matricule: '',
    password: '',
    confirmPassword: '',
    entreprise_id: entrepriseId
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) newErrors.username = "Le nom d'utilisateur est requis";
    if (!formData.firstname.trim()) newErrors.firstname = 'Le prénom est requis';
    if (!formData.lastname.trim()) newErrors.lastname = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.matricule.trim()) newErrors.matricule = 'Le matricule est requis';
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
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof EmployeeFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors(prev => ({ ...prev, [field as string]: '' }));
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
        {/* Nom d'utilisateur */}
        <div>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={formData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            className={`w-full h-[56px] px-4 rounded-[10px] outline-none ${
              errors.username ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
            }`}
            style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}
            disabled={isLoading}
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>

        {/* Prénom */}
        <div>
          <input
            type="text"
            placeholder="Prénom"
            value={formData.firstname}
            onChange={(e) => handleInputChange('firstname', e.target.value)}
            className={`w-full h-[56px] px-4 rounded-[10px] outline-none ${
              errors.firstname ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
            }`}
            style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}
            disabled={isLoading}
          />
          {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>}
        </div>

        {/* Nom */}
        <div>
          <input
            type="text"
            placeholder="Nom"
            value={formData.lastname}
            onChange={(e) => handleInputChange('lastname', e.target.value)}
            className={`w-full h-[56px] px-4 rounded-[10px] outline-none ${
              errors.lastname ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
            }`}
            style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}
            disabled={isLoading}
          />
          {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full h-[56px] px-4 rounded-[10px] outline-none ${
              errors.email ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
            }`}
            style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}
            disabled={isLoading}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Rôle */}
        <div>
          <select
            value={formData.role}
            onChange={(e) => handleInputChange('role', e.target.value as EmployeeRole)}
            className="w-full h-[56px] px-4 rounded-[10px] outline-none focus:ring-2 focus:ring-green-500"
            style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}
            disabled={isLoading}
          >
            <option value="serveur">Serveur(se)</option>
            <option value="gerant">Gérant(e)</option>
          </select>
        </div>

        {/* Matricule */}
        <div>
          <input
            type="text"
            placeholder="Matricule"
            value={formData.matricule}
            onChange={(e) => handleInputChange('matricule', e.target.value)}
            className={`w-full h-[56px] px-4 rounded-[10px] outline-none ${
              errors.matricule ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
            }`}
            style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}
            disabled={isLoading}
          />
          {errors.matricule && <p className="text-red-500 text-sm mt-1">{errors.matricule}</p>}
        </div>

        {/* Mot de passe */}
        <div>
          <input
            type="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`w-full h-[56px] px-4 rounded-[10px] outline-none ${
              errors.password ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
            }`}
            style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}
            disabled={isLoading}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Confirmation mot de passe */}
        <div>
          <input
            type="password"
            placeholder="Confirmez le mot de passe"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className={`w-full h-[56px] px-4 rounded-[10px] outline-none ${
              errors.confirmPassword ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
            }`}
            style={{ backgroundColor: colors.white, fontFamily: 'Montserrat, sans-serif' }}
            disabled={isLoading}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        {/* Boutons */}
        <div className="flex flex-col lg:flex-row gap-4 pt-4">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full lg:flex-1 h-[56px] rounded-[10px] text-white font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ backgroundColor: colors.primary, fontFamily: 'Montserrat, sans-serif' }}
          >
            {isLoading ? 'AJOUT EN COURS...' : 'AJOUTER'}
          </button>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="w-full lg:w-auto lg:px-8 h-[56px] rounded-[10px] font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ backgroundColor: colors.danger, fontFamily: 'Montserrat, sans-serif', color: colors.text.white }}
          >
            ANNULER
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
