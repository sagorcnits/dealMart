import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./app/store.js";
import Socket_Provider from "./components/Socket_provider.jsx";
import "./index.css";
import router from "./routes/Routes.jsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Socket_Provider>
          <RouterProvider router={router}></RouterProvider>
        </Socket_Provider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
