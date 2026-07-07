import { useState } from "react";
import { toast } from "react-toastify";

export default function AdminBookTickets({ busList, customers, onAdminBooking }) {
  const [customerEmail, setCustomerEmail] = useState(customers[0]?.email ?? "");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [busId, setBusId] = useState("");
  const [tickets, setTickets] = useState("1");

  const cityOptions = [...new Set(busList.flatMap((bus) => [bus.from, bus.to]))];
  const routeBuses = busList.filter(
    (bus) =>
      bus.from.toLowerCase() === fromCity.trim().toLowerCase() &&
      bus.to.toLowerCase() === toCity.trim().toLowerCase(),
  );
  const selectedBus = routeBuses.find((bus) => bus.id === busId);
  const ticketCount = Number(tickets);

  let ticketError = "";

  if (tickets === "") {
    ticketError = "Enter number of tickets.";
  } else if (!Number.isInteger(ticketCount)) {
    ticketError = "Tickets must be a whole number.";
  } else if (ticketCount < 1) {
    ticketError = "Tickets must be at least 1.";
  } else if (selectedBus && ticketCount > selectedBus.seats) {
    ticketError = "Tickets cannot be more than available seats.";
  }

  const canBook =
    customerEmail !== "" &&
    selectedBus &&
    selectedBus.seats > 0 &&
    ticketError === "";

  function resetBusSelection() {
    setBusId("");
    setTickets("1");
  }

  function swapCities() {
    setFromCity(toCity);
    setToCity(fromCity);
    resetBusSelection();
  }

  function bookTickets(event) {
    event.preventDefault();

    if (!canBook) {
      toast.error("Select a customer, route, bus, and valid ticket count.");
      return;
    }

    const bookingDone = onAdminBooking({
      busId,
      customerEmail,
      tickets: ticketCount,
    });

    if (bookingDone) {
      toast.success("Ticket booked successfully by admin!");
      resetBusSelection();
    } else {
      toast.error("Unable to book tickets for this route.");
    }
  }

  return (
    <section className="mb-5 rounded-lg border border-slate-300 bg-white p-4">
      <form className="grid gap-3 md:grid-cols-6" onSubmit={bookTickets}>
        <label className="block md:col-span-2">
          <span className="mb-1 block text-sm font-semibold text-slate-800">Customer</span>
          <select
            className="w-full rounded-md border border-slate-300 px-3 py-3 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            value={customerEmail}
            onChange={(event) => setCustomerEmail(event.target.value)}
          >
            {customers.map((customer) => (
              <option key={customer.email} value={customer.email}>
                {customer.name} ({customer.email})
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-slate-800">From</span>
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-3 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            list="admin-from-cities"
            placeholder="From City"
            value={fromCity}
            onChange={(event) => {
              setFromCity(event.target.value);
              resetBusSelection();
            }}
          />
          <datalist id="admin-from-cities">
            {cityOptions.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </label>

        <div className="flex pt-6">
          <button
            className="h-[46px] w-full rounded-md bg-blue-500 px-3 text-sm font-semibold text-white transition hover:bg-blue-600"
            type="button"
            onClick={swapCities}
          >
            Swap
          </button>
        </div>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-slate-800">To</span>
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-3 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            list="admin-to-cities"
            placeholder="To City"
            value={toCity}
            onChange={(event) => {
              setToCity(event.target.value);
              resetBusSelection();
            }}
          />
          <datalist id="admin-to-cities">
            {cityOptions.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-slate-800">Tickets</span>
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-3 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            min="1"
            max={selectedBus?.seats ?? 1}
            required
            step="1"
            type="number"
            value={tickets}
            onChange={(event) => setTickets(event.target.value)}
          />
          {ticketError && <span className="mt-1 block text-xs font-medium text-red-600">{ticketError}</span>}
        </label>

        <label className="block md:col-span-5">
          <span className="mb-1 block text-sm font-semibold text-slate-800">Bus</span>
          <select
            className="w-full rounded-md border border-slate-300 px-3 py-3 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            value={busId}
            onChange={(event) => {
              setBusId(event.target.value);
              setTickets("1");
            }}
          >
            <option value="">Select a bus for the route</option>
            {routeBuses.map((bus) => (
              <option key={bus.id} value={bus.id}>
                {bus.name} - {bus.departure} - {bus.seats} seats - Rs.{bus.Price}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-end">
          <button
            className="h-[46px] w-full rounded-md bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:bg-slate-400"
            disabled={!canBook}
            type="submit"
          >
            Book
          </button>
        </div>
      </form>

      {fromCity && toCity && routeBuses.length === 0 && (
        <p className="mt-3 text-sm font-medium text-red-600">No buses found for this route.</p>
      )}
      {customers.length === 0 && (
        <p className="mt-3 text-sm font-medium text-slate-600">No registered customers are available.</p>
      )}
    </section>
  );
}
