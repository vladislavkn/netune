import { FC } from "react";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";

const Layout: FC = () => (
  <main className="container flex flex-col gap-8 mb-12">
    <Navigation />
    <Outlet />
  </main>
);

export default Layout;
