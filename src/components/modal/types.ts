import { ReactNode } from "react";

export interface ModalComponentProps {
    title: string;
    content: ReactNode;
    id: string;
    open: boolean;
    setOpen: (value: boolean) => void;
    onConfirm: () => Promise<void>;
}