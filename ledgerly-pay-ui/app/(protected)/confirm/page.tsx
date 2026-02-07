"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { GlassTile } from "@/components/glass/GlassTile";

function buildApiUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000/";
  const normalized = base.endsWith("/") ? base : `${base}/`;
  return `${normalized}${path.replace(/^\//, "")}`;
}

export default function ConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const details = useMemo(() => {
    const merchant = searchParams.get("merchant") ?? "startbucks";
    const amount = searchParams.get("amount") ?? "0.00";
    return { merchant, amount };
  }, [searchParams]);

  const handleCancel = () => {
    router.push("/");
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(buildApiUrl("api/create-transaction"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transaction_type: details.merchant,
          amount: details.amount,
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Transaction failed");
      }

      router.push("/status?result=success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transaction failed");
      router.push("/status?result=failure");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
          Confirm
        </p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Review transfer
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Make sure the details look correct.
        </p>
      </div>

      <GlassTile title="Transaction details">
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/50 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-100">
            <span className="uppercase tracking-[0.2em] text-xs text-slate-500 dark:text-slate-400">
              Type
            </span>
            <span className="font-semibold">{details.merchant}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/50 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-100">
            <span className="uppercase tracking-[0.2em] text-xs text-slate-500 dark:text-slate-400">
              Amount
            </span>
            <span className="font-semibold">${details.amount}</span>
          </div>
          {error ? (
            <p className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-600 dark:text-red-300">
              {error}
            </p>
          ) : null}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full rounded-2xl border border-white/30 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white/90 dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={submitting}
              className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Sending..." : "Confirm"}
            </button>
          </div>
        </div>
      </GlassTile>
    </div>
  );
}
