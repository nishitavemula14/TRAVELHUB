import { Link } from "react-router-dom";

export default function BusCard({ bus }) {
    return (
        <Link to={`/bus/${bus.id}`} className="card">
            <h3>Bus Name: {bus.name}</h3>
            <p><b>From:</b> {bus.from}</p>
            <p><b>To:</b> {bus.to}</p>
            <span><b>Departure:</b> {bus.departure}</span>
            <span><b>Price:</b> Rs. {bus.Price}</span>
            <span><b>Available Seats:</b> {bus.seats}</span>
        </Link>
    );
}
