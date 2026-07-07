import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

if (typeof globalThis.localStorage?.clear !== "function") {
  const values = new Map();

  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      clear: () => values.clear(),
      getItem: (key) => (values.has(key) ? values.get(key) : null),
      removeItem: (key) => values.delete(key),
      setItem: (key, value) => values.set(key, String(value)),
    },
  });
}
