// src/pages/dashboard/DashboardPage.tsx
import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { colors } from '../../config/colors';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

interface DashboardPageProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

// Exemple de données pour les montants gagnés par jour
const revenueData = [
  { date: '01/09', revenue: 120000, sales: 25 },
  { date: '02/09', revenue: 95000, sales: 18 },
  { date: '03/09', revenue: 160000, sales: 32 },
  { date: '04/09', revenue: 110000, sales: 21 },
  { date: '05/09', revenue: 175000, sales: 35 },
  { date: '06/09', revenue: 142000, sales: 27 },
  { date: '07/09', revenue: 195000, sales: 38 },
];

// Exemple de répartition des ventes par mode de paiement
const paymentData = [
  { name: 'Mobile Money', value: 400000 },
  { name: 'Espèces', value: 320000 },
  { name: 'Carte bancaire', value: 180000 },
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B'];

const DashboardPage: React.FC<DashboardPageProps> = ({ currentPage, onNavigate }) => {
  const [activePeriod, setActivePeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  return (
    <Layout
      userName="Marc"
      userRole="Administrateur"
      currentPage={currentPage}
      onNavigate={onNavigate}
    >
      <div className="mb-8">
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}
        >
          TABLEAU DE BORD
        </h1>
      </div>

      {/* Choix de période */}
      <div className="flex gap-3 mb-6">
        {(['daily', 'weekly', 'monthly'] as const).map((period) => (
          <button
            key={period}
            onClick={() => setActivePeriod(period)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activePeriod === period ? 'text-white' : 'text-gray-700'
            }`}
            style={{
              backgroundColor: activePeriod === period ? colors.primary : colors.white,
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            {period === 'daily' ? 'Journalier' : period === 'weekly' ? 'Hebdomadaire' : 'Mensuel'}
          </button>
        ))}
      </div>

      {/* Section Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Courbe des revenus */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2
            className="text-lg font-bold mb-4"
            style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}
          >
            Revenus par période
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value: number) => `${value.toLocaleString()} FCFA`} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Nombre de ventes */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2
            className="text-lg font-bold mb-4"
            style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}
          >
            Nombre de ventes par période
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition par mode de paiement */}
        <div className="bg-white rounded-lg p-6 shadow-sm col-span-1 lg:col-span-2">
          <h2
            className="text-lg font-bold mb-4"
            style={{ fontFamily: 'Montserrat, sans-serif', color: colors.text.primary }}
          >
            Répartition des paiements
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {paymentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value.toLocaleString()} FCFA`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
