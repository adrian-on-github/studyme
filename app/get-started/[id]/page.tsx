"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  BrainCircuit,
  EarthLock,
  Languages,
  Loader2Icon,
  PlugZap,
  Plus,
  Pyramid,
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
import { useParams } from "next/navigation";
import RedirectSession from "@/components/RedirectSession";

const ageGroups = [
  { label: "👶 13-15 years old", value: "13-15" },
  { label: "🧑‍🎓 16-18 years old", value: "16-18" },
  { label: "🧑‍💼 19-21 years old", value: "19-21" },
];

const examples = [
  { label: "🎯 Preparing for interviews", value: "interviews" },
  { label: "📈 Improving grades", value: "better-grades" },
  { label: "📝 Getting help with homework", value: "homework-help" },
  { label: "📚 Learning new skills", value: "new-skills" },
  { label: "🧠 Preparing for exams", value: "exams" },
  { label: "💼 Exploring career options", value: "career-options" },
  { label: "🎓 Enhancing subject knowledge", value: "subject-knowledge" },
  { label: "🛠️ Completing school projects", value: "school-projects" },
  { label: "📊 Studying for standardized tests", value: "standardized-tests" },
  { label: "⌛ Learning at own pace", value: "self-paced" },
];

const learningMethods = [
  { label: "📚 Reading & Writing", value: "reading-writing" },
  { label: "🎧 Listening & Audio", value: "listening-audio" },
  { label: "🎥 Videos & Visuals", value: "videos-visuals" },
  { label: "🧩 Interactive Exercises", value: "interactive-exercises" },
  { label: "🗣️ Group Discussions", value: "group-discussions" },
  { label: "📝 Practice Tests & Quizzes", value: "practice-tests" },
  { label: "⏰ Self-Paced Learning", value: "self-paced" },
  { label: "🧑‍🏫 One-on-One Tutoring", value: "one-on-one" },
  { label: "🎮 Gamified Learning", value: "gamified-learning" },
];

const languageList = [
  { label: "🇬🇧 English", value: "english" },
  { label: "🇩🇪 German", value: "german" },
  { label: "🇪🇸 Spanish", value: "spanish" },
  { label: "🇫🇷 French", value: "french" },
];

const subject = [
  { label: "➗ Mathematics", value: "math" },
  { label: "🔬 Science", value: "science" },
  { label: "📖 Literature", value: "literature" },
  { label: "🌍 Geography", value: "geography" },
  { label: "🧪 Chemistry", value: "chemistry" },
  { label: "💻 Computer Science", value: "computer-science" },
];

interface SubmitProps {
  name: string;
  age: string;
  example: string;
  language: string;
  reason: string;
  method: string;
  subject: string;
  additionalContext: string;
}

const Page = () => {
  const [formState, setFormState] = useState<SubmitProps>({
    name: "",
    age: "",
    example: "",
    language: "",
    reason: "",
    method: "",
    subject: "",
    additionalContext: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams<{ id: string }>();

  const handleSubmit = async ({
    name,
    age,
    example,
    language,
    reason,
    method,
    subject,
    additionalContext,
  }: SubmitProps) => {
    try {
      setLoading(true);
      console.log(
        name,
        age,
        example,
        language,
        reason,
        method,
        subject,
        additionalContext
      );

      if (
        name.trim() === "" ||
        age.trim() === "" ||
        language.trim() === "" ||
        reason.trim() === "" ||
        method.trim() === "" ||
        subject.trim() === ""
      ) {
        setErrorMessage("Please fill out the form!");
        return;
      }
      setErrorMessage("");
      const res1 = await fetch(`/api/user/getUser?userId=${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res1.status === 500) {
        setErrorMessage("Form couldn't submit. Please try later again");
      }
      const userData = await res1.json();

      if (!userData.user) {
        setErrorMessage("User not found or already created.");
        return;
      }

      const res2 = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            userId: params.id,
            email: userData.user.email,
            image: userData.user.image || null,
            fullname: name,
            age: age,
            language: language,
            reason: reason,
            method: method,
            subject: subject,
            additional_context: additionalContext,
          },
        }),
      });

      if (res2.status === 500) {
        setErrorMessage("Form couldn't submit. Please try later again");
      }
      const data = await res2.json();
      if (!data.success) {
        setErrorMessage("Something went wrong!");
      }
      console.log(data.user);
    } catch (error) {
      console.error(error);
      setErrorMessage("Unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <RedirectSession />
      <section className="px-10 pt-8 h-full w-full flex justify-center items-center flex-col"></section>
    </>
  );
};

export default Page;
