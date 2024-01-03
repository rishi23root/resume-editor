import { cn } from "@/lib/utils";
import { Inputs } from "@/types/builder";
import { JsonType } from "@/types/utils";
import { AnimatePresence, MotionConfig, Variants, motion } from "framer-motion";
import { Eye, EyeOff, Plus } from "lucide-react";
import React, { useState } from "react";
import {
  FieldPath,
  UseFieldArrayReturn,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import useMeasure from "react-use-measure";

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
  children,
  editableTitle,
  editableInputItself,
  fieldArraySection,
  sectionClass,
  sectionActionBtnClass,
}: {
  sectionKey: FieldPath<Inputs>;
  sectionClass?: string;
  sectionActionBtnClass?: string;
  editableTitle?: boolean;
  editableInputItself?: React.ReactNode;
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
  const [visible, setVisible] = useState(true);

  const TitleSection = ({
    children,
  }: {
    id: string;
    children?: React.ReactNode;
  }) => {
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
                "transition ease-in-out delay-300 flex-1" //animate,
                // "border border-green-400"
              )}
            >
              {editableInputItself}
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
      keyName: "id",
      shouldUnregister: false,
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
          <TitleSection id={sectionKey}>
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
              {children({ ...fieldArray } as any)}
            </motion.div>
          </ResizablePanel>
        </motion.div>
      </MotionConfig>
    );
  } else {
    return (
      <MotionConfig transition={{ duration }}>
        <motion.div className="fc glass gap-2 ">
          <TitleSection id={sectionKey} />
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

export function useWatchedValue(watchKey: FieldPath<Inputs>) {
  const { watch } = useFormContext<Inputs>();
  const watchValue = watch(watchKey as any);
  // useEffect(() => {
  //   console.log("updated", watchKey, watchValue);
  // }, [watchValue]);
  // console.log("rendered", watchKey, watchValue);

  // const [data, setValue] = useState("");

  // useEffect(() => {
  //   const subscription = watch((value, { name, type }) => {
  //     // setValue()
  //     // console.log(value, name, type);
  //     const tes = flattenJson(value)[watchKey as any];
  //     console.log("val",tes);
  //     setValue(tes);

  //     // console.log(value[watchKey as any]);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);
  return watchValue;
}

function flattenJson(json: JsonType, parentKey = "") {
  let result: JsonType = {};

  for (const key in json) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof json[key] === "object" && !Array.isArray(json[key])) {
      // Recursively flatten nested objects
      result = { ...result, ...flattenJson(json[key], newKey) };
    } else if (Array.isArray(json[key])) {
      // Flatten arrays by appending index to keys
      json[key].forEach((item: JsonType, index: any) => {
        const arrayKey = `${newKey}.${index}`;
        if (typeof item === "object") {
          result = { ...result, ...flattenJson(item, arrayKey) };
        } else {
          result[arrayKey] = item;
        }
      });
    } else {
      result[newKey] = json[key];
    }
  }

  return result;
}

// export type SkillsSectionT = {
// name: string;
// level: number;
// function to handel this datatype with conversion to its form key all together
export const TagPicker = (fields: UseFieldArrayReturn<Inputs, any, "id">) => {
  return null;
};
