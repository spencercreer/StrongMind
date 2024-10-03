import { isValidTopping } from "../toppingValidation";
import { expect, describe, it } from "vitest";

describe("isValidTopping", () => {
  const toppingList = [
    {
      name: "pepperoni   ",
    },
    {
      name: "pineapple",
    },
  ];
  it("should not allow toppings with the same name", () => {
    expect(isValidTopping("pepperoni", toppingList)).toBe(false);
  });

  it("should allow unique toppings", () => {
    expect(isValidTopping("sausage", toppingList)).toBe(true);
  });

  it("should not allow toppings surrounded by extra spaces", () => {
    expect(isValidTopping("   pepperoni   ", toppingList)).toBe(false);
  });

  it("should not be case sensitive", () => {
    expect(isValidTopping("PINEapple", toppingList)).toBe(false);
  });
});
