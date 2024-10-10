import { atom } from 'jotai'
import { GlobalAlertDialogProps } from '~/types'

export const isLoadingAtom = atom<boolean>(false)
export const alertDialogAtom = atom<GlobalAlertDialogProps>({open: false, title: '', message: '', onClose: () => {}, onConfirm: () => {}})
