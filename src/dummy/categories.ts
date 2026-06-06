import { categoryColors } from "@/constants/category";

export type Category = { id: string; name: string; dotColor: string };

export const dummyCategories: Category[] = [
  { id: "1", name: "家事", dotColor: categoryColors[0] },
  { id: "2", name: "買い物", dotColor: categoryColors[1] },
  { id: "3", name: "イベント", dotColor: categoryColors[2] },
  { id: "4", name: "その他", dotColor: categoryColors[3] },
];
