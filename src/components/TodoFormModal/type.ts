import type { Category } from "@/types/category";

export type TodoFormModalProps = {
  title: string;
  inputTitle: string;
  onChangeTitle: (value: string) => void;
  titleError: string;
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  submitLabel: string;
};
