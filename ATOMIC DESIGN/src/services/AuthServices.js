import { clearToken, createJwt, getStoredToken, readJwtPayload, storeToken } from "../utils/Jwt.js";
import { STORAGE_KEYS } from "../constants/StorageKeys.js";
import { APP_CONFIG } from "../config/AppConfig.js";
import { USER_ROLES } from "../constants/Roles.js";
import { getBookedForUser, getTripsForUser } from "./BookingServices.js";

const adminUsers = APP_CONFIG.adminEmails.map((email) => ({
  email,
  name: "Admin User",
  password: "password123",
  role: USER_ROLES.admin,
}));
const demoUsers = [
  {
    email: "demo12@gmail.com",
    name: "Demo User",
    password: "password123",
    role: USER_ROLES.customer,
  },
];
const adminHiddenCustomerEmails = new Set(demoUsers.map((demoUser) => demoUser.email));

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

function getStoredLoggedInUserEmails() {
  try {
    const emails = JSON.parse(localStorage.getItem(STORAGE_KEYS.loggedInUsers));

    return Array.isArray(emails) ? emails : [];
  } catch {
    return [];
  }
}

function storeLoggedInUserEmail(email) {
  const normalizedEmail = email.trim().toLowerCase();
  const loggedInUserEmails = new Set(getStoredLoggedInUserEmails());

  loggedInUserEmails.add(normalizedEmail);
  localStorage.setItem(STORAGE_KEYS.loggedInUsers, JSON.stringify([...loggedInUserEmails]));
}

function getUsers() {
  const storedUsers = getStoredUsers();
  const adminEmails = new Set(adminUsers.map((adminUser) => adminUser.email));
  const customerUsers = storedUsers.filter((user) => !adminEmails.has(user.email));
  const storedCustomerEmails = new Set(customerUsers.map((user) => user.email));
  const missingDemoUsers = demoUsers.filter((demoUser) => !storedCustomerEmails.has(demoUser.email));

  return [...adminUsers, ...missingDemoUsers, ...customerUsers];
}

export function getCurrentToken() {
  const storedToken = getStoredToken();

  return readJwtPayload(storedToken) ? storedToken : null;
}

export function getUserFromToken(token) {
  return readJwtPayload(token);
}

export function getCustomers() {
  return getUsers()
    .filter((user) => (user.role ?? USER_ROLES.customer) === USER_ROLES.customer)
    .map((user) => ({
      ...user,
      role: USER_ROLES.customer,
      bookedTickets: getBookedForUser(user.email),
      trips: getTripsForUser(user.email),
    }));
}

export function getAdminCustomers() {
  return getCustomers().filter((customer) => !adminHiddenCustomerEmails.has(customer.email));
}

export function getLoggedInUserEmails() {
  const loggedInUserEmails = new Set(getStoredLoggedInUserEmails());
  const currentUser = getUserFromToken(getCurrentToken());

  if (currentUser?.email) {
    loggedInUserEmails.add(currentUser.email);
  }

  return [...loggedInUserEmails];
}

export function loginUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const matchingUser = getUsers().find((storedUser) => storedUser.email === normalizedEmail);

  if (!matchingUser || matchingUser.password !== password) {
    throw new Error("Invalid email or password.");
  }

  const jwt = createJwt(matchingUser);

  storeLoggedInUserEmail(matchingUser.email);
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
    role: USER_ROLES.customer,
  };

  storeUsers([...getStoredUsers(), newUser]);

  return newUser;
}

export function logoutUser() {
  clearToken();
}
