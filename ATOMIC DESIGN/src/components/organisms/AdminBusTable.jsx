import { useState } from "react";
import AdminSearch from "../atoms/AdminSearch.jsx";

export default function AdminBusTable({ busList }) {
  const [search, setSearch] = useState("");
  const searchText = search.trim().toLowerCase();
  const filteredBuses = busList.filter((bus) => {
    const busDetails = `${bus.name} ${bus.from} ${bus.to} ${bus.departure} ${bus.seats} ${bus.Price}`;

    return busDetails.toLowerCase().includes(searchText);
  });

  return (
    <section className="mb-5">
      <h2 className="mb-2 text-lg font-bold text-slate-900">Total Buses List</h2>
      <AdminSearch
        placeholder="Search buses by name, route, departure, seats or price..."
        value={search}
        onChange={setSearch}
      />
      <div className="overflow-hidden rounded-lg border border-slate-300 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="border-b border-slate-300 px-4 py-3 font-bold text-slate-950">Bus Name</th>
                <th className="border-b border-slate-300 px-4 py-3 font-bold text-slate-950">Route</th>
                <th className="border-b border-slate-300 px-4 py-3 font-bold text-slate-950">Departure</th>
                <th className="border-b border-slate-300 px-4 py-3 font-bold text-slate-950">Seats</th>
                <th className="border-b border-slate-300 px-4 py-3 font-bold text-slate-950">Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredBuses.map((bus, index) => {
                const borderClass = index === filteredBuses.length - 1 ? "" : "border-b border-slate-300";

                return (
                  <tr key={bus.id}>
                    <td className={`${borderClass} px-4 py-3 font-medium text-slate-900`}>{bus.name}</td>
                    <td className={`${borderClass} px-4 py-3 text-slate-800`}>{bus.from} to {bus.to}</td>
                    <td className={`${borderClass} px-4 py-3 text-slate-800`}>{bus.departure}</td>
                    <td className={`${borderClass} px-4 py-3 text-slate-800`}>{bus.seats}</td>
                    <td className={`${borderClass} px-4 py-3 text-slate-800`}>{bus.Price}</td>
                  </tr>
                );
              })}
              {filteredBuses.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-slate-600" colSpan={5}>No buses found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
