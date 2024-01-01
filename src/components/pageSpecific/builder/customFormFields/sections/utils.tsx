import { cn } from "@/lib/utils";
import { Inputs, SkillsT, maskT } from "@/types/builder";
import { AnimatePresence, MotionConfig, Variants, motion } from "framer-motion";
import { Eye, EyeOff, Plus } from "lucide-react";
import React, { useState } from "react";
import {
  FieldPath,
  UseFieldArrayReturn,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import useMeasure from "react-use-measure";
import { FormInput } from "../formInput";

const duration = 0.25;

const variantsActionButton: Variants = {
  initial: { scale: 1, opacity: 0.5 },
  animate: { transition: { duration: 0.05, ease: "easeInOut" } },
  whileHover: { scale: 1.02, opacity: 1 },
};

function ResizablePanel({ children }: { children: React.ReactNode }) {
  let [ref, { height }] = useMeasure();

  return (
    <motion.div
      animate={{ height: height || "auto" }}
      className="relative "
      // className="relative overflow-hidden"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={JSON.stringify(children, ignoreCircularReferences())}
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: duration / 2, delay: duration / 2 },
          }}
          exit={{
            y: -10,
            opacity: 0,
            transition: { duration: duration / 2 },
          }}
        >
          <div
            ref={ref}
            className={`${height ? "absolute" : "relative"} w-full`}
          >
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/*
  Replacer function to JSON.stringify that ignores
  circular references and internal React properties.
  https://github.com/facebook/react/issues/8669#issuecomment-531515508
*/
const ignoreCircularReferences = () => {
  const seen = new WeakSet();
  return (key: string, value: any | null) => {
    if (key.startsWith("_")) return; // Don't compare React's internal props.
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  };
};

export function SectionWrapper({
  sectionKey,
  editableTitle,
  sectionClass,
  sectionActionBtnClass,
  children,
  fieldArraySection,
}: {
  sectionKey: FieldPath<Inputs>;
  sectionClass?: string;
  sectionActionBtnClass?: string;
  editableTitle?: boolean;
} & (
  | {
      fieldArraySection?: false;
      children: React.ReactNode;
    }
  | {
      fieldArraySection?: true;
      children: (
        fields: UseFieldArrayReturn<Inputs, any, "id">
      ) => React.ReactNode;
    }
)) {
  const { control } = useFormContext();
  const [visible, setVisible] = useState(true);

  const TitleSection = ({ children }: { children?: React.ReactNode }) => {
    return (
      <div
        className={cn(
          "w-full text-2xl bold fr justify-between align-middle",
          visible ? "mb-3" : "mb-0",
          editableTitle ? "cursor-text" : "cursor-not-allowed",
          visible ? "" : "cursor-pointer"
        )}
      >
        {editableTitle ? (
          <>
            <motion.div
              className={cn(
                "flex-1 group relative h-10",
                "transition ease-in-out delay-300" //animate
              )}
            >
              <div
                className={cn(
                  "absolute bold p-1 uppercase",
                  "transition ease-in-out delay-300",
                  "w-full text-2xl bold fr justify-between align-middle",
                  " hidden transition ease-in-out delay-500",
                  "group-[:not(:hover)]:block",
                  // if group have a input element in focus then hide this
                  "group-[:has(.formInput:focus-visible)]:hidden"
                )}
              >
                <WatchedValue
                  watchKey={
                    sectionKey.split(".").length == 2
                      ? // sectionKey.startsWith('skills') ?
                        `skills.mask.${
                          sectionKey.split(".").pop() as keyof SkillsT["mask"]
                        }`
                      : `mask.${sectionKey as keyof maskT}`
                  }
                  // watchKey={`work.${index}.network`}
                />
              </div>
              <FormInput
                fieldTitle={
                  sectionKey.split(".").length == 2
                    ? // sectionKey.startsWith('skills') ?
                      `skills.mask.${
                        sectionKey.split(".").pop() as keyof SkillsT["mask"]
                      }`
                    : `mask.${sectionKey as keyof maskT}`
                }
                type="text"
                headerInput={{
                  InputClassValue:
                    "hidden group-[:hover]:block focus-visible:block transition p-0 px-1 text-lg",
                  LabelClassValue:
                    "hidden focus-visible:block transition ease-in-out delay-300",
                  parentClassValue: "absolute ",
                }}
              />
            </motion.div>
          </>
        ) : (
          <span>{sectionKey.split(".").pop()?.toUpperCase()}</span>
        )}

        <div className={cn("fr fce gap-2", sectionActionBtnClass)}>
          {fieldArraySection ? children : null}
          <motion.button
            variants={variantsActionButton}
            initial="initial"
            animate="animate"
            whileHover="whileHover"
            className="px-2"
            onClick={() => setVisible(!visible)}
          >
            {visible ? <EyeOff /> : <Eye />}
          </motion.button>
        </div>
      </div>
    );
  };

  if (fieldArraySection) {
    const fieldArray = useFieldArray({
      name: sectionKey as any,
      control: control,
    });
    const { fields, append } = fieldArray;

    return (
      <MotionConfig transition={{ duration }}>
        <motion.div
          className={cn(
            "w-full fc  gap-2",
            sectionClass != undefined ? sectionClass : "glass"
          )}
        >
          <TitleSection>
            <motion.button
              variants={variantsActionButton}
              initial="initial"
              animate="animate"
              whileHover="whileHover"
              className="px-2"
              onClick={() =>
                append(
                  Object.fromEntries(
                    Object.entries({ ...fields[0] })
                      .map((arr) => [arr[0], ""])
                      .filter(([key, val]) => key !== "id")
                  )
                )
              }
            >
              <Plus />
            </motion.button>
          </TitleSection>
          <ResizablePanel>
            <motion.div
              className={cn(
                "flex flex-wrap gap-2 justify-start",
                visible ? "flex" : "hidden"
              )}
            >
              {children(fieldArray as any)}
            </motion.div>
          </ResizablePanel>
        </motion.div>
      </MotionConfig>
    );
  } else {
    return (
      <MotionConfig transition={{ duration }}>
        <motion.div className="fc glass gap-2 ">
          <TitleSection />
          <ResizablePanel>
            <motion.div
              className={cn(
                "flex flex-wrap gap-2 justify-start",
                visible ? "flex" : "hidden"
              )}
            >
              {children as any}
            </motion.div>
          </ResizablePanel>
        </motion.div>
      </MotionConfig>
    );
  }
}

export function WatchedValue({ watchKey }: { watchKey: FieldPath<Inputs> }) {
  // watch for this element to update
  const { control } = useFormContext();
  const value = useWatch({
    control,
    name: watchKey,
    // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
  });

  return <>{value}</>;
}

// export type SkillsSectionT = {
// name: string;
// level: number;
// function to handel this datatype with conversion to its form key all together

export const TagPicker = (fields: UseFieldArrayReturn<Inputs, any, "id">) => {
  return null;
};
