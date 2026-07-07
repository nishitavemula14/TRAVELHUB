import { useMemo, useState } from "react";
import AdminBookTickets from "../organisms/AdminBookTickets.jsx";
import AdminBookingTable from "../organisms/AdminBookingTable.jsx";
import AdminBusTable from "../organisms/AdminBusTable.jsx";
import AdminCustomerSummary from "../organisms/AdminCustomerSummary.jsx";
import AdminRegisteredUsers from "../organisms/AdminRegisteredUsers.jsx";

function getCustomerTripRows(customers) {
  return customers.flatMap((customer) =>
    customer.trips.map((trip, index) => ({
      email: customer.email,
      from: trip.from,
      key: `${customer.email}-${trip.busId}-${index}`,
      name: customer.name,
      role: customer.role,
      seats: trip.tickets,
      to: trip.to,
      travels: trip.busName,
    })),
  );
}

export default function AdminDashboardTemplate({
  busList,
  customers,
  onAdminBooking,
  totalBookings,
  totalBuses,
  totalRegisteredUsers,
}) {
  const [showAdminBooking, setShowAdminBooking] = useState(false);
  const [showBusList, setShowBusList] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [showRegisteredUsers, setShowRegisteredUsers] = useState(false);
  const bookingRows = useMemo(() => getCustomerTripRows(customers), [customers]);

  function handleShowBusList() {
    setShowBusList((isShowing) => !isShowing);
    setShowBookings(false);
    setShowRegisteredUsers(false);
  }

  function handleShowBookings() {
    setShowBookings((isShowing) => !isShowing);
    setShowBusList(false);
    setShowRegisteredUsers(false);
  }

  function handleShowRegisteredUsers() {
    setShowRegisteredUsers((isShowing) => !isShowing);
    setShowBusList(false);
    setShowBookings(false);
  }

  function openBookTickets() {
    setShowAdminBooking(true);
    setShowBusList(false);
    setShowBookings(false);
    setShowRegisteredUsers(false);
  }

  function goBackToMainPage() {
    setShowAdminBooking(false);
  }

  if (showAdminBooking) {
    return (
      <main className="mx-auto w-full max-w-6xl px-3 py-2 sm:px-4">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Book Tickets</h1>
          <button
            className="rounded-md bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
            type="button"
            onClick={goBackToMainPage}
          >
            Back to Main Page
          </button>
        </div>

        <AdminBookTickets busList={busList} customers={customers} onAdminBooking={onAdminBooking} />
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-3 py-2 sm:px-4">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <button
          className="rounded-md bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
          type="button"
          onClick={openBookTickets}
        >
          Book Tickets
        </button>
      </div>

      <div className="mb-5">
        <AdminCustomerSummary
          isShowingBusList={showBusList}
          isShowingBookings={showBookings}
          isShowingRegisteredUsers={showRegisteredUsers}
          onShowBusList={handleShowBusList}
          onShowBookings={handleShowBookings}
          onShowRegisteredUsers={handleShowRegisteredUsers}
          totalBookings={totalBookings}
          totalBuses={totalBuses}
          totalRegisteredUsers={totalRegisteredUsers}
        />
      </div>

      {showBusList && <AdminBusTable busList={busList} />}

      {showRegisteredUsers && <AdminRegisteredUsers customers={customers} />}

      {showBookings && <AdminBookingTable bookingRows={bookingRows} />}
    </main>
  );
}
