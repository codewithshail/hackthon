"use client";

import React, { useEffect } from "react";
import SplineComponent from "@/components/ui/Spline";
import { motion } from "framer-motion";

type Props = {};

const ContactUs: React.FC<Props> = () => {
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      const splineElement = document.querySelector(".spline-container");
      if (splineElement && splineElement.contains(event.target as Node)) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="h-screen overflow-hidden flex items-center justify-center bg-transparent p-6 dark:bg-grid-small-white/[0.2]">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="max-w-4xl w-full p-8 flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <h2 className="text-[#66FCF1] text-lg mb-2">
              How can we help you?
            </h2>
            <h1 className="text-4xl font-bold mb-4 text-white">Contact us</h1>
            <p className="text-[#D0D0D0] mb-6">
              We're here to help and answer any questions you might have. We
              look forward to hearing from you!
            </p>
            <div className="flex items-center mb-4">
              <img
                alt="Location"
                src="https://sleeknotecom.wpenginepowered.com/wp-content/uploads/2020/10/Pin-2.svg"
                className="mr-3 h-6 w-6 filter-white"
              />
              <p className="text-[#D0D0D0]">
                Naini, Allahabad, UttarPradesh, 211001{" "}
              </p>
            </div>
            <div className="flex items-center mb-4">
              <img
                src="https://sleeknotecom.wpenginepowered.com/wp-content/uploads/2020/10/Phone-2.svg"
                alt="phone"
                className="h-6 w-6 mr-3 filter-white"
              />
              <p className="text-[#D0D0D0]">+91 8004553490</p>
            </div>
            <div className="flex items-center">
              <img
                src="https://sleeknotecom.wpenginepowered.com/wp-content/uploads/2020/10/Mail.svg"
                alt="email"
                className="h-6 w-6 mr-3 filter-white"
              />
              <a
                href="mailto:jaisshail1718@gmail.com"
                className="text-[#66FCF1]"
              >
                jaisshail1718@gmail.com
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
            className="md:w-1/2 flex justify-center bg-transparent spline-container "
          >
            <SplineComponent />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
