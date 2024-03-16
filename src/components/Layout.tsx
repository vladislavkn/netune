import { FC } from "react";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";
import { Toaster } from "./ui/sonner";

const Layout: FC = () => (
  <main className="container flex flex-col gap-4 sm:gap-8 mb-12 px-4 sm:px-8">
    <Navigation />
    <Outlet />
    <Toaster />
  </main>
);

export default Layout;
