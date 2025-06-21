"use client";
import React, { useEffect, useState } from "react";
import CallPage from "../CallPage";
import { Label } from "@/components/ui/label";
import {
  Brain,
  Check,
  CircleOff,
  Loader2Icon,
  MessageCircleQuestion,
  Send,
  Speech,
  Star,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";

const Section = ({
  question,
  color,
  icon,
  success,
}: {
  question: string;
  color: string;
  icon: React.ReactElement;
  success: boolean;
}) => {
  return (
    <div>
      <div
        className={`border-black/10 rounded-2xl border shadow-md px-4 py-3 flex flex-row items-center justify-center ${color}`}
      >
        {icon}
        <p className="p text-base font-medium mx-1">{question}</p>
      </div>
      {success && (
        <Check
          className={`text-green-500 relative left-[-4%] bottom-[7vh] transition-all duration-300 ease-in-out transform ${
            success ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          size={32}
        />
      )}
    </div>
  );
};

interface FormProps {
  maxQuestions: boolean;
  weaknesses: boolean;
  style: boolean;
  goal: boolean;
  fearedQuestions: boolean;
  feedbackPreference: boolean;
}

const InterviewAssistant = () => {
  const [formFullfilled, setFormFullfilled] = useState<FormProps>({
    maxQuestions: false,
    weaknesses: false,
    style: false,
    goal: false,
    fearedQuestions: false,
    feedbackPreference: false,
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const createInterviewContext = async () => {
    try {
      setLoading(true);

      if (!context) {
        setErrorMessage("Please provide any context for your Interview");
      }
      const textContent = context;

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `
You are an expert assistant.
Review the following text and check whether it includes the following information:

How many questions the user would like (maxQuestions)

Any weaknesses the user wants to focus on (weaknesses)

The preferred interview style (style)

The user’s overall goal for the session (goal)

Any specific questions or topics the user is afraid of (fearedQuestions)

How the user would like to receive feedback (feedbackPreference)

If all of this is clearly mentioned, summarize the user’s input in plain English.

If any part is missing, respond naturally and politely by asking follow-up questions as part of a flowing conversation.
Do not list missing items. Instead, gently ask for the missing information with warm and friendly language. For example, you might say:

“Thanks for sharing that! Just so I can support you better – how many questions would you like to practice with?”
or
“That’s helpful! One more thing – do you have a preferred way to receive feedback after each question?”

Here is the text to analyze: ${textContent}
`,
        }),
      });

      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async ({
    goal,
    weaknesses,
    style,
    maxQuestions,
    fearedQuestions,
    feedbackPreference,
  }: FormProps) => {
    try {
      setLoading(true);
      setErrorMessage("");
      if (
        !formFullfilled.goal ||
        !formFullfilled.weaknesses ||
        !formFullfilled.style ||
        !formFullfilled.maxQuestions ||
        !formFullfilled.fearedQuestions ||
        !formFullfilled.feedbackPreference
      ) {
        setErrorMessage("Please fill out the form!");
        return;
      }

      console.log({
        goal,
        weaknesses,
        style,
        maxQuestions,
        fearedQuestions,
        feedbackPreference,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* <CallPage
        userId={userId}
        assistantId="773826da-32e3-41ee-8505-5bfa82900487"
      /> */}

      <section className="py-8 lg:px-0 px-4">
        <form
          className="w-full flex flex-col items-center"
          onSubmit={(e) => {
            e.preventDefault();
            createInterviewContext();
          }}
        >
          <div className="w-full flex flex-col items-center gap-y-2">
            <div className="lg:w-3/4 w-full min-h-[35vh] rounded-md bg-blue-500/5"></div>
            <div className="my-2 flex items-center justify-center flex-row gap-x-8 gap-y-6 max-w-3/4 flex-wrap">
              <Section
                question="Max Questions"
                icon={<MessageCircleQuestion size={20} />}
                color="bg-red-500/30"
                success={formFullfilled.maxQuestions!}
              />
              <Section
                question="Your weaknesses"
                icon={<Brain size={20} />}
                color="bg-yellow-500/20"
                success={formFullfilled.weaknesses!}
              />
              <Section
                question="What communication style you prefer"
                icon={<Speech size={20} />}
                color="bg-blue-500/20"
                success={formFullfilled.style!}
              />
              <Section
                question="Which goal do you have"
                icon={<Target size={20} />}
                color="bg-rose-500/20"
                success={formFullfilled.goal!}
              />

              <Section
                question="Which questions are you afraid of?"
                icon={<CircleOff size={20} />}
                color="bg-purple-500/20"
                success={formFullfilled.fearedQuestions!}
              />
              <Section
                question="Do you want feedback after each question?"
                icon={<Star size={20} />}
                color="bg-teal-500/20"
                success={formFullfilled.feedbackPreference!}
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
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
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
    </div>
  );
};

export default InterviewAssistant;
