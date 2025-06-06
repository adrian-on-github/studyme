import { GridBackground } from "@/components/GridBackgroundWrapper";
import LoginButton from "@/components/LoginButton";
import { GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <main className="lg:px-10 h-full flex justify-center items-center">
      <GridBackground>
        <div className="flex flex-row justify-center items-center gap-x-1">
          <span className="text-black text-sm p">made for</span>
          <GraduationCap />
          <span className="text-black text-sm p">students</span>
        </div>

        <div className="flex flex-row justify-center items-center">
          <h1 className="h1 text-4xl font-bold lg:text-8xl text-black">
            Studying for{" "}
            <span className="bg-gradient-to-b from-[#7CF7FF] to-[#4B73FF] bg-clip-text text-transparent">
              everyone
            </span>
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center my-8 w-full">
          <LoginButton />
          <p className="p text-sm/6 mt-1">Start with a 7-day Free Trial</p>
        </div>
      </GridBackground>
    </main>
  );
}
