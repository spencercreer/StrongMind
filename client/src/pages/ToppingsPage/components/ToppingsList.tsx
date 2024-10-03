import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetToppings } from "../../../api/queries";
import { useCreateTopping } from "../../../api/mutations";
import { isValidTopping } from "../../../utils/toppingValidation";
import Button from "../../../componentLibrary/Button";
import Input from "../../../componentLibrary/Input";
import DeleteToppingButton from "./DeleteToppingButton";

export default function ToppingsList() {
  const [newTopping, setNewTopping] = useState("");
  const [error, setError] = useState("");

  const { data: toppings = [], isError, isLoading } = useGetToppings();
  const queryClient = useQueryClient();

  const mutation = useCreateTopping({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["toppings"] });
    },
    onError: async () => {
      setError("Error creating topping. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidTopping(newTopping.trim(), toppings)) {
      setError("Topping is already in the list");
    } else {
      mutation.mutate({ name: newTopping });
      setNewTopping("");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !toppings) return <div>Error loading toppings</div>;
  return (
    <div className="space-y-4">
      <h1 className="font-pacifico">Toppings List</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          value={newTopping}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setError("");
            setNewTopping(e.target.value);
          }}
          placeholder="New Topping Name"
        />
        <Button
          type="submit"
          aria-label="Add Topping"
          disabled={!newTopping.trim()}
        >
          Add Topping
        </Button>
      </form>
      {error && <div className="text-red">{error}</div>}
      <div className="space-y-2">
        {toppings.map(({ _id, name }, i) => (
          <div className="flex flex-row justify-between" key={`${i}_${name}`}>
            <h2>{name}</h2>
            <div className="space-x-2">
              <Button>Edit</Button>
              <DeleteToppingButton toppingId={_id!} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
