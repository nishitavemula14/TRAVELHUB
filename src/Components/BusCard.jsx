import { Link } from "react-router-dom";

export default function BusCard({ bus }) {
    return (
        <Link
            to={`/bus/${bus.id}`}
            className="
        block
        bg-gray-100
        p-4 sm:p-5 md:p-6
        rounded-xl
        shadow-md
        hover:shadow-lg
        transition-all
        hover:-translate-y-1
      "
        >

            <h3 className="
            text-xl 
            font-bold
            text-center 
            text-slate-800 
            mb-4 md:mb-6">
                {bus.name}
            </h3>


            <div
                className="
              space-y-2
              md:space-y-3">
                <p className="
                text-sm
                sm:text-base
                text-slate-600">
                    <span
                        className="
                    font-semibold">Route:</span>{" "}
                    {bus.from} to {bus.to}
                </p>

                <p
                    className="
                    text-sm
                    sm:text-base
                    text-slate-600">
                    <span className="font-semibold">Departure:</span>{" "}
                    {bus.departure}
                </p>

                <p className="
                text-sm
                sm:text-base
                text-slate-600">
                    <span className="font-semibold">Available Seats:</span>{" "}
                    {bus.seats}
                </p>

                <p
                    className="
                    text-sm
                    sm:text-base 
                    text-slate-600
                ">
                    <span className="font-semibold"> Price:</span>
                    {bus.Price}
                </p>
            </div>


            <button
                className="
               item-center
               mt-4 md:mt-5
               py-2 md:py-3
               px-3 md:px-5
               text-sm sm:text-base
               bg-blue-400
               text-black
               rounded-md
               hover:bg-blue-600
               transition
               "
            >
                View Details
            </button>
        </Link>
    );
}