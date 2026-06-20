"use client";

import dynamic from "next/dynamic";

const AmoFormEmbed = dynamic(
  () => import("@/components/AmoFormEmbed").then((m) => m.AmoFormEmbed),
  { ssr: false }
);

/** Client-only Amo form load for landing pages — avoids hydration / SPA conflicts with Amo globals. */
export function LandingAmoForm() {
  return <AmoFormEmbed />;
}
