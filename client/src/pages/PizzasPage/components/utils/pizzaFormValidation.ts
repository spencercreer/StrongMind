import { Pizza } from "../../../../types";
import {
  isValidPizzaName,
  isValidPizzaToppings,
} from "../../../../utils/pizzaValidation";

interface PizzaValidationErrors {
  name: string;
  topping: string;
}

export function isValidPizzaSubmission(
  pizza: Pizza,
  pizzaList: Pizza[]
): { isValid: boolean; errors: PizzaValidationErrors } {
  const errors: PizzaValidationErrors = { name: "", topping: "" };

  if (!pizza.name) {
    errors.name = "Pizza name is required";
  } else if (!isValidPizzaName(pizza.name, pizzaList)) {
    errors.name = "Pizza name already exists";
  }

  if (!isValidPizzaToppings(pizza.toppings, pizzaList)) {
    errors.topping = "Topping combination already exists";
  }

  const isValid = !errors.name && !errors.topping;

  return { isValid, errors };
}
