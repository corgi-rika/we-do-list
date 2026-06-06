"use client";

import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Input from "@/components/Input";
import type { CategoryModalProps } from "./type";

export default function CategoryModal({
  inputName,
  onChange,
  error,
  onSubmit,
  onClose,
}: CategoryModalProps) {
  return (
    <Modal title="カテゴリーを追加" onClose={onClose}>
      <div className="flex flex-col gap-4 p-4">
        <Input
          label="カテゴリー名"
          placeholder="例：買い物"
          value={inputName}
          onChange={onChange}
          error={error}
        />
        <Button variant="primary" fullWidth onClick={onSubmit}>
          作成
        </Button>
      </div>
    </Modal>
  );
}
