import React from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import DashboardButton from "./Button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center p-4">
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="text-white" />
      </Button>
      <div className="flex w-full justify-end space-x-2 md:space-x-4">
        <UserButton afterSignOutUrl="/" />
        <Link href="/pricing">
          <DashboardButton />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
