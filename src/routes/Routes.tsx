import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { paths } from "./path";
import { lazy, Suspense } from "react";
import Fallback from "../utils/Fallback";
const Home = lazy(() => import("../pages/Home"));
const Business = lazy(() => import("../pages/Business"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: paths.home,
      element: (
        <Suspense fallback={<Fallback />}>
          <Home />
        </Suspense>
      ),
    },
    {
      path: paths.business,
      element: (
        <Suspense fallback={<Fallback />}>
          <Business />
        </Suspense>
      ),
    },
    {
      path: paths.login,
      element: (
        <Suspense fallback={<Fallback />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: paths.register,
      element: (
        <Suspense fallback={<Fallback />}>
          <Register />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
