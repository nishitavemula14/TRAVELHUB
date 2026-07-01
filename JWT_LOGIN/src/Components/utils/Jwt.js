import { STORAGE_KEYS } from "../Constants/StorageKeys.js";


const TOKEN_LIFETIME_MS = 60 * 60 * 1000;


function encodeBase64Url(value) {
  return btoa(JSON.stringify(value))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}


function decodeBase64Url(value) {
  const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");


  return JSON.parse(atob(padded));
}


export function createJwt(user) {
  const now = Date.now();
  const header = {
    alg: "HS256",
    typ: "JWT",
  };
  const payload = {
    sub: user.email,
    name: user.name,
    email: user.email,
    iat: Math.floor(now / 1000),
    exp: Math.floor((now + TOKEN_LIFETIME_MS) / 1000),
  };


  return `${encodeBase64Url(header)}.${encodeBase64Url(payload)}.demo-signature`;
}


export function readJwtPayload(token) {
  if (!token) {
    return null;
  }


  try {
    const [, payload] = token.split(".");
    const decodedPayload = decodeBase64Url(payload);
    const isExpired = decodedPayload.exp * 1000 <= Date.now();


    return isExpired ? null : decodedPayload;
  } catch {
    return null;
  }
}


export function getStoredToken() {
  return localStorage.getItem(STORAGE_KEYS.token);
}


export function storeToken(token) {
  localStorage.setItem(STORAGE_KEYS.token, token);
}


export function clearToken() {
  localStorage.removeItem(STORAGE_KEYS.token);
}

