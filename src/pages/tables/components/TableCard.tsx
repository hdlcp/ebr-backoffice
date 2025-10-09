// src/pages/tables/components/TableCard.tsx
import React from 'react';
import { Table } from '../../../types/table';
import { colors } from '../../../config/colors';

interface TableCardProps {
  table: Table;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TableCard: React.FC<TableCardProps> = ({ table, onEdit, onDelete }) => {
  const isOccupied = table.est_occupee;

  return (
    <div 
      className="w-full max-w-[994px] rounded-[10px] flex items-center justify-between px-6 py-4 mx-auto"
      style={{ backgroundColor: colors.white }}
    >
      {/* Informations de la table */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2">
          <span 
            className="font-semibold text-base"
            style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}
          >
            {table.nom}
          </span>
          {isOccupied && (
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">
              Occupée
            </span>
          )}
        </div>
        <span 
          className="text-sm"
          style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.secondary }}
        >
          Ordre : {table.ordre}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(table.id)}
          className="w-[30px] h-[30px] flex items-center justify-center text-orange-500 hover:text-orange-600 transition-colors"
          title="Modifier"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>

        <button
          onClick={() => onDelete(table.id)}
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

export default TableCard;