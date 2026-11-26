"use client";

import { RouteError } from "../_components/route-error";

export default function ErrorPage({ retry }: { retry: () => void }) {
  return <RouteError title="Couldn’t load settings" retry={retry} />;
}
