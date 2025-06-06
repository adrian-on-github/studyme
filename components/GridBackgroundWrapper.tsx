"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "motion/react";

export function GridBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[40vh] w-full items-center justify-center bg-white dark:bg-black py-20">
      {/* Grid lines */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />

      {/* Radial fade layer */}
      <div className="pointer-events-none absolute inset-0 bg-white dark:bg-black [mask-image:radial-gradient(circle_at_center,transparent_10%,black_100%)] [mask-composite:exclude] -webkit-mask-image:radial-gradient(circle at center, transparent 10%, black 100%) -webkit-mask-composite:destination-out" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-20"
      >
        {children}
      </motion.div>
    </div>
  );
}
