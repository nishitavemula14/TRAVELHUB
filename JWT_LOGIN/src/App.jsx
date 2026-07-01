import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Components/Navbar.jsx";
import AppRoutes from "./Components/Routing/AppRoutes.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { BookingProvider } from "./Context/BookingContext.jsx";

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




