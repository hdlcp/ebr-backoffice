// src/pages/employees/components/EmployeeList.tsx
import React from 'react';
import EmployeeCard from './EmployeeCard';
import { Employee } from '../../../types/employee';

interface EmployeeListProps {
  employees: Employee[];
  onToggleOpen: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({
  employees,
  onToggleOpen,
  onEdit,
  onDelete
}) => {
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