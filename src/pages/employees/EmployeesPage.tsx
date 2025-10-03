// src/pages/employees/EmployeesPage.tsx
import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import { CommonPageProps } from '../../types/common';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import { Employee } from '../../types/employee';
import { colors } from '../../config/colors';

// Données d'exemple pour les employés
const initialEmployees: Employee[] = [
  { id: '1', name: 'Chantale EBOU', role: 'gerant', isOpen: false },
  { id: '2', name: 'Jean KOUP', role: 'serveur' },
  { id: '3', name: 'Jean KOUP', role: 'serveur' },
  { id: '4', name: 'Jean KOUP', role: 'serveur' }
];

const EmployeesPage: React.FC<CommonPageProps> = ({ 
  userName,
  userRole,
  companies,
  activeCompany,
  onCompanySwitch,
  onAddCompany,
  onLogout
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const handleAddEmployee = (newEmployee: Omit<Employee, 'id'>) => {
    const employee: Employee = {
      ...newEmployee,
      id: Date.now().toString()
    };
    setEmployees([...employees, employee]);
    setShowAddForm(false);
  };

  const handleToggleOpen = (id: string) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, isOpen: !emp.isOpen } : emp
    ));
  };

  const handleEdit = (id: string) => {
    // Logique de modification - à implémenter
    console.log('Modifier employé:', id);
    // TODO: Ouvrir un modal ou naviguer vers page d'édition
  };

  const handleDelete = (id: string) => {
    // Logique de suppression - à implémenter
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
      console.log('Employé supprimé:', id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar avec déconnexion */}
      <Sidebar onLogout={onLogout} />
      
      {/* Header avec données utilisateur */}
      <Header 
        userName={userName}
        userRole={userRole}
        companies={companies}
        activeCompany={activeCompany}
        onCompanySwitch={onCompanySwitch}
        onAddCompany={onAddCompany}
      />

      {/* Contenu principal */}
      <div className="ml-0 lg:ml-[236px] mt-[68px] p-6">
        {!showAddForm ? (
          <>
            {/* En-tête de la section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <h1 
                className="text-xl lg:text-2xl font-bold"
                style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}
              >
                GESTION DES EMPLOYÉS
              </h1>
              
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full sm:w-[198px] h-[46px] rounded-[20px] font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: colors.container,
                  fontFamily: 'Montserrat, sans-serif',
                  color: colors.text.primary
                }}
              >
                AJOUTER +
              </button>
            </div>

            {/* Liste des employés */}
            <EmployeeList 
              employees={employees}
              onToggleOpen={handleToggleOpen}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        ) : (
          <EmployeeForm 
            onCancel={() => setShowAddForm(false)}
            onSubmit={handleAddEmployee}
          />
        )}
      </div>
    </div>
  );
};

export default EmployeesPage;