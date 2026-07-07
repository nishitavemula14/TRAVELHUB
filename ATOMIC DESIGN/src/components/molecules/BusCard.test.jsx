import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import BusCard from "./BusCard.jsx";

const bus = {
  id: "42",
  name: "Test Travels",
  from: "Hyderabad",
  to: "Mumbai",
  departure: "08:00AM",
  Price: "1150",
  seats: 26,
};

describe("BusCard", () => {
  it("renders bus summary details", () => {
    render(
      <MemoryRouter>
        <BusCard bus={bus} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /test travels/i })).toBeInTheDocument();
    expect(screen.getByText(/hyderabad to mumbai/i)).toBeInTheDocument();
    expect(screen.getByText(/08:00am/i)).toBeInTheDocument();
    expect(screen.getByText(/26/i)).toBeInTheDocument();
    expect(screen.getByText(/1150/i)).toBeInTheDocument();
  });

  it("links to the bus details page", () => {
    render(
      <MemoryRouter>
        <BusCard bus={bus} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: /test travels/i })).toHaveAttribute("href", "/bus/42");
    expect(screen.getByRole("button", { name: /view details/i })).toBeInTheDocument();
  });
});
