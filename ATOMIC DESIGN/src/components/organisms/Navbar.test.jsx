import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { BookingContext } from "../../context/BookingContextValue.js";
import { AuthContext } from "../../context/AuthContextValue.js";
import Navbar from "./Navbar.jsx";

describe("Navbar", () => {
  it("renders navigation links and booked ticket count", () => {
    render(
      <AuthContext.Provider value={{ isAuthenticated: false, logout: () => {}, user: null }}>
        <BookingContext.Provider value={{ booked: 7 }}>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </BookingContext.Provider>
      </AuthContext.Provider>,
    );

    expect(screen.getByRole("link", { name: /bus\s*busTravel hub/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /back to search/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /login/i })).toHaveAttribute("href", "/login");
    expect(screen.getByText(/booked:\s*0/i)).toBeInTheDocument();
  });
});
