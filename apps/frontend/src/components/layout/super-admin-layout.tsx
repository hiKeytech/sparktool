import { Outlet } from "@tanstack/react-router";
import { SuperAdminSidebar } from "./super-admin-sidebar";

export function SuperAdminLayout() {
  return (
    <div className="flex h-screen bg-[#070b09] overflow-hidden">
      <SuperAdminSidebar />
      <main className="flex-1 ml-64 h-full overflow-y-auto overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
