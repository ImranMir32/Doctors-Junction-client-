import "./styles/app.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React, { lazy, Suspense } from "react";

import Loading from "./components/Loading";
import Login from "./routes/Login";
import Register from "./routes/Register";
import ErrorPage from "./error.page";

import { GlobalStateProvider } from "./Context/Global_Context";
import { GlobalMethodsProvider } from "./Context/GlobalMethodsContext";

const Home = lazy(() => import("./routes/Home"));
const Profile = lazy(() => import("./routes/Profile"));
const Doctors = lazy(() => import("./routes/Doctors"));
const ApplyDoctors = lazy(() => import("./routes/DoctorApply"));
const Appointments = lazy(() => import("./routes/Appointments"));
const Requests = lazy(() => import("./routes/Requests"));
const Notifications = lazy(() => import("./routes/Notifications"));

// admin
const Dashboard = lazy(() => import("./routes/Dashboard"));
const AdminApplicants = lazy(() =>
  import("./components/Admin/adminApplicants")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/doctors",
    element: <Doctors />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/apply",
    element: <ApplyDoctors />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/appointments",
    element: <Appointments />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/requests",
    element: <Requests />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/dashboard/applications",
    element: <AdminApplicants />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <GlobalStateProvider>
      <GlobalMethodsProvider>
        <Toaster />
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </GlobalMethodsProvider>
    </GlobalStateProvider>
  );
}

export default App;
