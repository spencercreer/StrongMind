import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useDeleteTopping } from "../../../api/mutations";
import PopConfirm from "../../../componentLibrary/PopConfirm";

export default function DeleteToppingButton({
  toppingId,
}: {
  toppingId: string;
}) {
  const queryClient = useQueryClient();
  const mutation = useDeleteTopping({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["toppings"] });
      await queryClient.invalidateQueries({ queryKey: ["pizzas"] });
    },
  });
  return (
    <PopConfirm
      prompt={
        <div>
          <h3 className="mb-2 font-bold">
            Are you sure you want to delete this Topping?
          </h3>
          <p>
            Deleting a topping will also delete any pizza using that topping.
          </p>
        </div>
      }
      onConfirm={() => mutation.mutate(toppingId)}
    >
      <TrashIcon className="w-6 h-6 text-red" />
    </PopConfirm>
  );
}
