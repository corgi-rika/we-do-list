"use client";

import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import CategoryChip from "@/components/CategoryChip";
import type { TodoFormModalProps } from "./type";

export default function TodoFormModal({
  title,
  inputTitle,
  onChangeTitle,
  titleError,
  categories,
  selectedCategoryId,
  onSelectCategory,
  onSubmit,
  onClose,
  submitLabel,
}: TodoFormModalProps) {
  return (
    <Modal title={title} onClose={onClose}>
      <div className="flex flex-col gap-4 p-4">
        <Input
          label="タイトル"
          placeholder="例：掃除機をかける"
          value={inputTitle}
          onChange={onChangeTitle}
          error={titleError}
        />
        {/* カテゴリー選択 */}
        <div className="flex flex-col gap-1">
          <span className="text-sm text-foreground">カテゴリー</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <CategoryChip
                key={cat.id}
                name={cat.name}
                selected={selectedCategoryId === cat.id}
                onClick={() => onSelectCategory(cat.id)}
              />
            ))}
          </div>
        </div>
        <Button variant="primary" fullWidth onClick={onSubmit}>
          {submitLabel}
        </Button>
      </div>
    </Modal>
  );
}
