"use client";

import dynamic from "next/dynamic";
import { LoadingScreen } from "@/components/LoadingScreen";

const SettingsClient = dynamic(() => import("./settings-client"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function SettingsPage() {
  return <SettingsClient />;
}
