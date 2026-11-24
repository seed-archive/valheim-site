import { GuidesIndex } from "@/components/guides/GuidesIndex";
import { GUIDE_GROUPS } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.guides.meta.index", "/guides");
}

export default function GuidesPage() {
  return (
    <GuidesIndex
      name="archive.guides"
      title="pages.guides.title"
      groups={GUIDE_GROUPS}
    />
  );
}
