import type { HTMLProps } from "react";

import { cn } from "@/lib/utils";

interface CustomSectionProps extends HTMLProps<HTMLDivElement> {
  as?: "div" | "header" | "footer" | "section";
}

export function CustomSection({
  children,
  className,
  as,
  ...props
}: CustomSectionProps) {
  const Slot = as ?? "section";

  return (
    <Slot {...props} className={cn(className)}>
      <div className="border-dark-gray 5xl:border-x mx-auto w-full max-w-[1920px] py-[20px] md:py-[40px] 2xl:py-[60px]">
        {children}
      </div>
    </Slot>
  );
}

export default CustomSection;
