import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { paths } from "./path";
import { lazy, Suspense } from "react";
import Fallback from "../utils/Fallback";
import Layout from "../utils/Layout";
import Authenticated from "@/components/auth/guards/Authenticated";
import Guest from "@/components/auth/guards/Guest";
import HadBossAddress from "@/components/auth/guards/HadBossAddress";
import NoBossAddress from "@/components/auth/guards/NoBossAddress";
import BossAddressDetail from "@/components/business/UserBossAddress/BossAddressDetail";
const FacebookLoginAuth = lazy(() => import("../pages/FacebookLoginAuth"));
const Home = lazy(() => import("../pages/Home"));
const Business = lazy(() => import("../pages/Business"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const BusinessForm = lazy(() => import("../pages/BusinessForm"));
const ForgetPassword = lazy(() => import("../pages/ForgetPassword"));
const Search = lazy(() => import("../components/business/BusinessSearchBox"));
const SearchBusinessCard = lazy(
  () => import("../components/business/SearchBusinessCard")
);
const SearchbusinessWithCity = lazy(
  () => import("../components/business/SearchbusinessWithCity")
);

const BusinessAddForm = lazy(
  () => import("../components/business/BusinessForm")
);
const BusinessDetail = lazy(
  () => import("../components/business/BusinessDetail")
);

const Profile = lazy(() => import("../pages/Profile"));
const BusinessEdit = lazy(() => import("../components/business/BusinessEdit"));

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
          <Authenticated>
            <Layout>
              <Login />
            </Layout>
          </Authenticated>
        </Suspense>
      ),
    },
    {
      path: paths.register,
      element: (
        <Suspense fallback={<Fallback />}>
           <Authenticated>
            <Layout>
            <Register />
            </Layout>
          </Authenticated>
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
          <Authenticated>
            <Layout>
              <ForgetPassword />
            </Layout>
          </Authenticated>
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
    {
      path: paths.search_city,
      element: (
        <Suspense fallback={<Fallback />}>
          <Layout>
            <SearchbusinessWithCity />
          </Layout>
        </Suspense>
      ),
    },
    {
      path: paths.business_information,
      element: (
        <Suspense fallback={<Fallback />}>
           <Guest>
          <HadBossAddress>
          <Layout>
            <BusinessAddForm />
          </Layout>
          </HadBossAddress>
          </Guest>
        </Suspense>
      ),
    },
    {
      path : paths.business_address,
      element : (
        <Suspense fallback={<Fallback />}>
          <NoBossAddress>
            <Layout>
              <BossAddressDetail />
            </Layout>
          </NoBossAddress>
        </Suspense>
      )
    },
    {
      path: paths.business_deatil,
      element: (
        <Suspense fallback={<Fallback />}>
           {/* <Guest> */}
          <Layout>
            <BusinessDetail />
          </Layout>
          {/* </Guest> */}
        </Suspense>
      ),
    },
    {
      path: paths.profile,
      element: (
        <Suspense fallback={<Fallback />}>
          <Layout>
            <Profile />
          </Layout>
        </Suspense>
      ),
    },
    {
      path: paths.business_edit,
      element: (
        <Suspense fallback={<Fallback />}>
           <Guest>
          <Layout>
            <BusinessEdit />
          </Layout>
          </Guest>
        </Suspense>
      ),
    },
    {
      path: paths.facebook_login,
      element: (
        <Suspense fallback={<Fallback />}>
          <Authenticated>
          <FacebookLoginAuth />
          </Authenticated>
        </Suspense>
      ),
    },
    {
      path: 'fallback',
      element: (
        <Suspense fallback={<Fallback />}>
          <Fallback />
        </Suspense>
      ),
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
