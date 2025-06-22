"use client";
import React, { useEffect, useState } from "react";
import {
  AudioLines,
  Handshake,
  LayoutGrid,
  Settings,
  Workflow,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const AppSidebar = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      try {
        const parsed = JSON.parse(session);
        setUserId(parsed.id);
      } catch {
        console.error("session konnte nicht geparst werden");
      }
    }
  }, []);

  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutGrid,
    },
    {
      title: "Interview Coach",
      url: `/dashboard/assistant/interviewCoach/${userId}`,
      icon: AudioLines,
    },
  ];
  return (
    <Sidebar>
      <SidebarContent className="bg-blue-500/20 flex flex-col justify-between pb-4">
        <SidebarGroup>
          <SidebarGroupLabel>InterviewMe</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
