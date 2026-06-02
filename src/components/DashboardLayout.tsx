"use client";

import Link from "next/link";
import {
  CalendarCheck,
  LayoutDashboard,
  Calendar,
  User,
  Clock,
  Link2,
  LogOut,
} from "lucide-react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Inicio", url: "/dashboard", icon: LayoutDashboard },
  { title: "Citas", url: "/dashboard/appointments", icon: Calendar },
  { title: "Perfil", url: "/dashboard/profile", icon: User },
  { title: "Disponibilidad", url: "/dashboard/availability", icon: Clock },
  { title: "Mi link", url: "/dashboard/link", icon: Link2 },
];

function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Logo */}
        <div className="p-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-bold text-lg"
          >
            <CalendarCheck className="h-6 w-6 text-primary shrink-0" />
            {!collapsed && <span>Agendly</span>}
          </Link>
        </div>

        {/* Navegación */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      href={item.url}
                      end={item.url === "/dashboard"}
                      className="hover:bg-accent flex items-center gap-2"
                      activeClassName="bg-accent text-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout */}
        <div className="mt-auto p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href="/login" // ✅ cambiado
                  className="hover:bg-accent text-muted-foreground flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>Cerrar sesión</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between border-b px-4">
            <SidebarTrigger />
            <ThemeToggle />
          </header>

          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {children} {/* ✅ reemplaza Outlet */}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
