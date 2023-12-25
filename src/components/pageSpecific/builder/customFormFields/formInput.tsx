import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Inputs } from "@/types/builder";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export function FormInput({
  type,
  fieldTitle,
  validationError,
  register,
}: {
  type: InputProps["type"];
  fieldTitle: keyof Inputs;
  validationError: FieldErrors<Inputs> | any;
  register: UseFormRegister<Inputs>;
}) {
  return (
    <div className="w-full fc ">
      <label className="capitalize bold text-gray-200/80">
        &nbsp;{fieldTitle}
      </label>
      <Input
        type={type}
        {...register(fieldTitle)}
        className={cn(
          "w-full rounded-lg bg-background/30 text-slate-100",
          "focus-visible:ring-1 focus-visible:ring-slate-600 focus-visible:ring-offset-1 focus-visible:bg-background/50",
          "transition ease-in-out delay-50" //animate
        )}
      />
      {/* error state */}
      {Object(validationError)[fieldTitle] && (
        <div className="text-red-600">
          {Object(validationError)[fieldTitle]}
        </div>
      )}
    </div>
  );
}

// must have data
// default value (spread props)
// register object data (spread props)
// error state, custom error message
