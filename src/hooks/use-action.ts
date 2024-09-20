import { useCallback, useState } from "react";

import { ActionState, FieldErrors } from "@/lib/use-action";

type Action<TInput, TOutput> = (
  data: TInput,
) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (data: string) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {},
) => {
  const [fieldError, setFieldError] = useState<FieldErrors<TInput> | undefined>(
    undefined,
  );
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async (input: TInput) => {
      setLoading(true);
      try {
        const res = await action(input);
        if (!res) return;

        setFieldError(res.fieldErrors);

        if (res.error) {
          setError(res.error);
          options.onError?.(res.error);
        }

        if (res.data) {
          setData(res.data);
          options.onSuccess?.(res.data);
        }
      } finally {
        setLoading(false);
        options.onComplete?.();
      }
    },
    [action, options],
  );

  return { execute, fieldError, error, data, loading };
};
