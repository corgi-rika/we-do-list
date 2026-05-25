export type InputType = "text" | "email" | "password" | "date";

export type InputProps = {
  label: string;
  type?: InputType;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  error?: string;
};
