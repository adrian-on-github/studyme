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
import RedirectQuestion from "@/components/RedirectQuestion";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

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

const language = [
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
      const res1 = await fetch("/api/user/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: params.id,
        }),
      });
      if (res1.status === 500) {
        setErrorMessage("Form couldn't submit. Please try later again");
      }
      const userData = await res1.json();

      const res2 = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: params.id,
          email: userData.email,
          image: userData.image || null,
          fullname: name,
          age: age,
          language: language,
          reason: reason,
          method: method,
          subject: subject,
          additional_context: additionalContext,
        }),
      });
      if (res2.status === 500) {
        setErrorMessage("Form couldn't submit. Please try later again");
      }
      const data = await res2.json();
      console.log(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <RedirectQuestion />
      <section className="px-10 pt-8 h-full w-full flex justify-center items-center flex-col">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>Home page</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Sign in</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>User Informations</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <form
          className="w-full flex flex-col items-center"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(formState);
          }}
        >
          <div className="w-full flex flex-col items-center gap-y-5">
            <div className="lg:w-2/3 w-full items-start gap-2 pt-10 flex flex-col justify-center">
              <Label htmlFor="fullname">
                <UserPen size={15} className="mr-1" />
                Full Name
              </Label>
              <Input
                type="text"
                id="fullname"
                placeholder="Full Name"
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
              />
            </div>
            <div className="lg:w-2/3 w-full items-start gap-2 flex flex-col justify-center">
              <Label htmlFor="message">
                <EarthLock size={15} className="mr-1" />
                Age
              </Label>
              <Select
                onValueChange={(age) =>
                  setFormState({ ...formState, age: age })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Your Age" />
                </SelectTrigger>
                <SelectContent>
                  {ageGroups.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:w-2/3 w-full items-start gap-2 flex flex-col justify-center">
              <Label htmlFor="message">
                <Languages size={15} className="mr-1" />
                Language
              </Label>
              <Select
                onValueChange={(language) =>
                  setFormState({ ...formState, language: language })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {language.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:w-2/3 w-full items-start gap-2 flex flex-col justify-center">
              <Label htmlFor="message">
                <PlugZap size={15} className="mr-1" />
                Reason:
              </Label>
              <Select
                onValueChange={(x) => setFormState({ ...formState, reason: x })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Reason" />
                </SelectTrigger>
                <SelectContent>
                  {examples.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:w-2/3 w-full items-start gap-2 flex flex-col justify-center">
              <Label htmlFor="message">
                <BrainCircuit size={15} className="mr-1" />
                Learning Method
              </Label>
              <Select
                onValueChange={(m) => setFormState({ ...formState, method: m })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Learning Method" />
                </SelectTrigger>
                <SelectContent>
                  {learningMethods.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="lg:w-2/3 w-full items-start gap-2 flex flex-col justify-center">
              <Label htmlFor="message">
                <Pyramid size={15} className="mr-1" />
                Subject for Improvement
              </Label>
              <Select
                onValueChange={(s) =>
                  setFormState({ ...formState, subject: s })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subject.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:w-2/3 w-full items-start gap-2 flex flex-col justify-center">
              <Label htmlFor="message">
                <Plus size={15} className="mr-1" />
                <span className="text-red-500">*</span>Additional Context
              </Label>
              <Textarea
                placeholder="Type any additional context in here..."
                id="message"
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    additionalContext: e.target.value,
                  })
                }
              />
            </div>
          </div>
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
          <Button
            className="mt-5 w-full lg:w-2/3 border-black/10"
            type="submit"
            variant="outline"
            disabled={loading}
          >
            Start Learning
          </Button>
        </form>
      </section>
    </>
  );
};

export default Page;
