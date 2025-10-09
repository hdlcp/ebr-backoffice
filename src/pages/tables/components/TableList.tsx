// src/pages/tables/components/TableList.tsx
import React from 'react';
import TableCard from './TableCard';
import { Table } from '../../../types/table';

interface TableListProps {
  tables: Table[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TableList: React.FC<TableListProps> = ({ tables, onEdit, onDelete }) => {
  if (tables.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg">
        <p className="text-gray-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Aucune table trouvée. Cliquez sur "AJOUTER UNE TABLE +" pour en créer une.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tables.map(table => (
        <TableCard
          key={table.id}
          table={table}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TableList;