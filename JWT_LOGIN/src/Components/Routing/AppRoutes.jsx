import { Route, Routes } from "react-router-dom";
import BusDetails from "../../Pages/BusDetails.jsx";
import BusSearch from "../../Pages/BusSearch.jsx";
import Login from "../../Pages/Login.jsx";
import NotFound from "../../Pages/NotFound.jsx";
import Signup from "../../Pages/Signup.jsx";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BusSearch />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/bus/:id"
        element={
          <AuthenticatedRoute>
            <BusDetails />
          </AuthenticatedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

