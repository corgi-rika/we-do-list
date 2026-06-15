import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import type { DeleteConfirmModalProps } from "./type";

export default function DeleteConfirmModal({
  title,
  message,
  confirmLabel = "削除する",
  onConfirm,
  onClose,
}: DeleteConfirmModalProps) {
  return (
    <Modal title={title} onClose={onClose}>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col items-center gap-2 bg-red-50 rounded-2xl p-4">
          <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
          <p className="text-sm font-medium text-red-600 text-center">
            {message.title}
          </p>
          {message.description && (
            <p className="text-xs text-red-400 text-center">
              {message.description}
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" fullWidth onClick={onClose}>
            キャンセル
          </Button>
          <Button variant="destructive" fullWidth onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
