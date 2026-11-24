import { BugsPage } from "@/components/bugs/BugsPage";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.bugs.meta", "/bugs");
}

export default function Bugs() {
  return <BugsPage />;
}
