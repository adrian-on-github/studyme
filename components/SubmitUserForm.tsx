"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  BrainCircuit,
  Goal,
  Languages,
  LibraryBig,
  Loader2Icon,
  Pyramid,
  School,
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
import { Textarea } from "./ui/textarea";
import RedirectSession from "@/components/RedirectSession";
import type { UserData } from "@prisma/client";
import { useRouter } from "next/navigation";

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
  { label: "🇮🇹 Italian", value: "italian" },
  { label: "🇨🇳 Chinese (Mandarin)", value: "chinese" },
  { label: "🇯🇵 Japanese", value: "japanese" },
  { label: "🇰🇷 Korean", value: "korean" },
  { label: "🇷🇺 Russian", value: "russian" },
  { label: "🇵🇹 Portuguese", value: "portuguese" },
  { label: "🇮🇳 Hindi", value: "hindi" },
  { label: "Arabic", value: "arabic" },
];

const academicLevels = [
  { label: "🏫 Primary School", value: "primary-school" },
  { label: "🏫 Middle School", value: "middle-school" },
  { label: "🏫 High School", value: "high-school" },
  { label: "🎓 College / University", value: "university" },
  { label: "📚 Postgraduate", value: "postgraduate" },
  { label: "🧠 Lifelong Learner", value: "lifelong" },
];

const educationalInstitutions = [
  { label: "🏫 Public School", value: "public-school" },
  { label: "🏫 Private School", value: "private-school" },
  { label: "🏫 International School", value: "international-school" },
  { label: "🎓 University / College", value: "university-college" },
  { label: "🏠 Homeschool", value: "homeschool" },
  { label: "📖 Online Program", value: "online-program" },
];

const goals = [
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

const subjects = [
  { label: "➗ Mathematics", value: "math" },
  { label: "🔬 General Science", value: "science" },
  { label: "🧪 Chemistry", value: "chemistry" },
  { label: "🧲 Physics", value: "physics" },
  { label: "🌱 Biology", value: "biology" },
  { label: "💻 Computer Science", value: "computer-science" },
  { label: "📖 Literature", value: "literature" },
  { label: "📝 Language Arts", value: "language-arts" },
  { label: "🌍 Geography", value: "geography" },
  { label: "📜 History", value: "history" },
  { label: "🎨 Art", value: "art" },
  { label: "🎼 Music", value: "music" },
  { label: "📊 Economics", value: "economics" },
  { label: "⚖️ Social Studies", value: "social-studies" },
  { label: "🗣️ Foreign Languages", value: "languages" },
];

interface SubmitProps {
  name: string;
  language: string;
  method: string;
  subject: string;
  additionalContext: string;
  goal: string;
  educationalInstitution: string;
  academicLevel: string;
}

const SubmitUserForm = () => {
  const [formState, setFormState] = useState<SubmitProps>({
    name: "",
    language: "",
    method: "",
    subject: "",
    goal: "",
    educationalInstitution: "",
    academicLevel: "",
    additionalContext: "",
  });

  const [userData, setUserData] = useState<UserData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [mount, setMount] = useState<boolean>(false);
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const handleSubmit = async ({
    name,
    language,
    method,
    subject,
    goal,
    educationalInstitution,
    academicLevel,
    additionalContext,
  }: SubmitProps) => {
    try {
      setErrorMessage("");
      setLoading(true);
      if (
        name.trim() === "" ||
        language.trim() === "" ||
        method.trim() === "" ||
        subject.trim() === ""
      ) {
        setErrorMessage("Please fill out the form!");
        return;
      }

      const res = await fetch(`/api/user/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: params.id,
          user: {
            fullname: name,
            language: language,
            learningMethod: method,
            goal: goal,
            educationalInstitution: educationalInstitution,
            academicLevel: academicLevel,
            subject: subject,
            additional_informations: additionalContext,
          },
        }),
      });
      if (!res.ok) {
        setErrorMessage("Something went wrong!");
        return;
      }

      const data = await res.json();
      if (!data.success) {
        setErrorMessage("Something went wrong!");
      }
      console.log(data.updatedUser);

      localStorage.removeItem("discoveryState");
      localStorage.removeItem("checkUserInformations");
    } catch (error) {
      console.error(error);
      setErrorMessage("Unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const resData = await fetch(`/api/user/getUser?userId=${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (resData.status === 500) {
          setErrorMessage("Form couldn't submit. Please try later again");
        }
        const data = await resData.json();

        if (!data.userData) {
          setErrorMessage("UserData not found or already created.");
          return;
        }
        setUserData(data.userData);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();

    setMount(true);
  }, []);

  useEffect(() => {
    if (userData) {
      setFormState({
        name: userData.fullname || "",
        language: userData.language || "",
        method: userData.learningMethod || "",
        subject: userData.subject || "",
        goal: userData.goal || "",
        educationalInstitution: userData.educationalInstitution || "",
        academicLevel: userData.academicLevel || "",
        additionalContext: userData.additional_informations || "",
      });
    }
  }, [userData]);

  useEffect(() => {
    const interval = setInterval(() => {
      const discoveryState = localStorage.getItem("discoveryState");
      const checkUserState = localStorage.getItem("checkUserInformations");

      if (!discoveryState && !checkUserState) {
        router.push("/dashboard");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mount) return null;

  return (
    <>
      <RedirectSession />

      <section className="px-10 h-full w-full flex justify-center items-center flex-col">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>Home page</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Sign in</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>User Informations</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-muted-foreground">
                ✨First AI-Discovery
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>💡Last Check On User Informations</BreadcrumbPage>
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
          <div className="w-full flex flex-col items-center gap-y-4">
            <div className="lg:w-2/3 w-full items-start gap-1 pt-6 flex flex-col justify-center">
              <Label htmlFor="fullname">
                <UserPen size={15} className="mr-1" />
                Full Name
              </Label>
              <Input
                type="text"
                defaultValue={userData?.fullname || formState.name || ""}
                id="fullname"
                placeholder={userData?.fullname || "Full Name"}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                className="bg-white"
              />
            </div>
            <div className="lg:w-2/3 w-full items-start gap-2 flex flex-col justify-center">
              <Label htmlFor="message">
                <Languages size={15} className="mr-1" />
                Language
              </Label>
              <Select
                value={userData?.language || formState.language || ""}
                onValueChange={(language) =>
                  setFormState({ ...formState, language: language })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {languageList.map(({ label, value }) => (
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
                value={userData?.learningMethod || formState.method || ""}
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
                value={userData?.subject || formState.subject || ""}
                onValueChange={(s) =>
                  setFormState({ ...formState, subject: s })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:w-2/3 w-full items-start gap-2 flex flex-col justify-center">
              <Label htmlFor="message">
                <Goal size={15} className="mr-1" />
                Study Goal
              </Label>
              <Select
                value={userData?.goal || formState.goal || ""}
                onValueChange={(e) => setFormState({ ...formState, goal: e })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Goal" />
                </SelectTrigger>
                <SelectContent>
                  {goals.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:w-2/3 w-full items-start gap-2 flex flex-col justify-center">
              <Label htmlFor="message">
                <School size={15} className="mr-1" />
                Educational Institution
              </Label>
              <Select
                value={
                  userData?.educationalInstitution ||
                  formState.educationalInstitution ||
                  ""
                }
                onValueChange={(e) =>
                  setFormState({ ...formState, educationalInstitution: e })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Educational Institution" />
                </SelectTrigger>
                <SelectContent>
                  {educationalInstitutions.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:w-2/3 w-full items-start gap-2 flex flex-col justify-center">
              <Label htmlFor="message">
                <LibraryBig size={15} className="mr-1" />
                Your Academic Level
              </Label>
              <Select
                value={userData?.academicLevel || formState.academicLevel || ""}
                onValueChange={(e) =>
                  setFormState({ ...formState, academicLevel: e })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Academic Level" />
                </SelectTrigger>
                <SelectContent>
                  {academicLevels.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:w-2/3 w-full items-start gap-2 flex flex-col justify-center">
              <Label htmlFor="message">Additional Context</Label>
              <Textarea
                value={
                  userData?.additional_informations ||
                  formState.additionalContext ||
                  ""
                }
                placeholder="Type any additional context in here..."
                id="message"
                className="bg-white"
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
    </>
  );
};

export default SubmitUserForm;
