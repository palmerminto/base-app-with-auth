"use client";

import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../queries";
import useAuthGuard from "@/hooks/useAuthGuard";
import { signOut } from "firebase/auth";

import Products from "@/components/pages/a/Products";
import { auth } from "@/lib/firebase/firebaseClient";
import { useRouter } from "next/router";

const _Products = () => {
  const response = useQuery(GET_PRODUCTS);
  const router = useRouter();

  const { user } = useAuthGuard();

  if (response.loading) return <p>Loading...</p>;
  if (response.error) return <p>Error: {response.error.message}</p>;

  const handleLogout = async () => {
    if (!auth) {
      throw new Error("Firebase auth is not initialized");
    }
    await signOut(auth);
    router.push("/auth");
  };

  return (
    <Products
      products={response.data?.products ?? []}
      user={user}
      router={{ navigate: router.push }}
      onLogout={handleLogout}
    />
  );
};

export default _Products;
