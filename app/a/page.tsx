"use client";

import { useRouter } from "next/navigation";
import useAuthGuard from "../../hooks/useAuthGuard";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseClient";
import { AdminDashboard } from "@/components/pages/a/Dashboard";

const _AdminDashboard = () => {
  const { user } = useAuthGuard();
  const router = useRouter();

  const handleLogout = async () => {
    if (!auth) {
      throw new Error("Firebase auth is not initialized");
    }
    await signOut(auth);
    router.push("/auth");
  };

  return user ? (
    <AdminDashboard
      user={user}
      router={{ navigate: router.push }}
      onLogout={handleLogout}
    />
  ) : (
    <p>Loading...</p>
  );
};

export default _AdminDashboard;
