import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLocked = useAuthStore((s) => s.isLocked);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }
  if (isLocked) {
    return <Navigate to="/auth/lock-screen" replace />;
  }
  return <Outlet />;
}
