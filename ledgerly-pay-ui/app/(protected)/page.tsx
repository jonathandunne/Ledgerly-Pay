"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { GlassTile } from "@/components/glass/GlassTile";

const merchantOptions = ["startbucks", "tim hortons", "best buy"];

export default function PaymentPage() {
  const router = useRouter();
  const [merchant, setMerchant] = useState(merchantOptions[0]);
  const [amount, setAmount] = useState("");

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedAmount = amount.trim();
    if (!trimmedAmount) {
      return;
    }

    const params = new URLSearchParams({
      merchant,
      amount: trimmedAmount,
    });

    router.push(`/confirm?${params.toString()}`);
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
          Ledgerly Pay
        </p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Send a payment
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Choose a transaction type and send instantly.
        </p>
      </div>

      <GlassTile
        title="New transfer"
        description="Pick a transaction type and send the amount."
      >
        <form onSubmit={handleSend} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Transaction type
            </label>
            <select
              value={merchant}
              onChange={(event) => setMerchant(event.target.value)}
              className="w-full rounded-2xl border border-white/30 bg-white/70 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200/60 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:focus:ring-sky-500/30"
            >
              {merchantOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Amount
            </label>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0.00"
              className="w-full rounded-2xl border border-white/30 bg-white/70 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200/60 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:focus:ring-sky-500/30"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-500"
          >
            Send
          </button>
        </form>
      </GlassTile>
    </div>
  );
}
