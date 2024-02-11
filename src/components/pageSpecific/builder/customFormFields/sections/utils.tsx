"use client";
import { cn, makeEmptyObject } from "@/lib/utils";
import { trpc } from "@/serverTRPC/client";
import { Inputs } from "@/types/builder";
import { JsonType } from "@/types/utils";
import { AnimatePresence, MotionConfig, Variants, motion } from "framer-motion";
import _ from "lodash";
import { Eye, EyeOff, Plus } from "lucide-react";
import React, { memo, useCallback, useId, useState } from "react";
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

  if (fieldArraySection) {
    const fieldArray = useFieldArray({
      name: sectionKey as any,
      keyName: "id",
      shouldUnregister: false,
    });
    const { fields, append } = fieldArray;
    const { mutate: addKeyData } = trpc.builder.getEmptyField.useMutation({
      onSettled: (newEntryData) => {
        console.log("got data for key ", sectionKey, " : ", newEntryData);
        if (Object.keys(newEntryData).includes("id")) {
          newEntryData.id = `${fields.length + 1}`;
        }
        append(newEntryData);
      },
    });

    const emptyAppendCallback = useCallback(async () => {
      // console.log("current length", fields.length);
      if (fields.length > 0) {
        // console.log("got form old data");
        const newEntryData = makeEmptyObject(fields[0]) as any;
        // if id exists then add value of length +1 to it
        if (Object.keys(newEntryData).includes("id")) {
          newEntryData.id = `${fields.length + 1}`;
        }
        append(newEntryData);
      } else {
        // request to add new field
        addKeyData({ key: sectionKey as string });
      }
    }, [fields]);

    return (
      <MotionConfig transition={{ duration }}>
        <motion.div
          className={cn(
            "w-full fc gap-2 z-10 ",
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
                setVisible(true);
                emptyAppendCallback();
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
            "w-full fc gap-2 z-10",
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

export function getValueFromNestedObject(data: JsonType, keyString: string) {
  const keys = keyString.split(".");

  try {
    return keys.reduce((obj, key) => (obj ? obj[key] : undefined), data);
  } catch (error) {
    return undefined;
  }
}
export function compareJsonObjects(obj1: Inputs, obj2: Inputs): boolean {
  return _.isEqual(obj1, obj2);
}
