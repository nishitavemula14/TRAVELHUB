import { useMemo, useState } from "react";
import {
  getCurrentToken,
  getUserFromToken,
  loginUser,
  logoutUser,
  signupUser,
} from "../Components/Services/AuthServices.js";
import { AuthContext } from "./AuthContextValue.js";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getCurrentToken());
  const [user, setUser] = useState(() => getUserFromToken(getCurrentToken()));

  function login(email, password) {
    const newToken = loginUser(email, password);

    setToken(newToken);
    setUser(getUserFromToken(newToken));
  }

  function signup(name, email, password) {
    const newToken = signupUser(name, email, password);

    setToken(newToken);
    setUser(getUserFromToken(newToken));
  }

  function logout() {
    logoutUser();
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token && user),
      user,
      login,
      Login: login,
      signup,
      logout,
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
