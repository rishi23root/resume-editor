import { Inputs } from "@/types/builder";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInput } from "../formInput";

export function Basic({
  register,
  error,
}: {
  register: UseFormRegister<Inputs>;
  error: FieldErrors<Inputs>;
}) {
  return (
    <div className="w-full fc glass gap-2">
      <div className="w-full text-2xl bold mb-3">Basic</div>
      <FormInput
        fieldTitle="name"
        type="text"
        register={register}
        validationError={error}
      />
      <FormInput
        fieldTitle="email"
        type="email"
        register={register}
        validationError={error}
      />
      <FormInput
        fieldTitle="phone"
        type="number"
        register={register}
        validationError={error}
      />
      {/* <FormInput
        fieldTitle="image"
        type="Image"
        register={register}
        validationError={error}
      /> */}
      <FormInput
        fieldTitle="summary"
        type="text"
        register={register}
        validationError={error}
      />
      <FormInput
        fieldTitle="url"
        type="url"
        register={register}
        validationError={error}
      />
    </div>
  );
}
