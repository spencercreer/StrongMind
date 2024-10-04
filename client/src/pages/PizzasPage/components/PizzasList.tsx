import React, { Dispatch, SetStateAction, useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useQueryClient } from "@tanstack/react-query";
import { useDeletePizza } from "../../../api/mutations";
import { useGetPizzas } from "../../../api/queries";
import { Pizza } from "../../../types";
import CreatePizzaForm from "./../components/CreatePizzaForm";
import Modal from "../../../componentLibrary/Modal";
import Container from "../../../componentLibrary/Container";
import PopConfirm from "../../../componentLibrary/PopConfirm";
import Spinner from "../../../componentLibrary/Spinner";
import Button from "../../../componentLibrary/Button";
import EditPizzaModal from "./EditPizzaModal";

export default function PizzasList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatePizza, setUpdatePizza] = useState<Pizza>();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { data: pizzas, isError, isLoading } = useGetPizzas();

  const queryClient = useQueryClient();

  const mutation = useDeletePizza({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["pizzas"] });
    },
  });

  if (isLoading) return <Spinner />;
  if (isError || !pizzas) return <div>Error</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full overflow-visible">
      <Container>
        <h1 className="font-pacifico mb-4">Pizza Menu</h1>
        <hr className="py-2 border-gray-400" />
        <div className="flex-grow">
          {pizzas.map((pizza, i) => (
            <div key={`Pizza_${pizza.name}_${i}`}>
              <div className="flex flex-row justify-between overflow-visible">
                <h2 className="capitalize">{pizza.name}</h2>
                <div className="flex space-x-2 justify-center items-center">
                  <Button
                    variant="secondary"
                    onClick={() => setUpdatePizza(pizza)}
                  >
                    <PencilSquareIcon className="w-6 h-6" color="black" />
                  </Button>
                  <PopConfirm
                    prompt="Are you sure you want to delete this Pizza?"
                    onConfirm={() => mutation.mutate(pizza._id!)}
                  >
                    <TrashIcon className="w-6 h-6 text-red" />
                  </PopConfirm>
                </div>
              </div>
              {pizza.toppings.map((topping, i) => (
                <p
                  className="capitalize ml-8"
                  key={`${pizza.name}_${topping.name}_${i}`}
                >
                  - {topping.name}
                </p>
              ))}
              {i < pizzas.length - 1 && <hr className="my-2" />}
            </div>
          ))}
        </div>
      </Container>
      <Container className="hidden md:block h-fit">
        <CreatePizzaForm pizzaList={pizzas} />
      </Container>
      <div className="md:hidden fixed bottom-20 right-8">
        <button
          onClick={openModal}
          className="bg-red text-white px-4 py-2 rounded-full shadow-lg"
        >
          Create Pizza
        </button>
      </div>
      <Modal isOpen={isModalOpen} onCloseModal={closeModal}>
        <CreatePizzaForm pizzaList={pizzas} />
      </Modal>
      {updatePizza && (
        <EditPizzaModal
          pizzaList={pizzas}
          isModalOpen={!!updatePizza}
          closeModal={() => setUpdatePizza(undefined)}
          updatePizza={
            updatePizza as {
              _id: string;
              name: string;
              toppings: {
                _id: string;
                name: string;
              }[];
            }
          }
          setUpdatePizza={
            setUpdatePizza as Dispatch<
              SetStateAction<{
                _id: string;
                name: string;
                toppings: {
                  _id: string;
                  name: string;
                }[];
              }>
            >
          }
        />
      )}
    </div>
  );
}
