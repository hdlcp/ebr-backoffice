import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import { CommonPageProps } from '../../types/common';
import { DailyValidation, ServerStats, DailyStats } from '../../types/stats';
import { colors } from '../../config/colors';

// Données d'exemple pour les statistiques
const mockValidations: DailyValidation[] = [
  {
    id: '1',
    serverId: '1',
    serverName: 'Chantale EBOU',
    tableName: 'table 1 couple marié avec enfant',
    items: [
      { id: '1', name: 'Flag', quantity: 5, price: 800, total: 4000 },
      { id: '2', name: 'Beaufort', quantity: 3, price: 1000, total: 3000 },
      { id: '3', name: 'Salade mixte', quantity: 2, price: 1500, total: 3000 }
    ],
    totalMomo: 20000,
    totalEspeces: 0,
    total: 20000,
    paymentMethod: 'momo',
    status: 'validated',
    validatedAt: '2024-01-01T10:30:00Z',
    createdAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '2',
    serverId: '1',
    serverName: 'Chantale EBOU',
    tableName: 'table 1 couple marié avec enfant',
    items: [
      { id: '1', name: 'Riz au gras', quantity: 2, price: 1000, total: 2000 },
      { id: '2', name: 'Salade mixte', quantity: 4, price: 1500, total: 6000 },
      { id: '3', name: 'Soda', quantity: 2, price: 500, total: 1000 }
    ],
    totalMomo: 0,
    totalEspeces: 20000,
    total: 20000,
    paymentMethod: 'especes',
    status: 'validated',
    validatedAt: '2024-01-01T11:30:00Z',
    createdAt: '2024-01-01T11:00:00Z'
  },
  {
    id: '3',
    serverId: '2',
    serverName: 'Jean MONT',
    tableName: 'table 2 famille nombreuse',
    items: [
      { id: '1', name: 'Kom et moyo', quantity: 3, price: 2500, total: 7500 },
      { id: '2', name: 'Flag', quantity: 6, price: 800, total: 4800 }
    ],
    totalMomo: 12300,
    totalEspeces: 0,
    total: 12300,
    paymentMethod: 'momo',
    status: 'validated',
    validatedAt: '2024-01-01T12:00:00Z',
    createdAt: '2024-01-01T11:45:00Z'
  }
];

// Fonction utilitaire pour formater une date
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Fonction utilitaire pour formater une période
const formatPeriod = (startDate: string, endDate: string) => {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return start === end ? start : `${start} - ${end}`;
};

// Composant pour afficher la période courante
const PeriodHeader: React.FC<{ 
  startDate: string; 
  endDate: string; 
  isSearched: boolean 
}> = ({ startDate, endDate, isSearched }) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
          <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
        </svg>
        <span className="font-semibold text-blue-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {isSearched ? 'Période recherchée : ' : 'Aujourd\'hui : '}
        </span>
        <span className="font-bold text-blue-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {formatPeriod(startDate, endDate)}
        </span>
      </div>
    </div>
  );
};

// Composant pour une validation individuelle
const ValidationCard: React.FC<{ validation: DailyValidation }> = ({ validation }) => {
  return (
    <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
      {/* En-tête avec serveur et date */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
          </div>
          <span className="font-semibold text-green-600" 
                style={{ fontFamily: 'Montserrat, sans-serif' }}>
            serveur : {validation.serverName}
          </span>
        </div>
        <span className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {formatDate(validation.validatedAt)}
        </span>
      </div>

      {/* Nom de la table */}
      <p className="text-sm text-gray-600 mb-3" 
         style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {validation.tableName}
      </p>

      {/* Liste des articles */}
      <div className="space-y-1 mb-4">
        {validation.items.map((item) => (
          <div key={item.id} className="flex justify-between items-center text-sm">
            <span style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {item.name}
            </span>
            <div className="flex items-center gap-4">
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-semibold">
                {item.quantity}
              </span>
              <span className="font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {item.total} FCFA
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Total et bouton de paiement */}
      <div className="flex justify-between items-center pt-3 border-t">
        <span className="text-lg font-bold text-red-600" 
              style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Total: {validation.total} FCFA
        </span>
        <button className={`px-4 py-2 rounded-lg text-white font-semibold text-sm ${
          validation.paymentMethod === 'momo' ? 'bg-green-600' : 'bg-blue-600'
        }`}>
          {validation.paymentMethod === 'momo' ? 'À PAYER EN MOMO' : 'À PAYER EN ESPÈCES'}
        </button>
      </div>
    </div>
  );
};

// Composant pour les points de la journée d'un serveur
const ServerDayStats: React.FC<{ serverStats: ServerStats }> = ({ serverStats }) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-4">
      <h3 className="text-lg font-bold mb-4" 
          style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
        SERVEUR(SE) : {serverStats.serverName}
      </h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-semibold" style={{ fontFamily: 'Montserrat, sans-serif', color: '#FF4444' }}>
            TOTAL EN MOMO :
          </span>
          <span className="font-bold text-red-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {serverStats.totalMomo} FCFA
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-semibold" style={{ fontFamily: 'Montserrat, sans-serif', color: '#FF4444' }}>
            TOTAL EN ESPÈCES :
          </span>
          <span className="font-bold text-red-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {serverStats.totalEspeces} FCFA
          </span>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-green-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              HISTORIQUE
            </span>
            <button className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant principal de la page
const StatsPage: React.FC<CommonPageProps> = ({ 
  userName,
  userRole,
  companies,
  activeCompany,
  onCompanySwitch,
  onAddCompany,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'history'>('daily');
  
  // États pour la recherche par période
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [currentStartDate, setCurrentStartDate] = useState(today);
  const [currentEndDate, setCurrentEndDate] = useState(today);
  const [isSearched, setIsSearched] = useState(false);

  // Calculer les statistiques par serveur
  const serverStats: ServerStats[] = mockValidations.reduce((acc, validation) => {
    const existing = acc.find(s => s.serverId === validation.serverId);
    if (existing) {
      existing.totalMomo += validation.totalMomo;
      existing.totalEspeces += validation.totalEspeces;
      existing.total += validation.total;
      existing.ordersCount += 1;
      existing.validations.push(validation);
    } else {
      acc.push({
        serverId: validation.serverId,
        serverName: validation.serverName,
        totalMomo: validation.totalMomo,
        totalEspeces: validation.totalEspeces,
        total: validation.total,
        ordersCount: 1,
        validations: [validation]
      });
    }
    return acc;
  }, [] as ServerStats[]);

  // Statistiques globales
  const totalMomo = serverStats.reduce((sum, s) => sum + s.totalMomo, 0);
  const totalEspeces = serverStats.reduce((sum, s) => sum + s.totalEspeces, 0);
  const grandTotal = totalMomo + totalEspeces;

  const handleSearch = () => {
    setCurrentStartDate(startDate);
    setCurrentEndDate(endDate);
    setIsSearched(true);
    console.log('Recherche pour la période:', startDate, 'à', endDate);
    // Logique de recherche à implémenter
  };

  const resetToToday = () => {
    setStartDate(today);
    setEndDate(today);
    setCurrentStartDate(today);
    setCurrentEndDate(today);
    setIsSearched(false);
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
        {/* En-tête avec onglets */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
          <h1 
            className="text-xl lg:text-2xl font-bold"
            style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}
          >
            STATISTIQUES
          </h1>
          
          {/* Onglets */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('daily')}
              className={`px-6 py-2 rounded-[20px] font-semibold text-sm transition-colors ${
                activeTab === 'daily' ? 'text-white' : 'text-gray-700'
              }`}
              style={{
                backgroundColor: activeTab === 'daily' ? colors.primary : colors.white,
                fontFamily: 'Montserrat, sans-serif'
              }}
            >
              Points de la journée
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-2 rounded-[20px] font-semibold text-sm transition-colors ${
                activeTab === 'history' ? 'text-white' : 'text-gray-700'
              }`}
              style={{
                backgroundColor: activeTab === 'history' ? colors.primary : colors.white,
                fontFamily: 'Montserrat, sans-serif'
              }}
            >
              Historique des validations
            </button>
          </div>
        </div>

        {/* En-tête de période */}
        <PeriodHeader 
          startDate={currentStartDate} 
          endDate={currentEndDate} 
          isSearched={isSearched}
        />

        {activeTab === 'daily' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Colonne gauche - Points par serveur */}
            <div>
              <h2 className="text-lg font-bold mb-4" 
                  style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
                Points de la période
              </h2>
              
              {serverStats.map((server) => (
                <ServerDayStats key={server.serverId} serverStats={server} />
              ))}
              
              {/* Total général */}
              <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                <h3 className="text-lg font-bold mb-4 text-green-800" 
                    style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  TOTAL GÉNÉRAL
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      TOTAL MOMO :
                    </span>
                    <span className="font-bold text-green-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {totalMomo} FCFA
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      TOTAL ESPÈCES :
                    </span>
                    <span className="font-bold text-green-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {totalEspeces} FCFA
                    </span>
                  </div>
                  
                  <div className="flex justify-between pt-2 border-t border-green-300">
                    <span className="text-xl font-bold text-green-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      GRAND TOTAL :
                    </span>
                    <span className="text-xl font-bold text-green-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {grandTotal} FCFA
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne droite - Recherche et filtres */}
            <div>
              <h2 className="text-lg font-bold mb-4" 
                  style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
                Recherche par période
              </h2>
              
              <div className="bg-white rounded-lg p-6 mb-4">
                <h3 className="font-semibold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Sélectionner une période
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" 
                           style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Date de début
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full h-[48px] px-4 rounded-[10px] border border-gray-300 outline-none"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" 
                           style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Date de fin
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate}
                      className="w-full h-[48px] px-4 rounded-[10px] border border-gray-300 outline-none"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleSearch}
                      className="flex-1 h-[48px] rounded-[10px] text-white font-bold text-lg"
                      style={{ backgroundColor: colors.primary, fontFamily: 'Montserrat, sans-serif' }}
                    >
                      RECHERCHER
                    </button>
                    
                    <button
                      onClick={resetToToday}
                      className="h-[48px] px-4 rounded-[10px] border border-gray-300 text-gray-700 font-semibold"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      Aujourd'hui
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Statistiques rapides */}
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Statistiques de la période
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {mockValidations.length}
                    </div>
                    <div className="text-sm text-blue-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Commandes
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {serverStats.length}
                    </div>
                    <div className="text-sm text-purple-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Serveurs actifs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Onglet Historique des validations */
          <div>
            <h2 className="text-lg font-bold mb-6" 
                style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
              Historique des validations
            </h2>
            
            <div className="space-y-4">
              {mockValidations.map((validation) => (
                <ValidationCard key={validation.id} validation={validation} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsPage;