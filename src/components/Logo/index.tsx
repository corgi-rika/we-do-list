import Image from "next/image";

export default function Logo() {
  return (
    <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center">
      <Image
        src="/wedolist-icon.svg"
        alt="We Do List Icon"
        width={48}
        height={48}
      />
    </div>
  );
}
