import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Dashboard, Auth } from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "auth",
      element: <Auth />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
