"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input, InputProps } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Inputs } from "@/types/builder";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { CalendarIcon } from "lucide-react";
import React, { useEffect, useId, useRef, useState } from "react";
import { FieldPath, useFormContext } from "react-hook-form";
import ListEditor from "./textEditor";

export const FormInput = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    headerinput?: {
      InputClassValue: string;
      LabelClassValue: string;
      parentclassvalue: string;
    };
    parentclassvalue?: string;
    LabelClassValue?: string;
    InputClassValue?: string;
  }
>(({ ...props }, ref) => {
  const id = useId();
  const {
    formState: { errors },
  } = useFormContext<Inputs>();
  const fieldName = props.name as FieldPath<Inputs>;

  return (
    <motion.div
      className={cn(
        "w-full fc",
        props.headerinput?.parentclassvalue
          ? props.headerinput.parentclassvalue
          : "",
        props.parentclassvalue
      )}
    >
      <div
        className={cn(
          props.type == "checkbox"
            ? "fr justify-end items-center align-baseline px-2 gap-2 flex-row-reverse  h-10 mt-auto capitalize"
            : "",
          props.type == "checkbox" &&
            props.disabled &&
            "opacity-50 cursor-not-allowed"
        )}
      >
        <label
          className={cn(
            "capitalize bold text-gray-200/80 cursor-pointer",
            "transition ease-in-out delay-50",
            props.headerinput?.LabelClassValue
              ? props.headerinput.LabelClassValue
              : "",
            props.LabelClassValue,
            props.type == "checkbox" && props.disabled && "cursor-not-allowed"
          )}
          htmlFor={id}
        >
          &nbsp;{props.name?.split(".").pop()}
        </label>
        <TypeCheckedInput
          id={id}
          ref={ref}
          {...props}
          className={cn(
            "formInput w-full rounded-lg bg-background/30 text-slate-100",
            "focus-visible:ring-1 focus-visible:ring-slate-600 focus-visible:ring-offset-1 focus-visible:bg-background/50",
            "transition ease-in-out delay-50", //animate
            props.headerinput?.InputClassValue
              ? props.headerinput.InputClassValue
              : "",
            props.InputClassValue
          )}
        />
      </div>
      {/* error state */}
      {/* {errors[fieldName ] && (
        <div className="text-red-600">
          {errors[fieldName ]["message"]}
        </div>
      )} */}
    </motion.div>
  );
});

export const TypeCheckedInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, ...props }, ref) => {
    const { setValue, getValues } = useFormContext<Inputs>();
    if (
      type === undefined ||
      ["text", "email", "number", "url"].includes(type)
    ) {
      return <Input type={type} ref={ref} {...props} />;
    } else if (type === "summary") {
      const { id, ...rest } = props;
      return (
        <>
          <ListEditor
            id={id}
            value={getValues(props.name as any) as string}
            name={props.name}
            className={props.className}
            disabled={props.disabled}
          />
          <input type="hidden" ref={ref} {...rest} />
        </>
      );
    } else if (type === "date") {
      const { id, disabled, ...rest } = props;
      return (
        <>
          <input type="hidden" ref={ref} {...rest} disabled={false} />
          <DatePicker
            id={id}
            className={rest.className}
            fieldTitle={rest.name as any}
            disabled={disabled}
          />
        </>
      );
    } else if (type === "image") {
      const { id, ...rest } = props;
      return (
        <>
          <input type="hidden" ref={ref} {...rest} />
          <ImageUpload
            id={id}
            className={rest.className}
            fieldTitle={rest.name as any}
            disabled={props.disabled}
          />
        </>
      );
    } else if (type === "checkbox") {
      const { id, ...rest } = props;
      const value = getValues(rest.name as any);
      return (
        <>
          <input type="hidden" ref={ref} {...rest} />
          <Checkbox
            id={id}
            defaultChecked={value as boolean}
            onCheckedChange={(e) => {
              setValue(props.name as any, e);
            }}
            className={cn(rest.className, " w-[1em] h-[1em]")}
            disabled={props.disabled}
          />
        </>
      );
    }
  }
);

const ImageUpload = ({
  id,
  className,
  fieldTitle,
  disabled,
}: {
  id: any;
  fieldTitle: FieldPath<Inputs>;
  className?: string;
  disabled?: boolean;
}) => {
  const { register, setValue, getValues } = useFormContext<Inputs>();
  const fileRef = useRef<HTMLInputElement>(null);
  const [defaultImage, setDefaultImage] = useState<string | undefined>();
  const picID = useId();

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
            // console.log(base64String);
            setValue(fieldTitle, base64String);
          };

          reader.readAsDataURL(file);
        }
      });
    }

    const value = getValues(fieldTitle as any);
    if (value) {
      setDefaultImage(value);
    }

    return () => {
      // cleanup
      if (fileRef.current) {
        fileRef.current.removeEventListener("change", () => {});
      }
    };
  });

  return (
    <div className="relative">
      <Input
        id={picID}
        type={"text"}
        value={"profile.pic"}
        onClick={() => {
          setValue(fieldTitle, "");
          setDefaultImage(undefined);
        }}
        onChange={(e) => {
          setValue(fieldTitle, "");
          setDefaultImage(undefined);
        }}
        className={cn("absolute", className, !defaultImage && "hidden")}
      />
      <input
        ref={fileRef}
        type="file"
        id={id}
        className={cn(
          "flex h-10 w-full rounded-md border file:mr-2 border-input bg-background px-2 py-2 text-sm ring-offset-background file:border-0 file:bg-gray-300 file:text-sm file:font-medium file:rounded-md  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-1  disabled:cursor-not-allowed disabled:opacity-50",
          "absolute",
          className,
          defaultImage && "hidden"
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
        disabled={disabled}
      />
      <input type="hidden" {...register(fieldTitle)} />
    </div>
  );
};

const DatePicker = ({
  id,
  className,
  fieldTitle,
  disabled,
}: {
  id: any;
  className?: string;
  fieldTitle: FieldPath<Inputs>;
  disabled?: boolean;
}) => {
  const [date, setDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setValue, getValues } = useFormContext<Inputs>();
  const calId = useId();

  useEffect(() => {
    // console.log("new Date:", date)
    if (date) {
      setIsOpen(false);
      // convert this date to some readable date for json formater
      setValue(fieldTitle, format(date, "LLL yyyy"));
      // console.log(
      //   "formated updated :",
      //   format(date, "LLL yyyy")
      // )
    } else {
      // in the first send a date if not alreay there
      // dateValue as string right now
      // use date fns to update the format if possible else dont update it
      // if (inputRef.current) {
      // }

      // inputRef?.current?.setAttribute("value", format(date, "LLL yyyy"));
      // .current?.setAttribute("value", format(date, "LLL yyyy"));

      let defaultValue = getValues(fieldTitle as any);
      if (!defaultValue) {
        defaultValue = document.getElementById(calId)?.getAttribute("value");
      }
      // console.log("defaultValue:", defaultValue);
      const monthYearRegex: RegExp = /^[A-Za-z]{3}\s\d{4}$/;
      if (defaultValue && monthYearRegex.test(defaultValue)) {
        // console.log("Valid date format");
        setDate(new Date(defaultValue));
      }
    }
  }, [date]);

  useEffect(() => {
    setValue(fieldTitle, date ? format(date, "LLL yyyy") : "");
  }, [disabled]);

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild id={id} disabled={disabled}>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            className,
            !date && "text-muted-foreground"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "LLL yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          id={calId}
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
