import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <div className="border-b border-b-black/10 w-full flex p-4">
            <SidebarTrigger />
          </div>
          <section>{children}</section>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
