import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";
import FileUpload from "../../_components/FileUpload";

const PdfReader = async () => {
    const {userId} = await auth()
    const isAuth = !!userId
  return (
    
    <div className="w-screen overflow-hidden h-screen bg-gradient-to-t from-gray-900 via-purple-900 to-violet-600">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="flex mt-2">
            {isAuth && <Button>Go to Chats</Button>}
          </div>
          <p className="max-w-xl mt-1 text-lg text-gradient-to-r from-sky-400 to-cyan-300">Join million of students, researchs and professionals to instantly answer questions and undesrtand reasearch with AI</p>
          <div className="w-full mt-4">
            {isAuth ? (<FileUpload />): (<Link href="/sign-in">
                <Button>Login to get started!
                    <LogIn className="w-4 h-4 ml-2" />
                </Button>
            </Link>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfReader;
