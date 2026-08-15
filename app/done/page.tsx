"use client";

import dynamic from "next/dynamic";
import { LoadingScreen } from "@/components/LoadingScreen";

const DoneClient = dynamic(() => import("./done-client"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function DonePage() {
  return <DoneClient />;
}
