import React, { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useQueryClient } from "@tanstack/react-query";
import { useGetToppings } from "../../../api/queries";
import { useCreateTopping } from "../../../api/mutations";
import { isValidTopping } from "../../../utils/toppingValidation";
import Button from "../../../componentLibrary/Button";
import Input from "../../../componentLibrary/Input";
import DeleteToppingButton from "./DeleteToppingButton";
import Container from "../../../componentLibrary/Container";
import Spinner from "../../../componentLibrary/Spinner";

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

  if (isLoading) return <Spinner />;
  if (isError || !toppings) return <div>Error loading toppings</div>;

  return (
    <Container>
      <div className="space-y-4">
        <h1 className="font-pacifico">Toppings List</h1>
        <hr className="py-2 border-gray-400" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4"
        >
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
            <div key={`Topping_${i}_${name}`}>
              <div className="flex items-center justify-between py-2">
                <h2 className="text-lg font-semibold capitalize">{name}</h2>
                <div className="flex space-x-2">
                  <Button variant="secondary">
                    <PencilSquareIcon className="w-6 h-6" />
                  </Button>
                  <DeleteToppingButton toppingId={_id!} />
                </div>
              </div>
              {i < toppings.length - 1 && <hr className="my-2" />}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
