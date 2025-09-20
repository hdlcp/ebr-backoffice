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
  return (
    <div 
      className="w-full max-w-[994px] h-[79px] rounded-[10px] flex items-center justify-between px-4 lg:px-6 mx-auto"
      style={{ backgroundColor: colors.white }}
    >
      {/* Informations employé */}
      <div className="flex flex-col">
        <span 
          className="font-semibold text-sm lg:text-base"
          style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}
        >
          {employee.name}
        </span>
        <span 
          className="text-xs lg:text-sm capitalize"
          style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.secondary }}
        >
          {employee.role}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Bouton Ouvrir/Fermer pour les gérants */}
        {employee.role === 'gerant' && (
          <button
            onClick={() => onToggleOpen(employee.id)}
            className="w-[120px] lg:w-[171px] h-[40px] lg:h-[49px] rounded-[20px] text-white font-bold text-xs lg:text-sm transition-all duration-200 hover:opacity-90"
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
          onClick={() => onEdit(employee.id)}
          className="w-[30px] h-[30px] flex items-center justify-center text-orange-500 hover:text-orange-600 transition-colors"
          title="Modifier"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>

        {/* Icône de suppression */}
        <button
          onClick={() => onDelete(employee.id)}
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