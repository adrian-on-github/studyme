import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import RedirectSession from "@/components/RedirectSession";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <RedirectSession />
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full flex items-start flex-col">
          <div className="border-b border-b-black/10 w-full flex p-4">
            <SidebarTrigger />
          </div>
          <section className="max-w-full">{children}</section>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
