import { useState } from "react";
import BusCard from "../Components/BusCard.jsx";
import { useBooking } from "../Context/BookingContext.jsx";

export default function BusSearch() {
    const { busList } = useBooking();
    const [fromCity, setFromCity] = useState("");
    const [toCity, setToCity] = useState("");

    const cityOptions = ["Hyderabad", "Mumbai", "Chennai"];

    const selectedFromCity = fromCity.trim().toLowerCase();
    const selectedToCity = toCity.trim().toLowerCase();
    const routeSelected = selectedFromCity !== "" && selectedToCity !== "";

    let busResults = [];

    if (routeSelected) {
        busResults = busList.filter(function (bus) {
            const busFromCity = bus.from.toLowerCase();
            const busToCity = bus.to.toLowerCase();

            return busFromCity === selectedFromCity && busToCity === selectedToCity;
        });
    }

    function swapCities() {
        setFromCity(toCity);
        setToCity(fromCity);
    }

    return (
        <main
            className="
         w-[95%]
         max-w-[1200px]
         mx-auto
         px-2
         py-2">
            <h1
                className="
             text-center
             text-3xl
             sm:text-2xl
             md:text-3xl
             font-bold
             py-3
           ">Find Your Bus
            </h1>

            <div
                className="
                flex
                flex-col
                sm:flex-row
                gap-3
                justify-center
                items-stretch
                sm:items-center
                mb-6
            ">
                <input
                    className="
                   w-full
                   sm:w-[180px]
                   px-4
                   py-3
                   border
                   border-slate-300
                   rounded-md
                   focus:outline
                   focus:ring-2
                   
                   "
                    list="from-cities"
                    placeholder="From City"
                    value={fromCity}
                    onChange={(event) => setFromCity(event.target.value)}
                />
                <datalist id="from-cities">
                    {cityOptions.map((city) => (
                        <option key={city} value={city} />
                    ))}
                </datalist>
                <button
                    onClick={swapCities}
                    type="button"
                    className="
                   w-full
                   sm:w-auto
                   px-4
                   py-3
                   bg-blue-400
                   text-black
                   rounded-md
                   hover:bg-blue-600
                   transition
                   font-medium
                "
                >
                    Swap
                </button>
                <input
                    className="
                    w-full
                    sm:w-[180px]
                    px-4
                    py-3
                    border
                    border-slate-300
                    rounded-md
                    focus:outline
                    focus:ring-2
                    "
                    list="to-cities"
                    placeholder="To City"
                    value={toCity}
                    onChange={(event) => setToCity(event.target.value)}
                />
                <datalist id="to-cities">
                    {cityOptions.map((city) => (
                        <option key={city} value={city} />
                    ))}
                </datalist>
            </div>
            <section
                className="
            gap-4
            md:gap-6
            ">
                {routeSelected && busResults.map((bus) => <BusCard key={bus.id} bus={bus} />)}
                {routeSelected && busResults.length === 0 &&
                    <p className="
                text-center
                text-red-500
                font-medium
                mt-6
            ">
                        No buses found for this route.</p>}
            </section>
        </main>
    );
}





