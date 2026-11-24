import { ToolsIndex } from "@/components/tools/ToolsIndex";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.tools.meta", "/tools");
}

export default function ToolsPage() {
  return <ToolsIndex />;
}
