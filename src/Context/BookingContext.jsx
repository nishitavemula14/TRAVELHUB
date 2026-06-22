import { createContext, useContext } from "react";

export const BookingContext = createContext();
export const useBooking = () => useContext(BookingContext);