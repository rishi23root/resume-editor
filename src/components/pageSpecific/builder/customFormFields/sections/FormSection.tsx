import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormInput } from "../formInput";
import { SectionWrapper } from "./utils";

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
  const { register, watch } = useFormContext();
  const [isStudyingHere, setIsStudyingHere] = useState<boolean[]>([]);
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name?.startsWith("education")) {
        // console.log(value["education"].map((item: any) => item.isStudyingHere));
        setIsStudyingHere(
          value["education"].map((item: any) => !!item.isStudyingHere)
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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
                <FormInput
                  type="checkbox"
                  {...register(`education.${index}.isStudyingHere`)}
                />
                <FormInput
                  type="date"
                  {...register(`education.${index}.startDate`)}
                />
                <FormInput
                  type="date"
                  {...register(`education.${index}.endDate`, {
                    disabled: isStudyingHere[index],
                  })}
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
  const { register, watch } = useFormContext();
  const [isWorkingHereList, setIsWorkingHereList] = useState<boolean[]>([]);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name?.startsWith("work")) {
        // console.log(value["work"].map((item: any) => item.isWorkingHere));
        setIsWorkingHereList(
          value["work"].map((item: any) => !!item.isWorkingHere)
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);
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
                  type="text"
                  {...register(`work.${index}.position`)}
                />

                <FormInput type="url" {...register(`work.${index}.url`)} />
                <FormInput type="text" {...register(`work.${index}.years`)} />
                <FormInput
                  type="checkbox"
                  {...register(`work.${index}.isWorkingHere`)}
                />
                <FormInput
                  type="date"
                  {...register(`work.${index}.startDate`)}
                />

                <FormInput
                  type="date"
                  {...(register(`work.${index}.endDate`),
                  {
                    disabled: isWorkingHereList[index],
                  })}
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
        <>testing something out any issues ??</>
        {/* {({ fields, remove }) =>
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
        } */}
      </SectionWrapper>
    </div>
  );
}

// skills section will be majorly dependent on the controller component of react-hook-form

// error # update
// error del element form any list will cause form submit have to prevent it somehow
// core ->
// keywords": [],
// "level": "",
// "name": ""
// work on tag input

// export function Skills({
//   register,
//   control,
//   formState: { errors },
//   setValue,
// }: UseFormReturn<Inputs, any, undefined>) {
//   // work on the fact chose keys

//   return (
//     <div className="w-full fc  gap-2">
//       {/* for core no subsections */}
//       <SectionWrapper sectionKey="skills">
//         {/* updates
//           1. without title and glass base sections
//           2. update in formelement for mask
//         */}
//         <SectionWrapper
//
//           sectionKey="skills.core"
//           fieldArraySection={true}
//           control={control}
//           editableTitle={undefined}
//           sectionClass=""
//           // sectionActionBtnClass="hidden"
//         >
//           {({ fields, remove }) =>
//             fields.map((item, index) => {
//               const eachEntry = item as typeof item &
//                 ArrayKeysRecord<SkillsSectionT>;

//               return (
//                 <div
//                   className={cn(
//                     "w-[49%] fr flex-wrap gap-2 p-2 border-2 inset-2 glass shadow-sm rounded-md"
//                   )}
//                   key={eachEntry.id}
//                 >
//                   <motion.div className="fr gap-2">
//                     <motion.div
//                       className={cn(
//                         "flex-1 group relative h-10",
//                         "transition ease-in-out delay-300"
//                       )}
//                     >
//                       <div
//                         className={cn(
//                           "absolute bold text-xl p-1",
//                           "hidden transition ease-in-out delay-500",
//                           "group-[:not(:hover)]:block",
//                           "group-[:has(.formInput:focus-visible)]:hidden"
//                         )}
//                       >
//                         <WatchedValue
//                           watchKey={`skills.core.${index}.name`}
//                           control={control}
//                         />
//                       </div>
//                       <FormInput
//                         fieldTitle={`skills.core.${index}.name`}
//                         type="text"
//                         //
//
//                         headerinput={{
//                           InputClassValue:
//                             "hidden group-[:hover]:block focus-visible:block transition px-1 px-1 text-lg",
//                           LabelClassValue:
//                             "hidden focus-visible:block transition ease-in-out delay-300",
//                           parentclassvalue: "absolute",
//                         }}
//                       />
//                     </motion.div>
//                     {fields.length > 1 && (
//                       <motion.button
//                         className="hover:text-red-490 hover:opacity-100 opacity-50"
//                         onClick={() => {
//                           remove(index);
//                         }}
//                       >
//                         <Trash2 />
//                       </motion.button>
//                     )}
//                   </motion.div>
//                   <div className="fr flex-wrap gap-2">
//                     <FormInput
//                       fieldTitle={`skills.databases.${index}.level`}
//                       type="number"
//                       //
//
//                       parentclassvalue="w-full"
//                     />
//                   </div>
//                 </div>
//               );
//             })
//           }
//         </SectionWrapper>

//         <Separator className="my-4" />

//         <SectionWrapper
//
//           sectionKey="skills.interests"
//           fieldArraySection={true}
//           control={control}
//           editableTitle={{
//             control: control,
//             register: register,
//             errors: errors,
//           }}
//           sectionClass=""
//           sectionActionBtnClass="hidden"
//         >
//           {({ fields, remove }) =>
//             fields.map((item, index) => {
//               const eachEntry = item as typeof item &
//                 ArrayKeysRecord<SkillsSectionT>;

//               return (
//                 <div
//                   className={cn(
//                     "w-full fc gap-2 p-2 border-2 inset-2 glass shadow-sm rounded-md"
//                   )}
//                   key={eachEntry.id}
//                 >
//                   <motion.div className="fr gap-2">
//                     <motion.div
//                       className={cn(
//                         "flex-1 group relative h-10",
//                         "transition ease-in-out delay-300"
//                       )}
//                     >
//                       <div
//                         className={cn(
//                           "absolute bold text-xl p-1",
//                           "hidden transition ease-in-out delay-500",
//                           "group-[:not(:hover)]:block",
//                           "group-[:has(.formInput:focus-visible)]:hidden"
//                         )}
//                       >
//                         <WatchedValue
//                           watchKey={`skills.interests.${index}.name`}
//                           control={control}
//                         />
//                       </div>
//                       <FormInput
//                         fieldTitle={`skills.interests.${index}.name`}
//                         type="text"
//                         //
//
//                         headerinput={{
//                           InputClassValue:
//                             "hidden group-[:hover]:block focus-visible:block transition px-1 px-1 text-lg",
//                           LabelClassValue:
//                             "hidden focus-visible:block transition ease-in-out delay-300",
//                           parentclassvalue: "absolute",
//                         }}
//                       />
//                     </motion.div>
//                     {fields.length > 1 && (
//                       <motion.button
//                         className="hover:text-red-490 hover:opacity-100 opacity-50"
//                         onClick={() => {
//                           remove(index);
//                         }}
//                       >
//                         <Trash2 />
//                       </motion.button>
//                     )}
//                   </motion.div>
//                   <div className="fr flex-wrap gap-2">
//                     <FormInput
//                       fieldTitle={`skills.interests.${index}.name`}
//                       type="text"
//                       //
//
//                     />
//                   </div>
//                 </div>
//               );
//             })
//           }
//         </SectionWrapper>

//         <Separator className="my-4" />

//         <SectionWrapper
//
//           sectionKey="skills.databases"
//           fieldArraySection={true}
//           control={control}
//           editableTitle={{
//             control: control,
//             register: register,
//             errors: errors,
//           }}
//           sectionClass=""
//           sectionActionBtnClass="hidden"
//         >
//           {({ fields, remove }) =>
//             fields.map((item, index) => {
//               const eachEntry = item as typeof item &
//                 ArrayKeysRecord<SkillsSectionT>;

//               return (
//                 <div
//                   className={cn(
//                     "w-full fc gap-2 p-2 border-2 inset-2 glass shadow-sm rounded-md"
//                   )}
//                   key={eachEntry.id}
//                 >
//                   <motion.div className="fr gap-2">
//                     <motion.div
//                       className={cn(
//                         "flex-1 group relative h-10",
//                         "transition ease-in-out delay-300"
//                       )}
//                     >
//                       <div
//                         className={cn(
//                           "absolute bold text-xl p-1",
//                           "hidden transition ease-in-out delay-500",
//                           "group-[:not(:hover)]:block",
//                           "group-[:has(.formInput:focus-visible)]:hidden"
//                         )}
//                       >
//                         <WatchedValue
//                           watchKey={`skills.databases.${index}.name`}
//                           control={control}
//                         />
//                       </div>
//                       <FormInput
//                         fieldTitle={`skills.databases.${index}.name`}
//                         type="text"
//                         //
//
//                         headerinput={{
//                           InputClassValue:
//                             "hidden group-[:hover]:block focus-visible:block transition px-1 px-1 text-lg",
//                           LabelClassValue:
//                             "hidden focus-visible:block transition ease-in-out delay-300",
//                           parentclassvalue: "absolute",
//                         }}
//                       />
//                     </motion.div>
//                     {fields.length > 1 && (
//                       <motion.button
//                         className="hover:text-red-490 hover:opacity-100 opacity-50"
//                         onClick={() => {
//                           remove(index);
//                         }}
//                       >
//                         <Trash2 />
//                       </motion.button>
//                     )}
//                   </motion.div>
//                   <div className="fr flex-wrap gap-2">
//                     <FormInput
//                       fieldTitle={`skills.databases.${index}.name`}
//                       type="text"
//                       //
//
//                     />
//                     <FormInput
//                       fieldTitle={`skills.databases.${index}.level`}
//                       type="text"
//                       //
//
//                     />
//                   </div>
//                 </div>
//               );
//             })
//           }
//         </SectionWrapper>

//         <Separator className="my-4" />
//       </SectionWrapper>
//     </div>
//   );
// }
