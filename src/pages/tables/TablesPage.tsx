import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import { CommonPageProps } from '../../types/common';
import { Table } from '../../types/table';
import { colors } from '../../config/colors';

// Données d'exemple pour les tables
const initialTables: Table[] = [
  {
    id: '1',
    name: 'Table 1',
    order: 1,
    isActive: true,
    isOccupied: false,
    capacity: 4,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Table 2',
    order: 2,
    isActive: true,
    isOccupied: false,
    capacity: 6,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '3',
    name: 'Table 3',
    order: 3,
    isActive: true,
    isOccupied: true,
    capacity: 2,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '4',
    name: 'Table 4',
    order: 4,
    isActive: true,
    isOccupied: false,
    capacity: 8,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
];

// Composant pour une carte de table
const TableCard: React.FC<{
  table: Table;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ table, onEdit, onDelete }) => {
  return (
    <div 
      className="w-full max-w-[994px] h-[79px] rounded-[10px] flex items-center justify-between px-6 mx-auto"
      style={{ backgroundColor: colors.white }}
    >
      {/* Informations de la table */}
      <div className="flex flex-col">
        <span 
          className="font-semibold text-base"
          style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}
        >
          {table.name}
        </span>
        <span 
          className="text-sm"
          style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.secondary }}
        >
          Ordre : {table.order}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Icône de modification */}
        <button
          onClick={() => onEdit(table.id)}
          className="w-[30px] h-[30px] flex items-center justify-center text-orange-500 hover:text-orange-600 transition-colors"
          title="Modifier"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>

        {/* Icône de suppression */}
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

// Composant formulaire d'ajout de table
const TableForm: React.FC<{
  onCancel: () => void;
  onSubmit: (table: Omit<Table, 'id' | 'isActive' | 'isOccupied' | 'createdAt' | 'updatedAt'>) => void;
}> = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    order: '',
    capacity: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom de la table est requis';
    }

    if (!formData.order) {
      newErrors.order = 'L\'ordre de la table est requis';
    } else if (parseInt(formData.order) <= 0) {
      newErrors.order = 'L\'ordre doit être supérieur à 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        name: formData.name.trim(),
        order: parseInt(formData.order),
        capacity: formData.capacity ? parseInt(formData.capacity) : undefined
      });
      // Reset form
      setFormData({ name: '', order: '', capacity: '' });
      setErrors({});
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="w-full max-w-[994px] mx-auto mt-4 lg:mt-8">
      <h2 
        className="text-xl lg:text-2xl font-bold text-center mb-6 lg:mb-8"
        style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}
      >
        AJOUT D'UNE TABLE
      </h2>

      <div className="space-y-4">
        {/* Nom de la table */}
        <div>
          <input
            type="text"
            placeholder="Entrez le nom de la table"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full h-[56px] px-4 rounded-[10px] border-none outline-none text-gray-800 placeholder-gray-500 transition-all duration-200 ${
              errors.name ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
            }`}
            style={{ 
              backgroundColor: colors.white,
              fontFamily: 'Montserrat, sans-serif'
            }}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {errors.name}
            </p>
          )}
        </div>

        {/* Ordre de la table */}
        <div>
          <select
            value={formData.order}
            onChange={(e) => handleInputChange('order', e.target.value)}
            className={`w-full h-[56px] px-4 rounded-[10px] border-none outline-none text-gray-800 transition-all duration-200 ${
              errors.order ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'
            }`}
            style={{ 
              backgroundColor: colors.white,
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            <option value="" disabled>Choisissez l'ordre de la table</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>Ordre {num}</option>
            ))}
          </select>
          {errors.order && (
            <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {errors.order}
            </p>
          )}
        </div>

        {/* Boutons */}
        <div className="flex flex-col lg:flex-row gap-4 pt-4">
          {/* Bouton Ajouter */}
          <button
            onClick={handleSubmit}
            className="w-full lg:flex-1 h-[56px] rounded-[10px] text-white font-bold text-lg hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: colors.primary,
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            AJOUTER
          </button>
          
          {/* Bouton Annuler */}
          <button
            onClick={onCancel}
            className="w-full lg:w-auto lg:px-8 h-[56px] rounded-[10px] font-bold text-lg hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: colors.danger,
              fontFamily: 'Montserrat, sans-serif',
              color: colors.text.white
            }}
          >
            ANNULER
          </button>
        </div>
      </div>
    </div>
  );
};

// Composant principal de la page
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
  const [tables, setTables] = useState<Table[]>(initialTables);

  const handleAddTable = (newTable: Omit<Table, 'id' | 'isActive' | 'isOccupied' | 'createdAt' | 'updatedAt'>) => {
    const table: Table = {
      ...newTable,
      id: Date.now().toString(),
      isActive: true,
      isOccupied: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTables([...tables, table]);
    setShowAddForm(false);
  };

  const handleEdit = (id: string) => {
    console.log('Modifier table:', id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette table ?')) {
      setTables(tables.filter(table => table.id !== id));
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
                GESTION DES TABLES
              </h1>
              
              {/* Toggle Activer/Désactiver et bouton Ajouter */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Boutons Activer/Désactiver */}
                <div className="flex rounded-[20px] overflow-hidden">
                  <button
                    onClick={() => setTablesActive(true)}
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
                    onClick={() => setTablesActive(false)}
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
                    className="w-full sm:w-[198px] h-[46px] rounded-[20px] font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
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

            {/* Contenu conditionnel */}
            {tablesActive ? (
              /* Liste des tables */
              <div className="space-y-4">
                {tables.map((table) => (
                  <TableCard
                    key={table.id}
                    table={table}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
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
          />
        )}
      </div>
    </div>
  );
};

export default TablesPage;