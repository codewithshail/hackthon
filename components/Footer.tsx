"use client"
import React, { useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { socialMedia } from "@/lib/constant";
import { GlowingStarsBackgroundCard } from "./ui/glowing-star";
import MagicButton from "./ui/MagicButton";
import { MultiStepLoader } from "./ui/step-loader";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleGetStartedClick = () => {
    if (isSignedIn) {
      setLoading(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 8000);
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <footer className="w-full pt-20 pb-10 relative" id="contact">
      <GlowingStarsBackgroundCard className="absolute inset-0 w-full h-full -z-10" />
      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-[#1E90FF]">your</span> digital
          presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <MultiStepLoader
          loading={loading}
          loadingStates={[
            { text: "Initializing AI tools..." },
            { text: "Loading data models..." },
            { text: "Setting up user preferences..." },
            { text: "Almost there..." },
          ]}
          duration={2000}
          loop={true}
        />
        <div onClick={handleGetStartedClick}>
          <MagicButton title="Get Started" icon={<FaLocationArrow />} position="right" />
        </div>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2024 GeminiCraft
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <a href={info.link}>
                <img src={info.img} alt="icons" width={20} height={20} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
