// src/pages/employees/components/EmployeeList.tsx
import React from 'react';
import EmployeeCard from './EmployeeCard';
import { Employee } from '../../../types/employee';

interface EmployeeListProps {
  employees: Employee[];
  onToggleOpen: (id: number, currentState: boolean) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({
  employees,
  onToggleOpen,
  onEdit,
  onDelete
}) => {
  if (employees.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg">
        <p className="text-gray-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Aucun employé trouvé. Cliquez sur "AJOUTER +" pour en créer un.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onToggleOpen={onToggleOpen}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default EmployeeList;