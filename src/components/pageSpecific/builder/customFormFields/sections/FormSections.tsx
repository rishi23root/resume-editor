import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { FormInput } from "../formInput";
import { SectionWrapper } from "./utils";
import { Separator } from "@/components/ui/separator";
import { TagPicker } from "../tagPicker";

export function Basic() {
  const { register } = useFormContext();
  return (
    <div className="w-full fc  gap-2">
      <SectionWrapper sectionKey="basics">
        {/* <div className="w-full text-2xl bold mb-3">Basic</div> */}
        <FormInput
          {...register("basics.name")}
          type="text"
          parentclassvalue="w-[49%]"
        />
        <FormInput
          {...register("basics.label")}
          type="text"
          parentclassvalue="w-[49%]"
        />
        <FormInput
          {...register("basics.image")}
          type="image"
          parentclassvalue="w-[49%]"
        />
        <FormInput
          {...register("basics.email")}
          type="email"
          parentclassvalue="w-[49%]"
        />
        <FormInput
          {...register("basics.phone")}
          type="number"
          parentclassvalue="w-[49%]"
        />
        <FormInput
          {...register("basics.url")}
          type="url"
          parentclassvalue="w-[49%]"
        />
        <FormInput
          {...register("basics.summary")}
          type="summary"
          parentclassvalue="w-full"
        />
      </SectionWrapper>
      {/* location tab */}
      <SectionWrapper sectionKey="basics.location">
        <FormInput
          {...register("basics.location.address")}
          type="text"
          parentclassvalue="w-[49%]"
        />
        <FormInput
          {...register("basics.location.city")}
          type="text"
          parentclassvalue="w-[49%]"
        />
        <FormInput
          {...register("basics.location.countryCode")}
          type="text"
          parentclassvalue="w-[49%]"
        />
      </SectionWrapper>

      <SectionWrapper sectionKey="basics.profiles" fieldArraySection={true}>
        {({ fields, remove }) =>
          fields.map((field, index) => {
            // field = field as typeof field & ArrayKeysRecord<profilesT>;
            return (
              <div
                key={field.id}
                className={cn(
                  "w-[49%] fc gap-2 p-2 border-2 inset-2 glass shadow-sm rounded-md"
                )}
              >
                <motion.div className="fr gap-2">
                  <motion.div
                    className={cn(
                      "flex-1 group relative h-10",
                      "transition ease-in-out delay-300" //animate
                    )}
                  >
                    <FormInput
                      type="text"
                      {...register(`basics.profiles.${index}.network`)}
                      headerinput={{
                        InputClassValue: cn(
                          "group-[:hover]:block focus-visible:block transition px-1 text-lg",
                          "group-[:not(:hover)]:text-[1em] group-[:not(:hover)]:bg-transparent group-[:not(:hover)]:ring-0 group-[:not(:hover)]:ring-offset-0 group-[:not(:hover)]:border-transparent"
                        ),
                        LabelClassValue: "hidden",
                        parentclassvalue: "absolute ",
                      }}
                    />
                  </motion.div>
                  <button
                    type="button"
                    className={cn(
                      "hover:text-red-490 hover:opacity-100 opacity-50",
                      fields.length > 1 ? "" : "hidden"
                    )}
                    onClick={() => remove(index)}
                  >
                    <Trash2 />
                  </button>
                </motion.div>

                <FormInput
                  type="url"
                  {...register(`basics.profiles.${index}.url`)}
                />
                <FormInput
                  type="text"
                  {...register(`basics.profiles.${index}.username`)}
                />
              </div>
            );
          })
        }
      </SectionWrapper>
    </div>
  );
}

export function Education() {
  const { register } = useFormContext();

  return (
    <div className="w-full fc gap-2">
      <SectionWrapper
        sectionKey="education"
        fieldArraySection={true}
        editableTitle={true}
        editableInputItself={
          <FormInput
            type="text"
            {...register(`mask.education`)}
            headerinput={{
              InputClassValue: cn(
                "group-[:hover]:block focus-visible:block transition px-1 text-lg",
                "group-[:not(:hover)]:uppercase group-[:not(:hover)]:text-[1em] group-[:not(:hover)]:bg-transparent group-[:not(:hover)]:ring-0 group-[:not(:hover)]:ring-offset-0 group-[:not(:hover)]:border-transparent"
              ),
              LabelClassValue: "hidden",
              parentclassvalue: "absolute ",
            }}
          />
        }
      >
        {({ fields, remove }) => {
          return fields.map((field, index) => {
            //  ArrayKeysRecord<EducationT>;
            return (
              <div
                key={field.id}
                className={cn(
                  "w-[49%] fr flex-wrap gap-1 p-2 border-2 inset-2 glass shadow-sm rounded-md"
                )}
              >
                <motion.div className="w-full fr gap-2">
                  <motion.div
                    className={cn(
                      "flex-1 group relative h-10",
                      "transition ease-in-out delay-300" //animate
                    )}
                  >
                    <FormInput
                      type="text"
                      {...register(`education.${index}.institution`)}
                      headerinput={{
                        InputClassValue: cn(
                          "group-[:hover]:block focus-visible:block transition px-1 text-lg",
                          "group-[:not(:hover)]:uppercase group-[:not(:hover)]:text-[1em] group-[:not(:hover)]:bg-transparent group-[:not(:hover)]:ring-0 group-[:not(:hover)]:ring-offset-0 group-[:not(:hover)]:border-transparent"
                        ),
                        LabelClassValue: "hidden",
                        parentclassvalue: "absolute ",
                      }}
                    />
                  </motion.div>
                  <button
                    type="button"
                    className={cn(
                      "hover:text-red-490 hover:opacity-100 opacity-50",
                      fields.length > 1 ? "" : "hidden"
                    )}
                    onClick={() => remove(index)}
                  >
                    <Trash2 />
                  </button>
                </motion.div>

                <FormInput type="url" {...register(`education.${index}.url`)} />
                <FormInput
                  type="text"
                  {...register(`education.${index}.studyType`)}
                />
                <FormInput
                  type="text"
                  {...register(`education.${index}.area`)}
                />

                <Controller
                  name={`education.${index}.isStudyingHere`}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <>
                      <FormInput
                        ref={ref}
                        type="checkbox"
                        name={`education.${index}.isStudyingHere`}
                        onChange={onChange} // send value to hook form
                        onBlur={onBlur} // notify when input is touched/blur
                        value={value}
                      />
                      <FormInput
                        type="date"
                        {...register(`education.${index}.startDate`)}
                      />
                      <FormInput
                        type="date"
                        {...register(`education.${index}.endDate`, {
                          disabled: value,
                        })}
                      />
                    </>
                  )}
                />
                {/* <FormInput
                  type="date"
                  {...register(`education.${index}.endDate`, {
                    disabled:
                      watch(`education.${index}.isStudyingHere` as any) ===
                      true,
                  })}
                /> */}
                <FormInput
                  type="text"
                  {...register(`education.${index}.score`)}
                />
              </div>
            );
          });
        }}
      </SectionWrapper>
    </div>
  );
}

export function Work() {
  const { register } = useFormContext();

  return (
    <div className="w-full fc  gap-2">
      <SectionWrapper
        sectionKey="work"
        fieldArraySection={true}
        editableTitle={true}
        editableInputItself={
          <FormInput
            type="text"
            {...register(`mask.work`)}
            headerinput={{
              InputClassValue: cn(
                "group-[:hover]:block focus-visible:block transition px-1 text-lg",
                "group-[:not(:hover)]:uppercase group-[:not(:hover)]:text-[1em] group-[:not(:hover)]:bg-transparent group-[:not(:hover)]:ring-0 group-[:not(:hover)]:ring-offset-0 group-[:not(:hover)]:border-transparent"
              ),
              LabelClassValue: "hidden",
              parentclassvalue: "absolute ",
            }}
          />
        }
      >
        {({ fields, remove }) =>
          fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className={cn(
                  "w-[49%] fr flex-wrap gap-1 p-2 border-2 inset-2 glass shadow-sm rounded-md"
                )}
              >
                <motion.div className="w-full fr gap-2">
                  <motion.div
                    className={cn(
                      "flex-1 group relative h-10",
                      "transition ease-in-out delay-300" //animate
                    )}
                  >
                    <FormInput
                      type="text"
                      {...register(`work.${index}.name`)}
                      headerinput={{
                        InputClassValue: cn(
                          "group-[:hover]:block focus-visible:block transition px-1 text-lg",
                          "group-[:not(:hover)]:text-[1em] group-[:not(:hover)]:bg-transparent group-[:not(:hover)]:ring-0 group-[:not(:hover)]:ring-offset-0 group-[:not(:hover)]:border-transparent"
                        ),
                        LabelClassValue: "hidden",
                        parentclassvalue: "absolute ",
                      }}
                    />
                  </motion.div>
                  <button
                    type="button"
                    className={cn(
                      "hover:text-red-490 hover:opacity-100 opacity-50",
                      fields.length > 1 ? "" : "hidden"
                    )}
                    onClick={() => remove(index)}
                  >
                    <Trash2 />
                  </button>
                </motion.div>

                <FormInput
                  type="text"
                  {...register(`work.${index}.position`)}
                />

                <FormInput type="url" {...register(`work.${index}.url`)} />
                <FormInput type="text" {...register(`work.${index}.years`)} />

                <Controller
                  name={`work.${index}.isWorkingHere`}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <>
                      <FormInput
                        ref={ref}
                        type="checkbox"
                        name={`work.${index}.isWorkingHere`}
                        onChange={onChange} // send value to hook form
                        onBlur={onBlur} // notify when input is touched/blur
                        value={value}
                      />
                      <FormInput
                        type="date"
                        {...register(`work.${index}.startDate`)}
                      />

                      <FormInput
                        type="date"
                        {...register(`work.${index}.endDate`, {
                          disabled: value,
                        })}
                      />
                    </>
                  )}
                />

                {/* <FormInput
                  type="date"
                  {...register(`work.${index}.endDate`, {
                    disabled:
                      watch(`work.${index}.isWorkingHere` as any) === true,
                  })}
                /> */}

                <FormInput
                  parentclassvalue="w-full"
                  type="summary"
                  {...register(`work.${index}.summary`)}
                />
              </div>
            );
          })
        }
      </SectionWrapper>
    </div>
  );
}

export function Projects() {
  const { register } = useFormContext();
  return (
    <div className="w-full fc  gap-2">
      <SectionWrapper
        sectionKey="projects"
        fieldArraySection={true}
        editableTitle={true}
        editableInputItself={
          <FormInput
            type="text"
            {...register(`mask.projects`)}
            headerinput={{
              InputClassValue: cn(
                "group-[:hover]:block focus-visible:block transition px-1 text-lg",
                "group-[:not(:hover)]:uppercase group-[:not(:hover)]:text-[1em] group-[:not(:hover)]:bg-transparent group-[:not(:hover)]:ring-0 group-[:not(:hover)]:ring-offset-0 group-[:not(:hover)]:border-transparent"
              ),
              LabelClassValue: "hidden",
              parentclassvalue: "absolute ",
            }}
          />
        }
      >
        {({ fields, remove }) =>
          fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className={cn(
                  "w-[49%] fr flex-wrap gap-1 p-2 border-2 inset-2 glass shadow-sm rounded-md"
                )}
              >
                <motion.div className="w-full fr gap-2">
                  <motion.div
                    className={cn(
                      "flex-1 group relative h-10",
                      "transition ease-in-out delay-300" //animate
                    )}
                  >
                    <FormInput
                      type="text"
                      {...register(`projects.${index}.name`)}
                      headerinput={{
                        InputClassValue: cn(
                          "group-[:hover]:block focus-visible:block transition px-1 text-lg",
                          "group-[:not(:hover)]:uppercase group-[:not(:hover)]:text-[1em] group-[:not(:hover)]:bg-transparent group-[:not(:hover)]:ring-0 group-[:not(:hover)]:ring-offset-0 group-[:not(:hover)]:border-transparent"
                        ),
                        LabelClassValue: "hidden",
                        parentclassvalue: "absolute ",
                      }}
                    />
                  </motion.div>
                  <button
                    type="button"
                    className={cn(
                      "hover:text-red-490 hover:opacity-100 opacity-50",
                      fields.length > 1 ? "" : "hidden"
                    )}
                    onClick={() => remove(index)}
                  >
                    <Trash2 />
                  </button>
                </motion.div>
                <FormInput type="url" {...register(`projects.${index}.url`)} />
                <FormInput
                  type="text"
                  {...register(`projects.${index}.languages`)}
                />
                <FormInput
                  type="summary"
                  {...register(`projects.${index}.description`)}
                />
              </div>
            );
          })
        }
      </SectionWrapper>
    </div>
  );
}

export function Awards() {
  const { register } = useFormContext();
  return (
    <div className="w-full fc gap-2">
      <SectionWrapper
        sectionKey="awards"
        fieldArraySection={true}
        editableTitle={true}
        editableInputItself={
          <FormInput
            type="text"
            {...register(`mask.awards`)}
            headerinput={{
              InputClassValue: cn(
                "group-[:hover]:block focus-visible:block transition px-1 text-lg",
                "group-[:not(:hover)]:uppercase group-[:not(:hover)]:text-[1em] group-[:not(:hover)]:bg-transparent group-[:not(:hover)]:ring-0 group-[:not(:hover)]:ring-offset-0 group-[:not(:hover)]:border-transparent"
              ),
              LabelClassValue: "hidden",
              parentclassvalue: "absolute ",
            }}
          />
        }
      >
        {({ fields, remove }) =>
          fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className={cn(
                  "w-[49%] fr flex-wrap gap-1 p-2 border-2 inset-2 glass shadow-sm rounded-md"
                )}
              >
                <motion.div className="w-full fr gap-2">
                  <motion.div
                    className={cn(
                      "flex-1 group relative h-10",
                      "transition ease-in-out delay-300" //animate
                    )}
                  >
                    <FormInput
                      type="text"
                      {...register(`awards.${index}.title`)}
                      headerinput={{
                        InputClassValue: cn(
                          "group-[:hover]:block focus-visible:block transition px-1 text-lg",
                          "group-[:not(:hover)]:uppercase group-[:not(:hover)]:text-[1em] group-[:not(:hover)]:bg-transparent group-[:not(:hover)]:ring-0 group-[:not(:hover)]:ring-offset-0 group-[:not(:hover)]:border-transparent"
                        ),
                        LabelClassValue: "hidden",
                        parentclassvalue: "absolute ",
                      }}
                    />
                  </motion.div>
                  <button
                    type="button"
                    className={cn(
                      "hover:text-red-490 hover:opacity-100 opacity-50",
                      fields.length > 1 ? "" : "hidden"
                    )}
                    onClick={() => remove(index)}
                  >
                    <Trash2 />
                  </button>
                </motion.div>
                <FormInput type="date" {...register(`awards.${index}.date`)} />
                <FormInput
                  type="text"
                  {...register(`awards.${index}.awarder`)}
                />
                <FormInput
                  type="summary"
                  {...register(`awards.${index}.summary`)}
                />
                <FormInput type="url" {...register(`awards.${index}.url`)} />
              </div>
            );
          })
        }
      </SectionWrapper>
    </div>
  );
}

// skills
export function Skills() {
  // render each section
  const { register } = useFormContext();
  return (
    <div className="w-full fc gap-2">
      <SectionWrapper
        sectionKey="skills"
        editableTitle={true}
        editableInputItself={
          <FormInput
            type="text"
            {...register(`mask.skills`)}
            headerinput={{
              InputClassValue: cn(
                "group-[:hover]:block focus-visible:block transition px-1 text-lg",
                "group-[:not(:hover)]:uppercase group-[:not(:hover)]:text-[1em] group-[:not(:hover)]:bg-transparent group-[:not(:hover)]:ring-0 group-[:not(:hover)]:ring-offset-0 group-[:not(:hover)]:border-transparent"
              ),
              LabelClassValue: "hidden",
              parentclassvalue: "absolute ",
            }}
          />
        }
      >
        <Core />
        <Separator />

        <Interests />
        <Separator />
      </SectionWrapper>
    </div>
  );
}

function Core() {
  const { register, setValue } = useFormContext();
  return (
    <div className="w-full fc gap-2">
      <SectionWrapper
        sectionKey="skills.core"
        fieldArraySection={true}
        editableTitle={false}
        sectionClass=""
      >
        {({ fields, remove }) =>
          fields.map((field, index) => {
            function updatedFromCustomFunc(data: any) {
              console.log(data);
              setValue(`skills.core.${index}.keywords`, data);
            }
            return (
              <div
                key={field.id}
                className={cn(
                  "w-[49%] fr flex-wrap gap-1 p-2 border-2 inset-2 glass shadow-sm rounded-md"
                )}
              >
                <motion.div className="w-full fr gap-2">
                  <motion.div
                    className={cn(
                      "flex-1 group relative h-10",
                      "transition ease-in-out delay-300" //animate
                    )}
                  >
                    <FormInput
                      type="text"
                      {...register(`skills.core.${index}.name`)}
                      headerinput={{
                        InputClassValue: cn(
                          "group-[:hover]:block focus-visible:block transition px-1 text-lg",
                          "group-[:not(:hover)]:uppercase group-[:not(:hover)]:text-[1em] group-[:not(:hover)]:bg-transparent group-[:not(:hover)]:ring-0 group-[:not(:hover)]:ring-offset-0 group-[:not(:hover)]:border-transparent"
                        ),
                        LabelClassValue: "hidden",
                        parentclassvalue: "absolute ",
                      }}
                    />
                  </motion.div>
                  <button
                    type="button"
                    className={cn(
                      "hover:text-red-490 hover:opacity-100 opacity-50",
                      fields.length > 1 ? "" : "hidden"
                    )}
                    onClick={() => remove(index)}
                  >
                    <Trash2 />
                  </button>
                </motion.div>
                <FormInput
                  type="number"
                  min={1}
                  max={3}
                  {...register(`skills.core.${index}.level`)}
                />
                <FormInput
                  type="tags"
                  {...register(`skills.core.${index}.keywords`)}
                  onChange={updatedFromCustomFunc}
                />
              </div>
            );
          })
        }
      </SectionWrapper>
    </div>
  );
}

function Interests() {
  const { register } = useFormContext();

  return (
    <div className="w-full flex flex-col gap-2">
      <motion.div
        className={cn(
          "flex w-full group relative h-10 text-xl",
          "transition ease-in-out delay-300" //animate
        )}
      >
        <FormInput
          type="text"
          {...register(`skills.mask.interests`)}
          headerinput={{
            InputClassValue: cn(
              "group-[:hover]:block focus-visible:block transition px-1 text-lg",
              "group-[:not(:hover)]:uppercase group-[:not(:hover)]:text-[1em] group-[:not(:hover)]:bg-transparent group-[:not(:hover)]:ring-0 group-[:not(:hover)]:ring-offset-0 group-[:not(:hover)]:border-transparent"
            ),
            LabelClassValue: "hidden",
            parentclassvalue: "absolute ",
          }}
        />
      </motion.div>
      <div className="border border-green-200/40">
        input elements for tags here
      </div>
    </div>
  );
}
