// component to create all the input fields used in the form
// Path: src/components/pageSpecific/builder/formInput.tsx

import { Input, InputProps } from "@/components/ui/input";
import React, { InputHTMLAttributes } from "react";
import { FieldErrors } from "react-hook-form";

export function FormInput(
  props: InputHTMLAttributes<InputProps> & {
    error: FieldErrors<Inputs>;
  }
) {
  // introduce useForm context if needed else just speread props with w-full
  //   const error = {
  //     data: "suppose this is the error message",
  //   };
  return (
    <div className="w-full fr">
      <Input type="text" className="w-full" />
      {/* error state */}
      <div className="">{error.data}</div>
    </div>
  );
}

// must have data
// default value (spread props)
// register object data (spread props)
// error state, custom error message
