import { useState } from "react";
import {
  getBookedForUser,
  getStoredBusList,
  storeBookedForUser,
  storeBusList,
} from "../Components/Services/BookingServices.js";
import { buses } from "../Data/Buses.js";
import { useAuth } from "./useAuth.js";
import { BookingContext } from "./BookingContextValue.js";

export function BookingProvider({ children }) {
  const { isAuthenticated, user } = useAuth();
  const bookingEmail = isAuthenticated ? user?.email : "";
  const [bookedByEmail, setBookedByEmail] = useState(() =>
    bookingEmail ? { [bookingEmail]: getBookedForUser(bookingEmail) } : {},
  );
  const [busList, setBusListState] = useState(() => getStoredBusList(buses));
  const booked = bookingEmail ? (bookedByEmail[bookingEmail] ?? getBookedForUser(bookingEmail)) : 0;

  function setBooked(value) {
    if (!bookingEmail) {
      return;
    }

    setBookedByEmail((currentBookedByEmail) => {
      const currentBooked = currentBookedByEmail[bookingEmail] ?? getBookedForUser(bookingEmail);
      const nextBooked = typeof value === "function" ? value(currentBooked) : value;

      storeBookedForUser(bookingEmail, nextBooked);

      return {
        ...currentBookedByEmail,
        [bookingEmail]: nextBooked,
      };
    });
  }

  function setBusList(value) {
    setBusListState((currentBusList) => {
      const nextBusList = typeof value === "function" ? value(currentBusList) : value;

      storeBusList(nextBusList);

      return nextBusList;
    });
  }

  return (
    <BookingContext.Provider
      value={{
        booked,
        setBooked,
        busList,
        setBusList,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
