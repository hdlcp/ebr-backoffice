import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import { colors } from '../../config/colors';
import { CommonPageProps } from '../../types/common';
import { SalesData, MenuPopularity, EmployeePerformance, OrdersFlow, DashboardFilters, DashboardStats } from '../../types/dashboard';

// Couleurs pour les graphiques
const chartColors = {
  primary: '#007A3F',
  secondary: '#E4D1B0',
  success: '#10B981',
  info: '#3B82F6',
  warning: '#F59E0B',
  danger: '#EF4444',
  purple: '#8B5CF6',
  indigo: '#6366F1',
  pink: '#EC4899'
};

// Données d'exemple pour les ventes
const mockSalesData: SalesData[] = [
  { date: '2024-01-01', totalSales: 85000, momoSales: 45000, cashSales: 40000, ordersCount: 23 },
  { date: '2024-01-02', totalSales: 92000, momoSales: 52000, cashSales: 40000, ordersCount: 28 },
  { date: '2024-01-03', totalSales: 78000, momoSales: 38000, cashSales: 40000, ordersCount: 19 },
  { date: '2024-01-04', totalSales: 105000, momoSales: 65000, cashSales: 40000, ordersCount: 32 },
  { date: '2024-01-05', totalSales: 98000, momoSales: 58000, cashSales: 40000, ordersCount: 26 },
  { date: '2024-01-06', totalSales: 112000, momoSales: 70000, cashSales: 42000, ordersCount: 35 },
  { date: '2024-01-07', totalSales: 89000, momoSales: 49000, cashSales: 40000, ordersCount: 22 }
];

const mockMenuPopularity: MenuPopularity[] = [
  { menuName: 'Riz au gras', ordersCount: 45, totalRevenue: 45000, category: 'repas' },
  { menuName: 'Kom et moyo', ordersCount: 32, totalRevenue: 80000, category: 'repas' },
  { menuName: 'Flag', ordersCount: 67, totalRevenue: 53600, category: 'boissons' },
  { menuName: 'La Béninoise', ordersCount: 28, totalRevenue: 28000, category: 'boissons' },
  { menuName: 'Salade mixte', ordersCount: 23, totalRevenue: 34500, category: 'repas' }
];

const mockEmployeePerformance: EmployeePerformance[] = [
  { employeeId: '1', employeeName: 'Chantale EBOU', totalSales: 156000, momoSales: 96000, cashSales: 60000, ordersCount: 42, averageOrderValue: 3714 },
  { employeeId: '2', employeeName: 'Jean KOUP', totalSales: 134000, momoSales: 78000, cashSales: 56000, ordersCount: 38, averageOrderValue: 3526 },
  { employeeId: '3', employeeName: 'Marie SANTOS', totalSales: 98000, momoSales: 52000, cashSales: 46000, ordersCount: 28, averageOrderValue: 3500 },
  { employeeId: '4', employeeName: 'Pierre AKODA', totalSales: 87000, momoSales: 43000, cashSales: 44000, ordersCount: 25, averageOrderValue: 3480 }
];

const mockOrdersFlow: OrdersFlow[] = [
  { hour: 8, ordersCount: 2 },
  { hour: 9, ordersCount: 5 },
  { hour: 10, ordersCount: 8 },
  { hour: 11, ordersCount: 15 },
  { hour: 12, ordersCount: 28, peakHour: true },
  { hour: 13, ordersCount: 32, peakHour: true },
  { hour: 14, ordersCount: 18 },
  { hour: 15, ordersCount: 12 },
  { hour: 16, ordersCount: 8 },
  { hour: 17, ordersCount: 6 },
  { hour: 18, ordersCount: 14 },
  { hour: 19, ordersCount: 25, peakHour: true },
  { hour: 20, ordersCount: 22 },
  { hour: 21, ordersCount: 15 },
  { hour: 22, ordersCount: 8 }
];

const StatsCard: React.FC<{ title: string; value: string; change: string; color: string; icon: React.ReactNode }> = ({
  title, value, change, color, icon
}) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {title}
        </p>
        <p className="text-2xl font-bold mt-2" style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
          {value}
        </p>
      </div>
      <div className="p-3 rounded-full" style={{ backgroundColor: `${color}15` }}>
        <div style={{ color }}>{icon}</div>
      </div>
    </div>
    <div className="mt-4 flex items-center">
      <span className="text-sm font-semibold" style={{ color: change.startsWith('+') ? chartColors.success : chartColors.danger }}>
        {change}
      </span>
      <span className="text-sm text-gray-500 ml-2">vs période précédente</span>
    </div>
  </div>
);

const DashboardPage: React.FC<CommonPageProps> = ({ 
  userName,
  userRole,
  companies,
  activeCompany,
  onCompanySwitch,
  onAddCompany,
  onLogout
}) => {
  const [filters, setFilters] = useState<DashboardFilters>({
    startDate: '2024-01-01',
    endDate: '2024-01-07',
    period: 'week'
  });

  const stats: DashboardStats = useMemo(() => {
    const totalRevenue = mockSalesData.reduce((sum, data) => sum + data.totalSales, 0);
    const totalOrders = mockSalesData.reduce((sum, data) => sum + data.ordersCount, 0);
    const totalMomo = mockSalesData.reduce((sum, data) => sum + data.momoSales, 0);
    const totalCash = mockSalesData.reduce((sum, data) => sum + data.cashSales, 0);

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue: Math.round(totalRevenue / totalOrders),
      momoPercentage: Math.round((totalMomo / totalRevenue) * 100),
      cashPercentage: Math.round((totalCash / totalRevenue) * 100),
      growthRate: 12.5
    };
  }, []);

  const paymentMethodData = [
    { name: 'Mobile Money', value: stats.momoPercentage, color: chartColors.primary },
    { name: 'Espèces', value: stats.cashPercentage, color: chartColors.warning }
  ];

  const handlePeriodChange = (period: DashboardFilters['period']) => {
    const now = new Date();
    let startDate: string;
    
    switch (period) {
      case 'day':
        startDate = now.toISOString().split('T')[0];
        break;
      case 'week':
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - 7);
        startDate = weekStart.toISOString().split('T')[0];
        break;
      case 'month':
        const monthStart = new Date(now);
        monthStart.setDate(now.getDate() - 30);
        startDate = monthStart.toISOString().split('T')[0];
        break;
      default:
        startDate = filters.startDate;
    }

    setFilters({
      ...filters,
      period,
      startDate,
      endDate: now.toISOString().split('T')[0]
    });
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
      />

      {/* Contenu principal */}
      <div className="ml-0 lg:ml-[236px] mt-[68px] p-6">
        {/* En-tête avec filtres */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
              Tableau de Bord
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Vue d'ensemble de vos performances - {activeCompany.raison_sociale}
            </p>
          </div>

          <div className="flex gap-2">
            {(['day', 'week', 'month'] as const).map((period) => (
              <button
                key={period}
                onClick={() => handlePeriodChange(period)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  filters.period === period ? 'text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={{
                  backgroundColor: filters.period === period ? chartColors.primary : colors.white,
                  fontFamily: 'Montserrat, sans-serif'
                }}
              >
                {period === 'day' ? 'Jour' : period === 'week' ? 'Semaine' : 'Mois'}
              </button>
            ))}
          </div>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Chiffre d'affaires"
            value={`${stats.totalRevenue.toLocaleString()} FCFA`}
            change="+12.5%"
            color={chartColors.primary}
            icon={<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
          />
          <StatsCard
            title="Commandes totales"
            value={stats.totalOrders.toString()}
            change="+8.2%"
            color={chartColors.info}
            icon={<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 7h-2V6a3 3 0 0 0-6 0v1H9a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM13 6a1 1 0 0 1 2 0v1h-2V6zm5 13a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h2v1a1 1 0 0 0 2 0V9h2v10z"/></svg>}
          />
          <StatsCard
            title="Panier moyen"
            value={`${stats.averageOrderValue.toLocaleString()} FCFA`}
            change="+3.8%"
            color={chartColors.success}
            icon={<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M7 4V2a1 1 0 0 1 2 0v2h6V2a1 1 0 0 1 2 0v2h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3zm13 4H4v11h16V8z"/></svg>}
          />
          <StatsCard
            title="Mobile Money"
            value={`${stats.momoPercentage}%`}
            change="+15.3%"
            color={chartColors.purple}
            icon={<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17 6H7c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM7 8h10v8H7V8z"/></svg>}
          />
        </div>

        {/* Graphiques principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Évolution des ventes */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-6" style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
              Évolution des ventes
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockSalesData}>
                <defs>
                  <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })} />
                <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                <Tooltip 
                  formatter={(value: number, name: string) => [`${value.toLocaleString()} FCFA`, name === 'totalSales' ? 'Total' : name === 'momoSales' ? 'Mobile Money' : 'Espèces']}
                  labelFormatter={(value) => new Date(value).toLocaleDateString('fr-FR')}
                />
                <Area type="monotone" dataKey="totalSales" stroke={chartColors.primary} fill="url(#totalGradient)" strokeWidth={3} />
                <Line type="monotone" dataKey="momoSales" stroke={chartColors.success} strokeWidth={2} dot={{ fill: chartColors.success }} />
                <Line type="monotone" dataKey="cashSales" stroke={chartColors.warning} strokeWidth={2} dot={{ fill: chartColors.warning }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Répartition des paiements */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-6" style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
              Répartition des paiements
            </h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, 'Pourcentage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {paymentMethodData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-sm font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {entry.name} ({entry.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Graphiques secondaires */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Affluence des commandes */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-6" style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
              Affluence des commandes par heure
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockOrdersFlow}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" tickFormatter={(value) => `${value}h`} />
                <YAxis />
                <Tooltip formatter={(value: number) => [`${value} commandes`, 'Nombre']} />
                <Bar 
                  dataKey="ordersCount" 
                  fill={chartColors.info}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Menus les plus populaires */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-6" style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
              Menus les plus commandés
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockMenuPopularity} layout="horizontal" margin={{ left: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="menuName" width={80} />
                <Tooltip formatter={(value: number) => [`${value} commandes`, 'Nombre']} />
                <Bar 
                  dataKey="ordersCount" 
                  fill={chartColors.purple}
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performances des employés */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-6" style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}>
            Performances des employés
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={mockEmployeePerformance} margin={{ bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="employeeName" 
                angle={-45} 
                textAnchor="end" 
                height={100}
                interval={0}
              />
              <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `${value.toLocaleString()} FCFA`, 
                  name === 'totalSales' ? 'Total' : name === 'momoSales' ? 'Mobile Money' : 'Espèces'
                ]}
              />
              <Bar dataKey="momoSales" stackId="a" fill={chartColors.success} radius={[0, 0, 0, 0]} />
              <Bar dataKey="cashSales" stackId="a" fill={chartColors.warning} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          {/* Tableau des performances détaillées */}
          <div className="mt-8 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Employé
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Total ventes
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Mobile Money
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Espèces
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Commandes
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Panier moyen
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockEmployeePerformance.map((employee, index) => (
                  <tr key={employee.employeeId} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-3 px-4 font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {employee.employeeName}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold" style={{ fontFamily: 'Montserrat, sans-serif', color: chartColors.primary }}>
                      {employee.totalSales.toLocaleString()} FCFA
                    </td>
                    <td className="py-3 px-4 text-right" style={{ fontFamily: 'Montserrat, sans-serif', color: chartColors.success }}>
                      {employee.momoSales.toLocaleString()} FCFA
                    </td>
                    <td className="py-3 px-4 text-right" style={{ fontFamily: 'Montserrat, sans-serif', color: chartColors.warning }}>
                      {employee.cashSales.toLocaleString()} FCFA
                    </td>
                    <td className="py-3 px-4 text-right" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {employee.ordersCount}
                    </td>
                    <td className="py-3 px-4 text-right" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {employee.averageOrderValue.toLocaleString()} FCFA
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;