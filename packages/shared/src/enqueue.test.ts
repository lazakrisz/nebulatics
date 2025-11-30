import { afterEach, expect, test } from "vitest";
import { init } from "./common";
import { enqueue } from "./enqueue";

afterEach((context) => {
  delete window.na;
  delete window.naq
});

test("enqueue an event into nebulatics queue", () => {
  expect(window.naq).toBeUndefined();
  expect(window.naq).toBeUndefined();

  init();

  enqueue("test", { test: "test" });

  expect(window.na).toBeDefined();
  expect(window.naq).toBeDefined();
  expect(window.naq).toBeInstanceOf(Array);
  expect(window.naq).toHaveLength(1);
  expect(window.naq?.[0]).toEqual(["test", { test: "test" }]);
});

test("enqueue multiple events into nebulatics queue", () => {
  expect(window.naq).toBeUndefined();
  expect(window.naq).toBeUndefined();

  init();

  enqueue("test", { test: "test" });
  enqueue("test2", { test: "test2" });

  expect(window.na).toBeDefined();
  expect(window.naq).toBeDefined();
  expect(window.naq).toBeInstanceOf(Array);
  expect(window.naq).toHaveLength(2);
  expect(window.naq?.[0]).toEqual(["test", { test: "test" }]);
  expect(window.naq?.[1]).toEqual(["test2", { test: "test2" }]);
});
