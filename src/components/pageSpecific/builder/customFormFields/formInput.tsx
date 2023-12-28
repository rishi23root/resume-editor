import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Input, InputProps } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Inputs } from "@/types/builder";
import { motion } from "framer-motion";
import { CalendarIcon } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  FieldErrors,
  FieldPath,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";

export function FormInput({
  type,
  fieldTitle,
  validationError,
  register,
  setValue,
  headerInput,
  InputClassValue,
  LabelClassValue,
  parentClassValue,
}: {
  type: InputProps["type"];
  fieldTitle: FieldPath<Inputs>;
  validationError: FieldErrors<Inputs> | any;
  register: UseFormRegister<Inputs>;
  setValue: UseFormSetValue<Inputs>;
  headerInput?: {
    InputClassValue: string;
    LabelClassValue: string;
    parentClassValue: string;
  };
  parentClassValue?: string;
  LabelClassValue?: string;
  InputClassValue?: string;
}) {
  // updates for the input
  // check for types of input then use that specific input
  const TypeCheckedInput = ({
    id,
    type,
    className,
  }: {
    id: any;
    type: InputProps["type"];
    register: UseFormRegister<Inputs>;
    className: string;
  }) => {
    // all possible input types
    // text // longtext // number // email // tel // url // date // checkbox // radio // image file
    // loop through each type and return the correct input

    if (type in ["text", "email", "number"]) {
      return (
        <Input
          type={type}
          {...register(fieldTitle)}
          className={className}
          id={id}
        />
      );
    } else if (type === "summary") {
      // type = { type };
      return (
        <Textarea
          placeholder="Type your message here."
          id={id}
          {...register(fieldTitle)}
          className={className}
        />
      );
    } else if (type === "date") {
      // date

      return (
        <div>
          <input type="hidden" {...register(fieldTitle)} />
          <DatePickerDemo
            id={id}
            register={register}
            fieldTitle={fieldTitle}
            className={className}
            setValue={setValue as UseFormSetValue<Inputs>}
            dateValue={"2/09/2002"}
            updated={(date) => {
              // update it in the json form
            }}
          />
        </div>
      );
    } else if (type === "image") {
      // compress the image
      // take image and convert it to base64
      // return the base64 image as string
      return (
        <ImageUpload
          id={id}
          register={register}
          fieldTitle={fieldTitle}
          className={className}
          setValue={setValue as UseFormSetValue<Inputs>}
        />
      );
    } else if (type === "checkbox") {
      // check if the checkbox boolean  !! what about the label
      const onChange = (e: FormEvent) => {
        // setValue(fieldTitle, e.target.checked);
        console.log(e.target);
      };
      return (
        <>
          <input type="hidden" {...register(fieldTitle)} />
          <Checkbox
            id={id}
            onChange={onChange}
            className={cn(className, " w-[1em]")}
          />
        </>
      );
    } else if (type === "url") {
      return (
        <Input
          type={type}
          {...register(fieldTitle)}
          className={className}
          id={id}
        />
      );
    }
    console.log(type);
  };

  return (
    <motion.div
      className={cn(
        "w-full fc ",
        headerInput?.parentClassValue ? headerInput.parentClassValue : "",
        parentClassValue
      )}
    >
      <div
        className={cn(
          type == "checkbox"
            ? "fr justify-end items-center  align-baseline px-2 gap-2 flex-row-reverse h-10 capitalize"
            : ""
        )}
      >
        <motion.label
          className={cn(
            "capitalize bold text-gray-200/80 cursor-pointer",
            "transition ease-in-out delay-50",
            headerInput?.LabelClassValue ? headerInput.LabelClassValue : "",
            LabelClassValue
          )}
          htmlFor={fieldTitle}
        >
          &nbsp;{fieldTitle.split(".").pop()}
        </motion.label>
        <TypeCheckedInput
          id={fieldTitle}
          type={type}
          register={register}
          className={cn(
            "formInput w-full rounded-lg bg-background/30 text-slate-100",
            "focus-visible:ring-1 focus-visible:ring-slate-600 focus-visible:ring-offset-1 focus-visible:bg-background/50",
            "transition ease-in-out delay-50", //animate
            headerInput?.InputClassValue ? headerInput.InputClassValue : "",
            InputClassValue
          )}
        />
      </div>

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

const ImageUpload = ({
  id,
  className,
  fieldTitle,
  register,
  setValue,
}: {
  id: any;
  fieldTitle: FieldPath<Inputs>;
  register: UseFormRegister<Inputs>;
  className: string;
  setValue: UseFormSetValue<Inputs>;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  // watch this element for any updates
  // setValue(fieldTitle, "image");

  useEffect(() => {
    if (fileRef.current) {
      fileRef.current.addEventListener("change", (e) => {
        // read file and convert it to base64
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];

        if (file) {
          // Read file and convert it to base64
          const reader = new FileReader();

          reader.onload = (event) => {
            const base64String = event.target?.result as string;
            // Use the base64String as needed
            console.log(base64String);
            setValue(fieldTitle, base64String);
          };

          reader.readAsDataURL(file);
        }
      });
    }
    return () => {
      // cleanup
      if (fileRef.current) {
        fileRef.current.removeEventListener("change", () => {});
      }
    };
  });

  return (
    <div>
      <input
        ref={fileRef}
        type="file"
        id={id}
        className={cn(
          "flex h-10 w-full rounded-md border file:mr-2 border-input bg-background px-2 py-2 text-sm ring-offset-background file:border-0 file:bg-gray-300 file:text-sm file:font-medium file:rounded-md  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-1  disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onChange={(e) => {
          // read file and convert it to base64
          const target = e.target as HTMLInputElement;
          const file = target.files?.[0];

          if (file) {
            // Read file and convert it to base64
            const reader = new FileReader();

            reader.onload = (event) => {
              const base64String = event.target?.result as string;
              // Use the base64String as needed
              console.log(base64String);
            };
          }
        }}
      />
      <input type="hidden" {...register(fieldTitle)} />
    </div>
  );
};

const DatePickerDemo = ({
  id,
  className,
  fieldTitle,
  register,
  setValue,
  dateValue,
  updated,
}: {
  id: any;
  fieldTitle: FieldPath<Inputs>;
  register: UseFormRegister<Inputs>;
  className: string;
  setValue: UseFormSetValue<Inputs>;
  dateValue: string;
  updated: (date: string) => void;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState<Date>();
  // watch this element for any updates
  // setValue(fieldTitle, "image");

  useEffect(() => {
    if (fileRef.current) {
      fileRef.current.addEventListener("change", (e) => {
        // read file and convert it to base64
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];

        if (file) {
          // Read file and convert it to base64
          const reader = new FileReader();

          reader.onload = (event) => {
            const base64String = event.target?.result as string;
            // Use the base64String as needed
            console.log(base64String);
            setValue(fieldTitle, base64String);
          };

          reader.readAsDataURL(file);
        }
      });
    }
    return () => {
      // cleanup
      if (fileRef.current) {
        fileRef.current.removeEventListener("change", () => {});
      }
    };
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            className,
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
