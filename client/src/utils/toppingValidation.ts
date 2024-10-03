import { Topping } from "../types";

export function isValidTopping(
  toppingName: string,
  toppingList: Topping[]
): boolean {
  const isDuplicate = toppingList.some(
    (topping) =>
      topping.name.trim().toLowerCase() === toppingName.trim().toLowerCase()
  );

  return !isDuplicate;
}
