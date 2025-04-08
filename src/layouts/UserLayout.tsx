
import { Outlet } from "react-router-dom";
import { UserSidebar } from "@/components/navigation/UserSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserHeader } from "@/components/navigation/UserHeader";

const UserLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <UserSidebar />
        <div className="flex-1 flex flex-col">
          <UserHeader />
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default UserLayout;
