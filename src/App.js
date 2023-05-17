import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard, Auth, History } from "./pages";
import { useSelector } from "react-redux";

function App() {
  const authData = useSelector((state) => state.auth.value);

  const router = createBrowserRouter([
    {
      path: "/",
      element: authData.isLogin ? <Dashboard /> : <Auth />,
    },
    {
      path: "/history/:nik",
      element: authData.isLogin ? <History /> : <Auth />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
