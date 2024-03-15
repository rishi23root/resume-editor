"use client";
import { InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Inputs, SkillsSectionT } from "@/types/builder";
import { motion } from "framer-motion";
import { Delete } from "lucide-react";
import React, { useId, useState } from "react";
import { FieldPath } from "react-hook-form";

//

export const TagPicker = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    defvalue: {
      name: string;
      level: number;
    }[];
    uselevelstring: boolean;
    fieldTitle: FieldPath<Inputs>;
  }
>(({ id, className, defvalue, uselevelstring, onChange }, ref) => {
  // take value as sting and convert it to array of string
  const [inputValue, setInputValue] = useState<string>("");
  const [tags, setTags] = useState<SkillsSectionT[]>(defvalue || []);

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " " || event.key === ",") {
      event.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    if (
      inputValue.trim() !== "" &&
      !tags.map(({ name }) => name).includes(inputValue.trim())
    ) {
      const updatedTags = [...tags, { name: inputValue.trim(), level: 1 }];
      setTags(updatedTags);
      setInputValue("");
      if (onChange) onChange(updatedTags as any);
    }
  };

  const removeTag = (tag: string) => {
    console.log("remove tag:", tag);

    const updatedTags = tags.filter(({ name }) => name !== tag);
    setTags(updatedTags);
    if (onChange) onChange(updatedTags as any);
  };

  const addLevel = (tag: string) => {
    console.log("add level to tag:", tag);
    if (!uselevelstring) return;
    const updatedTags = tags.map(({ name, level }) => {
      if (name === tag) {
        // circulate level from 1 to 3
        if (level === 3) return { name, level: 1 };
        return { name, level: level + 1 };
      }
      return { name, level };
    });
    setTags(updatedTags);
    if (onChange) onChange(updatedTags as any);
  };

  // const id = useId();

  return (
    <motion.div
      ref={ref}
      className={cn(
        "flex flex-row flex-wrap w-full border gap-2 p-2 relative",
        className
      )}
    >
      {tags.map((tag) => {
        return (
          <motion.span
            layout
            key={tag.name + id}
            className={cn(
              "border border-gray-400/60 bg-transparent rounded-xl py-1 flex items-center text-white group cursor-pointer text-lg relative group hover:px-2 px-5 gap-1",
              uselevelstring && tag.level === 1 && "bg-blue-600/20",
              uselevelstring && tag.level === 2 && "bg-blue-600/60",
              uselevelstring && tag.level === 3 && "bg-blue-600/90"
            )}
          >
            <span onClick={() => addLevel(tag.name)}>{tag.name}</span>
            <span
              onClick={() => removeTag(tag.name)}
              className="hidden group-hover:block opacity-40 transition-all duration-200 ease-in-out"
            >
              <Delete />
            </span>
            {uselevelstring && (
              <span
                className={cn(
                  "absolute w-[9em]",
                  "rounded-lg text-sm bg-gray-900 px-2 py-1 border border-gray-600",
                  "left-1/2 -translate-x-1/3 -translate-y-8 ", // position
                  "opacity-0 delay-0 transition-opacity pointer-events-none ",
                  "group-hover:delay-500 group-hover:opacity-100"
                )}
              >
                Change level : {tag.level}
              </span>
            )}
          </motion.span>
        );
      })}
      <input
        id={id}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleInputKeyDown}
        className={cn(
          "bg-transparent px-2 py-1 text-white cursor-text flex items-center placeholder-gray-400/50",
          "w-3/4"
        )}
        placeholder={`Type to add ${tags.length > 0 ? "more" : ""}...`}
      />
    </motion.div>
  );
});
