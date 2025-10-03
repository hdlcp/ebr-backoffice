// src/pages/employees/components/EmployeeCard.tsx
import React from 'react';
import { Employee } from '../../../types/employee';
import { colors } from '../../../config/colors';

interface EmployeeCardProps {
  employee: Employee;
  onToggleOpen: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ 
  employee, 
  onToggleOpen, 
  onEdit, 
  onDelete 
}) => {
  const fullName = `${employee.firstname} ${employee.lastname}`;
  const isActive = employee.is_active;

  return (
    <div 
      className="w-full max-w-[994px] rounded-[10px] flex items-center justify-between px-4 lg:px-6 py-4 mx-auto"
      style={{ backgroundColor: colors.white }}
    >
      {/* Informations employé */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span 
            className="font-semibold text-sm lg:text-base truncate"
            style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}
          >
            {fullName}
          </span>
          
          {/* Badge statut */}
          <span 
            className={`px-2 py-0.5 rounded text-xs font-medium ${
              isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {isActive ? 'Actif' : 'Inactif'}
          </span>
        </div>
        
        <div className="flex items-center gap-3 mt-1 flex-wrap">
          <span 
            className="text-xs lg:text-sm capitalize"
            style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.secondary }}
          >
            {employee.role === 'gerant' ? 'Gérant' : 'Serveur'}
          </span>
          
          <span 
            className="text-xs text-gray-500"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            @{employee.username}
          </span>
          
          {employee.matricule && (
            <span 
              className="text-xs text-gray-500"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Mat: {employee.matricule}
            </span>
          )}
        </div>
        
        <span 
          className="text-xs text-gray-500 mt-1 truncate"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {employee.email}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 lg:gap-4 ml-4">
        {/* Bouton Ouvrir/Fermer pour les gérants */}
        {employee.role === 'gerant' && (
          <button
            onClick={() => onToggleOpen(employee.id.toString())}
            className="w-[100px] lg:w-[130px] h-[36px] lg:h-[40px] rounded-[20px] text-white font-bold text-xs lg:text-sm transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: employee.isOpen ? colors.danger : colors.primary,
              fontFamily: 'Montserrat, sans-serif',
              boxShadow: `0 5px 10px ${colors.shadow}`
            }}
          >
            {employee.isOpen ? 'FERMER' : 'OUVRIR'}
          </button>
        )}

        {/* Icône de modification */}
        <button
          onClick={() => onEdit(employee.id.toString())}
          className="w-[30px] h-[30px] flex items-center justify-center text-orange-500 hover:text-orange-600 transition-colors"
          title="Modifier"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>

        {/* Icône de suppression */}
        <button
          onClick={() => onDelete(employee.id.toString())}
          className="w-[30px] h-[30px] flex items-center justify-center text-red-500 hover:text-red-600 transition-colors"
          title="Supprimer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;