"use client";

import { NotFound } from "@seed-archive/ui/not-found";

import { ArchiveBar } from "@/components/archive/ArchiveBar";

export default function NotFoundPage() {
  return <NotFound header={<ArchiveBar />} />;
}
