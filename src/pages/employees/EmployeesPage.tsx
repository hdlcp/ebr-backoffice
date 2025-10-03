// src/pages/employees/EmployeesPage.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import { CommonPageProps } from '../../types/common';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import { Employee, EmployeeFormData } from '../../types/employee';
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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [error, setError] = useState('');

  // Charger les employés au montage et quand l'entreprise change
  useEffect(() => {
    loadEmployees();
  }, [activeCompany]);

  const loadEmployees = async () => {
    setIsLoadingList(true);
    setError('');
    
    try {
      const entrepriseId = parseInt(activeCompany.id);
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
        matricule: formData.matricule,
        entreprise_id: formData.entreprise_id,
        password: formData.password
      });

      if (response.data) {
        // Ajouter le nouvel employé à la liste
        const newEmployee: Employee = {
          ...response.data,
          isOpen: false
        };
        setEmployees([...employees, newEmployee]);
        setShowAddForm(false);
        
        alert(`Employé ${response.data.username} ajouté avec succès!`);
      } else if (response.error) {
        setError(response.error);
        alert(`Erreur: ${response.error}`);
      }
    } catch (err) {
      console.error("Erreur lors de l'ajout:", err);
      setError("Erreur lors de l'ajout de l'employé");
      alert("Erreur lors de l'ajout de l'employé");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleOpen = (id: string) => {
    setEmployees(employees.map(emp => 
      emp.id.toString() === id ? { ...emp, isOpen: !emp.isOpen } : emp
    ));
  };

  const handleEdit = (id: string) => {
    console.log('Modifier employé:', id);
    alert('Fonctionnalité de modification en cours de développement');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      return;
    }

    try {
      const employeeId = parseInt(id);
      const response = await employeeService.deleteEmployee(employeeId);

      if (response.statusCode === 200 || response.data) {
        setEmployees(employees.filter(emp => emp.id.toString() !== id));
        alert('Employé supprimé avec succès');
      } else if (response.error) {
        alert(`Erreur: ${response.error}`);
      }
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert("Erreur lors de la suppression de l'employé");
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
        onAddCompany={onAddCompany}
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
            ) : employees.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Aucun employé pour le moment. Cliquez sur "AJOUTER +" pour en créer un.
                </p>
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
            onCancel={() => setShowAddForm(false)}
            onSubmit={handleAddEmployee}
            isLoading={isLoading}
            entrepriseId={parseInt(activeCompany.id)} // ✅ passage de l'entreprise au formulaire
          />
        )}
      </div>
    </div>
  );
};

export default EmployeesPage;
