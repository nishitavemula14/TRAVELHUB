import { STORAGE_KEYS } from "../Constants/StorageKeys.js";

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

export function getBookedForUser(email) {
  if (!email) {
    return 0;
  }

  const bookings = getStoredBookings();
  const booked = Number(bookings[email]);

  return Number.isFinite(booked) ? booked : 0;
}

export function storeBookedForUser(email, booked) {
  if (!email) {
    return;
  }

  const bookings = getStoredBookings();

  localStorage.setItem(
    STORAGE_KEYS.bookings,
    JSON.stringify({
      ...bookings,
      [email]: booked,
    }),
  );
}
