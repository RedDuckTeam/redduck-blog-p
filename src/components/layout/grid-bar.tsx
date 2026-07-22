import { cn } from "@/lib/utils";

type GridBarPosition = "top" | "bottom" | "middle" | "none";

interface GridBarProps {
  position?: GridBarPosition;
  variant?: "dark" | "concrete";
  columns?: 1 | 2;
  withPadding?: boolean;
}

const POSITION_CLASS: Record<GridBarPosition, string> = {
  top: "border-b",
  bottom: "border-t",
  middle: "border-y",
  none: "",
};

export function GridBar({
  position = "top",
  variant = "dark",
  columns = 2,
  withPadding = true,
}: GridBarProps) {
  const borderColor =
    variant === "dark" ? "border-dark-gray" : "border-concrete";

  return (
    <div className={cn(POSITION_CLASS[position], borderColor)}>
      <div
        className={cn(
          "flex h-5 md:h-10 2xl:h-[60px]",
          withPadding && "px-5 2xl:px-[60px]",
        )}
      >
        <div className={cn("flex-1 border-l border-r", borderColor)} />
        {columns === 2 && (
          <div className={cn("flex-1 border-r", borderColor)} />
        )}
      </div>
    </div>
  );
}

export default GridBar;
