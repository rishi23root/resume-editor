import { cn } from "@/lib/utils";
import { Inputs, masksT } from "@/types/builder";
import { AnimatePresence, MotionConfig, Variants, motion } from "framer-motion";
import { Eye, EyeOff, Plus } from "lucide-react";
import { useState } from "react";
import {
  Control,
  FieldErrors,
  FieldPath,
  UseFieldArrayReturn,
  UseFormRegister,
  useFieldArray,
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
  children,
  fieldArraySection,
  control,
  editableTitle,
}:
  | {
      sectionKey: FieldPath<Inputs>;
      children: React.ReactNode;
      fieldArraySection?: false;
      control?: undefined;
      editableTitle?: {
        register: UseFormRegister<Inputs>;
        control: Control<Inputs, any>;
        error: FieldErrors<Inputs> | any;
      };
    }
  | {
      sectionKey: FieldPath<Inputs>;
      children: (
        fields: UseFieldArrayReturn<Inputs, any, "id">
      ) => React.ReactNode;
      fieldArraySection: true;
      control: Control<Inputs, any>;
      editableTitle?: {
        register: UseFormRegister<Inputs>;
        control: Control<Inputs, any>;
        error: FieldErrors<Inputs> | any;
      };
    }) {
  const [visible, setVisible] = useState(true);

  const TitleSection = ({ children }: { children?: React.ReactNode }) => {
    return (
      <div
        className={cn(
          "w-full text-2xl bold fr justify-between align-middle",
          "transition ease-in-out delay-50",
          visible ? "mb-3" : "mb-0",
          editableTitle ? "cursor-text" : "cursor-not-allowed",
          visible ? "" : "cursor-pointer"
        )}
        onClick={() => {
          if (!visible) {
            setVisible(!visible);
          }
        }}
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
                  "absolute bold text-xl p-1",
                  " hidden transition ease-in-out delay-500",
                  "group-[:not(:hover)]:block",
                  // if group have a input element in focus then hide this
                  "group-[:has(.formInput:focus-visible)]:hidden"
                )}
              >
                <WatchedValue
                  watchKey={`masks.${sectionKey as keyof masksT}`}
                  // watchKey={`work.${index}.network`}
                  control={editableTitle.control}
                />
              </div>
              <FormInput
                fieldTitle={`masks.${sectionKey as keyof masksT}`}
                type="text"
                register={editableTitle.register}
                validationError={editableTitle.error}
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
        <div className="fr fce gap-2">
          {children ? children : null}
          <motion.button
            variants={variantsActionButton}
            initial="initial"
            animate="animate"
            whileHover="whileHover"
            className="px-2"
            onClick={() => {
              setVisible(!visible);
            }}
          >
            {visible ? <EyeOff /> : <Eye />}
          </motion.button>
        </div>
      </div>
    );
  };

  if (!fieldArraySection) {
    return (
      <MotionConfig transition={{ duration }}>
        <motion.div className="w-full fc glass gap-2">
          <TitleSection />
          <ResizablePanel>
            <motion.div className={cn(visible ? "block" : "hidden")}>
              {children}
            </motion.div>
          </ResizablePanel>
        </motion.div>
      </MotionConfig>
    );
  } else {
    const fieldArray = useFieldArray({
      name: sectionKey as any,
      control: control,
    });
    const fieldArrayObject = fieldArray;
    const { fields, append } = fieldArrayObject;
    // return a callback with the fields array render children here
    return (
      <MotionConfig transition={{ duration }}>
        <motion.div className="w-full fc glass gap-2 ">
          <TitleSection>
            <motion.button
              variants={variantsActionButton}
              initial="initial"
              animate="animate"
              whileHover="whileHover"
              className="px-2"
              onClick={() => {
                append(
                  Object.fromEntries(
                    Object.entries({ ...fields[0] })
                      .map((arr) => [arr[0], ""])
                      .filter(([key, val]) => key !== "id")
                  )
                );
                setVisible(true);
              }}
            >
              <Plus />
            </motion.button>
          </TitleSection>
          <ResizablePanel>
            <motion.div
              className={cn(
                "flex flex-wrap gap-2 justify-evenly",
                visible ? "flex" : "hidden"
              )}
            >
              {children(fieldArrayObject)}
            </motion.div>
          </ResizablePanel>
        </motion.div>
      </MotionConfig>
    );
  }
}

export function WatchedValue({
  watchKey,
  control,
}: {
  watchKey: FieldPath<Inputs>;
  control: Control<Inputs>;
}) {
  // watch for this element to update
  const value = useWatch({
    control,
    name: watchKey,
    // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
  });

  return <>{value}</>;
}
