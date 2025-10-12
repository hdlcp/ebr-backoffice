// src/pages/employees/components/EditEmployeeModal.tsx
import React, { useState } from 'react';
import { Employee, EmployeeRole, UpdateEmployeeRequest } from '../../../types/employee';
import { colors } from '../../../config/colors';

interface EditEmployeeModalProps {
  employee: Employee;
  onClose: () => void;
  onSubmit: (employeeId: number, data: UpdateEmployeeRequest) => void;
  isLoading: boolean;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ 
  employee, 
  onClose, 
  onSubmit, 
  isLoading 
}) => {
  const [formData, setFormData] = useState({
    username: employee.username,
    firstname: employee.firstname,
    lastname: employee.lastname,
    email: employee.email,
    role: employee.role,
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Le nom d\'utilisateur est requis';
    }

    if (!formData.firstname.trim()) {
      newErrors.firstname = 'Le prénom est requis';
    }

    if (!formData.lastname.trim()) {
      newErrors.lastname = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    // Validation du mot de passe uniquement s'il est renseigné
    if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const updateData: UpdateEmployeeRequest = {};
      
      if (formData.username !== employee.username) updateData.username = formData.username;
      if (formData.firstname !== employee.firstname) updateData.firstname = formData.firstname;
      if (formData.lastname !== employee.lastname) updateData.lastname = formData.lastname;
      if (formData.email !== employee.email) updateData.email = formData.email;
      if (formData.role !== employee.role) updateData.role = formData.role;
      if (formData.password) updateData.password = formData.password;

      if (Object.keys(updateData).length === 0) {
        alert('Aucune modification détectée');
        return;
      }

      onSubmit(employee.id, updateData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
            Modifier l'employé
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
          <div>
            <label className="block text-sm font-medium mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Matricule: {employee.matricule}
            </label>
          </div>

          <div>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className={`w-full h-[56px] px-4 rounded-[10px] border outline-none ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              style={{ fontFamily: 'Montserrat, sans-serif' }}
              disabled={isLoading}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Prénom"
              value={formData.firstname}
              onChange={(e) => setFormData({...formData, firstname: e.target.value})}
              className={`w-full h-[56px] px-4 rounded-[10px] border outline-none ${
                errors.firstname ? 'border-red-500' : 'border-gray-300'
              }`}
              style={{ fontFamily: 'Montserrat, sans-serif' }}
              disabled={isLoading}
            />
            {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Nom"
              value={formData.lastname}
              onChange={(e) => setFormData({...formData, lastname: e.target.value})}
              className={`w-full h-[56px] px-4 rounded-[10px] border outline-none ${
                errors.lastname ? 'border-red-500' : 'border-gray-300'
              }`}
              style={{ fontFamily: 'Montserrat, sans-serif' }}
              disabled={isLoading}
            />
            {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full h-[56px] px-4 rounded-[10px] border outline-none ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              style={{ fontFamily: 'Montserrat, sans-serif' }}
              disabled={isLoading}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value as EmployeeRole})}
              className="w-full h-[56px] px-4 rounded-[10px] border border-gray-300 outline-none"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
              disabled={isLoading}
            >
              <option value="serveur">Serveur(se)</option>
              <option value="gerant">Gérant(e)</option>
            </select>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Laisser vide pour conserver le mot de passe actuel
            </p>
            
            <div className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Nouveau mot de passe (optionnel)"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={`w-full h-[56px] px-4 rounded-[10px] border outline-none ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                  disabled={isLoading}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Confirmer le nouveau mot de passe"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className={`w-full h-[56px] px-4 rounded-[10px] border outline-none ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                  disabled={isLoading}
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
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

export default EditEmployeeModal;