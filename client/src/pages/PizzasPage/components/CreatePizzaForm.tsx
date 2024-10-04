import React, { useState, FormEvent } from "react";
import { Pizza } from "../../../types";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/16/solid";
import { useQueryClient } from "@tanstack/react-query";
import { useCreatePizza } from "../../../api/mutations";
import { isValidPizzaSubmission } from "./utils/pizzaFormValidation";
import Input from "../../../componentLibrary/Input";
import Button from "../../../componentLibrary/Button";
import ToppingSelect from "./ToppingSelect";
import { MultiSelectOption } from "../../../componentLibrary/MultiSelectDropdown";

const blankPizza = {
  name: "",
  toppings: [],
};

export default function CreatePizzaForm({ pizzaList }: { pizzaList: Pizza[] }) {
  const [newPizza, setNewPizza] = useState<{
    name: string;
    toppings: { _id: string; name: string }[];
  }>(blankPizza);

  const [errors, setErrors] = useState({
    name: "",
    topping: "",
    default: "",
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useCreatePizza({
    onSuccess: async () => {
      setNewPizza(blankPizza);
      await queryClient.invalidateQueries({ queryKey: ["pizzas"] });
    },
    onError: async () => {
      setErrors((prev) => ({
        ...prev,
        default: "Error creating pizza. Please try again.",
      }));
    },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, name: "" }));
    setNewPizza((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleToppingChange = (
    selectedOptions: MultiSelectOption<string>[]
  ) => {
    setErrors((prev) => ({ ...prev, topping: "" }));
    setNewPizza((prev) => ({
      ...prev,
      toppings: selectedOptions.map((option) => ({
        name: option.label,
        _id: option.value,
      })),
    }));
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    setErrors({ name: "", topping: "", default: "" });
    const { isValid, errors } = isValidPizzaSubmission(newPizza, pizzaList);
    if (!isValid) {
      setErrors((prev) => ({ ...prev, ...errors }));
      return;
    }

    mutation.mutate(newPizza);
    return;
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <h1 className="font-pacifico mb-4">Create Pizza</h1>
        <Button variant="secondary" onClick={() => navigate("/toppings")}>
          <PlusIcon className="w-5 h-5" /> Add Topping
        </Button>
      </div>
      <hr className="py-2 border-gray-400" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-grow justify-between space-y-2"
      >
        <Input
          type="text"
          value={newPizza.name}
          label="Pizza Name"
          onChange={handleNameChange}
        />
        {errors.name && <div className="text-red">{errors.name}</div>}
        <ToppingSelect
          value={newPizza.toppings.map((topping) => ({
            value: topping._id,
            label: topping.name,
          }))}
          onChange={handleToppingChange}
        />
        {errors.topping && <div className="text-red">{errors.topping}</div>}
        <Button
          type="submit"
          aria-label="Create Pizza"
          loading={mutation.isPending}
        >
          Submit
        </Button>
      </form>
      {errors.default && <div className="text-red">{errors.default}</div>}
    </>
  );
}
