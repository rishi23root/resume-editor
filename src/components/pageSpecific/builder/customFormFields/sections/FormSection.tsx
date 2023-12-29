import { cn } from "@/lib/utils";
import { ArrayKeysRecord, Inputs, ProjectsT, WorkT, profilesT } from "@/types/builder";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import {
  UseFormReturn
} from "react-hook-form";
import { FormInput } from "../formInput";
import { SectionWrapper, WatchedValue } from "./utils";

export function Basic({
  register,
  control,
  formState: { errors },
  setValue,
}: UseFormReturn<Inputs, any, undefined>) {
  return (
    <div className="w-full fc  gap-2">
      <SectionWrapper sectionKey="basics">
        {/* <div className="w-full text-2xl bold mb-3">Basic</div> */}
        <FormInput
          fieldTitle="basics.name"
          type="text"
          register={register}
          validationError={errors}
          setValue={setValue}
          parentClassValue="w-[48%]"
        />
        <FormInput
          fieldTitle="basics.label"
          type="text"
          register={register}
          validationError={errors}
          setValue={setValue}
          parentClassValue="w-[48%]"
        />
        <FormInput
          fieldTitle="basics.image"
          type="image"
          register={register}
          validationError={errors}
          setValue={setValue}
          parentClassValue="w-[48%]"
        />
        <FormInput
          fieldTitle="basics.email"
          type="email"
          register={register}
          validationError={errors}
          setValue={setValue}
          parentClassValue="w-[48%]"
        />
        <FormInput
          fieldTitle="basics.phone"
          type="number"
          register={register}
          validationError={errors}
          setValue={setValue}
          parentClassValue="w-[48%]"
        />
        <FormInput
          fieldTitle="basics.url"
          type="url"
          register={register}
          validationError={errors}
          setValue={setValue}
          parentClassValue="w-[48%]"
        />
        <FormInput
          fieldTitle="basics.summary"
          type="summary"
          register={register}
          validationError={errors}
          setValue={setValue}
          parentClassValue="w-full"
        />
      </SectionWrapper>

      {/* location tab */}
      <SectionWrapper sectionKey="basics.location">
        <FormInput
          fieldTitle="basics.location.address"
          type="text"
          register={register}
          validationError={errors}
          setValue={setValue}
          parentClassValue="w-[48%]"
        />
        <FormInput
          fieldTitle="basics.location.city"
          type="text"
          register={register}
          validationError={errors}
          setValue={setValue}
          parentClassValue="w-[48%]"
        />
        <FormInput
          fieldTitle="basics.location.countryCode"
          type="text"
          register={register}
          validationError={errors}
          setValue={setValue}
          parentClassValue="w-[48%]"
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
            // update the type of item profile typex
            const eachEntry = item as typeof item & ArrayKeysRecord<profilesT>;

            return (
              <div
                className={cn(
                  "w-[48%] fc gap-2 p-2 border-2 inset-2 glass shadow-sm rounded-md"
                )}
                key={eachEntry.id}
              >
                <motion.div className="fr gap-2">
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
                        watchKey={`basics.profiles.${index}.network`}
                        control={control}
                      />
                    </div>
                    <FormInput
                      fieldTitle={`basics.profiles.${index}.network`}
                      type="text"
                      register={register}
                      validationError={errors}
                      setValue={setValue}
                      headerInput={{
                        InputClassValue:
                          "hidden group-[:hover]:block focus-visible:block transition p-0 px-1 text-lg",
                        LabelClassValue:
                          "hidden focus-visible:block transition ease-in-out delay-300",
                        parentClassValue: "absolute ",
                      }}
                    />
                  </motion.div>
                  {fields.length > 1 && (
                    <motion.button
                      className="hover:text-red-480 hover:opacity-100 opacity-50"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <Trash2 />
                    </motion.button>
                  )}
                </motion.div>
                <FormInput
                  fieldTitle={`basics.profiles.${index}.username`}
                  type="text"
                  register={register}
                  validationError={errors}
                  setValue={setValue}
                />
                <FormInput
                  fieldTitle={`basics.profiles.${index}.url`}
                  type="url"
                  register={register}
                  validationError={errors}
                  setValue={setValue}
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
  formState: { errors },
  setValue,
}: UseFormReturn<Inputs, any, undefined>) {
  // watch for change values in the form here and disable it accoringly
  return (
    <div className="w-full fc  gap-2">
      <SectionWrapper
        sectionKey="work"
        fieldArraySection={true}
        control={control}
        editableTitle={{
          control: control,
          register: register,
          errors: errors,
        }}
      >
        {({ fields, remove }) =>
          fields.map((item, index) => {
            // update the type of item profile typex
            const eachEntry = item as typeof item & ArrayKeysRecord<WorkT>;
            return (
              <div
                className={cn(
                  "w-full fc gap-2 p-2 border-2 inset-2 glass shadow-sm rounded-md"
                )}
                key={eachEntry.id}
              >
                <motion.div className="fr gap-2">
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
                        watchKey={`work.${index}.name`}
                        // watchKey={`work.${index}.network`}
                        control={control}
                      />
                    </div>
                    <FormInput
                      fieldTitle={`work.${index}.name`}
                      type="text"
                      register={register}
                      validationError={errors}
                      setValue={setValue}
                      headerInput={{
                        InputClassValue:
                          "hidden group-[:hover]:block focus-visible:block transition p-0 px-1 text-lg",
                        LabelClassValue:
                          "hidden focus-visible:block transition ease-in-out delay-300",
                        parentClassValue: "absolute ",
                      }}
                    />
                  </motion.div>
                  {fields.length > 1 && (
                    <motion.button
                      className="hover:text-red-480 hover:opacity-100 opacity-50"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <Trash2 />
                    </motion.button>
                  )}
                </motion.div>
                <div className="fr flex-wrap gap-2" >
                  <FormInput
                    fieldTitle={`work.${index}.position`}
                    type="text"
                    register={register}
                    validationError={errors}
                    setValue={setValue}
                    parentClassValue="w-[48%]"
                  />
                  <FormInput
                    fieldTitle={`work.${index}.url`}
                    type="url"
                    register={register}
                    validationError={errors}
                    setValue={setValue}
                    parentClassValue="w-[48%]"
                  />
                  {/* // startDate: string; // isWorkingHere: boolean; // endDate:
                string; // summary: string; // years: string; */}
                  <FormInput
                    fieldTitle={`work.${index}.startDate`}
                    type="date"
                    register={register}
                    validationError={errors}
                    setValue={setValue}
                    parentClassValue="w-[48%]"
                  />
                  <>
                    {/* make this section programmitically editable either ways */}
                    <FormInput
                      fieldTitle={`work.${index}.endDate`}
                      type="date"
                      register={register}
                      validationError={errors}
                      setValue={setValue}
                      parentClassValue="w-[48%]"
                    />
                    <FormInput
                      fieldTitle={`work.${index}.isWorkingHere`}
                      type="checkbox"
                      register={register}
                      validationError={errors}
                      setValue={setValue}
                      parentClassValue="w-[48%]"
                    />
                  </>
                  <FormInput
                    fieldTitle={`work.${index}.years`}
                    type="text"
                    register={register}
                    validationError={errors}
                    setValue={setValue}
                    parentClassValue="w-[48%]"
                  />
                  <FormInput
                    fieldTitle={`work.${index}.summary`}
                    type="summary"
                    register={register}
                    validationError={errors}
                    setValue={setValue}
                  />
                </div>
              </div>
            );
          })
        }
      </SectionWrapper>
    </div>
  );
}


export function Projects({
  register,
  control,
  formState: { errors },
  setValue,
}: UseFormReturn<Inputs, any, undefined>) {
  // watch for change values in the form here and disable it accoringly
  return (
    <div className="w-full fc  gap-2">
      <SectionWrapper
        sectionKey="projects"
        fieldArraySection={true}
        control={control}
        editableTitle={{
          control: control,
          register: register,
          errors: errors,
        }}
      >
        {({ fields, remove }) =>
          fields.map((item, index) => {
            // update the type of item profile typex
            const eachEntry = item as typeof item & ArrayKeysRecord<ProjectsT>;
            return (
              <div
                className={cn(
                  "w-full fc gap-2 p-2 border-2 inset-2 glass shadow-sm rounded-md"
                )}
                key={eachEntry.id}
              >
                <motion.div className="fr gap-2">
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
                        watchKey={`projects.${index}.name`}
                        // watchKey={`work.${index}.network`}
                        control={control}
                      />
                    </div>
                    <FormInput
                      fieldTitle={`projects.${index}.name`}
                      type="text"
                      register={register}
                      validationError={errors}
                      setValue={setValue}
                      headerInput={{
                        InputClassValue:
                          "hidden group-[:hover]:block focus-visible:block transition p-0 px-1 text-lg",
                        LabelClassValue:
                          "hidden focus-visible:block transition ease-in-out delay-300",
                        parentClassValue: "absolute ",
                      }}
                    />
                  </motion.div>
                  {fields.length > 1 && (
                    <motion.button
                      className="hover:text-red-480 hover:opacity-100 opacity-50"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <Trash2 />
                    </motion.button>
                  )}
                </motion.div>
                <div className="fr flex-wrap gap-2" >
                  <FormInput
                    fieldTitle={`projects.${index}.url`}
                    type="url"
                    register={register}
                    validationError={errors}
                    setValue={setValue}
                    parentClassValue="w-[48%]"
                  />
                  <FormInput
                    fieldTitle={`projects.${index}.languages`}
                    type="url"
                    register={register}
                    validationError={errors}
                    setValue={setValue}
                    parentClassValue="w-[48%]"
                  />
                  <FormInput
                    fieldTitle={`projects.${index}.description`}
                    type="summary"
                    register={register}
                    validationError={errors}
                    setValue={setValue}
                  />
                </div>
              </div>
            );
          })
        }
      </SectionWrapper>
    </div>
  );
}

// type EducationT = {
//   id: string;
//   institution: string;
//   url: string;
//   studyType: string;
//   area: string;
//   startDate: string;
//   isStudyingHere: boolean;
//   endDate: string;
//   score: string;
// };

