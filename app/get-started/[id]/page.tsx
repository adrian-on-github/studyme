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
import type { UserData } from "@prisma/client";
import Image from "next/image";
import { media } from "@/constants";
import UserForm from "@/components/UserForm";
import { ChevronRight, PhoneCall, PhoneOff, Video, Zap } from "lucide-react";
import { vapi } from "@/lib/vapi";

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

const Page = () => {
  const [isSpeaking, setIsSpeaking] = useState<SpeakerRole>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [mount, setMount] = useState<boolean>(false);
  const [discoveryState, setDiscoveryState] = useState<string>("");
  const [callId, setCallId] = useState<string>("");
  const [callSummary, setCallSummary] = useState<string>("");
  const [currentCallStatus, setCurrentCallStatus] = useState<callStatus>(
    callStatus.INACTIVE
  );
  const params = useParams<{ id: string }>();

  const handleCall = async () => {
    try {
      if (
        currentCallStatus === callStatus.CONNECTING ||
        currentCallStatus === callStatus.DISCONNECTED
      )
        return;
      setCurrentCallStatus(callStatus.CONNECTING);

      if (!userData?.userId || !userData?.fullname || !userData?.language) {
        setCurrentCallStatus(callStatus.INACTIVE);
        return;
      }

      const callData = await vapi.start(
        "68ad748b-d8d4-4b80-9325-26c14df2c267",
        {
          variableValues: {
            name: userData.fullname,
            language: userData.language,
            systemPrompt: prompt,
          },
        }
      );

      setCallId(callData?.id!);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinishCall = async () => {
    try {
      if (!userData || !callSummary) {
        return;
      }
      const res = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            userId: userData.userId,
            subject: userData.subject,
            learningMethod: userData?.learningMethod,
            goal: userData.goal,
            educationalInstitution: userData?.educationalInstitution,
            academicLevel: userData?.academicLevel,
            additionalInformations: callSummary,
          },
          callId,
          assistantId: "68ad748b-d8d4-4b80-9325-26c14df2c267",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error(data);
      }
      console.log(data);

      // finish call
    } catch (err) {
      console.error(err);
    }
  };

  const handleDisconnect = () => {
    vapi.stop();
    setCurrentCallStatus(callStatus.FINISHED);
  };

  useEffect(() => {
    const onCallStart = () => setCurrentCallStatus(callStatus.ACTIVE);
    const onCallEnd = () => {
      setCurrentCallStatus(callStatus.FINISHED);
      setIsSpeaking(null);
    };
    const onSpeechStart = () => setIsSpeaking("assistant");
    const onSpeechEnd = () => setIsSpeaking(null);
    const onMessage = (message: Message) => {
      console.log(
        JSON.stringify(
          {
            messagetype: message.type,
            messageRole: message.role,
            messageTranscript: message.transcript,
          },
          null,
          2
        )
      );

      if (message.role === "user") {
        setIsSpeaking("user");
      } else if (message.role === "assistant") {
        setIsSpeaking("assistant");
      }
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("message", (message) => {
      onMessage(message);
    });

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("message", onMessage);
    };
  }, []);

  useEffect(() => {
    if (!callId) return;

    const interval = setInterval(async () => {
      const res = await fetch(`/api/vapi/getCall?callId=${callId}`);
      const callData = await res.json();

      if (callData.analysis?.summary) {
        setCallSummary(callData.analysis.summary);
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [callId]);

  useEffect(() => {
    const intervalDiscoveryState = setInterval(() => {
      const state = localStorage.getItem("discoveryState");
      if (state) {
        setDiscoveryState(state);
      }
    }, 1000);

    return () => {
      clearInterval(intervalDiscoveryState);
    };
  }, []);

  useEffect(() => {
    if (currentCallStatus === callStatus.DISCONNECTED) {
      const timeout = setTimeout(() => {
        vapi.start();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [currentCallStatus]);

  useEffect(() => {
    let cancelled = false;

    const getUser = async () => {
      const res = await fetch(`/api/user/getUser?userId=${params.id}`, {
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

  if (!mount || !params.id) return null;

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
                <BreadcrumbItem>User Informations</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>✨First AI-Discovery</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex justify-center items-center gap-x-12 w-full mx-auto flex-row h-[40vh] pt-12">
              <div className="flex flex-col gap-y-3 items-center justify-center w-1/2 p-8 bg-black/5 backdrop-blur-md border border-black/20 rounded-lg max-h-7xl h-4/4 relative">
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

                <p className="text-2xl font-semibold pt-4">AI Interviewer</p>
              </div>
              <div className="flex flex-col gap-y-3 items-center justify-center w-1/2 bg-black/5 backdrop-blur-md border border-black/20 rounded-lg max-h-7xl h-4/4 relative">
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
              onClick={() =>
                currentCallStatus === "ACTIVE"
                  ? handleDisconnect()
                  : currentCallStatus === "FINISHED"
                  ? handleFinishCall()
                  : currentCallStatus === "DISCONNECTED"
                  ? () => {}
                  : handleCall()
              }
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

            {currentCallStatus !== "FINISHED" && (
              <p className="pt-8 text-base mx-auto max-w-6xl text-center">
                Congratulations! This is your first Meeting with our AI
                Interviewer. Please talk in english. ✨
              </p>
            )}
            {currentCallStatus === "FINISHED" && (
              <p className="pt-8 text-base mx-auto max-w-6xl text-center">
                {/* Analyse */}
              </p>
            )}
          </section>
        </>
      )}
    </>
  );
};

export default Page;
