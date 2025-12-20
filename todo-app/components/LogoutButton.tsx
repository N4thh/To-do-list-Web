"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-auto w-full rounded-lg bg-white/20 px-4 py-2 text-left 
                 text-white hover:bg-white hover:text-[#FF6767] transition"
    >
      Logout
    </button>
  );
}
