import { Outlet } from "react-router";
import Navigation from "./Navigation";

export default function Layout() {
  return (
    <main className="flex h-screen flex-col">
      <Outlet />
      <Navigation />
    </main>
  );
}
