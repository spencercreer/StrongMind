import { isValidPizzaSubmission } from "../pizzaFormValidation";
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

describe("isValidPizzaSubmission", () => {
  it("should not allow a pizza with the same name", () => {
    const newPizza = {
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
        {
          name: "Beacon",
        },
      ],
    };
    const { isValid, errors } = isValidPizzaSubmission(newPizza, pizzaList);
    expect(isValid).toBe(false);
    expect(errors.name).toBe("Pizza name already exists");
  });

  it("should not allow a pizza with an empty name", () => {
    const newPizza = {
      name: "",
      toppings: [
        {
          name: "Pepperoni",
        },
      ],
    };
    const { isValid, errors } = isValidPizzaSubmission(newPizza, pizzaList);
    expect(isValid).toBe(false);
    expect(errors.name).toBe("Pizza name is required");
  });

  it("should not a pizza with the same topping combination", () => {
    const newPizza = {
      name: "Meat Fanatics",
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
    };

    const { isValid, errors } = isValidPizzaSubmission(newPizza, pizzaList);
    expect(isValid).toBe(false);
    expect(errors.topping).toBe("Topping combination already exists");
  });
});
