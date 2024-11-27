import { Router } from "@/app/contexts/router.types";
import { User } from "@/hooks/user.types";
import { FunctionComponent } from "react";

export const AdminDashboard: FunctionComponent<{
  user: User;
  onLogout: () => void;
  router: Router;
}> = ({ user, onLogout, router }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={() => router.navigate("/a/products")}>Products</button>
      <p>Welcome, {user?.email}!</p>
      <button onClick={onLogout} style={{ marginTop: "20px" }}>
        Logout
      </button>
    </div>
  );
};
