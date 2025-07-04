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
import RedirectSession from "@/components/RedirectSession";
import type { User } from "@prisma/client";

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
  subject: string;
  goal: string;
  educationalInstitution: string;
  academicLevel: string;
}

const UserForm = () => {
  const [formState, setFormState] = useState<SubmitProps>({
    name: "",
    language: "",
    subject: "",
    goal: "",
    educationalInstitution: "",
    academicLevel: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [mount, setMount] = useState<boolean>(false);
  const params = useParams<{ id: string }>();

  const handleSubmit = async ({
    name,
    language,
    subject,
    goal,
    educationalInstitution,
    academicLevel,
  }: SubmitProps) => {
    try {
      setErrorMessage("");

      setLoading(true);
      if (user === null) {
        setErrorMessage("Please try later again!");
        return;
      }
      if (
        name.trim() === "" ||
        language.trim() === "" ||
        academicLevel.trim() === "" ||
        educationalInstitution.trim() === ""
      ) {
        setErrorMessage("Please fill out the form!");
        return;
      }

      const res = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            userId: params.id,
          },
          data: {
            email: user.email,
            image: user.image || null,
            language: language,
            fullname: name,
            subject: subject,
            goal: goal,
            educationalInstitution: educationalInstitution,
            academicLevel: academicLevel,
          },
        }),
      });

      if (res.status === 500) {
        setErrorMessage("Form couldn't submit. Please try later again");
      }

      const data = await res.json();
      if (!data.success) {
        setErrorMessage("Something went wrong!");
      }

      localStorage.setItem("session", JSON.stringify({ id: params.id }));
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
        const res = await fetch(`/api/user/getUser?userId=${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 500) {
          setErrorMessage("Form couldn't submit. Please try later again");
        }
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();

    setMount(true);
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
          <div className="w-full flex flex-col items-center gap-y-4">
            <div className="lg:w-2/3 w-full items-start gap-1 pt-6 flex flex-col justify-center">
              <Label htmlFor="fullname">
                <UserPen size={15} className="mr-1" />
                Full Name
              </Label>
              <Input
                type="text"
                defaultValue={formState.name || ""}
                id="fullname"
                placeholder="Full Name"
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
                value={formState.language || ""}
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
                <Pyramid size={15} className="mr-1" />
                Subject for Improvement
              </Label>
              <Select
                value={formState.subject || ""}
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
                value={formState.goal || ""}
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
                value={formState.educationalInstitution || ""}
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
                value={formState.academicLevel || ""}
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

export default UserForm;
