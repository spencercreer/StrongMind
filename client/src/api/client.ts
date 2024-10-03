import { Pizza, Topping } from "../types";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

async function get<T>(url: string): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${url}`, {
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

export async function post<T>(url: string, body: T): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${url}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return response.json() as Promise<T>;
  }
  throw Error(`Error fetching ${url}`);
}

export async function deleteItem(url: string): Promise<void> {
  const response = await fetch(`${apiBaseUrl}${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw Error(`Error deleting ${url}`);
  }
}

export async function getPizzas() {
  return get<Pizza[]>("/pizza");
}

export async function getToppings() {
  return get<Topping[]>("/topping");
}

export async function createTopping(body: Topping) {
  return post<Topping>("/topping", body);
}

export async function deleteTopping(id: string) {
  return deleteItem(`/topping/${id}`);
}
