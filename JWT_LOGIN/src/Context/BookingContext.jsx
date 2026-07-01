import { createContext, useContext, useEffect, useState } from "react";
import {
  getBookedForUser,
  getStoredBusList,
  storeBookedForUser,
  storeBusList,
} from "../Components/Services/BookingServices.js";
import { buses } from "../Data/Buses.js";
import { useAuth } from "./useAuth.js";

export const BookingContext = createContext();
export const useBooking = () => useContext(BookingContext);

export function BookingProvider({ children }) {
  const { isAuthenticated, user } = useAuth();
  const [booked, setBookedState] = useState(0);
  const [busList, setBusListState] = useState(() => getStoredBusList(buses));

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      setBookedState(getBookedForUser(user.email));
      return;
    }

    setBookedState(0);
  }, [isAuthenticated, user]);

  function setBooked(value) {
    setBookedState((currentBooked) => {
      const nextBooked = typeof value === "function" ? value(currentBooked) : value;

      if (isAuthenticated && user?.email) {
        storeBookedForUser(user.email, nextBooked);
      }

      return nextBooked;
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
