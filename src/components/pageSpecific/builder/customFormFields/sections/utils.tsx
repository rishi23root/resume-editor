"use client";
import { cn, makeEmptyObject } from "@/lib/utils";
import { Inputs } from "@/types/builder";
import { JsonType } from "@/types/utils";
import { AnimatePresence, MotionConfig, Variants, motion } from "framer-motion";
import { Eye, EyeOff, Plus } from "lucide-react";
import React, { memo, useCallback, useId, useState } from "react";
import {
  FieldPath,
  UseFieldArrayReturn,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import useMeasure from "react-use-measure";
import _ from "lodash";

const duration = 0.25;

const variantsActionButton: Variants = {
  initial: { scale: 1, opacity: 0.5 },
  animate: { transition: { duration: 0.05, ease: "easeInOut" } },
  whileHover: { scale: 1.02, opacity: 1 },
};

export function ResizablePanel({ children }: { children: React.ReactNode }) {
  let [ref, { height }] = useMeasure();
  const id = useId();

  return (
    <motion.div
      animate={{ height: height || "auto" }}
      className="relative "
      // className="relative overflow-hidden"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={id}
          // key={JSON.stringify(children, ignoreCircularReferences())}
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

export const SectionWrapper = function SectionWrapper({
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
  // console.log("rendered paremt section wrapper for  title section", sectionKey);

  const TitleSection = memo(
    ({ id, children }: { id: string; children?: React.ReactNode }) => {
      // console.log("rendered title section", sectionKey);

      return (
        <div
          className={cn(
            "w-full text-2xl bold fr justify-between align-middle",
            visible ? "mb-3" : "mb-0",
            editableTitle ? "cursor-text" : "cursor-not-allowed",
            visible ? "" : "cursor-pointer"
          )}
        >
          {/* {editableInputItself && (
          <div
            className={cn("flex-1 group relative h-10", !editableTitle && "hidden")}
          >
            {editableInputItself}
          </div>
        )}
        {!editableTitle && (
          <span>{sectionKey.split(".").pop()?.toUpperCase()}</span>
        )} */}
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
    }
  );

  // const memoTitleSection = React.memo(TitleSection,);

  if (fieldArraySection) {
    const fieldArray = useFieldArray({
      name: sectionKey as any,
      keyName: "id",
      shouldUnregister: false,
    });
    const { fields, append } = fieldArray;

    const emptyAppendCallback = useCallback(
      () => append(makeEmptyObject(fields[0]) as any),
      []
    );

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
              onClick={emptyAppendCallback}
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
};

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

export function getValueFromNestedObject(data: JsonType, keyString: string) {
  const keys = keyString.split(".");

  try {
    return keys.reduce((obj, key) => (obj ? obj[key] : undefined), data);
  } catch (error) {
    return undefined;
  }
}
export function compareJsonObjects(obj1: Inputs, obj2: Inputs): boolean {
  // // Quick check for the same object
  // if (obj1 === obj2) return true;

  // // Check for null or type mismatch
  // if (
  //   typeof obj1 !== "object" ||
  //   typeof obj2 !== "object" ||
  //   obj1 === null ||
  //   obj2 === null
  // )
  //   return false;

  // // Get the keys of the objects
  // const keys1 = Object.keys(obj1);
  // const keys2 = Object.keys(obj2);

  // // Check if the number of keys is the same
  // if (keys1.length !== keys2.length) return false;

  // // Iterate through keys and values
  // for (const key of keys1) {
  //   // Check if the key exists in obj2
  //   if (!keys2.includes(key)) return false;

  //   // Recursively check nested objects
  //   if (typeof obj1[key] === "object" && !Array.isArray(obj1[key])) {
  //     if (!compareJsonObjects(obj1[key], obj2[key])) return false;
  //   } else if (Array.isArray(obj1[key])) {
  //     // Check if arrays are the same
  //     if (!Array.isArray(obj2[key]) || obj1[key].length !== obj2[key].length)
  //       return false;

  //     // Check each element in the array
  //     for (let i = 0; i < obj1[key].length; i++) {
  //       if (!compareJsonObjects(obj1[key][i], obj2[key][i])) return false;
  //     }
  //   } else {
  //     // console.log(obj1[key], obj2[key], key);

  //     // Check if values are the same
  //     if (obj1[key] !== obj2[key]) return false;
  //   }
  // }

  // // If all checks pass, the objects are equal
  // return true;
  // console.log(obj1.basics.name, obj2.basics.name);
  // console.log(obj1.basics.profiles.length, obj2.basics.profiles.length);
  return _.isEqual(obj1, obj2);

  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
