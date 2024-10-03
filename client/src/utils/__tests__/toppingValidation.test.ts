import { isValidTopping } from "../toppingValidation";
import { expect, describe, it } from "vitest";

describe("toppingValidation", () => {
  const toppingList = [
    {
      name: "pepperoni",
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
});
