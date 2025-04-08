import { Link } from "react-router-dom";
import { 
  BarChart3, 
  ClipboardList, 
  Settings, 
  Shield, 
  Users, 
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
    icon: BarChart3,
    path: "/admin/dashboard",
  },
  {
    title: "Users",
    icon: Users,
    path: "/admin/users",
  },
  {
    title: "Reports",
    icon: ClipboardList,
    path: "/admin/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/admin/settings",
  }
];

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center gap-2 py-4">
        <Activity className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold">SRRS</span>
        <span className="text-xs px-1.5 py-0.5 ml-auto bg-accent/10 text-accent rounded-md">Admin</span>
        <SidebarTrigger className="ml-auto md:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
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
