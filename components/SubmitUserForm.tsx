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
  EarthLock,
  Goal,
  GraduationCap,
  Languages,
  LibraryBig,
  Loader2Icon,
  PlugZap,
  Plus,
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
  reason: string;
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
    reason: "",
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

  const handleSubmit = async ({
    name,
    language,
    reason,
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
      console.log(formState);
      if (
        name.trim() === "" ||
        language.trim() === "" ||
        reason.trim() === "" ||
        method.trim() === "" ||
        subject.trim() === ""
      ) {
        setErrorMessage("Please fill out the form!");
        return;
      }

      const resSubmit = await fetch(`/api/user/update/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            fullname: name,
            language: language,
            studyReason: reason,
            learningMethod: method,
            goal: goal,
            educationalInstitution: educationalInstitution,
            academicLevel: academicLevel,
            subject: subject,
            additional_context: additionalContext,
          },
        }),
      });

      if (resSubmit.status === 500) {
        setErrorMessage("Form couldn't submit. Please try later again");
      }
      const submit = await resSubmit.json();
      if (!submit.success) {
        setErrorMessage("Something went wrong!");
      }

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
        reason: userData.studyReason || "",
        method: userData.learningMethod || "",
        subject: userData.subject || "",
        goal: userData.goal || "",
        educationalInstitution: userData.educationalInstitution || "",
        academicLevel: userData.academicLevel || "",
        additionalContext: userData.additional_informations || "",
      });
    }
  }, [userData]);

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
                defaultValue={userData?.fullname}
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
                defaultValue={userData?.language}
                onValueChange={(language) =>
                  setFormState({ ...formState, language: language })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={userData?.language || "Language"} />
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
                <PlugZap size={15} className="mr-1" />
                Study Reason:
              </Label>
              <Select
                defaultValue={userData?.studyReason || ""}
                onValueChange={(x) => setFormState({ ...formState, reason: x })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={userData?.studyReason || "Study Reason"}
                  />
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
                defaultValue={userData?.learningMethod || ""}
                onValueChange={(m) => setFormState({ ...formState, method: m })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={userData?.learningMethod || "Learning Method"}
                  />
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
                defaultValue={userData?.subject || ""}
                onValueChange={(s) =>
                  setFormState({ ...formState, subject: s })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={userData?.subject || "Subject"} />
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
                defaultValue={userData?.goal || ""}
                onValueChange={(e) => setFormState({ ...formState, goal: e })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={userData?.goal || "Goal"} />
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
                defaultValue={userData?.educationalInstitution || ""}
                onValueChange={(e) =>
                  setFormState({ ...formState, educationalInstitution: e })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      userData?.educationalInstitution ||
                      "Educational Institution"
                    }
                  />
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
                defaultValue={userData?.academicLevel || ""}
                onValueChange={(e) =>
                  setFormState({ ...formState, academicLevel: e })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={userData?.academicLevel || "Academic Level"}
                  />
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
                defaultValue={userData?.additional_informations || ""}
                placeholder={
                  userData?.additional_informations ||
                  "Type any additional context in here..."
                }
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
