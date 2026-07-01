import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/useAuth.js";


export default function AuthenticatedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();


  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }


  return children;
}

