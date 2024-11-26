"use client";

import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { auth } from "../../../lib/firebase";
import { GET_PRODUCTS } from "../queries";
import useAuthGuard from "@/hooks/useAuthGuard";
import Link from "next/link";

const Products = () => {
  // Fetch products only when logged in
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  const { user } = useAuthGuard();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Products</h1>
      <Link href="/a">Dashboard</Link> <p>For {user?.email}!</p>
      <ul>
        {data.products.map((product: { id: string; name: string }) => (
          <li key={product.id}>
            {product.name} (ID: {product.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
