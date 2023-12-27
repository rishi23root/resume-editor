import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Inputs } from "@/types/builder";
import { FieldErrors, FieldPath, UseFormRegister } from "react-hook-form";
import { motion } from "framer-motion";

export function FormInput({
  type,
  fieldTitle,
  validationError,
  register,
  headerInput,
  InputClassValue,
  LabelClassValue,
  parentClassValue,
}: {
  type: InputProps["type"];
  fieldTitle: FieldPath<Inputs>;
  validationError: FieldErrors<Inputs> | any;
  register: UseFormRegister<Inputs>;
  headerInput?: {
    InputClassValue: string;
    LabelClassValue: string;
    parentClassValue: string;
  };
  InputClassValue?: string;
  LabelClassValue?: string;
  parentClassValue?: string;
}) {
  return (
    <motion.div
      className={cn(
        "w-full fc ",
        headerInput?.parentClassValue ? headerInput.parentClassValue : ""
      )}
    >
      <motion.label
        className={cn(
          "capitalize bold text-gray-200/80 cursor-pointer",
          "transition ease-in-out delay-50",
          headerInput?.LabelClassValue ? headerInput.LabelClassValue : ""
        )}
        htmlFor={fieldTitle}
      >
        &nbsp;{fieldTitle.split(".").pop()}
      </motion.label>
      <Input
        id={fieldTitle}
        type={type}
        {...register(fieldTitle)}
        className={cn(
          "formInput w-full rounded-lg bg-background/30 text-slate-100",
          "focus-visible:ring-1 focus-visible:ring-slate-600 focus-visible:ring-offset-1 focus-visible:bg-background/50",
          "transition ease-in-out delay-50", //animate
          headerInput?.InputClassValue ? headerInput.InputClassValue : ""
        )}
      />
      {/* error state */}
      {Object(validationError)[fieldTitle] && (
        <div className="text-red-600">
          {Object(validationError)[fieldTitle]}
        </div>
      )}
    </motion.div>
  );
}

// must have data
// default value (spread props)
// register object data (spread props)
// error state, custom error message
