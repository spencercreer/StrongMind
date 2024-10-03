import { Pizza, Topping } from "../types";

export function isValidPizzaToppings(
  toppingList: Topping[],
  pizzaList: Pizza[]
): boolean {
  const normalizeToppings = (toppings: Topping[]) =>
    toppings.map((topping) => topping.name.trim().toLowerCase()).sort();

  const normalizedToppingList = normalizeToppings(toppingList);

  for (const pizza of pizzaList) {
    const normalizedPizzaToppings = normalizeToppings(pizza.toppings);

    if (
      normalizedToppingList.length === normalizedPizzaToppings.length &&
      normalizedToppingList.every(
        (topping, index) => topping === normalizedPizzaToppings[index]
      )
    ) {
      return false;
    }
  }

  return true;
}

export function isValidPizzaName(
  pizzaName: string,
  pizzaList: Pizza[]
): boolean {
  const isDuplicate = pizzaList.some(
    (pizza) =>
      pizza.name.trim().toLowerCase() === pizzaName.trim().toLowerCase()
  );

  return !isDuplicate;
}
