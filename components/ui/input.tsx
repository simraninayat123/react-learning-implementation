import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Input({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      {...props}
      className={cn(
        "min-h-10 w-full rounded-lg border border-(--ui-border) bg-(--ui-surface) px-3 text-sm text-(--ui-text) placeholder:text-(--ui-muted) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50",
        className,
      )}
    />
  );
}
