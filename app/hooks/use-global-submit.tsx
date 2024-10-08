import { useFetcher } from '@remix-run/react';
import { isLoadingAtom } from '@utils/jotai';
import { useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

type ResponseData = {
  success?: boolean;
  message?: string;
  error?: string;
};

export function useFetchAction() {
  const fetcher = useFetcher<ResponseData>();
  const successCallback = useRef<(() => void) | null>(null);
  const errorCallback = useRef<(() => void) | null>(null);
  const setIsLoading = useSetAtom(isLoadingAtom);

  const sendAction = (formData: FormData, method: 'post' | 'get' | 'put' | 'delete' = 'post', action: string, successFunction?: () => void, errorFunction?: () => void,) => {
    setIsLoading(true);
    successCallback.current = successFunction || null;
    errorCallback.current = errorFunction || null;
    fetcher.submit(formData, { method, action });
  };

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data?.success) {
      if (successCallback.current) {
        successCallback.current();
        successCallback.current = null;
      }
      setIsLoading(false);
      toast.success(["Success"], {
        closeButton: false,
        description: fetcher.data.message || "Success.",
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    }

    if (fetcher.state === 'idle' && fetcher.data?.error) {
      setIsLoading(false);
      if (errorCallback.current) {
        errorCallback.current();
        errorCallback.current = null;
      }
      toast.error(["Error"], {
        closeButton: false,
        description: fetcher.data.error || "Error.",
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    }
  }, [fetcher.state, fetcher.data]);


  return { sendAction, fetcher };
}
