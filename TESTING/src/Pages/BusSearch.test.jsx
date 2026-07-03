import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { BookingContext } from "../Context/BookingContextValue.js";
import BusSearch from "./BusSearch.jsx";

describe("BusSearch", () => {
  const busList = [
    {
      id: "1",
      name: "SriRam Travels",
      from: "Hyderabad",
      to: "Mumbai",
      departure: "08:00AM",
      Price: "1150",
      duration: "15 Hours",
      seats: 26,
    },
    {
      id: "2",
      name: "Orange Travels",
      from: "Hyderabad",
      to: "Chennai",
      departure: "11:00AM",
      Price: "1350",
      duration: "11 Hours",
      seats: 27,
    },
    {
      id: "3",
      name: "Night Star",
      from: "Hyderabad",
      to: "Mumbai",
      departure: "10:30PM",
      Price: "1450",
      duration: "14 Hours",
      seats: 12,
    },
    {
      id: "4",
      name: "Reverse Travels",
      from: "Mumbai",
      to: "Hyderabad",
      departure: "08:00PM",
      Price: "1250",
      duration: "15 Hours",
      seats: 30,
    },
  ];

  function renderBusSearch(customBusList = []) {
    render(
      <BookingContext.Provider
        value={{
          busList: customBusList,
          booked: 0,
          setBooked: vi.fn(),
          setBusList: vi.fn(),
        }}
      >
        <MemoryRouter>
          <BusSearch />
        </MemoryRouter>
      </BookingContext.Provider>,
    );
  }

  it("renders the search form", () => {
    renderBusSearch();

    expect(screen.getByRole("heading", { name: /find your bus/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/from city/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/to city/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /swap/i })).toBeInTheDocument();
  });

  it("swaps the from and to city values", async () => {
    const user = userEvent.setup();
    renderBusSearch();

    const fromInput = screen.getByPlaceholderText(/from city/i);
    const toInput = screen.getByPlaceholderText(/to city/i);

    await user.type(fromInput, "Hyderabad");
    await user.type(toInput, "Mumbai");
    await user.click(screen.getByRole("button", { name: /swap/i }));

    expect(fromInput).toHaveValue("Mumbai");
    expect(toInput).toHaveValue("Hyderabad");
  });

  it("keeps both inputs empty when swapping empty values", async () => {
    const user = userEvent.setup();
    renderBusSearch();

    const fromInput = screen.getByPlaceholderText(/from city/i);
    const toInput = screen.getByPlaceholderText(/to city/i);

    await user.click(screen.getByRole("button", { name: /swap/i }));

    expect(fromInput).toHaveValue("");
    expect(toInput).toHaveValue("");
  });

  it("moves a one-sided route value to the opposite input when swapped", async () => {
    const user = userEvent.setup();
    renderBusSearch();

    const fromInput = screen.getByPlaceholderText(/from city/i);
    const toInput = screen.getByPlaceholderText(/to city/i);

    await user.type(fromInput, "Chennai");
    await user.click(screen.getByRole("button", { name: /swap/i }));

    expect(fromInput).toHaveValue("");
    expect(toInput).toHaveValue("Chennai");
  });

  it("does not show results before a full route is selected", async () => {
    const user = userEvent.setup();
    renderBusSearch(busList);

    await user.type(screen.getByPlaceholderText(/from city/i), "Hyderabad");

    expect(screen.queryByText(/sriram travels/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/no buses found/i)).not.toBeInTheDocument();
  });

  it("shows matching buses for the selected route", async () => {
    const user = userEvent.setup();
    renderBusSearch(busList);

    await user.type(screen.getByPlaceholderText(/from city/i), " hyderabad ");
    await user.type(screen.getByPlaceholderText(/to city/i), "MUMBAI");

    expect(screen.getByRole("heading", { name: /sriram travels/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /night star/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /orange travels/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /reverse travels/i })).not.toBeInTheDocument();
  });

  it("treats the reverse route as a different route", async () => {
    const user = userEvent.setup();
    renderBusSearch(busList);

    await user.type(screen.getByPlaceholderText(/from city/i), "Mumbai");
    await user.type(screen.getByPlaceholderText(/to city/i), "Hyderabad");

    expect(screen.getByRole("heading", { name: /reverse travels/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /sriram travels/i })).not.toBeInTheDocument();
  });

  it("updates results when route inputs change", async () => {
    const user = userEvent.setup();
    renderBusSearch(busList);

    const fromInput = screen.getByPlaceholderText(/from city/i);
    const toInput = screen.getByPlaceholderText(/to city/i);

    await user.type(fromInput, "Hyderabad");
    await user.type(toInput, "Mumbai");
    expect(screen.getByRole("heading", { name: /sriram travels/i })).toBeInTheDocument();

    await user.clear(toInput);
    await user.type(toInput, "Chennai");

    expect(screen.getByRole("heading", { name: /orange travels/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /sriram travels/i })).not.toBeInTheDocument();
  });

  it("shows an empty state when no buses match the selected route", async () => {
    const user = userEvent.setup();
    renderBusSearch(busList);

    await user.type(screen.getByPlaceholderText(/from city/i), "Chennai");
    await user.type(screen.getByPlaceholderText(/to city/i), "Chennai");

    expect(screen.getByText(/no buses found for this route/i)).toBeInTheDocument();
  });
});
