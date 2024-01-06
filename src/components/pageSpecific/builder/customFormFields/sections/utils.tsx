"use client";
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

const makeEmptyObject = (obj: any): any => {
  const data = Object.fromEntries(
    Object.entries({ ...obj })
      .map((arr) => {
        // console.log(typeof arr[1],Array.isArray(arr[1]),arr[1])

        if (Array.isArray(arr[1])) {
          // take first element and make it empty
          // check for type
          if (typeof arr[1][0] === "object") {
            return [arr[0], [makeEmptyObject(arr[1][0])]];
          }
          // may need to update these in future
          else if (typeof arr[1][0] === "number") {
            return [arr[0], []];
          } else if (typeof arr[1][0] === "boolean") {
            return [arr[0], []];
          } else if (typeof arr[1][0] === "string") {
            return [arr[0], []];
          }
          // leaving the posibility of nested array
          // } else if (typeof arr[1][0] === "") {
          //   return [arr[0], []];
          return [arr[0], [makeEmptyObject(arr[1][0])]];
        } else if (typeof arr[1] === "object") {
          return [arr[0], makeEmptyObject(arr[1])];
        } else if (typeof arr[1] === "number") {
          return [arr[0], 0];
        } else if (typeof arr[1] === "boolean") {
          return [arr[0], false];
        } else {
          // if (typeof arr[1] === "string") {
          return [arr[0], ""];
        }
        // return [arr[0], typeof arr[1] === "boolean" ? false : ""];
      })
      .filter(([key, val]) => key !== "id")
  );
  return data;
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
          <div className="flex-1 group relative h-10">
            {editableInputItself}
          </div>
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

    // const isRendered = RenderCompleted();

    // if (!isRendered) {
    //   return null;
    // }

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
              onClick={() => {
                append(makeEmptyObject(fields[0]) as any);
              }}
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
        <motion.div
          className={cn(
            "w-full fc  gap-2",
            sectionClass != undefined ? sectionClass : "glass"
          )}
        >
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

export function flattenJson(json: JsonType, parentKey = "") {
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
