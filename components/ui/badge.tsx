import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "neutral" | "info" | "success";

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  tone?: BadgeTone;
};

const tones: Record<BadgeTone, string> = {
  neutral: "bg-slate-200 text-slate-800",
  info: "bg-indigo-100 text-indigo-900",
  success: "bg-emerald-100 text-emerald-900",
};

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", tones[tone], className)}
    />
  );
}
