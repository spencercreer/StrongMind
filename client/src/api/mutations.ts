import { DefaultError, useMutation } from "@tanstack/react-query";
import { Pizza, Topping } from "../types";
import * as client from "./client";

interface MutationOptions<T> {
  onMutate?: () => Promise<void>;
  onSuccess?:
    | ((
        data: unknown,
        variables: T,
        context: unknown
      ) => Promise<unknown> | unknown)
    | undefined;
  onError?: () => void;
}

function useGenericMutation<T>(
  mutationFn: (body: T) => Promise<unknown>,
  options: MutationOptions<T>
) {
  return useMutation<unknown, DefaultError, T>({
    mutationFn,
    onMutate: options.onMutate,
    onSuccess: options.onSuccess,
    onError: options.onError,
  });
}

export function useCreatePizza(options: MutationOptions<Pizza>) {
  return useGenericMutation(client.createPizza, options);
}

export function useUpdatePizza(options: MutationOptions<Pizza>, id: string) {
  return useGenericMutation(
    (body: Pizza) => client.updatePizza(id, body),
    options
  );
}

export function useDeletePizza(options: MutationOptions<string>) {
  return useGenericMutation(client.deletePizza, options);
}

export function useCreateTopping(options: MutationOptions<Topping>) {
  return useGenericMutation(client.createTopping, options);
}

export function useUpdateTopping(
  options: MutationOptions<Topping>,
  id: string
) {
  return useGenericMutation(
    (body: Topping) => client.updateTopping(id, body),
    options
  );
}

export function useDeleteTopping(options: MutationOptions<string>) {
  return useGenericMutation(client.deleteTopping, options);
}
