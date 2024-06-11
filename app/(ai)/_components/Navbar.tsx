"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserButton } from "@clerk/nextjs";
import { Headphones, Search } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

const AiNavbar: React.FC<Props> = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/contact");
  };

  return (
    <div className="flex flex-row justify-between items-center px-4 py-4 w-full dark:bg-black">
      <h2 className="flex items-center text-2xl">GeminiCraft</h2>
      <div className="flex flex-row gap-6 items-center">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <Headphones onClick={handleClick} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Contact Support</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger className="mt-[9px]">
              <UserButton afterSignOutUrl="/" />
            </TooltipTrigger>
            <TooltipContent>
              <p>User</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default AiNavbar;
