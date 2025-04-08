import { Link } from "react-router-dom";
import { 
  BarChart3, 
  FilePlus, 
  Home, 
  Settings, 
  User, 
  Activity 
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/app/dashboard",
  },
  {
    title: "New Report",
    icon: FilePlus,
    path: "/app/new-report",
  },
  {
    title: "Profile",
    icon: User,
    path: "/app/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/app/settings",
  }
];

export function UserSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center gap-2 py-4">
        <Activity className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold">SRRS</span>
        <span className="text-xs px-1.5 py-0.5 ml-auto bg-primary/10 text-primary rounded-md">User</span>
        <SidebarTrigger className="ml-auto md:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto pt-4">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/login">
              Log Out
            </Link>
          </Button>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
