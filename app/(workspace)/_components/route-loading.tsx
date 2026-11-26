import { Card } from "@/components/ui/card";

export function RouteLoading({ label }: { label: string }) {
  return (
    <div role="status">
      <span className="sr-only">{label}</span>
      <div aria-hidden="true" className="space-y-6 motion-safe:animate-pulse">
        <div className="h-9 w-48 rounded-md bg-slate-200" />
        <Card className="space-y-4">
          <div className="h-5 w-2/3 rounded bg-slate-200" />
          <div className="h-4 w-1/2 rounded bg-slate-100" />
          <div className="h-4 w-3/4 rounded bg-slate-100" />
        </Card>
      </div>
    </div>
  );
}
