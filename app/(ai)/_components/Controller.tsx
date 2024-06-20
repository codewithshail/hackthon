"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Themes from "../_data/Themes";
import Gradientbg from "../_data/Gradientbg";
import { Button } from "@/components/ui/button";

type Props = {
  selectedTheme: string;
  onThemeChange: (value: string) => void;
  selectedBackground: string;
  onBackgroundChange: (value: string) => void;
};

const Controller: React.FC<Props> = ({ selectedTheme, onThemeChange, selectedBackground, onBackgroundChange }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div>
      {/* Theme Selection Controller */}
      <h2 className="my-1">Themes</h2>
      <Select onValueChange={onThemeChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {Themes.map((theme, index) => (
            <SelectItem value={theme.theme} key={index}>
              <div className="flex gap-3">
                <div className="flex">
                  <div
                    className="h-5 w-5 rounded-l-md"
                    style={{ backgroundColor: theme.primary }}
                  ></div>
                  <div
                    className="h-5 w-5"
                    style={{ backgroundColor: theme.secondary }}
                  ></div>
                  <div
                    className="h-5 w-5"
                    style={{ backgroundColor: theme.accent }}
                  ></div>
                  <div
                    className="h-5 w-5 rounded-r-md"
                    style={{ backgroundColor: theme.neutral }}
                  ></div>
                </div>
                {theme.theme}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Background Selection Controller */}
      <h2 className="mt-8 my-1">Backgrounds</h2>
      <div className="grid grid-cols-3 gap-4">
        {Gradientbg.slice(0, showMore ? Gradientbg.length : 6).map((bg, index) => (
          <div
            key={index}
            className="w-full h-[60px] rounded-lg cursor-pointer hover:border-white hover:border-2 flex items-center justify-center"
            style={{ background: bg.gradient }}
            onClick={() => onBackgroundChange(bg.gradient)}
          >
            {index === 0 && "None"}
          </div>
        ))}
      </div>
      <Button
        className="w-full my-2"
        size="sm"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? 'Show Less' : 'Show More'}
      </Button>
    </div>
  );
};

export default Controller;
