import { Topping } from "../../types";
import { isValidPizzaToppings, isValidPizzaName } from "../pizzaValidation";
import { expect, describe, it } from "vitest";

const pizzaList = [
  {
    name: "Meat Lovers",
    toppings: [
      {
        name: "Pepperoni",
      },
      {
        name: "Ham",
      },
      {
        name: "Sausage",
      },
    ],
  },
];

describe("isValidPizzaToppings", () => {
  const matchingToppingList = [
    {
      name: "Pepperoni",
    },
    {
      name: "Ham",
    },
    {
      name: "Sausage",
    },
  ];

  const uniqueToppingList = [
    {
      name: "Pepperoni",
    },
    {
      name: "Ham",
    },
  ];

  const duplicateToppingList = [
    {
      name: "Pepperoni",
    },
    {
      name: "Pepperoni",
    },
  ];

  const caseInsensitiveToppingList = [
    {
      name: "pepperoni",
    },
    {
      name: "ham",
    },
    {
      name: "sausage",
    },
  ];

  const toppingListWithSpaces = [
    {
      name: "  Pepperoni ",
    },
    {
      name: " Ham  ",
    },
    {
      name: "Sausage",
    },
  ];

  const emptyToppingList: Topping[] = [];

  it("should not allow toppings if a pizza has the exact same toppings", () => {
    expect(isValidPizzaToppings(matchingToppingList, pizzaList)).toBe(false);
  });

  it("should allow pizzas with unique toppings", () => {
    expect(isValidPizzaToppings(uniqueToppingList, pizzaList)).toBe(true);
  });

  it("should allow pizzas with the same toppings but different case", () => {
    expect(isValidPizzaToppings(caseInsensitiveToppingList, pizzaList)).toBe(
      false
    );
  });

  it("should allow pizzas with toppings that have extra spaces", () => {
    expect(isValidPizzaToppings(toppingListWithSpaces, pizzaList)).toBe(false);
  });

  it("should not allow pizzas with duplicate toppings", () => {
    expect(isValidPizzaToppings(duplicateToppingList, pizzaList)).toBe(true);
  });

  it("should not allow pizzas with an empty topping list if a pizza with no toppings exists", () => {
    const noToppingPizzaList = [{ name: "Cheese Pizza", toppings: [] }];
    expect(isValidPizzaToppings(emptyToppingList, noToppingPizzaList)).toBe(
      false
    );
  });

  it("should allow pizzas with an empty topping list if no pizzas exist with no toppings", () => {
    expect(isValidPizzaToppings(emptyToppingList, pizzaList)).toBe(true);
  });
});

describe("isValidPizzaName", () => {
  it("should not allow a pizza to have the same name", () => {
    expect(isValidPizzaName("Meat Lovers", pizzaList)).toBe(false);
  });

  it("should allow a unique pizza name", () => {
    expect(isValidPizzaName("Da Greek", pizzaList)).toBe(true);
  });

  it("should not allow pizza names surrounded by extra spaces", () => {
    expect(isValidPizzaName("   Meat Lovers   ", pizzaList)).toBe(false);
  });

  it("should not be case sensitive", () => {
    expect(isValidPizzaName("meat lovers", pizzaList)).toBe(false);
  });
});
