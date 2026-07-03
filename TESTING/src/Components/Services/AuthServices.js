import { clearToken, createJwt, getStoredToken, readJwtPayload, storeToken } from "../utils/Jwt.js";
import { STORAGE_KEYS } from "../Constants/StorageKeys.js";

const demoUser = {
  email: "demo@travelhub.com",
  name: "Demo User",
  password: "password123",
};

function getStoredUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users));

    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

function storeUsers(users) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

function getUsers() {
  const storedUsers = getStoredUsers();
  const hasDemoUser = storedUsers.some((user) => user.email === demoUser.email);

  return hasDemoUser ? storedUsers : [demoUser, ...storedUsers];
}

export function getCurrentToken() {
  const storedToken = getStoredToken();

  return readJwtPayload(storedToken) ? storedToken : null;
}

export function getUserFromToken(token) {
  return readJwtPayload(token);
}

export function loginUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const matchingUser = getUsers().find((storedUser) => storedUser.email === normalizedEmail);

  if (!matchingUser || matchingUser.password !== password) {
    throw new Error("Invalid email or password.");
  }

  const jwt = createJwt(matchingUser);

  storeToken(jwt);

  return jwt;
}

export function signupUser(name, email, password) {
  const normalizedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();
  const users = getUsers();
  const accountExists = users.some((storedUser) => storedUser.email === normalizedEmail);

  if (accountExists) {
    throw new Error("An account with this email already exists.");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }

  const newUser = {
    email: normalizedEmail,
    name: normalizedName,
    password,
  };

  storeUsers([...getStoredUsers(), newUser]);

  const jwt = createJwt(newUser);

  storeToken(jwt);

  return jwt;
}

export function logoutUser() {
  clearToken();
}
