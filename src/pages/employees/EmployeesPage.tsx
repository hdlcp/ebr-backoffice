// src/pages/employees/EmployeesPage.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import { CommonPageProps } from '../../types/common';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import EditEmployeeModal from './components/EditEmployeeModal';
import { Employee, EmployeeFormData, UpdateEmployeeRequest } from '../../types/employee';
import { employeeService } from '../../services/api/employeeService';
import { colors } from '../../config/colors';

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
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeForEdit, setSelectedEmployeeForEdit] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEmployees();
  }, [activeCompany]);

  const loadEmployees = async () => {
    setIsLoadingList(true);
    setError('');
    
    try {
      const entrepriseId = activeCompany.id;
      const response = await employeeService.getEmployees({
        entreprise_id: entrepriseId,
        skip: 0,
        limit: 100
      });

      if (response.data) {
        setEmployees(response.data);
      } else if (response.error) {
        setError(response.error);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des employés:', err);
      setError('Erreur lors du chargement des employés');
    } finally {
      setIsLoadingList(false);
    }
  };

  const handleAddEmployee = async (formData: EmployeeFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await employeeService.createEmployee({
        username: formData.username,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        role: formData.role,
        is_active: true,
        password: formData.password,
        matricule: '' // Champ vide comme requis
      });

      if (response.data) {
        const newEmployee: Employee = {
          ...response.data,
          isOpen: false
        };
        setEmployees([...employees, newEmployee]);
        setShowAddForm(false);
        alert(`Employé ${response.data.firstname} ${response.data.lastname} ajouté avec succès!`);
      } else if (response.error) {
        setError(response.error);
        alert(`Erreur: ${response.error}`);
      }
    } catch (err) {
      console.error('Erreur lors de l\'ajout:', err);
      setError('Erreur lors de l\'ajout de l\'employé');
      alert('Erreur lors de l\'ajout de l\'employé');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleOpen = async (employeeId: number, currentState: boolean) => {
    try {
      const response = currentState 
        ? await employeeService.closeJournee(employeeId)
        : await employeeService.openJournee(employeeId);

      if (response.data || response.statusCode === 200) {
        setEmployees(employees.map(emp => 
          emp.id === employeeId ? { ...emp, isOpen: !currentState } : emp
        ));
        alert(currentState ? 'Journée fermée avec succès' : 'Journée ouverte avec succès');
      } else if (response.error) {
        alert(`Erreur: ${response.error}`);
      }
    } catch (err) {
      console.error('Erreur:', err);
      alert('Erreur lors de l\'ouverture/fermeture de la journée');
    }
  };

  const handleEdit = (employeeId: number) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
      setSelectedEmployeeForEdit(employee);
    }
  };

  const handleEditSubmit = async (employeeId: number, updateData: UpdateEmployeeRequest) => {
    setIsLoading(true);

    try {
      const response = await employeeService.updateEmployee(employeeId, updateData);

      if (response.data || response.statusCode === 200) {
        await loadEmployees();
        setSelectedEmployeeForEdit(null);
        alert('Employé modifié avec succès!');
      } else if (response.error) {
        alert(`Erreur: ${response.error}`);
      }
    } catch (err) {
      console.error('Erreur lors de la modification:', err);
      alert('Erreur lors de la modification de l\'employé');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (employeeId: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      return;
    }

    try {
      const response = await employeeService.deleteEmployee(employeeId);

      if (response.statusCode === 200 || response.data) {
        setEmployees(employees.filter(emp => emp.id !== employeeId));
        alert('Employé supprimé avec succès');
      } else if (response.error) {
        alert(`Erreur: ${response.error}`);
      }
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert('Erreur lors de la suppression de l\'employé');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar onLogout={onLogout} />
      
      <Header 
        userName={userName}
        userRole={userRole}
        companies={companies}
        activeCompany={activeCompany}
        onCompanySwitch={onCompanySwitch}
      />

      <div className="ml-0 lg:ml-[236px] mt-[68px] p-6">
        {!showAddForm ? (
          <>
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

            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {error}
              </div>
            )}

            {isLoadingList ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <EmployeeList 
                employees={employees}
                onToggleOpen={handleToggleOpen}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </>
        ) : (
          <EmployeeForm 
            entrepriseId={activeCompany.id}
            onCancel={() => setShowAddForm(false)}
            onSubmit={handleAddEmployee}
            isLoading={isLoading}
          />
        )}
      </div>

      {selectedEmployeeForEdit && (
        <EditEmployeeModal 
          employee={selectedEmployeeForEdit}
          onClose={() => setSelectedEmployeeForEdit(null)}
          onSubmit={handleEditSubmit}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default EmployeesPage;