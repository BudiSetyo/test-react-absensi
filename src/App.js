import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Dashboard, Auth, History } from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/history/:nik",
      element: <History />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
