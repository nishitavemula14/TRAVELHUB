import { Link } from "react-router-dom";

export default function BusCard({ bus }) {
  return (
    <Link
      to={`/bus/${bus.id}`}
      className="block rounded-xl bg-gray-100 p-4 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg sm:p-5 md:p-6"
    >
      <h3 className="mb-4 text-center text-xl font-bold text-slate-800 md:mb-6">
        {bus.name}
      </h3>

      <div className="space-y-2 md:space-y-3">
        <p className="text-sm text-slate-600 sm:text-base">
          <span className="font-semibold">Route:</span> {bus.from} to {bus.to}
        </p>

        <p className="text-sm text-slate-600 sm:text-base">
          <span className="font-semibold">Departure:</span> {bus.departure}
        </p>

        <p className="text-sm text-slate-600 sm:text-base">
          <span className="font-semibold">Available Seats:</span> {bus.seats}
        </p>

        <p className="text-sm text-slate-600 sm:text-base">
          <span className="font-semibold"> Price:</span>
          {bus.Price}
        </p>
      </div>

      <button className="mt-4 rounded-md bg-blue-400 px-3 py-2 text-sm text-black transition hover:bg-blue-600 sm:text-base md:mt-5 md:px-5 md:py-3">
        View Details
      </button>
    </Link>
  );
}
