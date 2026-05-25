import type { InputProps } from "./type";

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  error,
}: InputProps) {
  // エラーありなら赤いボーダー、なければグレー
  let borderClass = "border-gray-200";
  if (error) borderClass = "border-red-400";

  return (
    <div className="flex flex-col gap-1">

      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className={`
          w-full px-4 py-3 rounded-xl border ${borderClass}
          bg-white text-foreground placeholder:text-muted text-sm
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          transition-colors
        `}
      />

      {error && <p className="text-xs text-red-400">{error}</p>}

    </div>
  );
}

