import { Topping } from "../types";

export function isValidTopping(
  toppingName: string,
  toppingList: Topping[]
): boolean {
  const isDuplicate = toppingList.some(
    (topping) => topping.name.toLowerCase() === toppingName.toLowerCase()
  );

  return !isDuplicate;
}
