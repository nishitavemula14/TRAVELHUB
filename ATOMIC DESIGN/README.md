# BusTravel Hub

BusTravel Hub is a small React assessment app for searching bus trips, viewing trip details, and booking tickets.

## Features

- Bus search and directory page at `/`
- Destination filter for available buses
- Reusable bus cards
- Bus details page at `/bus/:id`
- Booking button with a live booked-ticket counter in the navbar

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

## Environment

The app reads Vite environment variables from `.env`. Copy `.env.example` if you need to reset the defaults.

```bash
VITE_APP_NAME=BusTravel Hub
VITE_API_BASE_URL=
VITE_STORAGE_PREFIX=travelHub
VITE_ADMIN_EMAILS=busTraveladmin@gmail.com,busadmin@gmail.com
VITE_AUTH_TOKEN_LIFETIME_MS=3600000
```

## Build

```bash
npm run build
```
