import { expect, test } from "vitest";
import { init } from "./common";

test("initialize nebulatics instance", () => {
  expect(window.na).toBeUndefined();

  init();

  expect(window.na).toBeDefined();
  expect(window.na).toBeInstanceOf(Function);
});
