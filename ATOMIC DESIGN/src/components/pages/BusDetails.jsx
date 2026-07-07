import { useParams } from "react-router-dom";
import { useState } from "react";
import { useBooking } from "../../context/useBooking.js";
import { toast } from "react-toastify";

export default function BusDetails() {
  const { id } = useParams();
  const { setBooked, addBookingTrip, busList, setBusList } = useBooking();

  const [tickets, setTickets] = useState(1);

  const bus = busList.find((item) => item.id === id);

  if (!bus) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold">Bus Not Found</h1>
      </main>
    );
  }

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
    const bookingTrip = {
      busId: bus.id,
      busName: bus.name,
      from: bus.from,
      to: bus.to,
      tickets: selectedTickets,
    };

    if (addBookingTrip) {
      addBookingTrip(bookingTrip);
    } else {
      setBooked((currentBooked) => currentBooked + selectedTickets);
    }

    setBusList((currentBusList) =>
      currentBusList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            seats: item.seats - selectedTickets,
          };
        }

        return item;
      }),
    );
    setTickets(1);

    toast.success("Tickets Booked Successfully!");
  }

  return (
    <main
      className="
        flex
        justify-center
        items-center
        min-h-[80vh]
        bg-gray-100
        p-3
        sm:p-4
        md:p-6
      "
    >
      <article
        className="
                w-full
                max-w-xl
                bg-white
                rounded-xl
                shadow-lg
                p-4
                sm:p-6
                md:p-8
               "
      >
        <h1
          className="
                    text-2xl
                    sm:text-3xl
                    md:text-4xl
                    font-bold
                    text-center
                    mb-6
                    text-slate-800
                    "
        >
          {bus.name}
        </h1>

        <div
          className="
                   space-y-3
                   text-base
                   sm:text-lg
                   px-2
                    "
        >
          <p>
            <span className="font-semibold">Route:</span> {bus.from} to {bus.to}
          </p>

          <p>
            <span className="font-semibold">Price:</span> ₹{bus.Price}
          </p>

          <p>
            <span className="font-semibold">Departure:</span> {bus.departure}
          </p>

          <p>
            <span className="font-semibold">Duration:</span> {bus.duration}
          </p>

          <p>
            <span className="font-semibold">Available Seats:</span> {bus.seats}
          </p>
        </div>

        <div
          className="
                   flex
                   justify-center
                   items-center
                   gap-3
                   sm:gap-4
                   mt-8
                  "
          aria-label="Select tickets"
        >
          <button
            type="button"
            disabled={cannotDecrease}
            onClick={decreaseTickets}
            className="
                          w-6
                          h-6
                          sm:w-8
                          sm:h-8
                          rounded-lg
                          bg-blue-500
                          text-white
                          text-xl
                          sm:text-2xl
                          disabled:bg-blue-300
                          "
          >
            -
          </button>

          <span
            className="
                      text-2xl
                      sm:text-xl
                      font-semibold
                      "
          >
            {selectedTickets}
          </span>

          <button
            type="button"
            disabled={cannotIncrease}
            onClick={increaseTickets}
            className="
                              w-6
                              h-6
                              sm:w-8
                              sm:h-8
                              rounded-lg
                              bg-blue-500
                              text-white
                              text-xl
                              sm:text-2xl
                              disabled:bg-blue-300
                              "
          >
            +
          </button>
        </div>

        <div
          className="
                    flex 
                    justify-center 
                    mt-8"
        >
          <button
            disabled={noSeatsAvailable}
            onClick={book}
            className="
                        w-full
                        sm:w-auto
                        px-8
                        py-3
                        bg-blue-600
                        text-white
                        rounded-lg
                        font-semibold
                        hover:bg-blue-500
                        disabled:bg-blue-300
                        transition
                       "
          >
            Book Tickets
          </button>
        </div>
      </article>
    </main>
  );
}
