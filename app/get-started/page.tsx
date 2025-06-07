import React from "react";
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
  Goal,
  Languages,
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
  { label: "🇨🇳 Chinese", value: "chinese" },
  { label: "🇯🇵 Japanese", value: "japanese" },
];

const job = [
  { label: "💼 Software Developer", value: "software-developer" },
  { label: "👩‍🏫 Teacher", value: "teacher" },
  { label: "🧑‍⚕️ Healthcare Professional", value: "healthcare" },
  { label: "📊 Data Analyst", value: "data-analyst" },
  { label: "🎨 Designer", value: "designer" },
  { label: "📚 Student", value: "student" },
];

const subject = [
  { label: "➗ Mathematics", value: "math" },
  { label: "🔬 Science", value: "science" },
  { label: "📖 Literature", value: "literature" },
  { label: "🌍 Geography", value: "geography" },
  { label: "🧪 Chemistry", value: "chemistry" },
  { label: "💻 Computer Science", value: "computer-science" },
];

const Page = () => {
  return (
    <section className="p-10 h-full w-full flex justify-center items-center flex-col">
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
      <div className="w-full flex flex-col items-center gap-y-5">
        <div className="lg:w-1/3 w-2/3 items-start gap-2 pt-10 flex flex-col justify-center">
          <Label htmlFor="fullname">
            <UserPen size={15} className="mr-1" />
            Full Name
          </Label>
          <Input type="text" id="fullname" placeholder="Full Name" />
        </div>
        <div className="lg:w-1/3 w-2/3 items-start gap-2 flex flex-col justify-center">
          <Label htmlFor="message">
            <EarthLock size={15} className="mr-1" />
            Age
          </Label>
          <Select>
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
        <div className="lg:w-1/3 w-2/3 items-start gap-2 flex flex-col justify-center">
          <Label htmlFor="message">
            <Languages size={15} className="mr-1" />
            Language
          </Label>
          <Select>
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
        <div className="lg:w-1/3 w-2/3 items-start gap-2 flex flex-col justify-center">
          <Label htmlFor="message">
            <PlugZap size={15} className="mr-1" />
            Reason you are here:
          </Label>
          <Select>
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
        <div className="lg:w-1/3 w-2/3 items-start gap-2 flex flex-col justify-center">
          <Label htmlFor="message">
            <BrainCircuit size={15} className="mr-1" />
            <span className="text-red-500">*</span>Your most favorite Learning
            Method
          </Label>
          <Select>
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
        <div className="lg:w-1/3 w-2/3 items-start gap-2 flex flex-col justify-center">
          <Label htmlFor="message">
            <Goal size={15} className="mr-1" />
            <span className="text-red-500">*</span>Future Job Goal
          </Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Jobs" />
            </SelectTrigger>
            <SelectContent>
              {job.map(({ label, value }) => (
                <SelectItem value={value} key={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="lg:w-1/3 w-2/3 items-start gap-2 flex flex-col justify-center">
          <Label htmlFor="message">
            <Pyramid size={15} className="mr-1" />
            Your subject where you'll improve
          </Label>
          <Select>
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
        <div className="lg:w-1/3 w-2/3 items-start gap-2 flex flex-col justify-center">
          <Label htmlFor="message">
            <Plus size={15} className="mr-1" />
            <span className="text-red-500">*</span>Additional Context
          </Label>
          <Textarea
            placeholder="Type any additional context in here..."
            id="message"
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
