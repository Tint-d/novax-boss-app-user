import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { paths } from "./path";
import { lazy, Suspense } from "react";
import Fallback from "../utils/Fallback";
import Layout from "../utils/Layout";
const Home = lazy(() => import("../pages/Home"));
const Business = lazy(() => import("../pages/Business"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const BusinessForm = lazy(() => import("../pages/BusinessForm"));
const Detail = lazy(() => import("../pages/Detail"));
const ForgetPassword = lazy(() => import("../pages/ForgetPassword"));
const Search = lazy(() => import("../pages/Search"));
const SearchBusinessCard = lazy(
  () => import("../components/business/SearchBusinessCard")
);

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: paths.home,
      element: (
        <Suspense fallback={<Fallback />}>
          <Layout>
            <Home />
          </Layout>
        </Suspense>
      ),
    },
    {
      path: paths.business,
      element: (
        <Suspense fallback={<Fallback />}>
          <Layout>
            <Business />
          </Layout>
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
    {
      path: paths.businessForm,
      element: (
        <Suspense fallback={<Fallback />}>
          <BusinessForm />
        </Suspense>
      ),
    },
    {
      path: paths.detail,
      element: (
        <Suspense fallback={<Fallback />}>
          <Detail />
        </Suspense>
      ),
    },
    {
      path: paths.search,
      element: (
        <Suspense fallback={<Fallback />}>
          <Layout>
            <Search />
          </Layout>
        </Suspense>
      ),
    },
    {
      path: paths.forget_password,
      element: (
        <Suspense fallback={<Fallback />}>
          <ForgetPassword />
        </Suspense>
      ),
    },
    {
      path: paths.search_business,
      element: (
        <Suspense fallback={<Fallback />}>
          <Layout>
            <SearchBusinessCard />
          </Layout>
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
