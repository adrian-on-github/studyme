"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import RedirectSession from "@/components/RedirectSession";
import type { UserData } from "@prisma/client";
import Image from "next/image";
import { media } from "@/constants";
import UserForm from "@/components/UserForm";
import { PhoneCall, PhoneOff } from "lucide-react";

interface SubmitProps {
  name: string;
  age: string;
  language: string;
}

const Page = () => {
  const [discoveryState, setDiscoveryState] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [mount, setMount] = useState<boolean>(false);
  const [voiceCall, setVoiceCall] = useState<boolean>(false);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const state = localStorage.getItem("discoveryState");
    if (state) {
      const getUser = async () => {
        const res = await fetch(`/api/user/getUser?userId=${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          console.error("Error GET User req");
        }
        const data = await res.json();
        setUserData(data.userData);
      };
      getUser();
      setDiscoveryState(state);
    }
    setMount(true);
  }, [discoveryState]);

  const isSpeaking = true;

  if (!mount) return null;

  return (
    <>
      {!discoveryState ? (
        <>
          <section className="px-10 pt-8 h-full w-full flex justify-center items-center flex-col">
            <UserForm />
          </section>
        </>
      ) : (
        <>
          <section className="px-10 h-full w-full flex justify-center items-center flex-col">
            <Breadcrumb className="pt-8">
              <BreadcrumbList>
                <BreadcrumbItem>Home page</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>Sign in</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbSeparator />
                <BreadcrumbItem>User Informations</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>✨First AI-Discovery</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex justify-center items-center gap-x-12 w-full mx-auto flex-row h-[40vh] pt-12">
              <div className="flex flex-col gap-y-3 items-center justify-center w-1/2 p-8 bg-black/20 backdrop-blur-md border border-black/20 rounded-lg max-h-7xl h-4/4 relative">
                <div className="flex flex-col relative items-center justify-center w-30 h-30 bg-black/5 rounded-full p-2">
                  <Image
                    src={media.avatar}
                    width={65}
                    height={65}
                    className="object-cover"
                    alt={userData?.fullname || "Image"}
                  />
                  {isSpeaking && (
                    <span className="animate-speak max-w-30 max-h-30" />
                  )}
                </div>

                <p className="text-2xl font-semibold pt-4">AI Interviewer</p>
              </div>
              <div className="flex flex-col gap-y-3 items-center justify-center w-1/2 p-8 bg-black/20 backdrop-blur-md border border-black/20 rounded-lg max-h-7xl h-4/4 relative">
                <div className="flex flex-col relative items-center justify-center">
                  <Image
                    src={
                      userData?.image ||
                      "https://upload.wikimedia.org/wikipedia/commons/6/68/Solid_black.png"
                    }
                    width={95}
                    height={95}
                    className="object-cover rounded-full"
                    alt={userData?.fullname || "Image"}
                  />
                  {isSpeaking && (
                    <span className="animate-speak max-w-30 max-h-30" />
                  )}
                </div>

                <p className="text-2xl font-semibold pt-4">
                  {userData?.fullname}
                </p>
              </div>
            </div>
            <Button
              className={`w-1/2 mt-12 min-h-[5vh] hover:opacity-80 rounded-full ${
                voiceCall ? "bg-red-500" : "bg-green-500 animate-pulse"
              }`}
              onClick={() => {
                setVoiceCall(!voiceCall);
              }}
            >
              {voiceCall ? (
                <>
                  <PhoneOff />
                  Leave Voice Call
                </>
              ) : (
                <>
                  <PhoneCall />
                  Join Voice Call
                </>
              )}
            </Button>
          </section>
        </>
      )}
    </>
  );
};

export default Page;
