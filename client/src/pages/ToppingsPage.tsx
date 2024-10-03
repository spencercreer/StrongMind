import React from "react";
import { useGetToppings } from "../api/queries";

export default function ToppingsPage() {
  const { data: toppings, isError, isLoading } = useGetToppings();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !toppings) return <div>Error</div>;

  return (
    <div className="h-screen bg-tan p-8">
      <div className="w-96 mx-auto">
        <h1 className="font-pacifico">Toppings List</h1>
        {toppings.map(({ name }, i) => (
          <h2 key={`${i}_${name}`}>{name}</h2>
        ))}
      </div>
    </div>
  );
}
