import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CreateForm } from "../../_components/CreateForm";

const PdfReader = async () => {
    const {userId} = await auth()
    const isAuth = !!userId
  return (
    
    <div className="w-screen overflow-hidden h-screen bg-gradient-to-t from-gray-900 via-purple-900 to-violet-600">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-4xl font-semibold">AI Form Builder <br />
            Effortless Form Creation</h1>
          </div>
          <div className="flex mt-2">
          </div>
          <p className="max-w-xl mt-1 text-lg text-gradient-to-r from-sky-400 to-cyan-300">Transform the way you create forms with GeminiCraft AI-powered solution.</p>
          <div className="w-full mt-4">
            {isAuth ? (<CreateForm />): (<Link href="/sign-in">
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
