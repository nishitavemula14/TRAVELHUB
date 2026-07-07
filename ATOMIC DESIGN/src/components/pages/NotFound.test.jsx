import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import NotFound from "./NotFound.jsx";

describe("NotFound", () => {
  it("renders the 404 page with a home link", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(screen.getByText(/404 error/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /page not found/i })).toBeInTheDocument();
    expect(screen.getByText(/does not exist/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /go back home/i })).toHaveAttribute("href", "/");
  });
});
