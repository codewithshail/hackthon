"use client";
import React from "react";

const Encryption = () => {
  return (
    <div className="flex flex-row relative items-center justify-center min-h-screen w-full h-full">
      <div className="w-full flex items-start justify-center absolute">
        <video
          loop
          muted
          autoPlay
          playsInline
          preload="true"
          className="w-full h-auto"
          src="/logoFade.webm"
        />
      </div>
    </div>
  );
};

export default Encryption;
