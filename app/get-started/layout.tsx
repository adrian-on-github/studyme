import RedirectSession from "@/components/RedirectSession";
import React from "react";

const GetStartedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-blue-300/10 min-h-[100vh]">
      <RedirectSession />
      {children}
    </div>
  );
};

export default GetStartedLayout;
2;
