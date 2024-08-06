import { useMutation } from "convex/react";
import { useState } from "react";

export const useMutationState = (mutation: any) => {
  const [pending, setPending] = useState(false);

  const mutationFn = useMutation(mutation);

  const mutate = (payload: any) => {
    setPending(true);

    return mutationFn(payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setPending(false);
      });
  };

  return {
    mutate,
    pending,
  };
};
