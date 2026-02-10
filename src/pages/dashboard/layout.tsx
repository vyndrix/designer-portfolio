import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Bean, CircleSlash, FileLock } from "lucide-react";
import { NavLink, Outlet, useMatch } from "react-router";

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <main className="flex">
        <Sidebar>
          <SidebarHeader className="flex flex-row items-center justify-start gap-4 py-6">
            <Avatar size="lg">
              <AvatarImage src="#" />
              <AvatarFallback delayMs={600}>AD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-medium">Hello, admin</h1>
              <h3 className="text-xs text-primary/50">Welcome back!</h3>
            </div>
          </SidebarHeader>
          <Separator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuNavLink to="skills">
                      <FileLock />
                      Skills
                    </SidebarMenuNavLink>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuNavLink to="projects">
                      <Bean />
                      Projects
                    </SidebarMenuNavLink>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuNavLink to="users">
                      <CircleSlash />
                      Users
                    </SidebarMenuNavLink>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <Separator />
          <SidebarFooter>
            <h3 className="text-xs font-medium text-primary/50 justify-center text-center">
              Copyright © 2024. All rights reserved.
            </h3>
            <h3 className="text-xs font-medium text-primary/50 text-center italic">
              Designed by Vyndrix
            </h3>
          </SidebarFooter>
        </Sidebar>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

const SidebarMenuNavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  const hasMatched = useMatch(`dashboard/${to}`);

  return (
    <SidebarMenuButton isActive={!!hasMatched} asChild>
      <NavLink to={to}>{children}</NavLink>
    </SidebarMenuButton>
  );
};
