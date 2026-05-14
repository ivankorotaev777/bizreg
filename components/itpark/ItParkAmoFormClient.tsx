"use client";

import dynamic from "next/dynamic";

const AmoFormEmbed = dynamic(
  () => import("@/components/AmoFormEmbed").then((m) => m.AmoFormEmbed),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[512px] w-full rounded-lg bg-muted/20 animate-pulse"
        aria-hidden
      />
    ),
  }
);

/** IT Park only: client-only load avoids hydration / SPA conflicts with Amo globals. */
export function ItParkAmoFormClient() {
  return (
    <AmoFormEmbed
      formId="1709750"
      formHash="a0b6ea516a49be01cd0092acb0ac2dce"
      amoScriptVersion="1778751047"
    />
  );
}
