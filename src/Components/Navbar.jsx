import { Link } from "react-router-dom";
import { useBooking } from "../Context/BookingContext.jsx";


export default function Navbar() {
    const { booked } = useBooking();

    return (
        <header
            className="
            flex 
            flex-col
            justify-between
            md:flex-row
            item-centre
            gap-4
            py-4
            px-6
            bg-blue-400
            text-black
            sm:px-10
        "
        >
            <Link to="/"
                className="
                flex
                item-center
                gap-3
                text-xl
                font-bold                
                "
            >
                <span
                    className="
                px-2
                py-1
                rounded-lg
                bg-amber-200 
                text-lg
                gap-2
                "
                >

                    BUS
                </span>
                BusTravel Hub
            </Link>
            <nav
                className="
              flex
              flex-col
              sm:flex-row
              item-center
              gap-3
              sm:w-auto
              "
            >
                <Link
                    to="/"
                    className="
                    
                    w-auto
                    text-black-300
                    font-medium
                    bg-rose-300
                    rounded-md
                    px-4
                    py-2
                    "
                >
                    Back to Search</Link>
                <span
                    className="
                   
                    sm:w-auto
                    text-center
                    px-4
                    py-2
                    bg-rose-300
                    font-medium
                    rounded-md
                    "
                >
                    Booked: {booked}
                </span>
            </nav>
        </header >
    );
}
