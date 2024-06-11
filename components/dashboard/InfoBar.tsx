"use client";

import { Headphones, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

type Props = {};

const InfoBar: React.FC<Props> = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    router.push("/contact");
  };

  const shouldRenderSearch =
    pathname === "/dashboard" ||
    pathname === "/settings" ||
    pathname === "/billing" ||
    pathname === "/logs";

  const shouldRenderName = pathname === "/form";

  return (
    <div className="flex flex-row justify-end gap-6 items-center px-4 py-4 w-full dark:bg-black">
      {shouldRenderSearch && (
        <span className="flex items-center rounded-full bg-muted px-4">
          <Search />
          <Input
            placeholder="Quick Search"
            className="border-none bg-transparent"
          />
        </span>
      )}
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
  );
};

export default InfoBar;
