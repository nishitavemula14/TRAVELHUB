import { Link } from "react-router-dom";
import { useBooking } from "../Context/BookingContext.jsx";
import "./Navbar.css";

export default function Navbar() {
    const { booked } = useBooking();

    return (
        <header className="navbar">
            <Link to="/" className="logo">
                <span className="bus-logo">BUS</span>
                BusTravel Hub
            </Link>
            <nav className="nav-links">
                <Link to="/">Back to Search</Link>
                <span>Booked: {booked}</span>
            </nav>
        </header>
    );
}
