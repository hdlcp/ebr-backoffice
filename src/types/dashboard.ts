// src/types/dashboard.ts

export interface SalesData {
  date: string;
  totalSales: number;
  momoSales: number;
  cashSales: number;
  ordersCount: number;
}

export interface MenuPopularity {
  menuName: string;
  ordersCount: number;
  totalRevenue: number;
  category: 'boissons' | 'repas';
}

export interface EmployeePerformance {
  employeeId: string;
  employeeName: string;
  totalSales: number;
  momoSales: number;
  cashSales: number;
  ordersCount: number;
  averageOrderValue: number;
}

export interface OrdersFlow {
  hour: number;
  ordersCount: number;
  peakHour?: boolean;
}

export interface DashboardFilters {
  startDate: string;
  endDate: string;
  period: 'day' | 'week' | 'month' | 'custom';
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  momoPercentage: number;
  cashPercentage: number;
  growthRate: number;
}

export interface ChartColors {
  primary: string;
  secondary: string;
  success: string;
  info: string;
  warning: string;
  danger: string;
  gradient1: string[];
  gradient2: string[];
}