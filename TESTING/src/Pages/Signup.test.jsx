import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider } from "../Context/AuthContext.jsx";
import { STORAGE_KEYS } from "../Components/Constants/StorageKeys.js";
import Signup from "./Signup.jsx";

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

function renderSignup() {
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/signup"]}>
        <Routes>
          <Route path="/" element={<h1>Search Page</h1>} />
          <Route path="/login" element={<h1>Login Page</h1>} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe("Signup", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("creates an account and redirects to the home page", async () => {
    const user = userEvent.setup();
    renderSignup();

    await user.type(screen.getByLabelText(/name/i), "New User");
    await user.type(screen.getByLabelText(/email/i), "new@example.com");
    await user.type(screen.getByLabelText(/password/i), "secret123");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(screen.getByRole("heading", { name: /search page/i })).toBeInTheDocument();
    expect(localStorage.getItem(STORAGE_KEYS.token)).toBeTruthy();
    expect(toast.success).toHaveBeenCalledWith("Account created successfully.");
  });

  it("shows service validation errors", async () => {
    const user = userEvent.setup();
    renderSignup();

    await user.type(screen.getByLabelText(/name/i), "New User");
    await user.type(screen.getByLabelText(/email/i), "new@example.com");
    await user.type(screen.getByLabelText(/password/i), "12345");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    expect(toast.error).toHaveBeenCalledWith("Password must be at least 6 characters.");
  });

  it("links back to login", () => {
    renderSignup();

    expect(screen.getByRole("link", { name: /^login$/i })).toHaveAttribute("href", "/login");
  });
});
