import { mockRequest } from './api';
import { kpiStats, storePerformance, weeklyPerformance, salesReportByRange, todaysEarnings, propertyStatus } from '../data/dashboard';
import { revenueByLocation, revenueRecord } from '../data/locations';
import { recentOrders } from '../data/orders';
import { topSellingProducts } from '../data/products';
import { activities } from '../data/activities';

export const dashboardService = {
  getKpis: () => mockRequest(kpiStats),
  getStorePerformance: () => mockRequest(storePerformance),
  getWeeklyPerformance: () => mockRequest(weeklyPerformance),
  getSalesReport: (range = 'Monthly') => mockRequest({ ...salesReportByRange[range], todaysEarnings, propertyStatus }),
  getRevenueByLocation: () => mockRequest({ locations: revenueByLocation, record: revenueRecord }),
  getRecentOrders: () => mockRequest(recentOrders),
  getTopProducts: () => mockRequest(topSellingProducts),
  getRecentActivity: () => mockRequest(activities),
};
