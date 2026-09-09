import { Navigate } from 'react-router-dom';

// The Projects app shares its data and UI with the Projects dashboard.
export default function ProjectsApp() {
  return <Navigate to="/dashboard/projects" replace />;
}
