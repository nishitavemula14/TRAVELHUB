import { useState } from "react";
import AdminDashboardTemplate from "../templates/AdminDashboardTemplate.jsx";
import { getAdminCustomers } from "../../services/AuthServices.js";
import {
  getBookedForUser,
  getStoredBusList,
  storeBookingForUser,
  storeBusList,
} from "../../services/BookingServices.js";
import { buses } from "../../data/Buses.js";

export default function AdminDashboard() {
  const [customers, setCustomers] = useState(() => getAdminCustomers());
  const [busList, setBusList] = useState(() => getStoredBusList(buses));
  const totalBuses = busList.length;
  const totalBookings = customers.reduce((total, customer) => total + customer.bookedTickets, 0);
  const totalRegisteredUsers = customers.length;

  function handleAdminBooking({ busId, customerEmail, tickets }) {
    const selectedBus = busList.find((bus) => bus.id === busId);
    const ticketCount = Number(tickets);

    if (
      !selectedBus ||
      !Number.isInteger(ticketCount) ||
      ticketCount < 1 ||
      ticketCount > selectedBus.seats
    ) {
      return false;
    }

    const bookingTrip = {
      busId: selectedBus.id,
      busName: selectedBus.name,
      from: selectedBus.from,
      to: selectedBus.to,
      tickets: ticketCount,
    };
    const nextBookedTickets = getBookedForUser(customerEmail) + ticketCount;
    const nextBusList = busList.map((bus) =>
      bus.id === selectedBus.id
        ? {
            ...bus,
            seats: bus.seats - ticketCount,
          }
        : bus,
    );

    storeBookingForUser(customerEmail, nextBookedTickets, bookingTrip);
    storeBusList(nextBusList);

    setBusList(nextBusList);
    setCustomers(getAdminCustomers());

    return true;
  }

  return (
    <AdminDashboardTemplate
      busList={busList}
      customers={customers}
      onAdminBooking={handleAdminBooking}
      totalBookings={totalBookings}
      totalBuses={totalBuses}
      totalRegisteredUsers={totalRegisteredUsers}
    />
  );
}

