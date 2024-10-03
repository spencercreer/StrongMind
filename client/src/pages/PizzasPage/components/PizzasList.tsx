import React, { useState } from "react";
import { useGetPizzas } from "../../../api/queries";
import CreatePizzaForm from "./../components/CreatePizzaForm";
import Modal from "../../../componentLibrary/Modal";

export default function PizzasList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { data: pizzas, isError, isLoading } = useGetPizzas();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !pizzas) return <div>Error</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
      <div className="w-full">
        <h1 className="font-pacifico text-2xl mb-4">Pizza Menu</h1>
        <div className="space-y-2 h-3/4 overflow-y-scroll">
          {pizzas.map((pizza, i) => (
            <div key={`Pizza_${pizza.name}_${i}`}>
              <h2>{pizza.name}</h2>
              {pizza.toppings.map((topping, i) => (
                <div key={`${pizza.name}_${topping.name}_${i}`}>
                  {topping.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:block">
        <CreatePizzaForm pizzaList={pizzas} />
      </div>
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
    </div>
  );
}
