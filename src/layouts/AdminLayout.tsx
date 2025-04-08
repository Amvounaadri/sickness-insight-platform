
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "@/components/navigation/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminHeader } from "@/components/navigation/AdminHeader";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
