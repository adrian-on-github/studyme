"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { UserData } from "@prisma/client";
import Image from "next/image";
import { media } from "@/constants";
import { ChevronRight, PhoneCall, PhoneOff, Video, Zap } from "lucide-react";

interface CallPageProps {
  userId: string;
  assistantId: string;
}

enum callStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
  DISCONNECTED = "DISCONNECTED",
}

type Message = {
  type: "transcript" | string;
  role: "assistant" | "user" | string;
  transcript: string;
};

type SpeakerRole = "user" | "assistant" | null;

const CallPage = ({ userId, assistantId }: CallPageProps) => {
  const [isSpeaking, setIsSpeaking] = useState<SpeakerRole>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [mount, setMount] = useState<boolean>(false);
  const [currentCallStatus, setCurrentCallStatus] = useState<callStatus>(
    callStatus.INACTIVE
  );

  useEffect(() => {
    let cancelled = false;

    const getUser = async () => {
      const res = await fetch(`/api/user/getUser?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        if (
          currentCallStatus === "ACTIVE" ||
          currentCallStatus === "CONNECTING"
        ) {
          setCurrentCallStatus(callStatus.DISCONNECTED);
        }
        console.error("Error GET User req", await res.text());
        return;
      }

      const data = await res.json();
      if (!cancelled) {
        setUserData(data.userData);
      }
    };
    getUser();

    const timeout = setTimeout(() => {
      if (!cancelled) {
        setMount(true);
      }
    }, 1000);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  if (!mount) return null;

  return (
    <>
      <section className="px-10 h-full w-full flex justify-center items-center flex-col">
        <div className="flex justify-center items-center gap-x-12 w-full mx-auto flex-row h-[40vh] pt-12">
          <div className="flex flex-col gap-y-3 items-center justify-center w-full p-8 bg-black/5 backdrop-blur-md border border-black/20 rounded-lg max-h-7xl h-4/4 relative">
            <div className="flex flex-col relative items-center justify-center w-30 h-30 bg-black/5 rounded-full p-2">
              <Image
                src={media.avatar}
                width={65}
                height={65}
                className="object-cover"
                alt={userData?.fullname || "Image"}
                draggable={false}
              />
              {isSpeaking === "assistant" && (
                <span className="animate-speak max-w-22 max-h-22" />
              )}
            </div>

            <p className="text-2xl font-semibold pt-4">AI Interview Coach</p>
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center w-full bg-black/5 backdrop-blur-md border border-black/20 rounded-lg max-h-7xl h-4/4 relative">
            <>
              <div className="flex flex-col relative items-center justify-center w-30 h-30 rounded-full">
                <Image
                  src={userData?.image!}
                  width={100}
                  height={100}
                  className="rounded-full"
                  alt={userData?.fullname || "Image"}
                  draggable={false}
                />
              </div>
              {isSpeaking === "user" && (
                <span className="animate-speak max-w-22 max-h-22 relative top-1/4" />
              )}
              <p className="text-2xl font-semibold pt-4">
                {userData?.fullname || "You"}
              </p>
            </>
          </div>
        </div>
        <Button
          disabled={
            currentCallStatus === "DISCONNECTED" ||
            currentCallStatus === "CONNECTING"
          }
          className={`w-1/2 mt-12 min-h-[5vh] hover:opacity-80 transition duration-200 rounded-full ${
            currentCallStatus === "ACTIVE"
              ? "bg-red-500"
              : currentCallStatus === "CONNECTING"
              ? "bg-amber-500 animate-pulse"
              : currentCallStatus === "FINISHED"
              ? "bg-black/5"
              : currentCallStatus === "DISCONNECTED"
              ? "bg-blue-500 animate-pulse"
              : "bg-green-500 animate-pulse"
          }`}
          //   onClick={() =>
          //     currentCallStatus === "ACTIVE"
          //       ? handleDisconnect()
          //       : currentCallStatus === "FINISHED"
          //       ? handleFinishCall()
          //       : currentCallStatus === "DISCONNECTED"
          //       ? () => {}
          //       : handleCall()
          //   }
        >
          {currentCallStatus === "ACTIVE" ? (
            <>
              <PhoneOff />
              Leave Web Call
            </>
          ) : currentCallStatus === "CONNECTING" ? (
            <>
              <Video />
              Connecting to Web Call
            </>
          ) : currentCallStatus === "FINISHED" ? (
            <>
              <p className="text-black">Finish Introductory Meeting</p>
              <ChevronRight className="text-black" />
            </>
          ) : currentCallStatus === "DISCONNECTED" ? (
            <>
              <Zap />
              Trying to connect again...
            </>
          ) : (
            <>
              <PhoneCall />
              Join Web Call
            </>
          )}
        </Button>

        {currentCallStatus === "FINISHED" && (
          <p className="pt-8 text-base mx-auto max-w-6xl text-center">
            {/* Analyse */}
          </p>
        )}
      </section>
    </>
  );
};

export default CallPage;
