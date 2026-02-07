"use client";

import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";

type ProfileMenuProps = {
  email?: string | null;
};

export function ProfileMenu({ email }: ProfileMenuProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabaseBrowser.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-xs text-slate-500 dark:text-slate-300 sm:inline">
        {email ?? "Signed in"}
      </span>
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-full border border-white/20 bg-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-inner transition hover:bg-white/70 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
      >
        Log out
      </button>
    </div>
  );
}
