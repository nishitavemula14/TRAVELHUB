import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import { createJwt, readJwtPayload, getStoredToken, storeToken, clearToken } from "../utils/Jwt.js";

import { STORAGE_KEYS } from "../Constants/StorageKeys.js";

describe("JWT utility functions()", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
    localStorage.clear();
  });

  describe("createJwt()", () => {
    it("should create a valid JWT token", () => {
      const user = {
        name: "Demo user",
        email: "demo@example.com",
      };

      const token = createJwt(user);

      expect(token).toBeTruthy();
      expect(typeof token).toBe("string");

      const parts = token.split(".");
      expect(parts).toHaveLength(3);
    });

    it("should create a token containing correct user information", () => {
      const user = {
        name: "Demo user",
        email: "demo@example.com",
      };
      const token = createJwt(user);

      const payload = readJwtPayload(token);

      expect(payload.name).toBe(user.name);
      expect(payload.email).toBe(user.email);
      expect(payload.sub).toBe(user.email);
    });
  });

  describe("readJwtPayLoad()", () => {
    it("should decode a valid JWT token", () => {
      const user = {
        name: "Demo user",
        email: "demo@example.com",
      };
      const token = createJwt(user);

      const payload = readJwtPayload(token);

      expect(payload).not.toBeNull();
      expect(payload.name).toBe(user.name);
      expect(payload.email).toBe(user.email);
    });

    it("should return null for null token", () => {
      expect(readJwtPayload(null)).toBeNull();
    });

    it("should return null for undefined token", () => {
      expect(readJwtPayload(undefined)).toBeNull();
    });

    it("should return null for invalid token", () => {
      expect(readJwtPayload("invalid.token")).toBeNull();
    });

    it("should return null for malformed token", () => {
      expect(readJwtPayload("abc.def")).toBeNull();
    });

    it("should retuen null for expired token", () => {
      vi.useFakeTimers();

      const currentTime = new Date("2026-01-01T01:00:01Z");
      vi.setSystemTime(currentTime);

      const user = {
        name: "Demo user",
        email: "demo@example.com",
      };
      const token = createJwt(user);

      vi.setSystemTime(new Date(currentTime.getTime() + 61 * 60 * 1000));

      const payload = readJwtPayload(token);

      expect(payload).toBeNull();
    });
  });

  describe("storeToken()", () => {
    it("should store the token in localStorage", () => {
      const token = "sample-jwt-token";

      storeToken(token);

      expect(localStorage.getItem(STORAGE_KEYS.token)).toBe(token);
    });
  });

  describe("getStoredToken()", () => {
    it("should return stored token", () => {
      localStorage.setItem(STORAGE_KEYS.token, "store-token");

      expect(getStoredToken()).toBe("store-token");
    });

    it("should return null if token does not exist", () => {
      expect(getStoredToken()).toBeNull();
    });
  });

  describe("cleartoken()", () => {
    it("should remove the token from localStorage", () => {
      localStorage.setItem(STORAGE_KEYS.token, "sample-token");

      clearToken();

      expect(localStorage.getItem(STORAGE_KEYS.token)).toBeNull();
    });

    it("should not throw error if token does not exist", () => {
      expect(() => clearToken()).not.toThrow();
    });
  });
});
