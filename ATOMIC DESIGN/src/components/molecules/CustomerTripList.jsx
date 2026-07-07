export default function CustomerTripList({ customer }) {
  if (!customer.trips?.length) {
    return <span className="text-slate-500">No bookings</span>;
  }

  return (
    <ul className="space-y-1">
      {customer.trips.map((trip, index) => (
        <li key={`${customer.email}-${trip.busId}-${index}`}>
          {trip.from} to {trip.to} ({trip.tickets} tickets)
        </li>
      ))}
    </ul>
  );
}
