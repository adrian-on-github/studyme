import { GridBackground } from "@/components/GridBackgroundWrapper";
import { GraduationCap } from "lucide-react";
import { AnimatedListDemo } from "@/components/AnimatedList";
import SignInButton from "@/components/SignInButton";
import TrustedSection from "@/components/TrustedSection";
import WaveTransition from "@/components/WaveTransition";
import RedirectQuestion from "@/components/RedirectQuestion";
import RedirectButton from "@/components/RedirectButton";

export default async function Home() {
  return (
    <>
      <RedirectQuestion />
      <div className="absolute z-50 right-5">
        <AnimatedListDemo />
      </div>

      <main className="flex flex-col justify-center items-center">
        <section className="min-h-[100vh] w-full">
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
              <RedirectButton />
            </div>
          </GridBackground>
          <TrustedSection />
        </section>
        <WaveTransition />
        <section className="w-full -mt-1 py-16 px-24 h-[60vh] bg-neutral-700"></section>
      </main>
    </>
  );
}
