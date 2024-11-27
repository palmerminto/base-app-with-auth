"use client";

import { FunctionComponent } from "react";
import { User } from "@/hooks/user.types";
import { Router } from "@/app/contexts/router.types";

const Products: FunctionComponent<{
  products: any[];
  user: User;
  onLogout: () => void;
  router: Router;
}> = (props) => {
  return (
    <div>
      <h1>Products</h1>
      <button onClick={() => props.router.navigate("/a")}>Dashboard</button>
      <p>For {props.user?.email}!</p>
      <ul>
        {props.products.map((product: { id: string; name: string }) => (
          <li key={product.id}>
            {product.name} (ID: {product.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
