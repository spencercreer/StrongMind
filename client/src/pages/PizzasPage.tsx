import React from "react";
import { useGetPizzas } from "../api/queries";

export default function PizzasPage() {
  const { data: pizzas, isError, isLoading } = useGetPizzas();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !pizzas) return <div>Error</div>;

  return (
    <div className="h-screen bg-tan p-8">
      <div className="w-96 mx-auto">
        <h1 className="font-pacifico">Pizza Menu</h1>
        {pizzas.map(({ name }, i) => (
          <h2 key={`${i}_${name}`}>{name}</h2>
        ))}
      </div>
    </div>
  );
}
