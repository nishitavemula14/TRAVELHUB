import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

export default function AuthenticatedRoute({ children, requiredRole }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
