import { Card, HoverEffect } from "@/components/dashboard/hover-card";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { projects } from "@/lib/constant";
import React from "react";

const words = 'Our AI Collections';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/60 p-6 text-4xl backdrop-blur-lg">
        <span>Dashboard</span>
      </h1>
      <h2>
        <TextGenerateEffect words={words} />
      </h2>
      <div className="max-w-5xl mx-auto px-8 z-0 relative">
        <HoverEffect items={projects} />
    </div>
    </div>
  );
};

export default Dashboard;
