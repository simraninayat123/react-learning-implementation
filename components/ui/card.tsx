import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-2xl border border-(--ui-border) bg-(--ui-surface) p-5 text-(--ui-text)",
        className,
      )}
    />
  );
}
