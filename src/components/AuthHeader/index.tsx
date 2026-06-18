import Image from "next/image";
import MutedText from "@/components/MutedText";
import type { AuthHeaderProps } from "./type";

export default function AuthHeader({ subtitle }: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center">
        <Image
          src="/wedolist-icon.svg"
          alt="We Do List Icon"
          width={48}
          height={48}
        />
      </div>
      <h1 className="text-2xl font-bold text-foreground">We Do List</h1>
      <MutedText text={subtitle} />
    </div>
  );
}