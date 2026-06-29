import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Components/Navbar.jsx";
import { BookingContext } from "./Context/BookingContext.jsx";
import { buses } from "./data/Buses.js";
import BusDetails from "./pages/BusDetails.jsx";
import BusSearch from "./pages/BusSearch.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const [booked, setBooked] = useState(0);
  const [busList, setBusList] = useState(buses);

  return (
    <BookingContext.Provider
      value={{
        booked,
        setBooked,
        busList,
        setBusList,
      }}
    >
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<BusSearch />} />
          <Route path="/bus/:id" element={<BusDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

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
    </BookingContext.Provider>
  );
}




