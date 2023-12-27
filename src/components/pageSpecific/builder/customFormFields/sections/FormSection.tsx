import { ArrayKeysRecord, Inputs, profilesT } from "@/types/builder";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { FormInput } from "../formInput";
import { SectionWrapper } from "./utils";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
        {({ fields, remove }) =>
          fields.map((item, index) => {
            const eachEntry = item as typeof item & ArrayKeysRecord<profilesT>;
            // watch for this element to update
            // const watchNetwork = useWatch(`basics.profiles.${index}.network`);
            return (
              // update the type of item profile type

              <div
                className="w-full fc gap-2 p-2 border-2 inset-2 border-gray-500/25 glass rounded-md"
                key={eachEntry.id}
              >
                {/* 
              make it inter changable on hover or focus  
              make only add more when last is filled up
              make a button to remove
              */}
                <motion.div className="fr gap-2">
                  <motion.div
                    className={cn(
                      "flex-1 group relative h-10",
                      "transition ease-in-out delay-300" //animate
                    )}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={cn(
                        "absolute bold text-xl p-1",
                        " hidden transition ease-in-out delay-500",
                        "group-[:not(:hover)]:block",
                        // if group have a input element in focus then hide this
                        "group-[:has(.formInput:focus-visible)]:hidden"
                      )}
                    >
                      {eachEntry?.network}
                    </motion.div>
                    <FormInput
                      fieldTitle={`basics.profiles.${index}.network`}
                      type="text"
                      register={register}
                      validationError={error}
                      headerInput={{
                        InputClassValue:
                          "hidden group-[:hover]:block focus-visible:block transition p-0 px-1 text-lg",
                        LabelClassValue:
                          "hidden focus-visible:block transition ease-in-out delay-300",
                        parentClassValue: "absolute ",
                      }}
                    />
                  </motion.div>
                  <motion.button className="hover:text-red-400 hover:opacity-100 opacity-50">
                    <Trash2 />
                  </motion.button>
                </motion.div>
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
            );
          })
        }
      </SectionWrapper>
    </div>
  );
}

export function Work({
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
      {/* profile tab */}
      <SectionWrapper
        sectionKey="work"
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
                {/* <FormInput
                  fieldTitle={`basics.profiles.${index}.network`}
                  type="text"
                  register={register}
                  validationError={error}
                /> */}
              </>
              {/* <FormInput
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
              /> */}
            </div>
          ))
        }
      </SectionWrapper>
    </div>
  );
}
