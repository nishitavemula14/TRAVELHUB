import { APP_CONFIG } from "../config/AppConfig.js";

const storagePrefix = APP_CONFIG.storagePrefix;

export const STORAGE_KEYS = {
  bookings: `${storagePrefix}Bookings`,
  busList: `${storagePrefix}BusList`,
  loggedInUsers: `${storagePrefix}LoggedInUsers`,
  token: `${storagePrefix}Token`,
  users: `${storagePrefix}Users`,
};
