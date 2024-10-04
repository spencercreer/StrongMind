import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Pizza } from "../../../types";
import { isValidPizzaSubmission } from "./utils/pizzaFormValidation";
import ToppingSelect from "./ToppingSelect";
import { MultiSelectOption } from "../../../componentLibrary/MultiSelectDropdown";
import Button from "../../../componentLibrary/Button";
import Modal from "../../../componentLibrary/Modal";
import Input from "../../../componentLibrary/Input";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdatePizza } from "../../../api/mutations";

interface EditPizzaModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  pizzaList: Pizza[];
  updatePizza: {
    _id: string;
    name: string;
    toppings: {
      _id: string;
      name: string;
    }[];
  };
  setUpdatePizza: Dispatch<
    SetStateAction<{
      _id: string;
      name: string;
      toppings: {
        _id: string;
        name: string;
      }[];
    }>
  >;
}

export default function EditPizzaModal({
  isModalOpen,
  closeModal,
  updatePizza,
  setUpdatePizza,
  pizzaList,
}: EditPizzaModalProps) {
  const [errors, setErrors] = useState({
    name: "",
    topping: "",
    default: "",
  });

  const queryClient = useQueryClient();

  const mutation = useUpdatePizza(
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["pizzas"] });
        closeModal();
      },
      onError: async () => {
        setErrors((prev) => ({
          ...prev,
          default: "Error creating pizza. Please try again.",
        }));
      },
    },
    updatePizza._id
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, name: "" }));
    setUpdatePizza((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleToppingChange = (
    selectedOptions: MultiSelectOption<string>[]
  ) => {
    setErrors((prev) => ({ ...prev, topping: "" }));
    setUpdatePizza((prev) => ({
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
    const { isValid, errors } = isValidPizzaSubmission(
      updatePizza,
      pizzaList.filter((pizza) => pizza._id !== updatePizza._id)
    );
    if (!isValid) {
      setErrors((prev) => ({ ...prev, ...errors }));
      return;
    }

    mutation.mutate(updatePizza);
    return;
  }

  return (
    <Modal isOpen={isModalOpen} onCloseModal={closeModal}>
      <h1 className="font-pacifico text-2xl mb-4">Update Pizza</h1>
      <hr className="py-2 border-gray-400" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-grow justify-between space-y-2"
      >
        <Input
          type="text"
          value={updatePizza.name}
          label="Pizza Name"
          onChange={handleNameChange}
        />
        {errors.name && <div className="text-red">{errors.name}</div>}
        <ToppingSelect
          value={updatePizza.toppings.map((topping) => ({
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
    </Modal>
  );
}
