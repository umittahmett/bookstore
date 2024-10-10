import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/ui/alert-dialog"
import { alertDialogAtom } from "@utils/jotai"
import { useAtom } from "jotai"

const GlobalAlertDialog = () => {
  const [alertState, setAlertState] = useAtom(alertDialogAtom)
  return (
    <AlertDialog open={alertState.open} onOpenChange={() => setAlertState({ open: false })}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertState.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {alertState.message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={alertState.onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={alertState.onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default GlobalAlertDialog