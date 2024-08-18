import DashboardLayout from "./screens/Dashboard/DashboardLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UploadProduct from "./screens/Dashboard/UploadProduct";
import ManageProducts from "./screens/Dashboard/ManageProducts";

const router = createBrowserRouter([
  {
    path: "/admin/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "", element: <h1>Dashboard İçeriği</h1> },
      { path: "/admin/dashboard/upload", element: <UploadProduct /> },
      { path: "/admin/dashboard/manage", element: <ManageProducts /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
