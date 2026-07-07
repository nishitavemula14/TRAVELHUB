import { STORAGE_KEYS } from "../constants/StorageKeys.js";
import { buses } from "../data/Buses.js";

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));

    return value ?? fallback;
  } catch {
    return fallback;
  }
}

export function getStoredBusList(defaultBusList) {
  const storedBusList = readJson(STORAGE_KEYS.busList, null);

  return Array.isArray(storedBusList) ? storedBusList : defaultBusList;
}

export function storeBusList(busList) {
  localStorage.setItem(STORAGE_KEYS.busList, JSON.stringify(busList));
}

function getStoredBookings() {
  const bookings = readJson(STORAGE_KEYS.bookings, {});

  return bookings && typeof bookings === "object" && !Array.isArray(bookings) ? bookings : {};
}

function normalizeBookingRecord(record) {
  if (typeof record === "number") {
    return {
      bookedTickets: record,
      trips: [],
    };
  }

  if (!record || typeof record !== "object" || Array.isArray(record)) {
    return {
      bookedTickets: 0,
      trips: [],
    };
  }

  const bookedTickets = Number(record.bookedTickets ?? record.tickets);

  return {
    bookedTickets: Number.isFinite(bookedTickets) ? bookedTickets : 0,
    trips: Array.isArray(record.trips) ? record.trips : [],
  };
}

function getInferredTrips(bookedTickets) {
  const remainingTickets = Number(bookedTickets);

  if (!Number.isFinite(remainingTickets) || remainingTickets <= 0) {
    return [];
  }

  const storedBusList = getStoredBusList(buses);
  let ticketsLeft = remainingTickets;

  return buses.reduce((trips, originalBus) => {
    if (ticketsLeft <= 0) {
      return trips;
    }

    const storedBus = storedBusList.find((bus) => bus.id === originalBus.id);
    const bookedOnBus = storedBus ? originalBus.seats - storedBus.seats : 0;
    const tickets = Math.min(Math.max(bookedOnBus, 0), ticketsLeft);

    if (tickets <= 0) {
      return trips;
    }

    ticketsLeft -= tickets;

    return [
      ...trips,
      {
        busId: originalBus.id,
        busName: originalBus.name,
        from: originalBus.from,
        to: originalBus.to,
        tickets,
      },
    ];
  }, []);
}

export function getBookedForUser(email) {
  if (!email) {
    return 0;
  }

  const bookings = getStoredBookings();
  const booked = normalizeBookingRecord(bookings[email]).bookedTickets;

  return Number.isFinite(booked) ? booked : 0;
}

export function getTripsForUser(email) {
  if (!email) {
    return [];
  }

  const bookings = getStoredBookings();
  const booking = normalizeBookingRecord(bookings[email]);

  return booking.trips.length > 0 ? booking.trips : getInferredTrips(booking.bookedTickets);
}

export function storeBookedForUser(email, booked) {
  if (!email) {
    return;
  }

  const bookings = getStoredBookings();
  const currentBooking = normalizeBookingRecord(bookings[email]);

  localStorage.setItem(
    STORAGE_KEYS.bookings,
    JSON.stringify({
      ...bookings,
      [email]: {
        ...currentBooking,
        bookedTickets: booked,
      },
    }),
  );
}

export function storeBookingForUser(email, bookedTickets, trip) {
  if (!email) {
    return;
  }

  const bookings = getStoredBookings();
  const currentBooking = normalizeBookingRecord(bookings[email]);
  const nextTrips = trip ? [...currentBooking.trips, trip] : currentBooking.trips;

  localStorage.setItem(
    STORAGE_KEYS.bookings,
    JSON.stringify({
      ...bookings,
      [email]: {
        bookedTickets,
        trips: nextTrips,
      },
    }),
  );
}

export function addTripForUser(email, trip) {
  if (!email) {
    return;
  }

  const bookings = getStoredBookings();
  const currentBooking = normalizeBookingRecord(bookings[email]);

  localStorage.setItem(
    STORAGE_KEYS.bookings,
    JSON.stringify({
      ...bookings,
      [email]: {
        bookedTickets: currentBooking.bookedTickets,
        trips: [...currentBooking.trips, trip],
      },
    }),
  );
}
