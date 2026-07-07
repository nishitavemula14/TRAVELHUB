import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider } from "../../context/AuthContext.jsx";
import { STORAGE_KEYS } from "../../constants/StorageKeys.js";
import Login from "./Login.jsx";

vi.mock("react-toastify", async () => {
  const actual = await vi.importActual("react-toastify");

  return {
    ...actual,
    toast: {
      error: vi.fn(),
      success: vi.fn(),
    },
  };
});

function renderLogin(initialEntries = ["/login"]) {
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/" element={<h1>Search Page</h1>} />
          <Route path="/bus/1" element={<h1>Bus Details</h1>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe("Login", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("logs in and redirects to the home page by default", async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText(/email/i), "demo12@gmail.com");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /^login$/i }));

    expect(screen.getByRole("heading", { name: /search page/i })).toBeInTheDocument();
    expect(localStorage.getItem(STORAGE_KEYS.token)).toBeTruthy();
    expect(toast.success).toHaveBeenCalledWith("Logged in successfully.");
  });

  it("does not redirect a customer back to an admin page", async () => {
    const user = userEvent.setup();
    renderLogin([{ pathname: "/login", state: { from: { pathname: "/admin/customers" } } }]);

    await user.type(screen.getByLabelText(/email/i), "demo12@gmail.com");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /^login$/i }));

    expect(screen.getByRole("heading", { name: /search page/i })).toBeInTheDocument();
  });

  it("shows an error for invalid credentials", async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText(/email/i), "busTraveladmin@gmail.com");
    await user.type(screen.getByLabelText(/password/i), "wrong-password");
    await user.click(screen.getByRole("button", { name: /^login$/i }));

    expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
    expect(toast.error).toHaveBeenCalledWith("Invalid email or password.");
  });

  it("keeps the protected route as the signup link state", () => {
    renderLogin([{ pathname: "/login", state: { from: { pathname: "/bus/1" } } }]);

    expect(screen.getByRole("link", { name: /sign up/i })).toHaveAttribute("href", "/signup");
  });
});
