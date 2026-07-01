import { Route, Routes } from "react-router-dom";
import BusDetails from "../../pages/BusDetails.jsx";
import BusSearch from "../../pages/BusSearch.jsx";
import Login from "../../pages/Login.jsx";
import NotFound from "../../pages/NotFound.jsx";
import Signup from "../../pages/Signup.jsx";
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

