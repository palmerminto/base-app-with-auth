"use client";

import { useRouter } from "next/navigation";
import useAuthGuard from "../../hooks/useAuthGuard";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";

const AdminDashboard = () => {
  const { user } = useAuthGuard();
  const router = useRouter();

  const handleLogout = async () => {
    if (!auth) {
      throw new Error("Firebase auth is not initialized");
    }
    await signOut(auth);
    router.push("/auth");
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link href="/a/products">Products</Link>
      <p>Welcome, {user?.email}!</p>
      <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
