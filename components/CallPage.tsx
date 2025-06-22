"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { UserData } from "@prisma/client";
import Image from "next/image";
import { media } from "@/constants";
import {
  ChevronRight,
  LoaderCircle,
  PhoneCall,
  PhoneOff,
  Video,
  Zap,
} from "lucide-react";
import { vapi } from "@/lib/vapi";
import FinalOverview from "./FinalOverview";

interface CallPageProps {
  userId: string;
  assistantId: string;
  userInformations: string;
  variableValues?: Record<string, string>;
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

type QuestionFeedback = {
  question: string;
  feedback: string;
  score: number;
};

type InterviewSummary = {
  scoreBeginning: number;
  scoreMiddle: number;
  scoreEnd: number;
  scoreOverall: number;
  strengths: string[];
  areasForImprovement: string[];
  questionFeedback: QuestionFeedback[];
  summary: string;
};

const CallPage = ({
  userId,
  assistantId,
  userInformations,
  variableValues,
}: CallPageProps) => {
  const [isSpeaking, setIsSpeaking] = useState<SpeakerRole>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [mount, setMount] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [callId, setCallId] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");
  const [interviewSummary, setInterviewSummary] =
    useState<InterviewSummary | null>(null);
  const [currentCallStatus, setCurrentCallStatus] = useState<callStatus>(
    callStatus.INACTIVE
  );

  const handleCall = async () => {
    try {
      setErrorText("");
      setCurrentCallStatus(callStatus.CONNECTING);
      console.log(variableValues);

      const vapiCall = await vapi.start(assistantId, {
        variableValues: {
          ...variableValues,
          userInformations: userInformations,
        },
      });

      console.log(vapiCall);
      setCallId(vapiCall?.id!);

      const res = await fetch(`/api/vapi/create?callId=${vapiCall?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assistantId: assistantId,
          summarizedText: userInformations,
          userId: userData?.userId,
        }),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnect = () => {
    vapi.stop();
  };

  const handleFinishCall = async () => {
    setLoading(true);
    setErrorText("");

    const timeout = setTimeout(async () => {
      const res = await fetch(`/api/vapi/getCall?callId=${callId}`);
      console.log(callId);

      const data = await res.json();
      if (!res.ok) {
        console.error(data);
        setErrorText("Please try later again!");
      }
      console.log(data.callData.analysis.structuredData);

      if (data.callData.analysis.structuredData) {
        setInterviewSummary(data.callData.analysis.structuredData);

        const createFeedback = await fetch(
          `/api/vapi/createFeedback?callId=${callId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              context: data.callData.summarized || userInformations,
              userId: userData?.userId,
            }),
          }
        );

        const feedbackData = await createFeedback.json();

        if (!createFeedback.ok) {
          console.error(feedbackData);
        }

        if (feedbackData.success === true) {
          setSuccess(true);
        }
      } else {
        setErrorText("Please try later again!");
      }
    }, 2000);
  };

  const handleReconnect = async () => {
    vapi.stop();
    setErrorText("Reconnecting to AI Interview Coach...");

    setCurrentCallStatus(callStatus.CONNECTING);

    const reconnectedCall = await vapi.start(assistantId, {
      variableValues: {
        variableValues,
        userInformations: userInformations,
      },
    });

    setCallId(reconnectedCall?.id!);
  };

  useEffect(() => {
    let cancelled = false;
    setErrorText("");
    setSuccess(false);
    setCallId("");
    setIsSpeaking(null);

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

  useEffect(() => {
    const onStartCall = () => {
      setCurrentCallStatus(callStatus.ACTIVE);
    };
    const onEndCall = () => {
      setCurrentCallStatus(callStatus.FINISHED);
      setIsSpeaking(null);
    };
    const onMessage = (message: Message) => {
      if (!message.transcript || message.transcript.trim() === "") {
        return;
      }

      if (message.role === "assistant") {
        setIsSpeaking("assistant");
      } else if (message.role === "user") {
        setIsSpeaking("user");
      } else {
        setIsSpeaking(null);
      }

      console.log(message.transcript);
    };

    vapi.on("call-start", onStartCall);
    vapi.on("call-end", onEndCall);
    vapi.on("message", onMessage);

    return () => {
      vapi.off("call-start", onStartCall);
      vapi.off("call-end", onEndCall);
      vapi.off("message", onMessage);
    };
  }, []);

  if (!mount) return null;

  return (
    <>
      {!success ? (
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
          {errorText && <p className="text-red-500 mt-4">{errorText}</p>}
          <Button
            disabled={currentCallStatus === "CONNECTING" || loading}
            className={`w-1/2 mt-12 min-h-[5vh] hover:opacity-80 transition duration-200 rounded-full ${
              currentCallStatus === "ACTIVE"
                ? "bg-red-500"
                : currentCallStatus === "CONNECTING"
                ? "bg-amber-500 animate-pulse"
                : currentCallStatus === "FINISHED"
                ? "bg-black/5"
                : currentCallStatus === "DISCONNECTED"
                ? "bg-blue-500 animate-pulse"
                : loading
                ? "bg-black/5"
                : "bg-green-500 animate-pulse"
            }`}
            onClick={() =>
              currentCallStatus === "ACTIVE"
                ? handleDisconnect()
                : currentCallStatus === "FINISHED"
                ? handleFinishCall()
                : currentCallStatus === "DISCONNECTED"
                ? handleReconnect()
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
            ) : loading === true ? (
              <>
                <LoaderCircle className="animate-spin text-black" />
                <p className="text-black">Loading...</p>
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
      ) : (
        <div className="h-full w-full p-8 bg-blue-500/20">
          <FinalOverview InterviewData={interviewSummary!} />
        </div>
      )}
    </>
  );
};

export default CallPage;
