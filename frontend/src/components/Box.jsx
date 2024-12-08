"use client";
import React from "react";
import { Boxes } from "../components/ui/background-boxes";
import { cn } from "../../lib/utils";
import { useTheme } from "../ThemeContext";

export function Box() {
  const { theme } = useTheme();

  return (
    <div
      className={`h-screen w-screen relative overflow-hidden flex flex-col items-center justify-center rounded-lg ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
      <div
        className={`absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`} />
      <Boxes />
      <h1 className={cn("md:text-4xl text-xl relative z-20", theme === 'dark' ? 'text-white' : 'text-black')}>
        Tailwind is Awesome
      </h1>
      <p className={`text-center mt-2 relative z-20 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
        Framer motion is the best animation library ngl
      </p>
    </div>
  );
}