import Image from "next/image";
import { media } from "@/constants";

export default function TrustedSection() {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-row gap-x-12 lg:gap-x-16 items-center justify-center">
          <Image
            src={media.amazon}
            width="100"
            height="30"
            alt="Universität Logo"
          />

          <Image
            src={media.microsoft}
            width="100"
            height="60"
            alt="Universität Logo"
          />

          <Image
            src={media.google}
            width="100"
            height="60"
            alt="Universität Logo"
          />

          <Image
            src={media.openai}
            width="100"
            height="60"
            alt="Universität Logo"
          />

          <Image
            src={media.meta}
            width="100"
            height="60"
            alt="Universität Logo"
          />
        </div>
        <div className="text-center mt-2">
          <p className="p text-sm text-gray-400 my-8">
            Most of our students are working on fast-growing companies worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
