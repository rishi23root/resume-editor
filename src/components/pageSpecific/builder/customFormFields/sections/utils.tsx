import { cn } from "@/lib/utils";
import { Inputs } from "@/types/builder";
import { AnimatePresence, MotionConfig, Variants, motion } from "framer-motion";
import { Eye, EyeOff, Plus } from "lucide-react";
import { useState } from "react";
import {
  Control,
  FieldPath,
  UseFieldArrayReturn,
  useFieldArray,
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
      className="relative overflow-hidden"
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
            // className="w-full"
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
}:
  | {
      sectionKey: FieldPath<Inputs>;
      children: React.ReactNode;
      fieldArraySection?: false;
      control?: undefined;
    }
  | {
      sectionKey: FieldPath<Inputs>;
      children: (
        fields: UseFieldArrayReturn<Inputs, any, "id">
      ) => React.ReactNode;
      fieldArraySection: true;
      control: Control<Inputs, any>;
    }) {
  const [visible, setVisible] = useState(true);

  const TitleSection = ({ children }: { children?: React.ReactNode }) => {
    return (
      <div
        className={cn(
          "w-full text-2xl bold fr justify-between align-middle",
          "transition ease-in-out delay-50",
          visible ? "mb-3" : "mb-0"
        )}
      >
        <span>{sectionKey.split(".").pop()?.toUpperCase()}</span>
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
        <motion.div className="w-full fc glass gap-2">
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
            <motion.div className={cn(visible ? "block" : "hidden")}>
              {children(fieldArrayObject)}
            </motion.div>
          </ResizablePanel>
        </motion.div>
      </MotionConfig>
    );
  }
}
