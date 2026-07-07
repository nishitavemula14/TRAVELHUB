import { Route, Routes } from "react-router-dom";
import BusDetails from "../components/pages/BusDetails.jsx";
import BusSearch from "../components/pages/BusSearch.jsx";
import Login from "../components/pages/Login.jsx";
import NotFound from "../components/pages/NotFound.jsx";
import Signup from "../components/pages/Signup.jsx";
import AdminDashboard from "../components/pages/AdminDashboard.jsx";
import BookedTicketCustomers from "../components/pages/BookedTicketCustomers.jsx";
import ZeroBookingCustomers from "../components/pages/ZeroBookingCustomers.jsx";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import { USER_ROLES } from "../constants/Roles.js";

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
      <Route
        path="/admin/customers"
        element={
          <AuthenticatedRoute requiredRole={USER_ROLES.admin}>
            <AdminDashboard />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/admin/customers/zero-booking"
        element={
          <AuthenticatedRoute requiredRole={USER_ROLES.admin}>
            <ZeroBookingCustomers />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/admin/customers/booked-tickets"
        element={
          <AuthenticatedRoute requiredRole={USER_ROLES.admin}>
            <BookedTicketCustomers />
          </AuthenticatedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
