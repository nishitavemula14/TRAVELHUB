import { useState } from "react";
import AdminSearch from "../atoms/AdminSearch.jsx";

export default function AdminBookingTable({ bookingRows }) {
  const [search, setSearch] = useState("");
  const searchText = search.trim().toLowerCase();
  const filteredBookings = bookingRows.filter((row) => {
    const bookingDetails = `${row.name} ${row.role} ${row.email} ${row.travels} ${row.seats} ${row.from} ${row.to}`;

    return bookingDetails.toLowerCase().includes(searchText);
  });

  return (
    <section>
      <h2 className="mb-2 text-lg font-bold text-slate-900">Total Booking</h2>
      <AdminSearch
        placeholder="Search bookings by name, email, bus, seats, from or to..."
        value={search}
        onChange={setSearch}
      />
      <div className="overflow-hidden rounded-lg border border-slate-300 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="border-b border-slate-300 px-4 py-3 font-bold text-slate-950">Name</th>
                <th className="border-b border-slate-300 px-4 py-3 font-bold text-slate-950">Role</th>
                <th className="border-b border-slate-300 px-4 py-3 font-bold text-slate-950">Email</th>
                <th className="border-b border-slate-300 px-4 py-3 font-bold text-slate-950">Travels</th>
                <th className="border-b border-slate-300 px-4 py-3 font-bold text-slate-950">Seats</th>
                <th className="border-b border-slate-300 px-4 py-3 font-bold text-slate-950">From</th>
                <th className="border-b border-slate-300 px-4 py-3 font-bold text-slate-950">To</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((row, index) => {
                const borderClass = index === filteredBookings.length - 1 ? "" : "border-b border-slate-300";

                return (
                  <tr key={row.key}>
                    <td className={`${borderClass} px-4 py-3 font-medium text-slate-900`}>{row.name}</td>
                    <td className={`${borderClass} px-4 py-3 text-slate-800`}>{row.role}</td>
                    <td className={`${borderClass} px-4 py-3 text-slate-800`}>{row.email}</td>
                    <td className={`${borderClass} px-4 py-3 text-slate-800`}>{row.travels}</td>
                    <td className={`${borderClass} px-4 py-3 text-slate-800`}>{row.seats}</td>
                    <td className={`${borderClass} px-4 py-3 text-slate-800`}>{row.from}</td>
                    <td className={`${borderClass} px-4 py-3 text-slate-800`}>{row.to}</td>
                  </tr>
                );
              })}
              {filteredBookings.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-slate-600" colSpan={7}>No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
