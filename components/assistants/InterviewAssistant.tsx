"use client";
import React, { useEffect, useState } from "react";
import CallPage from "../CallPage";
import { Label } from "@/components/ui/label";
import {
  Brain,
  Check,
  CircleOff,
  GraduationCap,
  Loader2Icon,
  MessageCircleQuestion,
  Send,
  Speech,
  Star,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { UserData } from "@prisma/client";
import { useParams } from "next/navigation";
import Typewriter from "../Typewriter";

const Section = ({
  question,
  color,
  icon,
}: {
  question: string;
  color: string;
  icon: React.ReactElement;
}) => {
  return (
    <div>
      <div
        className={`border-black/10 rounded-2xl border shadow-md px-4 py-3 flex flex-row items-center justify-center ${color}`}
      >
        {icon}
        <p className="p text-base font-medium mx-1">{question}</p>
      </div>
    </div>
  );
};

const InterviewAssistant = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [answer, setAnswer] = useState<boolean>(false);
  const [displayedText, setDisplayedText] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [summarizedText, setSummarizedText] = useState<string>("");
  const params = useParams<{ id: string }>();

  const createInterviewContext = async () => {
    try {
      setErrorMessage("");
      setLoading(true);

      if (!context) {
        setErrorMessage("Please provide any context for your Interview");
        return;
      }
      const textContent = context;

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `
You are an expert assistant which is speaking every language your customer want.

Please review the following user input and check whether it includes the following six information elements — either explicitly or implicitly:

1. maxQuestions – How many interview questions the user wants (e.g. "7 questions", "ten questions").
2. weaknesses – Any personal weaknesses or areas the user wants to focus on (e.g. "nervousness", "market sizing").
3. style – Preferred interview style (e.g. "relaxed", "conversational", "challenging").
4. goal – The user's main goal for this session (e.g. "build confidence", "improve presentation skills").
5. feedbackPreference – How the user wants to receive feedback (e.g. "after each question", "written feedback").

If **all six** are mentioned (even in a non-explicit way), respond ONLY with the following valid JSON:

{
  "success": true,
  "summary": "..." // Summarize the user's input in clear plain English (1-2 sentences)
}

If **even one** element is missing, respond ONLY with this valid JSON:

{
  "success": false,
  "followUp": "..." // Politely ask the user for the missing information in a natural, flowing tone
}

⚠️ Very important:
- Do NOT include markdown (no \`\`\`)
- Do NOT include anything before or after the JSON
- Do NOT list missing elements
- Your response MUST be a valid, parsable JSON object only

Now analyze the following user input:
${textContent}
`,
        }),
      });

      const data = await res.json();

      const parsed = JSON.parse(data.text);

      if (parsed.success === true) {
        setSuccess(parsed.success);
        setSummarizedText(parsed.summary);
      } else if (parsed.success === false) {
        console.log(parsed.success);
        setSuccess(parsed.success);
        setDisplayedText(parsed.followUp);
      }
      console.log(parsed);
      setAnswer(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      if (!summarizedText) {
        setErrorMessage("Please fill out the form!");
        return;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (displayedText) {
      console.log("Displayed Text changed:", displayedText);
    }
  }, [displayedText]);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`/api/user/getUser?userId=${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        console.error("Error GET User req", await res.text());
        return;
      }

      const data = await res.json();
      setUserData(data.userData);
    };

    getUser();
  }, []);

  useEffect(() => {
    if (userData && !answer) {
      setDisplayedText(
        `Hey ${
          userData?.fullname || ""
        }! Please provide me more information to create your interview.🙌`
      );
    }
  }, [userData, displayedText]);

  return (
    <div>
      {summarizedText ? (
        <CallPage
          userId={params.id}
          assistantId="773826da-32e3-41ee-8505-5bfa82900487"
          userInformations={summarizedText}
          variableValues={{
            name: userData?.fullname!,
            language: userData?.language!,
          }}
        />
      ) : (
        <section className="py-8 lg:px-0 px-4">
          <form
            className="w-full flex flex-col items-center"
            onSubmit={(e) => {
              e.preventDefault();
              createInterviewContext();
            }}
          >
            <div className="w-full flex flex-col items-center gap-y-2">
              <div className="lg:w-3/4 w-full min-h-[35vh] rounded-xl bg-blue-500/20 p-3">
                {displayedText && <Typewriter text={displayedText} />}
              </div>

              <div className="my-2 flex items-center justify-center flex-row gap-x-8 gap-y-6 max-w-3/4 flex-wrap">
                <Section
                  question="Max Questions"
                  icon={<MessageCircleQuestion size={20} />}
                  color="bg-red-500/30"
                />
                <Section
                  question="Your weaknesses"
                  icon={<Brain size={20} />}
                  color="bg-yellow-500/20"
                />
                <Section
                  question="What communication style you prefer"
                  icon={<Speech size={20} />}
                  color="bg-blue-500/20"
                />
                <Section
                  question="Which goal do you have"
                  icon={<Target size={20} />}
                  color="bg-rose-500/20"
                />

                <Section
                  question="Which questions are you afraid of?"
                  icon={<CircleOff size={20} />}
                  color="bg-purple-500/20"
                />
                <Section
                  question="Do you want feedback after each question?"
                  icon={<Star size={20} />}
                  color="bg-teal-500/20"
                />
              </div>
              <div className="lg:w-3/4 w-full items-start gap-2 flex flex-col justify-center">
                <Label htmlFor="academic-level">
                  <Speech size={15} className="mr-1" />
                  General Interview Context
                </Label>
                <Textarea
                  defaultValue=""
                  onChange={(e) => setContext(e.target.value)}
                  className="min-h-[10vh]"
                  minLength={20}
                  maxLength={800}
                  placeholder="Describe the general context in the interview you are expecting."
                />
              </div>
            </div>
            {errorMessage && (
              <p className="text-red-500 mt-4">{errorMessage}</p>
            )}
            {success ? (
              <Button
                disabled={!success || loading}
                className="mt-5 w-full lg:w-3/4 border-black/10"
                variant="outline"
              >
                {loading ? (
                  <>
                    <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                    Loading...
                  </>
                ) : (
                  "Start your Interview"
                )}
              </Button>
            ) : (
              <Button
                disabled={loading}
                type="submit"
                className="mt-5 w-full lg:w-3/4 border-black/10"
                variant="outline"
              >
                {loading ? (
                  <>
                    <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </>
                )}
              </Button>
            )}
          </form>
        </section>
      )}
    </div>
  );
};

export default InterviewAssistant;
