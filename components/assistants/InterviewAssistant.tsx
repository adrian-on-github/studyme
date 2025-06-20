"use client";
import React, { useEffect, useState } from "react";
import CallPage from "../CallPage";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  BicepsFlexed,
  Goal,
  GoalIcon,
  HandHelping,
  Languages,
  LibraryBig,
  Loader2Icon,
  Pyramid,
  School,
  Speech,
  UserPen,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";

const interviewGoals = [
  { label: "💼 Get the job", value: "get-hired" },
  { label: "📈 Build confidence", value: "build-confidence" },
  { label: "🎤 Improve communication", value: "improve-communication" },
  { label: "🔍 Identify weaknesses", value: "identify-weaknesses" },
  { label: "📚 Gain interview experience", value: "gain-experience" },
  { label: "🧠 Think and respond faster", value: "think-faster" },
];
const weaknessOptions = [
  { label: "😅 Nervousness", value: "nervousness" },
  { label: "🗣️ Poor communication", value: "poor-communication" },
  { label: "📉 Lack of structure", value: "lack-structure" },
  { label: "⌛ Slow response time", value: "slow-response" },
  { label: "🤯 Difficulty under pressure", value: "pressure-problems" },
  { label: "🤷‍♂️ Not enough preparation", value: "unprepared" },
];
const communicationStyles = [
  { label: "🔍 Detailed and analytical", value: "analytical" },
  { label: "💡 Creative and intuitive", value: "creative" },
  { label: "🤝 Empathetic and friendly", value: "empathetic" },
  { label: "⚡ Direct and efficient", value: "direct" },
  { label: "📚 Formal and structured", value: "formal" },
  { label: "😄 Casual and relaxed", value: "casual" },
];

const skillsRequired = [
  { label: "🧠 Problem-solving", value: "problem-solving" },
  { label: "👥 Team collaboration", value: "teamwork" },
  { label: "💬 Communication", value: "communication" },
  { label: "🖥️ Technical knowledge", value: "technical-skills" },
  { label: "⏱️ Time management", value: "time-management" },
  { label: "📈 Strategic thinking", value: "strategy" },
];
const maxQuestionsOptions = [
  { label: "🧪 3 Questions (Short test)", value: "3" },
  { label: "🔍 5 Questions (Standard)", value: "5" },
  { label: "🧠 7 Questions (In-depth)", value: "7" },
  { label: "🔥 10 Questions (Full challenge)", value: "10" },
];

const strengthsOptions = [
  { label: "🧠 Analytical thinking", value: "analytical-thinking" },
  { label: "💬 Strong communication", value: "strong-communication" },
  { label: "🤝 Team player", value: "team-player" },
  { label: "⏱️ Time management", value: "time-management" },
  { label: "📈 Goal-oriented", value: "goal-oriented" },
  { label: "🎯 Focused and disciplined", value: "focused-disciplined" },
  { label: "💡 Creative problem-solving", value: "creative-problem-solving" },
  { label: "🧘‍♀️ Calm under pressure", value: "calm-under-pressure" },
  { label: "🔍 Attention to detail", value: "attention-to-detail" },
  { label: "🚀 Self-motivated", value: "self-motivated" },
  { label: "📚 Quick learner", value: "quick-learner" },
];

interface FormProps {
  context: string;
  goal: string;
  weaknesses: string;
  strengthen: string;
  style: string;
  skillsRequired?: string;
  maxQuestions?: number;
}

const InterviewAssistant = ({ userId }: { userId: string }) => {
  const [formState, setFormState] = useState<FormProps>({
    context: "",
    goal: "",
    weaknesses: "",
    style: "",
    skillsRequired: "",
    maxQuestions: 0,
    strengthen: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({
    context,
    goal,
    weaknesses,
    style,
    skillsRequired,
    maxQuestions,
    strengthen,
  }: FormProps) => {
    try {
      if (
        context.trim() === "" ||
        goal.trim() === "" ||
        weaknesses.trim() === "" ||
        strengthen.trim() === "" ||
        style.trim() === ""
      ) {
        setErrorMessage("Please fill out the form!");
        return;
      }
      console.log(
        context,
        goal,
        weaknesses,
        strengthen,
        style,
        skillsRequired,
        maxQuestions
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* <CallPage
        userId={userId}
        assistantId="773826da-32e3-41ee-8505-5bfa82900487"
      /> */}

      <section className="p-8">
        <form
          className="w-full flex flex-col items-center"
          onSubmit={(e) => {
            e.preventDefault();
            if (formState) {
              handleSubmit(formState);
            } else {
              setErrorMessage("Please fill out the form");
            }
          }}
        >
          <div className="w-full flex flex-col items-center gap-y-4">
            <div className="lg:w-2/3 w-full items-start gap-2 flex flex-col justify-center">
              <Label htmlFor="academic-level">
                <GoalIcon size={15} className="mr-1" />
                Interview Goal
              </Label>
              <Select
                value={formState.goal || ""}
                onValueChange={(e) => setFormState({ ...formState, goal: e })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Interview Goal" />
                </SelectTrigger>
                <SelectContent>
                  {interviewGoals.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:w-2/3 w-full items-start gap-2 flex flex-col justify-center">
              <Label htmlFor="academic-level">
                <HandHelping size={15} className="mr-1" />
                Weaknessess
              </Label>
              <Select
                value={formState.weaknesses || ""}
                onValueChange={(e) =>
                  setFormState({ ...formState, weaknesses: e })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Weaknesses" />
                </SelectTrigger>
                <SelectContent>
                  {weaknessOptions.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:w-2/3 w-full items-start gap-2 flex flex-col justify-center">
              <Label htmlFor="academic-level">
                <BicepsFlexed size={15} className="mr-1" />
                Strengthen
              </Label>
              <Select
                value={formState.strengthen || ""}
                onValueChange={(e) =>
                  setFormState({ ...formState, strengthen: e })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Strengthen" />
                </SelectTrigger>
                <SelectContent>
                  {strengthsOptions.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:w-2/3 w-full items-start gap-2 flex flex-col justify-center">
              <Label htmlFor="academic-level">
                <Speech size={15} className="mr-1" />
                Communication Style
              </Label>
              <Select
                value={formState.style || ""}
                onValueChange={(e) => setFormState({ ...formState, style: e })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Communication Style" />
                </SelectTrigger>
                <SelectContent>
                  {communicationStyles.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:w-2/3 w-full items-start gap-2 flex flex-col justify-center">
              <Label htmlFor="academic-level">
                <Speech size={15} className="mr-1" />
                <span className="text-red-500">*</span>Required Skills
              </Label>
              <Select
                value={formState.skillsRequired || ""}
                onValueChange={(e) =>
                  setFormState({ ...formState, skillsRequired: e })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder=" Required Skills" />
                </SelectTrigger>
                <SelectContent>
                  {skillsRequired.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:w-2/3 w-full items-start gap-2 flex flex-col justify-center">
              <Label htmlFor="academic-level">
                <Speech size={15} className="mr-1" />
                <span className="text-red-500">*</span>max. Questions
              </Label>
              <Select
                value={formState.maxQuestions?.toString() || ""}
                onValueChange={(e) =>
                  setFormState({ ...formState, maxQuestions: parseInt(e) })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="max. Questions" />
                </SelectTrigger>
                <SelectContent>
                  {maxQuestionsOptions.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:w-2/3 w-full items-start gap-2 flex flex-col justify-center">
              <Label htmlFor="academic-level">
                <Speech size={15} className="mr-1" />
                <span className="text-red-500">*</span>General Interview Context
              </Label>
              <Textarea
                defaultValue={formState.context || ""}
                onChange={(e) =>
                  setFormState({ ...formState, context: e.target.value })
                }
              />
            </div>
          </div>
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

          <Button
            disabled={loading}
            className="mt-5 w-full lg:w-2/3 border-black/10"
            type="submit"
            variant="outline"
          >
            {loading ? (
              <>
                <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                Loading...
              </>
            ) : (
              "Start Learning"
            )}
          </Button>
          <p className="pt-4 pb-8 text-base mx-auto max-w-6xl text-center">
            These Informations will be used in every next interaction with
            StudyMe. They can be changed everytime.
          </p>
        </form>
      </section>
    </div>
  );
};

export default InterviewAssistant;
