import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import AppLayout from '../components/layout/AppLayout';
import ProtectedRoute from './ProtectedRoute';

const EcommerceDashboard = lazy(() => import('../pages/dashboard/EcommerceDashboard'));
const AnalyticsDashboard = lazy(() => import('../pages/dashboard/AnalyticsDashboard'));
const CrmDashboard = lazy(() => import('../pages/dashboard/CrmDashboard'));
const FinanceDashboard = lazy(() => import('../pages/dashboard/FinanceDashboard'));
const ProjectsDashboard = lazy(() => import('../pages/dashboard/ProjectsDashboard'));

const ProductsPage = lazy(() => import('../pages/ecommerce/ProductsPage'));
const OrdersPage = lazy(() => import('../pages/ecommerce/OrdersPage'));
const CustomersPage = lazy(() => import('../pages/ecommerce/CustomersPage'));
const CategoriesPage = lazy(() => import('../pages/ecommerce/CategoriesPage'));
const InventoryPage = lazy(() => import('../pages/ecommerce/InventoryPage'));

const ChatApp = lazy(() => import('../pages/apps/ChatApp'));
const ProjectsApp = lazy(() => import('../pages/apps/ProjectsApp'));
const TasksApp = lazy(() => import('../pages/apps/TasksApp'));
const InvoiceApp = lazy(() => import('../pages/apps/InvoiceApp'));
const CrmApp = lazy(() => import('../pages/apps/CrmApp'));
const FinanceApp = lazy(() => import('../pages/apps/FinanceApp'));
const HrmApp = lazy(() => import('../pages/apps/HrmApp'));
const EmailApp = lazy(() => import('../pages/apps/EmailApp'));
const CalendarApp = lazy(() => import('../pages/apps/CalendarApp'));
const PromoApp = lazy(() => import('../pages/apps/PromoApp'));
const UsersPage = lazy(() => import('../pages/apps/UsersPage'));

const ProfilePage = lazy(() => import('../pages/pages/ProfilePage'));
const SettingsPage = lazy(() => import('../pages/pages/SettingsPage'));
const NotificationsPage = lazy(() => import('../pages/pages/NotificationsPage'));
const SupportPage = lazy(() => import('../pages/pages/SupportPage'));
const PluginsPage = lazy(() => import('../pages/pages/PluginsPage'));

const LoginPage = lazy(() => import('../pages/authentication/LoginPage'));
const RegisterPage = lazy(() => import('../pages/authentication/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../pages/authentication/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/authentication/ResetPasswordPage'));
const LockScreenPage = lazy(() => import('../pages/authentication/LockScreenPage'));
const TwoFactorPage = lazy(() => import('../pages/authentication/TwoFactorPage'));

const Error403 = lazy(() => import('../pages/errors/Error403'));
const Error404 = lazy(() => import('../pages/errors/Error404'));
const Error500 = lazy(() => import('../pages/errors/Error500'));
const Maintenance = lazy(() => import('../pages/errors/Maintenance'));

function SuspenseFallback() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <CircularProgress size={28} />
    </Box>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/ecommerce" replace />} />

        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="/auth/lock-screen" element={<LockScreenPage />} />
        <Route path="/auth/2fa" element={<TwoFactorPage />} />

        <Route path="/errors/403" element={<Error403 />} />
        <Route path="/errors/404" element={<Error404 />} />
        <Route path="/errors/500" element={<Error500 />} />
        <Route path="/errors/maintenance" element={<Maintenance />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard/ecommerce" element={<EcommerceDashboard />} />
            <Route path="/dashboard/analytics" element={<AnalyticsDashboard />} />
            <Route path="/dashboard/crm" element={<CrmDashboard />} />
            <Route path="/dashboard/finance" element={<FinanceDashboard />} />
            <Route path="/dashboard/projects" element={<ProjectsDashboard />} />

            <Route path="/ecommerce/products" element={<ProductsPage />} />
            <Route path="/ecommerce/products/:id" element={<ProductsPage />} />
            <Route path="/ecommerce/orders" element={<OrdersPage />} />
            <Route path="/ecommerce/orders/:id" element={<OrdersPage />} />
            <Route path="/ecommerce/customers" element={<CustomersPage />} />
            <Route path="/ecommerce/categories" element={<CategoriesPage />} />
            <Route path="/ecommerce/inventory" element={<InventoryPage />} />

            <Route path="/apps/chat" element={<ChatApp />} />
            <Route path="/apps/projects" element={<ProjectsApp />} />
            <Route path="/apps/tasks" element={<TasksApp />} />
            <Route path="/apps/invoice" element={<InvoiceApp />} />
            <Route path="/apps/crm" element={<CrmApp />} />
            <Route path="/apps/finance" element={<FinanceApp />} />
            <Route path="/apps/hrm" element={<HrmApp />} />
            <Route path="/apps/email" element={<EmailApp />} />
            <Route path="/apps/calendar" element={<CalendarApp />} />
            <Route path="/apps/promo" element={<PromoApp />} />

            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id" element={<UsersPage />} />

            <Route path="/pages/profile" element={<ProfilePage />} />
            <Route path="/pages/settings" element={<SettingsPage />} />
            <Route path="/pages/notifications" element={<NotificationsPage />} />
            <Route path="/pages/support" element={<SupportPage />} />
            <Route path="/pages/plugins" element={<PluginsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
}
