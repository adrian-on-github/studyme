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
  Languages,
  Loader2Icon,
  PlugZap,
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
interface SubmitProps {
  name: string;
  language: string;
}

const UserForm = () => {
  const [formState, setFormState] = useState<SubmitProps>({
    name: "",
    language: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams<{ id: string }>();

  const handleCreate = async ({ name, language }: SubmitProps) => {
    try {
      setLoading(true);

      if (name.trim() === "" || language.trim() === "") {
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
            language: language,
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
      localStorage.setItem("discoveryState", "set");
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
            handleCreate(formState);
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
                className="bg-white"
              />
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
                  {languageList.map(({ label, value }) => (
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
          <p className="pt-5 text-base mx-auto max-w-6xl text-center">
            These Informations will be used in every next interaction with
            StudyMe. They can be changed everytime.
          </p>
        </form>
      </section>
    </>
  );
};

export default UserForm;
