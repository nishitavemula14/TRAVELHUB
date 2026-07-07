import { useMemo, useState } from "react";
import {
  getCurrentToken,
  getUserFromToken,
  loginUser,
  logoutUser,
  signupUser,
} from "../services/AuthServices.js";
import { AuthContext } from "./AuthContextValue.js";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getCurrentToken());
  const [user, setUser] = useState(() => getUserFromToken(getCurrentToken()));

  function login(email, password) {
    const newToken = loginUser(email, password);
    const loggedInUser = getUserFromToken(newToken);

    setToken(newToken);
    setUser(loggedInUser);

    return loggedInUser;
  }

  function signup(name, email, password) {
    signupUser(name, email, password);
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
