const env = import.meta.env;

function getEnvValue(key, fallback) {
  const value = env[key];

  return value === undefined || value === "" ? fallback : value;
}

function getPositiveNumberEnv(key, fallback) {
  const value = Number(getEnvValue(key, fallback));

  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function getEmailListEnv(key, fallback) {
  return getEnvValue(key, fallback)
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export const APP_CONFIG = {
  apiBaseUrl: getEnvValue("VITE_API_BASE_URL", ""),
  appName: getEnvValue("VITE_APP_NAME", "BusTravel Hub"),
  authTokenLifetimeMs: getPositiveNumberEnv("VITE_AUTH_TOKEN_LIFETIME_MS", 60 * 60 * 1000),
  adminEmails: getEmailListEnv("VITE_ADMIN_EMAILS", "demo@travelhub.com"),
  storagePrefix: getEnvValue("VITE_STORAGE_PREFIX", "travelHub"),
};
