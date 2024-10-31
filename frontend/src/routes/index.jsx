import { createBrowserRouter } from "react-router-dom";

import App from "@/App";

// layouts
import AuthLayout from "@/layouts/auth-layout";

// pages
import RegisterPage from "@/pages/register";
import LoginPage from "@/pages/login";
import HomePage from "@/pages/home";
import ErrorPage from "@/pages/error";
import ForgotPasswordPage from "@/pages/forgot-password";

// components
import { ProtectedRoute } from "@/components/protected-route";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: (
      <AuthLayout page="register">
        <RegisterPage />
      </AuthLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthLayout page="login">
        <LoginPage />
      </AuthLayout>
    ),
  },
  {
    path: "/reset-password",
    element: <ForgotPasswordPage />,
  },
]);
