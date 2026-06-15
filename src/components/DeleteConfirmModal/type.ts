import type { ReactNode } from "react";

export type DeleteConfirmModalProps = {
  title: string;
  message: {
    title: string;
    description?: ReactNode;
  };
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
};
