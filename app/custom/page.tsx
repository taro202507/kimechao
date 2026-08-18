"use client";

import dynamic from "next/dynamic";
import { LoadingScreen } from "@/components/LoadingScreen";

const CustomClient = dynamic(() => import("./custom-client"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function CustomPage() {
  return <CustomClient />;
}
