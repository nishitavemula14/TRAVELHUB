import { useState } from "react";
import AdminSearch from "../atoms/AdminSearch.jsx";
import CustomerDetailsList from "./CustomerDetailsList.jsx";

export default function AdminRegisteredUsers({ customers }) {
  const [search, setSearch] = useState("");
  const searchText = search.trim().toLowerCase();
  const filteredCustomers = customers.filter((customer) => {
    const trips = customer.trips
      .map((trip) => `${trip.busName} ${trip.from} ${trip.to} ${trip.tickets}`)
      .join(" ");
    const customerDetails = `${customer.name} ${customer.email} ${customer.role} ${customer.bookedTickets} ${trips}`;

    return customerDetails.toLowerCase().includes(searchText);
  });

  return (
    <section className="mb-5">
      <h2 className="mb-2 text-lg font-bold text-slate-900">Total Registered Users</h2>
      <AdminSearch
        placeholder="Search users by name, email, role, bookings, from or to..."
        value={search}
        onChange={setSearch}
      />
      <CustomerDetailsList customers={filteredCustomers} />
    </section>
  );
}
