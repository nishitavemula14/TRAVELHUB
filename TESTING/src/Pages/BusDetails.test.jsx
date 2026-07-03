import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BookingContext } from "../Context/BookingContextValue.js";
import BusDetails from "./BusDetails.jsx";

vi.mock("react-toastify", async () => {
  const actual = await vi.importActual("react-toastify");

  return {
    ...actual,
    toast: {
      success: vi.fn(),
    },
  };
});

const sriramBus = {
  id: "1",
  name: "SriRam Travels",
  from: "Hyderabad",
  to: "Mumbai",
  departure: "08:00AM",
  Price: "1150",
  duration: "15 Hours",
  seats: 3,
};

const orangeBus = {
  id: "2",
  name: "Orange Travels",
  from: "Hyderabad",
  to: "Chennai",
  departure: "11:00AM",
  Price: "1350",
  duration: "11 Hours",
  seats: 27,
};

function renderBusDetails({ route = "/bus/1", booked = 2, busList = [sriramBus] } = {}) {
  let currentBooked = booked;
  let currentBusList = busList;

  const setBooked = vi.fn((updateBooked) => {
    currentBooked = typeof updateBooked === "function" ? updateBooked(currentBooked) : updateBooked;
  });

  const setBusList = vi.fn((updateBusList) => {
    currentBusList =
      typeof updateBusList === "function" ? updateBusList(currentBusList) : updateBusList;
  });

  render(
    <BookingContext.Provider
      value={{
        booked: currentBooked,
        setBooked,
        busList: currentBusList,
        setBusList,
      }}
    >
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/bus/:id" element={<BusDetails />} />
        </Routes>
      </MemoryRouter>
    </BookingContext.Provider>,
  );

  return {
    getBooked: () => currentBooked,
    getBusList: () => currentBusList,
    setBooked,
    setBusList,
  };
}

function getTicketCounter() {
  return screen.getByLabelText(/select tickets/i);
}

function expectTicketCount(count) {
  expect(within(getTicketCounter()).getByText(String(count))).toBeInTheDocument();
}

describe("BusDetails component tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the bus details using the id from the URL", () => {
    renderBusDetails();

    expect(screen.getByRole("heading", { name: /sriram travels/i })).toBeInTheDocument();
    expect(screen.getByText(/hyderabad to mumbai/i)).toBeInTheDocument();
    expect(screen.getByText(/1150/i)).toBeInTheDocument();
    expect(screen.getByText(/08:00am/i)).toBeInTheDocument();
    expect(screen.getByText(/15 hours/i)).toBeInTheDocument();
    expect(screen.getByText(/3/i)).toBeInTheDocument();
  });

  it("shows bus not found for a wrong bus id", () => {
    renderBusDetails({ route: "/bus/wrong-id" });

    expect(screen.getByRole("heading", { name: /bus not found/i })).toBeInTheDocument();
  });

  it("starts with one ticket selected", () => {
    renderBusDetails();

    expectTicketCount(1);
    expect(screen.getByRole("button", { name: "-" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "+" })).not.toBeDisabled();
  });

  it("increases the ticket count when plus is clicked", async () => {
    const user = userEvent.setup();
    renderBusDetails();

    await user.click(screen.getByRole("button", { name: "+" }));

    expectTicketCount(2);
    expect(screen.getByRole("button", { name: "-" })).not.toBeDisabled();
  });

  it("decreases the ticket count when minus is clicked", async () => {
    const user = userEvent.setup();
    renderBusDetails();

    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "-" }));

    expectTicketCount(1);
  });

  it("does not allow ticket count above available seats", async () => {
    const user = userEvent.setup();
    renderBusDetails();

    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "+" }));

    expectTicketCount(3);
    expect(screen.getByRole("button", { name: "+" })).toBeDisabled();
  });

  it("disables all booking controls when seats are not available", () => {
    renderBusDetails({
      busList: [
        {
          ...sriramBus,
          seats: 0,
        },
      ],
    });

    expectTicketCount(0);
    expect(screen.getByRole("button", { name: "-" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "+" })).toBeDisabled();
    expect(screen.getByRole("button", { name: /book tickets/i })).toBeDisabled();
  });
});

describe("BusDetails booking tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("books one ticket by default", async () => {
    const user = userEvent.setup();
    const booking = renderBusDetails({ booked: 0 });

    await user.click(screen.getByRole("button", { name: /book tickets/i }));

    expect(booking.getBooked()).toBe(1);
    expect(booking.getBusList()).toEqual([
      {
        ...sriramBus,
        seats: 2,
      },
    ]);
    expect(toast.success).toHaveBeenCalledWith("Tickets Booked Successfully!");
  });

  it("books the selected ticket count", async () => {
    const user = userEvent.setup();
    const booking = renderBusDetails({ booked: 2 });

    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: /book tickets/i }));

    expect(booking.getBooked()).toBe(4);
    expect(booking.getBusList()).toEqual([
      {
        ...sriramBus,
        seats: 1,
      },
    ]);
    expect(toast.success).toHaveBeenCalledWith("Tickets Booked Successfully!");
  });

  it("changes only the selected bus when tickets are booked", async () => {
    const user = userEvent.setup();
    const booking = renderBusDetails({
      busList: [sriramBus, orangeBus],
    });

    await user.click(screen.getByRole("button", { name: /book tickets/i }));

    expect(booking.getBusList()).toEqual([
      {
        ...sriramBus,
        seats: 2,
      },
      orangeBus,
    ]);
  });
});
