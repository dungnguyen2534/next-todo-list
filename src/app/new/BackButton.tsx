"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="link"
      title="Back to home page"
      onClick={() => router.back()}
    >
      <ArrowLeft className="mt-[0.1rem] -ml-3" /> Go back
    </Button>
  );
}
