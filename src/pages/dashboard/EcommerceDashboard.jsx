import { useCallback, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import PageHeader from '../../components/layout/PageHeader';
import WelcomeCard from '../../components/dashboard/WelcomeCard';
import StatCard from '../../components/dashboard/StatCard';
import StorePerformanceCard from '../../components/dashboard/StorePerformanceCard';
import WeeklyPerformanceCard from '../../components/dashboard/WeeklyPerformanceCard';
import SalesReportCard from '../../components/dashboard/SalesReportCard';
import TopSellingProductsCard from '../../components/dashboard/TopSellingProductsCard';
import RecentOrdersCard from '../../components/dashboard/RecentOrdersCard';
import RevenueLocationsCard from '../../components/dashboard/RevenueLocationsCard';
import RecentActivityCard from '../../components/dashboard/RecentActivityCard';
import { KpiSkeleton } from '../../components/common/Skeletons';
import ErrorState from '../../components/common/ErrorState';
import { dashboardService } from '../../services/dashboardService';

const breadcrumbs = [{ label: 'Dashboard', path: '/dashboard/ecommerce' }, { label: 'eCommerce' }];

export default function EcommerceDashboard() {
  const [kpis, setKpis] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [weekly, setWeekly] = useState(null);
  const [topProducts, setTopProducts] = useState(null);
  const [recentOrders, setRecentOrders] = useState(null);
  const [locations, setLocations] = useState(null);
  const [activity, setActivity] = useState(null);
  const [salesRange, setSalesRange] = useState('Monthly');
  const [salesData, setSalesData] = useState(null);
  const [error, setError] = useState(false);

  const loadAll = useCallback(() => {
    setError(false);
    setKpis(null);
    setPerformance(null);
    setWeekly(null);
    setTopProducts(null);
    setRecentOrders(null);
    setLocations(null);
    setActivity(null);
    setSalesData(null);

    Promise.all([
      dashboardService.getKpis().then(setKpis),
      dashboardService.getStorePerformance().then(setPerformance),
      dashboardService.getWeeklyPerformance().then(setWeekly),
      dashboardService.getTopProducts().then(setTopProducts),
      dashboardService.getRecentOrders().then(setRecentOrders),
      dashboardService.getRevenueByLocation().then(setLocations),
      dashboardService.getRecentActivity().then(setActivity),
      dashboardService.getSalesReport(salesRange).then(setSalesData),
    ]).catch(() => setError(true));
  }, [salesRange]);

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dashboardService.getSalesReport(salesRange).then(setSalesData);
  }, [salesRange]);

  if (error) {
    return <ErrorState onRetry={loadAll} />;
  }

  return (
    <>
      <PageHeader title="eCommerce" breadcrumbs={breadcrumbs} />

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 3 }}>
          <WelcomeCard />
        </Grid>
        {(kpis || [1, 2, 3]).map((stat, i) => (
          <Grid key={kpis ? stat.id : i} size={{ xs: 12, sm: 6, lg: 3 }}>
            {kpis ? <StatCard stat={stat} /> : <KpiSkeleton />}
          </Grid>
        ))}

        <Grid size={{ xs: 12, lg: 4 }}>
          <StorePerformanceCard data={performance} loading={!performance} onRefresh={() => dashboardService.getStorePerformance().then(setPerformance)} />
        </Grid>
        <Grid size={{ xs: 12, lg: 8 }}>
          <WeeklyPerformanceCard data={weekly} loading={!weekly} />
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <SalesReportCard
            range={salesRange}
            onRangeChange={setSalesRange}
            data={salesData}
            loading={!salesData}
            ordersTotal={salesData?.ordersTotal}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <TopSellingProductsCard products={topProducts || []} loading={!topProducts} />
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <RecentOrdersCard orders={recentOrders || []} loading={!recentOrders} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <RevenueLocationsCard data={locations} loading={!locations} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <RecentActivityCard activities={activity || []} loading={!activity} />
        </Grid>
      </Grid>
    </>
  );
}
