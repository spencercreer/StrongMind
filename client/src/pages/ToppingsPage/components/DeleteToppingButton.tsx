import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteTopping } from "../../../api/mutations";
import Button from "../../../componentLibrary/Button";

export default function DeleteToppingButton({
  toppingId,
}: {
  toppingId: string;
}) {
  const queryClient = useQueryClient();
  const mutation = useDeleteTopping({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["toppings"] });
    },
  });
  return <Button onClick={() => mutation.mutate(toppingId)}>Delete</Button>;
}
