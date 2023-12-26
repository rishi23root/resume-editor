import { Inputs } from "@/types/builder";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInput } from "../formInput";
import { SectionWrapper } from "./utils";

export function Basic({
  register,
  control,
  error,
}: {
  register: UseFormRegister<Inputs>;
  control: Control<Inputs, any>;
  error: FieldErrors<Inputs>;
}) {
  return (
    <div className="w-full fc  gap-2">
      <SectionWrapper sectionKey="basics">
        {/* <div className="w-full text-2xl bold mb-3">Basic</div> */}
        <FormInput
          fieldTitle="basics.name"
          type="text"
          register={register}
          validationError={error}
        />
        <FormInput
          fieldTitle="basics.label"
          type="text"
          register={register}
          validationError={error}
        />
        {/* <FormInput
        fieldTitle="basics.image"
        type="image"
        register={register}
        validationError={error}
      /> */}
        <FormInput
          fieldTitle="basics.email"
          type="email"
          register={register}
          validationError={error}
        />
        <FormInput
          fieldTitle="basics.phone"
          type="number"
          register={register}
          validationError={error}
        />
        <FormInput
          fieldTitle="basics.url"
          type="url"
          register={register}
          validationError={error}
        />
        <FormInput
          fieldTitle="basics.summary"
          type="text"
          register={register}
          validationError={error}
        />
      </SectionWrapper>

      {/* location tab */}
      <SectionWrapper sectionKey="basics.location">
        <FormInput
          fieldTitle="basics.location.address"
          type="text"
          register={register}
          validationError={error}
        />
        <FormInput
          fieldTitle="basics.location.city"
          type="text"
          register={register}
          validationError={error}
        />
        <FormInput
          fieldTitle="basics.location.countryCode"
          type="text"
          register={register}
          validationError={error}
        />
      </SectionWrapper>

      {/* profile tab */}
      <SectionWrapper
        sectionKey="basics.profiles"
        fieldArraySection={true}
        control={control}
      >
        {({ fields }) =>
          fields.map((item, index) => (
            <div className="w-full fc gap-2" key={item.id}>
              <>
                {/* 
              make it inter changable on hover or focus  
              make only add more when last is filled up
              make a button to remove
              */}
                {/* <div className="">{item?.network}</div> */}
                <FormInput
                  fieldTitle={`basics.profiles.${index}.network`}
                  type="text"
                  register={register}
                  validationError={error}
                />
              </>
              <FormInput
                fieldTitle={`basics.profiles.${index}.username`}
                type="text"
                register={register}
                validationError={error}
              />
              <FormInput
                fieldTitle={`basics.profiles.${index}.url`}
                type="url"
                register={register}
                validationError={error}
              />
            </div>
          ))
        }
      </SectionWrapper>
    </div>
  );
}
