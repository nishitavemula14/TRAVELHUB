import { useContext } from "react";
import { BookingContext } from "./BookingContextValue.js";

export function useBooking() {
  return useContext(BookingContext);
}
