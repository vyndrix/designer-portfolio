import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { useAuth } from "@/remote";
import { Bean, CircleSlash, FileLock, LogOut } from "lucide-react";
import { NavLink, Outlet, useMatch } from "react-router";

export function DashboardLayout() {
  const { user, signOut } = useAuth();

  return (
    <SidebarProvider>
      <main className="flex flex-1 p-8">
        <Sidebar>
          <SidebarHeader className="flex flex-row items-center justify-start gap-4 pt-6 px-3 pb-3">
            <Avatar size="lg">
              <AvatarImage src="#" />
              <AvatarFallback delayMs={600}>AD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text.lg font-medium">{`Hello, ${user?.email?.split("@")[0]}`}</h1>
              <h3 className="text-xs text-primary/50">Welcome back!</h3>
            </div>
          </SidebarHeader>
          <Button size="xs" onClick={signOut} className="m-3 mt-1">
            <LogOut className="rotate-180" />
            Logout
          </Button>
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
