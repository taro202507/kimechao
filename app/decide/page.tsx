"use client";

import dynamic from "next/dynamic";
import { LoadingScreen } from "@/components/LoadingScreen";

const DecideClient = dynamic(() => import("./decide-client"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function DecidePage() {
  return <DecideClient />;
}
