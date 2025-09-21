// src/types/stats.ts

export interface DailyValidation {
  id: string;
  serverId: string;
  serverName: string;
  tableName: string;
  items: OrderItem[];
  totalMomo: number;
  totalEspeces: number;
  total: number;
  paymentMethod: 'momo' | 'especes';
  status: 'validated' | 'pending';
  validatedAt: string;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface ServerStats {
  serverId: string;
  serverName: string;
  totalMomo: number;
  totalEspeces: number;
  total: number;
  ordersCount: number;
  validations: DailyValidation[];
}

export interface DailyStats {
  date: string;
  servers: ServerStats[];
  totalMomo: number;
  totalEspeces: number;
  grandTotal: number;
  totalOrders: number;
}

export interface MonthlyStats {
  month: string;
  year: number;
  totalSales: number;
  totalOrders: number;
  averagePerDay: number;
  bestDay: {
    date: string;
    amount: number;
  };
  topServer: {
    name: string;
    amount: number;
  };
}

export interface StatsFilter {
  startDate: string;
  endDate: string;
  serverId?: string;
  paymentMethod?: 'all' | 'momo' | 'especes';
}