"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { MultiStepLoader } from "./step-loader";
import { useRouter } from "next/navigation"; // updated import
import { useUser } from "@clerk/nextjs";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useUser();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      setVisible(scrollYProgress.get() < 0.05 || direction < 0);
    }
  });

  const handleGetStartedClick = () => {
    if (isSignedIn) {
      setLoading(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 8000); // Adjust the timeout duration to match the loading steps
    } else {
      router.push("/sign-in"); // Redirect to sign-in if not signed in
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        <Link href="/" className="flex items-center space-x-2">
          <h1 className="font-bold text-[#1E90FF]">GeminiCraft</h1>
          <div className="relative h-5 w-5">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
        </Link>
        <div className="flex-grow mx-4" />
        <MultiStepLoader
          loading={loading}
          loadingStates={[
            { text: "Initializing AI tools..." },
            { text: "Loading data models..." },
            { text: "Setting up user preferences..." },
            { text: "Almost there..." },
          ]}
          duration={2000} 
          loop={false} 
        />
        <div onClick={handleGetStartedClick}>
          <Button variant="premium" size="sm" className="rounded-full">
            Get Started
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
