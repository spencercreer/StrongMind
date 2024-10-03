import { DefaultError, useMutation } from "@tanstack/react-query";
import { Topping } from "../types";
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

export function useCreateTopping(options: MutationOptions<Topping>) {
  return useGenericMutation(client.createTopping, options);
}
