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
        <main>
            <h1>Find Your Bus</h1>
            <div className="search-row">
                <input
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
                    className="swap"
                    onClick={swapCities}
                    type="button"
                >
                    Swap
                </button>
                <input
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
            <section className="grid">
                {routeSelected && busResults.map((bus) => <BusCard key={bus.id} bus={bus} />)}
                {routeSelected && busResults.length === 0 && <p>No buses found for this route.</p>}
            </section>
        </main>
    );
}





