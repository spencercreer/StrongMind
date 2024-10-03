import { Pizza, Topping } from "../types";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

async function get<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return response.json() as Promise<T>;
  }
  throw Error(`Error fetching ${url}`);
}

export async function getPizzas() {
  return get<Pizza[]>(`${apiBaseUrl}/pizza`);
}

export async function getToppings() {
  return get<Topping[]>(`${apiBaseUrl}/topping`);
}
