"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { UserData } from "@prisma/client";
import { AudioLines, ChevronRight, Handshake, Workflow } from "lucide-react";
import { AnalysisChart } from "@/components/AnalysisChart";
import RedirectSession from "@/components/RedirectSession";

interface SectionCard {
  title: string;
  description: string;
  icon: React.ReactElement;
  href: string;
  color: string;
}

const SectionCard = ({
  title,
  description,
  icon,
  href,
  color,
}: SectionCard) => {
  return (
    <>
      <a
        className="flex w-1/2 items-center justify-center py-3 border border-black/10 bg-black/1 rounded-2xl gap-x-3 hover:opacity-60 cursor-pointer transition duration-200"
        href={href}
      >
        <div className={`p-1 rounded-xl ${color}`}>{icon}</div>
        <div className="flex gap-x-2 flex-col">
          <h1 className="font-semibold text-xl">{title}</h1>
          <p className="text-gray-700 p">{description}</p>
        </div>
        <ChevronRight />
      </a>
    </>
  );
};

const LargeSectionCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-[40vh] py-4 flex w-full items-center justify-center border border-black/10 bg-black/1 rounded-md gap-x-3">
        {children}
      </div>
    </>
  );
};

const Dashboard = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserData | null>(null);
  const [mount, setMount] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string | null>(null);

  useEffect(() => {
    // Code wird nur im Browser ausgeführt
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        setFullName(userData.user.fullname);
      } catch (err) {
        console.error("Failed to parse userData:", err);
      }
    }
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (!session?.user?.email) {
          return;
        }
        const res = await fetch("/api/user/user-exists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: session.user.email }),
        });
        const data = await res.json();
        console.log(data.user);

        localStorage.setItem("userData", JSON.stringify(data));
        if (data.exists && data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUserData();
    setMount(true);
  }, [session]);

  if (!mount) return null;

  return (
    <>
      <RedirectSession />
      <section className="flex w-full flex-col px-24">
        <div className="pt-8 flex items-start justify-start">
          <h1 className="text-3xl lg:text-5xl p font-bold">
            Hey {fullName || user?.fullname}!👋
          </h1>
        </div>

        <div className="w-full mt-6">
          <LargeSectionCard>
            <AnalysisChart />
          </LargeSectionCard>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
