import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import router from "./routes";
import queryClient from "./lib/tanstack-query";
import Navigation from "./components/Navigation";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
