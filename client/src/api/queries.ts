import { useQuery } from "@tanstack/react-query";
import * as client from "./client";

export function useGetPizzas() {
  return useQuery({
    queryKey: ["pizzas"],
    queryFn: () => client.getPizzas(),
  });
}

export function useGetToppings() {
  return useQuery({
    queryKey: ["toppings"],
    queryFn: () => client.getToppings(),
  });
}
