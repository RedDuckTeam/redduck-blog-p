import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  children: ReactNode;
  className?: string;
}

export function SectionHeader({ children, className }: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-start border-b border-dark-gray font-mono font-medium uppercase",
        "px-[20px] text-[24px] md:text-[30px] 2xl:text-[45px]",
        "h-[100px] md:h-[120px] 2xl:h-[150px]",
        className,
      )}
    >
      <h2>{children}</h2>
    </header>
  );
}

export default SectionHeader;
