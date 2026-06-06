import { useState } from "react";
import { dummyCategories, type Category } from "@/dummy/categories";
import { categoryColors } from "@/constants/category";

export function useCategoryForm() {
  const [categories, setCategories] = useState<Category[]>(dummyCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputError, setInputError] = useState("");
  const [limitError, setLimitError] = useState("");

  const openModal = () => {
    if (categories.length >= categoryColors.length) {
      setLimitError("追加できるカテゴリーは6個までです");
      return;
    }
    setLimitError("");
    setInputName("");
    setInputError("");
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const addCategory = () => {
    if (!inputName.trim()) {
      setInputError("カテゴリー名を入力してください");
      return;
    }
    setCategories((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: inputName.trim(),
        dotColor: categoryColors[prev.length],
      },
    ]);
    setIsModalOpen(false);
  };

  return {
    categories,
    isModalOpen,
    inputName,
    inputError,
    limitError,
    setInputName,
    openModal,
    closeModal,
    addCategory,
  };
}
