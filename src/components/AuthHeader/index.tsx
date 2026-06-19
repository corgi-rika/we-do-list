import Logo from "@/components/Logo";
import MutedText from "@/components/MutedText";
import type { AuthHeaderProps } from "./type";

export default function AuthHeader({ subtitle }: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <Logo />
      {subtitle && (
        <>
          <h1 className="text-2xl font-bold text-foreground">We Do List</h1>
          <MutedText text={subtitle} />
        </>
      )}
    </div>
  );
}
