import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CustomerDetailsList from "../organisms/CustomerDetailsList.jsx";

function getSearchText(customer) {
  const tripText = customer.trips
    .map((trip) => `${trip.from} ${trip.to} ${trip.from} to ${trip.to} ${trip.busName}`)
    .join(" ");

  return `${customer.name} ${customer.email} ${customer.role} ${customer.bookedTickets} ${tripText}`.toLowerCase();
}

export default function CustomerDetailsPageTemplate({ customers, title }) {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("search") ?? "");
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredCustomers = useMemo(() => {
    if (!normalizedSearchQuery) {
      return customers;
    }

    return customers.filter((customer) => getSearchText(customer).includes(normalizedSearchQuery));
  }, [customers, normalizedSearchQuery]);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-5 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h1>
        <Link
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          to={searchQuery.trim() ? `/admin/customers?search=${encodeURIComponent(searchQuery.trim())}` : "/admin/customers"}
        >
          Back to Main Page
        </Link>
      </div>

      <div className="mb-4">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-slate-700">Search customers or routes</span>
          <input
            className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search name, email, from city, to city"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </label>
        <p className="mt-2 text-sm text-slate-500">
          Showing {filteredCustomers.length} of {customers.length} customers
        </p>
      </div>

      <CustomerDetailsList customers={filteredCustomers} />
    </main>
  );
}
