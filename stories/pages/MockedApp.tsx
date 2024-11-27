import { AdminDashboard as ComponentAdminDashboard } from "@/components/pages/a/Dashboard";
import Products from "@/components/pages/a/Products";
import { User } from "@/hooks/user.types";
import { FunctionComponent } from "react";
import { MemoryRouter, Routes, Route, useNavigate } from "react-router-dom";

const MockedAdminDashboard: FunctionComponent<{
  user: User;
  handleLogout: () => void;
}> = (props) => {
  const navigate = useNavigate();

  return (
    <ComponentAdminDashboard
      user={props.user}
      router={{ navigate }}
      onLogout={props.handleLogout}
    />
  );
};
const MockedProducts: FunctionComponent<{
  user: User;
  handleLogout: () => void;
}> = (props) => {
  const navigate = useNavigate();

  return (
    <Products
      user={props.user}
      router={{ navigate }}
      onLogout={props.handleLogout}
      products={[]}
    />
  );
};

export const StorybookAdminDashboard = () => {
  const mockUser = { email: "storybook@example.com" };

  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <MemoryRouter initialEntries={["/a"]}>
      <Routes>
        <Route
          path="/a"
          element={
            <MockedAdminDashboard user={mockUser} handleLogout={handleLogout} />
          }
        />
        <Route
          path="/a/products"
          element={
            <MockedProducts user={mockUser} handleLogout={handleLogout} />
          }
        />
      </Routes>
    </MemoryRouter>
  );
};
