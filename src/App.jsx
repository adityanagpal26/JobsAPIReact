import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ErrorPage,
  HomePage,
  DashboardPage,
  RegisterPage,
  LandingPage,
  EditJobPage,
} from "./pages";
import { loader as DashboardPageLoader } from "./pages/DashboardPage";
import { action as registerAction } from "./pages/RegisterPage";
import { action as LandingPageAction } from "./pages/LandingPage";
import { loader as LandingPageLoader } from "./pages/LandingPage";
import { loader as EditJobLoader } from "./pages/EditJobPage";
import { action as EditJobAction } from "./pages/EditJobPage";
import store from "./store/store";
import { useQueryClient } from "@tanstack/react-query";


function App() {
  const queryClient= useQueryClient();
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <HomePage />,
    },
    {
      path: "/dashboard",
      errorElement: <ErrorPage />,
      element: <DashboardPage />,
      loader: DashboardPageLoader(store),
      children: [
        {
          index: true,
          element: <LandingPage />,
          action: LandingPageAction(queryClient),
          loader: LandingPageLoader(queryClient),
        },
        {
          path: ":id",
          element: <EditJobPage />,
          loader:EditJobLoader(store),
          action: EditJobAction(queryClient),
        },
      ],
    },
    {
      path: "/register",
      element: <RegisterPage />,
      action: registerAction(store),
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
