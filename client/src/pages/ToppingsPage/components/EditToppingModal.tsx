import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateTopping } from "../../../api/mutations";
import { Topping } from "../../../types";
import { isValidTopping } from "../../../utils/toppingValidation";
import Modal from "../../../componentLibrary/Modal";
import Input from "../../../componentLibrary/Input";
import Button from "../../../componentLibrary/Button";

export default function EditToppingModal({
  isModalOpen,
  closeModal,
  updateTopping,
  setUpdateTopping,
  toppings,
}: {
  isModalOpen: boolean;
  closeModal: () => void;
  updateTopping: Topping;
  setUpdateTopping: Dispatch<SetStateAction<Topping>>;
  toppings: Topping[];
}) {
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const mutation = useUpdateTopping(
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["toppings"] });
        await queryClient.invalidateQueries({ queryKey: ["pizzas"] });
        closeModal();
      },
      onError: async () => {
        setError("Error updating topping. Please try again");
      },
    },
    updateTopping._id!
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidTopping(updateTopping.name.trim(), toppings)) {
      setError("Topping is already in the list");
    } else {
      mutation.mutate(updateTopping);
      closeModal();
    }
  };

  const handleToppingNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setUpdateTopping((prev) => ({ ...prev, name: e.target.value }));
  };

  return (
    <Modal isOpen={isModalOpen} onCloseModal={closeModal}>
      <h1 className="font-pacifico text-2xl mb-4">Update Topping</h1>
      <hr className="py-2 border-gray-400" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          value={updateTopping.name}
          onChange={handleToppingNameChange}
          placeholder="New Topping Name"
        />
        <Button
          type="submit"
          aria-label="Add Topping"
          disabled={!updateTopping.name.trim()}
        >
          Update Topping
        </Button>
      </form>
      {error && <div className="text-red">{error}</div>}
    </Modal>
  );
}
