import type { Metadata } from "next";
import { Playground } from "./playground";
import { ThemeProvider } from "./theme-context";

export const metadata: Metadata = {
  title: "Component Playground | Project Tracker",
};

export default function PlaygroundPage() {
  return (
    <ThemeProvider>
      <Playground />
    </ThemeProvider>
  );
}
