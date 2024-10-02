import { sum } from "../util";
import { test, expect } from "vitest";

test("sum adds two numbers", () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(-1, 1)).toBe(0);
});
