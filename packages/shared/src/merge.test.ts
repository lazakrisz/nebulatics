import { describe, expect, it } from "vitest";
import { merge } from "./merge";

describe("merge", () => {
  describe("shallow merging", () => {
    it("merges two flat objects", () => {
      const a = { x: 1 };
      const b = { y: 2 };

      expect(merge(a, b)).toEqual({ x: 1, y: 2 });
    });

    it("overwrites primitive values from left to right", () => {
      const a = { x: 1 };
      const b = { x: 2 };

      expect(merge(a, b)).toEqual({ x: 2 });
    });

    it("returns empty object when called with no arguments", () => {
      expect(merge()).toEqual({});
    });

    it("returns the same shape when called with one object", () => {
      const obj = { a: 1, b: 2 };

      expect(merge(obj)).toEqual({ a: 1, b: 2 });
    });
  });

  describe("deep merging", () => {
    it("recursively merges nested objects", () => {
      const a = { user: { name: "Alice", age: 30 } };
      const b = { user: { email: "alice@example.com" } };

      expect(merge(a, b)).toEqual({
        user: { name: "Alice", age: 30, email: "alice@example.com" },
      });
    });

    it("overwrites nested primitive values", () => {
      const a = { config: { debug: false, timeout: 1000 } };
      const b = { config: { debug: true } };

      expect(merge(a, b)).toEqual({
        config: { debug: true, timeout: 1000 },
      });
    });

    it("handles deeply nested structures", () => {
      const a = { level1: { level2: { level3: { value: "old" } } } };
      const b = { level1: { level2: { level3: { extra: "new" } } } };

      expect(merge(a, b)).toEqual({
        level1: { level2: { level3: { value: "old", extra: "new" } } },
      });
    });

    it("handles mixed nesting depths", () => {
      const a = { shallow: 1, deep: { nested: { value: "a" } } };
      const b = { shallow: 2, deep: { other: "b" } };

      expect(merge(a, b)).toEqual({
        shallow: 2,
        deep: { nested: { value: "a" }, other: "b" },
      });
    });
  });

  describe("array handling", () => {
    it("replaces arrays instead of merging them", () => {
      const a = { items: [1, 2, 3] };
      const b = { items: [4, 5] };

      expect(merge(a, b)).toEqual({ items: [4, 5] });
    });

    it("replaces array with object", () => {
      const a = { data: [1, 2, 3] };
      const b = { data: { key: "value" } };

      expect(merge(a, b)).toEqual({ data: { key: "value" } });
    });

    it("replaces object with array", () => {
      const a = { data: { key: "value" } };
      const b = { data: [1, 2, 3] };

      expect(merge(a, b)).toEqual({ data: [1, 2, 3] });
    });
  });

  describe("null and undefined handling", () => {
    it("overwrites with null", () => {
      const a = { value: { nested: true } };
      const b = { value: null };

      expect(merge(a, b)).toEqual({ value: null });
    });

    it("overwrites with undefined", () => {
      const a = { value: "something" };
      const b = { value: undefined };

      expect(merge(a, b)).toEqual({ value: undefined });
    });

    it("overwrites null with object", () => {
      const a = { value: null };
      const b = { value: { nested: true } };

      expect(merge(a, b)).toEqual({ value: { nested: true } });
    });
  });

  describe("multiple objects", () => {
    it("merges three objects left to right", () => {
      const a = { x: 1 };
      const b = { y: 2 };
      const c = { z: 3 };

      expect(merge(a, b, c)).toEqual({ x: 1, y: 2, z: 3 });
    });

    it("applies overrides in order", () => {
      const a = { value: 1 };
      const b = { value: 2 };
      const c = { value: 3 };

      expect(merge(a, b, c)).toEqual({ value: 3 });
    });

    it("deep merges across multiple objects", () => {
      const defaults = { api: { timeout: 5000, retries: 3 } };
      const userConfig = { api: { timeout: 10000 }, debug: false };
      const override = { debug: true };

      expect(merge(defaults, userConfig, override)).toEqual({
        api: { timeout: 10000, retries: 3 },
        debug: true,
      });
    });
  });

  describe("immutability", () => {
    it("does not mutate the original objects", () => {
      const a = { x: 1, nested: { y: 2 } };
      const b = { x: 10, nested: { z: 3 } };

      const aCopy = JSON.parse(JSON.stringify(a));
      const bCopy = JSON.parse(JSON.stringify(b));

      merge(a, b);

      expect(a).toEqual(aCopy);
      expect(b).toEqual(bCopy);
    });

    it("returns a new object reference", () => {
      const a = { x: 1 };
      const b = { y: 2 };

      const result = merge(a, b);

      expect(result).not.toBe(a);
      expect(result).not.toBe(b);
    });
  });

  describe("edge cases", () => {
    it("handles empty objects", () => {
      expect(merge({}, {})).toEqual({});
      expect(merge({ x: 1 }, {})).toEqual({ x: 1 });
      expect(merge({}, { x: 1 })).toEqual({ x: 1 });
    });

    it("handles objects with different key types", () => {
      const a = { string: "value", number: 42 };
      const b = { boolean: true, object: { nested: true } };

      expect(merge(a, b)).toEqual({
        string: "value",
        number: 42,
        boolean: true,
        object: { nested: true },
      });
    });
  });
});
