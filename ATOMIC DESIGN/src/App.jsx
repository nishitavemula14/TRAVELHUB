import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppRoutes from "./routing/AppRoutes.jsx";
import Navbar from "./components/organisms/Navbar.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BookingProvider } from "./context/BookingContext.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <BrowserRouter>
          <Navbar />

          <AppRoutes />

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
          />
        </BrowserRouter>
      </BookingProvider>
    </AuthProvider>
  );
}
