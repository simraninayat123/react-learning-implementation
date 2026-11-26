"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function RouteError({ title, retry }: { title: string; retry: () => void }) {
  return (
    <Card className="max-w-xl">
      <div role="alert">
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <Button variant="secondary" onClick={retry} className="mt-4">Try again</Button>
    </Card>
  );
}
