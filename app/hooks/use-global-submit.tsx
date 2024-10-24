import { useFetcher, useNavigate } from '@remix-run/react';
import { alertDialogAtom, isLoadingAtom } from '@utils/jotai';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

type ResponseData = {
  status?: number;
  success?: boolean;
  message?: string;
  error?: string;
};

export function useFetchAction() {
  const fetcher = useFetcher<ResponseData>();
  const successCallback = useRef<(() => void) | null>(null);
  const errorCallback = useRef<(() => void) | null>(null);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [redirectPath, setRedirectTo] = useState<string>('');
  const navigate = useNavigate();
  const [alertState, setAlertState] = useAtom(alertDialogAtom)

  const sendAction = ({
    formData,
    method = 'post',
    action,
    successFunction,
    errorFunction,
    redirectTo,
    showAlert,
    alertTitle,
    alertMessage,
  }: {
    formData: FormData;
    method?: 'post' | 'get' | 'put' | 'delete';
    action: string;
    successFunction?: () => void;
    errorFunction?: () => void;
    redirectTo?: string;
    showAlert?: boolean
    alertTitle?: string
    alertMessage?: string
  }) => {
    !showAlert && setIsLoading(true);
    successCallback.current = successFunction || null;
    errorCallback.current = errorFunction || null;
    redirectTo && setRedirectTo(redirectTo);
    if (showAlert) {
      setAlertState({
        open: true,
        title: alertTitle || 'Are you absolutely sure?',
        message: alertMessage || 'This action cannot be undone!',
        onConfirm: () => {
          setIsLoading(true);
          fetcher.submit(formData, { method, action });
          setAlertState({ open: false });
        },
        onClose: () => {
          setAlertState({ open: false });
        }
      });
    }
    else {
      fetcher.submit(formData, { method, action })
    }
  };

  useEffect(() => {
    if (fetcher.state === "idle") {
      console.log(fetcher.state, fetcher.data);
      if (fetcher.data && fetcher.data.success) {
        if (successCallback.current) {
          successCallback.current();
          successCallback.current = null;
        }
        setIsLoading(false)
        toast.success(["Success"], {
          closeButton: false,
          description: fetcher.data.message || "Success.",
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });

        redirectPath && navigate(redirectPath);
      }
      if (fetcher.data && fetcher.data.error) {
        if (errorCallback.current) {
          errorCallback.current();
          errorCallback.current = null;
        }
        setIsLoading(false)
        toast.error(["Error"], {
          closeButton: false,
          description: fetcher.data.error || "Error.",
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      }
      setIsLoading(false);
    }
  }, [fetcher.state, fetcher.data]);

  return { sendAction, fetcher };
}
