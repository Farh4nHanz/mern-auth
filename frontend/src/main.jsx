import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

import { routes } from "@/routes";
import { UserProvider } from "@/contexts/user-context";
import store from "@/redux/store";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <UserProvider>
          <RouterProvider router={routes} />
        </UserProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
