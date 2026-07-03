import { Link } from "react-router-dom";
import { useAuth } from "../Context/useAuth.js";
import { useBooking } from "../Context/useBooking.js";

export default function Navbar() {
  const { booked } = useBooking();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="flex flex-col justify-between gap-4 bg-blue-400 px-6 py-4 text-black sm:px-10 md:flex-row md:items-center">
      <Link to="/" className="flex items-center gap-3 text-xl font-bold">
        <span className="rounded-lg bg-amber-200 px-2 py-1 text-lg">BUS</span>
        BusTravel Hub
      </Link>

      <nav className="flex flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
        <Link
          to="/"
          className="w-auto rounded-md bg-rose-300 px-4 py-2 font-medium text-black"
        >
          Back to Search
        </Link>

        <span className="rounded-md bg-rose-300 px-4 py-2 text-center font-medium sm:w-auto">
          Booked: {isAuthenticated ? booked : 0}
        </span>

        {isAuthenticated ? (
          <button
            type="button"
            onClick={logout}
            className="rounded-md bg-slate-800 px-4 py-2 text-center font-medium text-white sm:w-auto"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="rounded-md bg-emerald-200 px-4 py-2 text-center font-medium sm:w-auto"
          >
            Login
          </Link>
        )}

        {isAuthenticated && (
          <span className="rounded-md bg-emerald-200 px-4 py-2 text-center font-medium sm:w-auto">
            {user.name}
          </span>
        )}
      </nav>
    </header>
  );
}
