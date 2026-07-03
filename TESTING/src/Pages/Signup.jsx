import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthPageLayout from "../Components/Auth/AuthPageLayout.jsx";
import TextInput from "../Components/Form/TextInput.jsx";
import { useAuth } from "../Context/useAuth.js";

export default function Signup() {
  const { isAuthenticated, signup } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const redirectTo = location.state?.from?.pathname || "/";

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      signup(name, email, password);
      toast.success("Account created successfully.");
      navigate(redirectTo, { replace: true });
    } catch (signupError) {
      setError(signupError.message);
      toast.error(signupError.message);
    }
  }

  return (
    <AuthPageLayout>
      <section className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-slate-900">Sign Up</h1>
        <p className="mb-6 text-center text-sm text-slate-600">
          {" "}
          Create an account to view bus details and book tickets.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextInput label="Name" type="text" value={name} onChange={setName} required />
          <TextInput label="Email" type="email" value={email} onChange={setEmail} required />
          <TextInput
            label="Password"
            minLength={6}
            type="password"
            value={password}
            onChange={setPassword}
            required
          />

          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            className="w-full rounded-md bg-blue-500 px-4 py-3 font-semibold text-white transition hover:bg-blue-600"
            type="submit"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            className="font-semibold text-blue-600 hover:text-blue-700"
            to="/login"
            state={location.state}
          >
            Login
          </Link>
        </p>
      </section>
    </AuthPageLayout>
  );
}
