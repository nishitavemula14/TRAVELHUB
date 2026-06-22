import { useParams } from "react-router-dom";
import { useState } from "react";
import { useBooking } from "../Context/BookingContext.jsx";

export default function BusDetails() {
    const { id } = useParams();
    const { booked, setBooked, busList, setBusList } = useBooking();
    const [tickets, setTickets] = useState(1);

    const bus = busList.find((item) => item.id === id);

    if (!bus) return <main><h1>Bus Not Found</h1></main>;

    let selectedTickets = tickets;

    if (bus.seats === 0) {
        selectedTickets = 0;
    }

    if (tickets > bus.seats) {
        selectedTickets = bus.seats;
    }

    const noSeatsAvailable = bus.seats === 0;
    const cannotDecrease = selectedTickets <= 1 || noSeatsAvailable;
    const cannotIncrease = selectedTickets >= bus.seats || noSeatsAvailable;

    function increaseTickets() {
        if (tickets < bus.seats) {
            setTickets(tickets + 1);
        }
    }

    function decreaseTickets() {
        if (tickets > 1) {
            setTickets(tickets - 1);
        }
    }

    function book() {
        const newBookedTotal = booked + selectedTickets;
        const updatedBusList = busList.map(function (item) {
            if (item.id === id) {
                return {
                    ...item,
                    seats: item.seats - selectedTickets,
                };
            }

            return item;
        });

        setBooked(newBookedTotal);
        setBusList(updatedBusList);
        setTickets(1);
        alert("Tickets Booked Successfully!");
    }

    return (
        <main>
            <article className="details">
                <h1>{bus.name}</h1>
                <p><b>Route:</b> {bus.from} to {bus.to}</p>
                <p><b>Price:</b> Rs. {bus.Price}</p>
                <p><b>Departure:</b> {bus.departure}</p>
                <p><b>Duration:</b> {bus.duration}</p>
                <p><b>Available Seats:</b> {bus.seats}</p>
                <div className="qty" aria-label="Select tickets">
                    <button
                        type="button"
                        disabled={cannotDecrease}
                        onClick={decreaseTickets}
                    >
                        -
                    </button>
                    <b>{selectedTickets}</b>
                    <button
                        type="button"
                        disabled={cannotIncrease}
                        onClick={increaseTickets}
                    >
                        +
                    </button>
                </div>
                <button disabled={noSeatsAvailable} onClick={book}>
                    Book Tickets
                </button>
            </article>
        </main>
    );
}
