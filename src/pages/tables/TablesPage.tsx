// src/pages/tables/TablesPage.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import TableForm from './components/TableForm';
import TableList from './components/TableList';
import { CommonPageProps } from '../../types/common';
import { Table, TableFormData } from '../../types/table';
import { tableService } from '../../services/api/tableService';
import { colors } from '../../config/colors';

const TablesPage: React.FC<CommonPageProps> = ({ 
  userName,
  userRole,
  companies,
  activeCompany,
  onCompanySwitch,
  onAddCompany,
  onLogout
}) => {
  const [tablesActive, setTablesActive] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [tables, setTables] = useState<Table[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [error, setError] = useState('');

  // Charger les tables au montage et quand l'entreprise change
  useEffect(() => {
    loadTables();
  }, [activeCompany]);

  const loadTables = async () => {
    setIsLoadingList(true);
    setError('');
    
    try {
      const entrepriseId = activeCompany.id;
      const response = await tableService.getTables(entrepriseId);

      if (response.data) {
        setTables(response.data);
      } else if (response.error) {
        setError(response.error);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des tables:', err);
      setError('Erreur lors du chargement des tables');
    } finally {
      setIsLoadingList(false);
    }
  };

  const handleAddTable = async (formData: TableFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await tableService.createTable({
        nom: formData.nom,
        ordre: parseInt(formData.ordre),
        entreprise_id: activeCompany.id
      });

      if (response.data) {
        setTables([...tables, response.data]);
        setShowAddForm(false);
        alert(`Table "${response.data.nom}" ajoutée avec succès!`);
      } else if (response.error) {
        alert(`Erreur: ${response.error}`);
      }
    } catch (err) {
      console.error('Erreur lors de l\'ajout:', err);
      alert('Erreur lors de l\'ajout de la table');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (tableId: number) => {
    console.log('Modifier table:', tableId);
    alert('Fonctionnalité de modification en cours de développement');
  };

  const handleDelete = async (tableId: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette table ?')) {
      return;
    }

    try {
      const response = await tableService.deleteTable(tableId);

      if (response.statusCode === 200 || response.data) {
        setTables(tables.filter(t => t.id !== tableId));
        alert('Table supprimée avec succès');
      } else if (response.error) {
        alert(`Erreur: ${response.error}`);
      }
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert('Erreur lors de la suppression de la table');
    }
  };

  const handleToggleTablesStatus = async () => {
    if (tables.length === 0) {
      alert('Aucune table à activer/désactiver');
      return;
    }

    try {
      // Récupérer tous les IDs des tables
      const tableIds = tables.map(table => table.id);

      // Appeler la route appropriée avec tous les IDs
      const response = tablesActive 
        ? await tableService.deactivateTables(tableIds)
        : await tableService.activateTables(tableIds);

      if (response.statusCode === 200 || response.data) {
        setTablesActive(!tablesActive);
        
        alert(tablesActive 
          ? 'Toutes les tables ont été désactivées' 
          : 'Toutes les tables ont été activées'
        );
        
        // Recharger les tables
        loadTables();
      } else if (response.error) {
        alert(`Erreur: ${response.error}`);
      }
    } catch (err) {
      console.error('Erreur lors du changement de statut:', err);
      alert('Erreur lors du changement de statut des tables');
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
            {/* En-tête de la section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <h1 
                className="text-xl lg:text-2xl font-bold"
                style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}
              >
                GESTION DES TABLES
              </h1>
              
              {/* Toggle Activer/Désactiver et bouton Ajouter */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Boutons Activer/Désactiver */}
                <div className="flex rounded-[20px] overflow-hidden">
                  <button
                    onClick={() => {
                      if (!tablesActive) handleToggleTablesStatus();
                    }}
                    className={`px-4 py-2 font-semibold text-sm transition-colors ${
                      tablesActive ? 'text-white' : 'text-gray-700'
                    }`}
                    style={{
                      backgroundColor: tablesActive ? colors.primary : colors.white,
                      fontFamily: 'Montserrat, sans-serif'
                    }}
                  >
                    ACTIVER
                  </button>
                  <button
                    onClick={() => {
                      if (tablesActive) handleToggleTablesStatus();
                    }}
                    className={`px-4 py-2 font-semibold text-sm transition-colors ${
                      !tablesActive ? 'text-white' : 'text-gray-700'
                    }`}
                    style={{
                      backgroundColor: !tablesActive ? '#D32F2F' : colors.white,
                      fontFamily: 'Montserrat, sans-serif'
                    }}
                  >
                    DÉSACTIVEZ
                  </button>
                </div>

                {/* Bouton Ajouter (visible seulement si les tables sont activées) */}
                {tablesActive && (
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="w-full sm:w-auto px-6 h-[46px] rounded-[20px] font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    style={{
                      backgroundColor: colors.container,
                      fontFamily: 'Montserrat, sans-serif',
                      color: colors.text.primary
                    }}
                  >
                    AJOUTER UNE TABLE +
                  </button>
                )}
              </div>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {error}
              </div>
            )}

            {/* Contenu conditionnel */}
            {tablesActive ? (
              isLoadingList ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                </div>
              ) : (
                <TableList 
                  tables={tables}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )
            ) : (
              /* Message quand les tables sont désactivées */
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p 
                    className="text-xl font-semibold text-gray-500"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Les tables sont désactivées
                  </p>
                  <p 
                    className="text-sm text-gray-400 mt-2"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Activez les tables pour voir la liste et pouvoir en ajouter
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          <TableForm 
            onCancel={() => setShowAddForm(false)}
            onSubmit={handleAddTable}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default TablesPage;