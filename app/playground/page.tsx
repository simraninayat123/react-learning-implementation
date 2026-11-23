import type { Metadata } from "next";
import { Playground } from "./playground";

export const metadata: Metadata = {
  title: "Component Playground | Project Tracker",
};

export default function PlaygroundPage() {
  return <Playground />;
}
