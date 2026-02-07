"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GlassTile } from "@/components/glass/GlassTile";

export default function StatusPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const result = searchParams.get("result");
  const success = result === "success";

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <GlassTile
        title={success ? "Transaction sent" : "Transaction failed"}
        description={
          success
            ? "Your payment is on its way. Returning to the send screen."
            : "We could not send the payment. Returning to the send screen."
        }
      >
        <div className="rounded-2xl border border-white/20 bg-white/50 px-4 py-4 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-100">
          {success
            ? "Thanks for using Ledgerly Pay."
            : "Please try again in a moment."}
        </div>
      </GlassTile>
    </div>
  );
}
