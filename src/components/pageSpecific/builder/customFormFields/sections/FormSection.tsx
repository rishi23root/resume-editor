import { ArrayKeysRecord, profilesT } from "@/types/builder";
import { useFormContext } from "react-hook-form";
import { FormInput } from "../formInput";
import { SectionWrapper, WatchedValue } from "./utils";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

export function Basic() {
  return (
    <div className="w-full fc  gap-2">
      <SectionWrapper sectionKey="basics">
        {/* <div className="w-full text-2xl bold mb-3">Basic</div> */}
        <FormInput
          fieldTitle="basics.name"
          type="text"
          parentClassValue="w-[49%]"
        />
        <FormInput
          fieldTitle="basics.label"
          type="text"
          parentClassValue="w-[49%]"
        />
        <FormInput
          fieldTitle="basics.image"
          type="image"
          parentClassValue="w-[49%]"
        />
        <FormInput
          fieldTitle="basics.email"
          type="email"
          parentClassValue="w-[49%]"
        />
        <FormInput
          fieldTitle="basics.phone"
          type="number"
          parentClassValue="w-[49%]"
        />
        <FormInput
          fieldTitle="basics.url"
          type="url"
          parentClassValue="w-[49%]"
        />
        <FormInput
          fieldTitle="basics.summary"
          type="summary"
          parentClassValue="w-full"
        />
      </SectionWrapper>

      {/* location tab */}
      <SectionWrapper sectionKey="basics.location">
        <FormInput
          fieldTitle="basics.location.address"
          type="text"
          parentClassValue="w-[49%]"
        />
        <FormInput
          fieldTitle="basics.location.city"
          type="text"
          parentClassValue="w-[49%]"
        />
        <FormInput
          fieldTitle="basics.location.countryCode"
          type="text"
          parentClassValue="w-[49%]"
        />
      </SectionWrapper>

      <BasicProfile />
    </div>
  );
}

function BasicProfile() {
  const { control } = useFormContext();
  // const [visible, setVisible] = useState(true);

  // const fieldArray = useFieldArray({
  //   name: "basics.profiles",
  //   control: control,
  // });
  // const { fields, append } = fieldArray;
  // return (
  //   <>
  //     <SectionWrapper sectionKey="basics.profiles">
  //       <div
  //         className={cn(
  //           "w-full text-2xl bold fr justify-between align-middle",
  //           visible ? "mb-3" : "mb-0",
  //           // editableTitle ? "cursor-text" : "cursor-not-allowed",
  //           visible ? "" : "cursor-pointer"
  //         )}
  //         onClick={() => {
  //           if (!visible) {
  //             setVisible(!visible);
  //           }
  //         }}
  //       >
  //         <span>{"basics.profiles".split(".").pop()?.toUpperCase()}</span>
  //         <div className={cn("fr fce gap-2")}>
  //           <motion.button
  //             initial="initial"
  //             animate="animate"
  //             whileHover="whileHover"
  //             className="px-2"
  //             onClick={() => {
  //               // append({
  //               // Object.fromEntries(
  //               //   Object.entries({ ...fields[0] }).map((arr) => [arr[0], ""])
  //               //   // .filter(([key, val]) => key !== "id")
  //               // );
  //               // append(
  //               //   Object.fromEntries(
  //               //     Object.entries({ ...fields[0] }).map((arr) => [arr[0], ""])
  //               //     // .filter(([key, val]) => key !== "id")
  //               //   )
  //               // );
  //               // setVisible(true);
  //             }}
  //           >
  //             <Plus />
  //           </motion.button>
  //         </div>
  //       </div>
  //       {fields.map((item, index) => {
  //         return (
  //           <div
  //             key={index + item.id}
  //             className={cn(
  //               "w-[49%] fc gap-2 p-2 border-2 inset-2 glass shadow-sm rounded-md"
  //             )}
  //           >
  //             {/* <motion.div className="fr gap-2">
  //               <motion.div
  //                 className={cn(
  //                   "flex-1 group relative h-10",
  //                   "transition ease-in-out delay-300" //animate
  //                 )}
  //               >
  //                 <div
  //                   className={cn(
  //                     "absolute bold text-xl p-1",
  //                     " hidden transition ease-in-out delay-500",
  //                     "group-[:not(:hover)]:block",
  //                     // if group have a input element in focus then hide this
  //                     "group-[:has(.formInput:focus-visible)]:hidden"
  //                   )}
  //                 >
  //                   <WatchedValue
  //                     watchKey={`basics.profiles.${index}.network`}
  //                   />
  //                 </div>
  //                 <FormInput
  //                   fieldTitle={`basics.profiles.${index}.network`}
  //                   type="text"
  //                   headerInput={{
  //                     InputClassValue:
  //                       "hidden group-[:hover]:block focus-visible:block transition p-0 px-1 text-lg",
  //                     LabelClassValue:
  //                       "hidden focus-visible:block transition ease-in-out delay-300",
  //                     parentClassValue: "absolute ",
  //                   }}
  //                 />
  //               </motion.div>
  //               {fields.length > 1 && (
  //                 <motion.button
  //                   className="hover:text-red-490 hover:opacity-100 opacity-50"
  //                   onClick={() => {
  //                     fieldArray.remove(index);
  //                   }}
  //                 >
  //                   <Trash2 />
  //                 </motion.button>
  //               )}
  //             </motion.div> */}
  //             {/* <FormInput
  //               fieldTitle={`basics.profiles.${index}.username`}
  //               type="text"
  //             /> */}
  //             {/* <FormInput
  //               fieldTitle={`basics.profiles.${index}.url`}
  //               type="url"
  //             /> */}
  //           </div>
  //         );
  //       })}
  //     </SectionWrapper>
  //     ;
  //     {/* <SectionWrapper key={"basics.profiles"} sectionKey="basics.profiles">
  //       <motion.div
  //         className={cn(
  //           "flex-1 group relative h-10",
  //           "transition ease-in-out delay-300" //animate
  //         )}
  //       >
  //         <div
  //           className={cn(
  //             "absolute bold p-1 uppercase",
  //             "transition ease-in-out delay-300",
  //             "w-full text-2xl bold fr justify-between align-middle",
  //             " hidden transition ease-in-out delay-500",
  //             "group-[:not(:hover)]:block",
  //             // if group have a input element in focus then hide this
  //             "group-[:has(.formInput:focus-visible)]:hidden"
  //           )}
  //         >
  //           <WatchedValue
  //             watchKey={
  //               sectionKey.split(".").length == 2
  //                 ? // sectionKey.startsWith('skills') ?
  //                   `skills.mask.${
  //                     sectionKey.split(".").pop() as keyof SkillsT["mask"]
  //                   }`
  //                 : `mask.${sectionKey as keyof maskT}`
  //             }
  //             // watchKey={`work.${index}.network`}
  //           />
  //         </div>
  //         <FormInput
  //           fieldTitle={
  //             sectionKey.split(".").length == 2
  //               ? // sectionKey.startsWith('skills') ?
  //                 `skills.mask.${
  //                   sectionKey.split(".").pop() as keyof SkillsT["mask"]
  //                 }`
  //               : `mask.${sectionKey as keyof maskT}`
  //           }
  //           type="text"
  //           headerInput={{
  //             InputClassValue:
  //               "hidden group-[:hover]:block focus-visible:block transition p-0 px-1 text-lg",
  //             LabelClassValue:
  //               "hidden focus-visible:block transition ease-in-out delay-300",
  //             parentClassValue: "absolute ",
  //           }}
  //         />
  //       </motion.div>
  //       <>
  //         {fiel({ fields, remove }) => {
  //           console.log(fields);
  //           return fields.map((item, index) => {
  //             // update the type of item profile typex
  //             const eachEntry = item as typeof item &
  //               ArrayKeysRecord<profilesT>;

  //             return (
  //               <div
  //                 key={item.id}
  //                 className={cn(
  //                   "w-[49%] fc gap-2 p-2 border-2 inset-2 glass shadow-sm rounded-md"
  //                 )}
  //               >
  //                 <motion.div className="fr gap-2">
  //                   <motion.div
  //                     className={cn(
  //                       "flex-1 group relative h-10",
  //                       "transition ease-in-out delay-300" //animate
  //                     )}
  //                   >
  //                     <div
  //                       className={cn(
  //                         "absolute bold text-xl p-1",
  //                         " hidden transition ease-in-out delay-500",
  //                         "group-[:not(:hover)]:block",
  //                         // if group have a input element in focus then hide this
  //                         "group-[:has(.formInput:focus-visible)]:hidden"
  //                       )}
  //                     >
  //                       <WatchedValue
  //                         watchKey={`basics.profiles.${index}.network`}
  //                       />
  //                     </div>
  //                     <FormInput
  //                       fieldTitle={`basics.profiles.${index}.network`}
  //                       type="text"
  //                       headerInput={{
  //                         InputClassValue:
  //                           "hidden group-[:hover]:block focus-visible:block transition p-0 px-1 text-lg",
  //                         LabelClassValue:
  //                           "hidden focus-visible:block transition ease-in-out delay-300",
  //                         parentClassValue: "absolute ",
  //                       }}
  //                     />
  //                   </motion.div>
  //                   {fields.length > 1 && (
  //                     <motion.button
  //                       className="hover:text-red-490 hover:opacity-100 opacity-50"
  //                       onClick={() => {
  //                         remove(index);
  //                       }}
  //                     >
  //                       <Trash2 />
  //                     </motion.button>
  //                   )}
  //                 </motion.div>
  //                 <FormInput
  //                   fieldTitle={`basics.profiles.${index}.username`}
  //                   type="text"
  //                 />
  //                 <FormInput
  //                   fieldTitle={`basics.profiles.${index}.url`}
  //                   type="url"
  //                 />
  //               </div>
  //             );
  //           });
  //         }}
  //       </>
  //     </SectionWrapper> */}
  //     {/* <SectionWrapper
  //       key={"basics.profiles"}
  //       sectionKey="basics.profiles"
  //       fieldArraySection={true}
  //     >
  //       {({ fields, remove }) => {
  //         console.log(fields);
  //         return fields.map((item, index) => {
  //           // update the type of item profile typex
  //           const eachEntry = item as typeof item & ArrayKeysRecord<profilesT>;

  //           return (
  //             <div
  //               key={item.id}
  //               className={cn(
  //                 "w-[49%] fc gap-2 p-2 border-2 inset-2 glass shadow-sm rounded-md"
  //               )}
  //             >
  //               <motion.div className="fr gap-2">
  //                 <motion.div
  //                   className={cn(
  //                     "flex-1 group relative h-10",
  //                     "transition ease-in-out delay-300" //animate
  //                   )}
  //                 >
  //                   <div
  //                     className={cn(
  //                       "absolute bold text-xl p-1",
  //                       " hidden transition ease-in-out delay-500",
  //                       "group-[:not(:hover)]:block",
  //                       // if group have a input element in focus then hide this
  //                       "group-[:has(.formInput:focus-visible)]:hidden"
  //                     )}
  //                   >
  //                     <WatchedValue
  //                       watchKey={`basics.profiles.${index}.network`}
  //                     />
  //                   </div>
  //                   <FormInput
  //                     fieldTitle={`basics.profiles.${index}.network`}
  //                     type="text"
  //                     headerInput={{
  //                       InputClassValue:
  //                         "hidden group-[:hover]:block focus-visible:block transition p-0 px-1 text-lg",
  //                       LabelClassValue:
  //                         "hidden focus-visible:block transition ease-in-out delay-300",
  //                       parentClassValue: "absolute ",
  //                     }}
  //                   />
  //                 </motion.div>
  //                 {fields.length > 1 && (
  //                   <motion.button
  //                     className="hover:text-red-490 hover:opacity-100 opacity-50"
  //                     onClick={() => {
  //                       remove(index);
  //                     }}
  //                   >
  //                     <Trash2 />
  //                   </motion.button>
  //                 )}
  //               </motion.div>
  //               <FormInput
  //                 fieldTitle={`basics.profiles.${index}.username`}
  //                 type="text"
  //               />
  //               <FormInput
  //                 fieldTitle={`basics.profiles.${index}.url`}
  //                 type="url"
  //               />
  //             </div>
  //           );
  //         });
  //       }}
  //     </SectionWrapper> */}
  //   </>
  // );

  // const { fields, append, remove } = useFieldArray({
  //   name: "basics.profiles",
  //   control,
  // });

  return (
    <SectionWrapper sectionKey="basics.profiles" fieldArraySection={true}>
      {({ fields, remove }) =>
        fields.map((field, index) => {
          field = field as typeof field & ArrayKeysRecord<profilesT>;
          return (
            <div
              key={field.id + index}
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
                    />
                  </div>
                  <FormInput
                    fieldTitle={`basics.profiles.${index}.network`}
                    type="text"
                    id={field.id}
                    headerInput={{
                      InputClassValue:
                        "hidden group-[:hover]:block focus-visible:block transition p-0 px-1 text-lg",
                      LabelClassValue:
                        "hidden focus-visible:block transition ease-in-out delay-300",
                      parentClassValue: "absolute ",
                    }}
                  />
                </motion.div>
                <motion.button
                  id={index.toString()}
                  type="button"
                  className={cn(
                    "hover:text-red-490 hover:opacity-100 opacity-50",
                    fields.length > 1 ? "" : "hidden"
                  )}
                  onClick={() => remove(index)}
                >
                  <Trash2 />
                </motion.button>
              </motion.div>

              <FormInput
                id={field.id}
                type="url"
                fieldTitle={`basics.profiles.${index}.url` as any}
              />
              <FormInput
                id={field.id}
                type="text"
                fieldTitle={`basics.profiles.${index}.username` as any}
              />
            </div>
          );
        })
      }
    </SectionWrapper>
  );
}

// skills
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
//                         headerInput={{
//                           InputClassValue:
//                             "hidden group-[:hover]:block focus-visible:block transition p-0 px-1 text-lg",
//                           LabelClassValue:
//                             "hidden focus-visible:block transition ease-in-out delay-300",
//                           parentClassValue: "absolute",
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
//                       parentClassValue="w-full"
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
//                         headerInput={{
//                           InputClassValue:
//                             "hidden group-[:hover]:block focus-visible:block transition p-0 px-1 text-lg",
//                           LabelClassValue:
//                             "hidden focus-visible:block transition ease-in-out delay-300",
//                           parentClassValue: "absolute",
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
//                       parentClassValue="w-[49%]"
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
//                         headerInput={{
//                           InputClassValue:
//                             "hidden group-[:hover]:block focus-visible:block transition p-0 px-1 text-lg",
//                           LabelClassValue:
//                             "hidden focus-visible:block transition ease-in-out delay-300",
//                           parentClassValue: "absolute",
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
//                       parentClassValue="w-[49%]"
//                     />
//                     <FormInput
//                       fieldTitle={`skills.databases.${index}.level`}
//                       type="text"
//                       //
//
//                       parentClassValue="w-[49%]"
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

// export function Work({
//   register,
//   control,
//   formState: { errors },
//   setValue,
// }: UseFormReturn<Inputs, any, undefined>) {
//   // watch for change values in the form here and disable it accoringly
//   return (
//     <div className="w-full fc  gap-2">
//       <SectionWrapper
//
//         sectionKey="work"
//         fieldArraySection={true}
//         control={control}
//         editableTitle={{
//           control: control,
//           register: register,
//           errors: errors,
//         }}
//       >
//         {({ fields, remove }) =>
//           fields.map((item, index) => {
//             // update the type of item profile typex
//             const eachEntry = item as typeof item & ArrayKeysRecord<WorkT>;
//             return (
//               <div
//                 className={cn(
//                   "w-full fc gap-2 p-2 border-2 inset-2 glass shadow-sm rounded-md"
//                 )}
//                 key={eachEntry.id}
//               >
//                 <motion.div className="fr gap-2">
//                   <motion.div
//                     className={cn(
//                       "flex-1 group relative h-10",
//                       "transition ease-in-out delay-300" //animate
//                     )}
//                   >
//                     <div
//                       className={cn(
//                         "absolute bold text-xl p-1",
//                         " hidden transition ease-in-out delay-500",
//                         "group-[:not(:hover)]:block",
//                         // if group have a input element in focus then hide this
//                         "group-[:has(.formInput:focus-visible)]:hidden"
//                       )}
//                     >
//                       <WatchedValue
//                         watchKey={`work.${index}.name`}
//                         // watchKey={`work.${index}.network`}
//                         control={control}
//                       />
//                     </div>
//                     <FormInput
//                       fieldTitle={`work.${index}.name`}
//                       type="text"
//                       //
//
//                       headerInput={{
//                         InputClassValue:
//                           "hidden group-[:hover]:block focus-visible:block transition p-0 px-1 text-lg",
//                         LabelClassValue:
//                           "hidden focus-visible:block transition ease-in-out delay-300",
//                         parentClassValue: "absolute ",
//                       }}
//                     />
//                   </motion.div>
//                   {fields.length > 1 && (
//                     <motion.button
//                       className="hover:text-red-490 hover:opacity-100 opacity-50"
//                       onClick={() => {
//                         remove(index);
//                       }}
//                     >
//                       <Trash2 />
//                     </motion.button>
//                   )}
//                 </motion.div>
//                 <div className="fr flex-wrap gap-2">
//                   <FormInput
//                     fieldTitle={`work.${index}.position`}
//                     type="text"
//                     //
//
//                     parentClassValue="w-[49%]"
//                   />
//                   <FormInput
//                     fieldTitle={`work.${index}.url`}
//                     type="url"
//                     //
//
//                     parentClassValue="w-[49%]"
//                   />
//                   {/* // startDate: string; // isWorkingHere: boolean; // endDate:
//                 string; // summary: string; // years: string; */}
//                   <FormInput
//                     fieldTitle={`work.${index}.startDate`}
//                     type="date"
//                     //
//
//                     parentClassValue="w-[49%]"
//                   />
//                   <>
//                     {/* make this section programmitically editable either ways */}
//                     <FormInput
//                       fieldTitle={`work.${index}.endDate`}
//                       type="date"
//                       //
//
//                       parentClassValue="w-[49%]"
//                     />
//                     <FormInput
//                       fieldTitle={`work.${index}.isWorkingHere`}
//                       type="checkbox"
//                       //
//
//                       parentClassValue="w-[49%]"
//                     />
//                   </>
//                   <FormInput
//                     fieldTitle={`work.${index}.years`}
//                     type="text"
//                     //
//
//                     parentClassValue="w-[49%]"
//                   />
//                   <FormInput
//                     fieldTitle={`work.${index}.summary`}
//                     type="summary"
//                     //
//
//                   />
//                 </div>
//               </div>
//             );
//           })
//         }
//       </SectionWrapper>
//     </div>
//   );
// }

// export function Projects({
//   register,
//   control,
//   formState: { errors },
//   setValue,
// }: UseFormReturn<Inputs, any, undefined>) {
//   // watch for change values in the form here and disable it accoringly
//   return (
//     <div className="w-full fc  gap-2">
//       <SectionWrapper
//
//         sectionKey="projects"
//         fieldArraySection={true}
//         control={control}
//         editableTitle={{
//           control: control,
//           register: register,
//           errors: errors,
//         }}
//       >
//         {({ fields, remove }) =>
//           fields.map((item, index) => {
//             // update the type of item profile typex
//             const eachEntry = item as typeof item & ArrayKeysRecord<ProjectsT>;
//             return (
//               <div
//                 className={cn(
//                   "w-full fc gap-2 p-2 border-2 inset-2 glass shadow-sm rounded-md"
//                 )}
//                 key={eachEntry.id}
//               >
//                 <motion.div className="fr gap-2">
//                   <motion.div
//                     className={cn(
//                       "flex-1 group relative h-10",
//                       "transition ease-in-out delay-300" //animate
//                     )}
//                   >
//                     <div
//                       className={cn(
//                         "absolute bold text-xl p-1",
//                         " hidden transition ease-in-out delay-500",
//                         "group-[:not(:hover)]:block",
//                         // if group have a input element in focus then hide this
//                         "group-[:has(.formInput:focus-visible)]:hidden"
//                       )}
//                     >
//                       <WatchedValue
//                         watchKey={`projects.${index}.name`}
//                         // watchKey={`work.${index}.network`}
//                         control={control}
//                       />
//                     </div>
//                     <FormInput
//                       fieldTitle={`projects.${index}.name`}
//                       type="text"
//                       //
//
//                       headerInput={{
//                         InputClassValue:
//                           "hidden group-[:hover]:block focus-visible:block transition p-0 px-1 text-lg",
//                         LabelClassValue:
//                           "hidden focus-visible:block transition ease-in-out delay-300",
//                         parentClassValue: "absolute ",
//                       }}
//                     />
//                   </motion.div>
//                   {fields.length > 1 && (
//                     <motion.button
//                       className="hover:text-red-490 hover:opacity-100 opacity-50"
//                       onClick={() => {
//                         remove(index);
//                       }}
//                     >
//                       <Trash2 />
//                     </motion.button>
//                   )}
//                 </motion.div>
//                 <div className="fr flex-wrap gap-2">
//                   <FormInput
//                     fieldTitle={`projects.${index}.url`}
//                     type="url"
//                     //
//
//                     parentClassValue="w-[49%]"
//                   />
//                   <FormInput
//                     fieldTitle={`projects.${index}.languages`}
//                     type="text"
//                     //
//
//                     parentClassValue="w-[49%]"
//                   />
//                   <FormInput
//                     fieldTitle={`projects.${index}.description`}
//                     type="summary"
//                     //
//
//                   />
//                 </div>
//               </div>
//             );
//           })
//         }
//       </SectionWrapper>
//     </div>
//   );
// }

// export function Education({
//   register,
//   control,
//   formState: { errors },
//   setValue,
// }: UseFormReturn<Inputs, any, undefined>) {
//   return (
//     <div className="w-full fc gap-2">
//       <SectionWrapper
//
//         sectionKey="education"
//         fieldArraySection={true}
//         control={control}
//         editableTitle={{
//           control: control,
//           register: register,
//           errors: errors,
//         }}
//       >
//         {({ fields, remove }) =>
//           fields.map((item, index) => {
//             const eachEntry = item as typeof item & ArrayKeysRecord<EducationT>;

//             return (
//               <div
//                 className={cn(
//                   "w-full fc gap-2 p-2 border-2 inset-2 glass shadow-sm rounded-md"
//                 )}
//                 key={eachEntry.id}
//               >
//                 <motion.div className="fr gap-2">
//                   <motion.div
//                     className={cn(
//                       "flex-1 group relative h-10",
//                       "transition ease-in-out delay-300"
//                     )}
//                   >
//                     <div
//                       className={cn(
//                         "absolute bold text-xl p-1",
//                         "hidden transition ease-in-out delay-500",
//                         "group-[:not(:hover)]:block",
//                         "group-[:has(.formInput:focus-visible)]:hidden"
//                       )}
//                     >
//                       <WatchedValue
//                         watchKey={`education.${index}.institution`}
//                         control={control}
//                       />
//                     </div>
//                     <FormInput
//                       fieldTitle={`education.${index}.institution`}
//                       type="text"
//                       //
//
//                       headerInput={{
//                         InputClassValue:
//                           "hidden group-[:hover]:block focus-visible:block transition p-0 px-1 text-lg",
//                         LabelClassValue:
//                           "hidden focus-visible:block transition ease-in-out delay-300",
//                         parentClassValue: "absolute",
//                       }}
//                     />
//                   </motion.div>
//                   {fields.length > 1 && (
//                     <motion.button
//                       className="hover:text-red-490 hover:opacity-100 opacity-50"
//                       onClick={() => {
//                         remove(index);
//                       }}
//                     >
//                       <Trash2 />
//                     </motion.button>
//                   )}
//                 </motion.div>
//                 <div className="fr flex-wrap gap-2">
//                   <FormInput
//                     fieldTitle={`education.${index}.url`}
//                     type="url"
//                     //
//
//                     parentClassValue="w-[49%]"
//                   />
//                   <FormInput
//                     fieldTitle={`education.${index}.studyType`}
//                     type="text"
//                     //
//
//                     parentClassValue="w-[49%]"
//                   />
//                   <FormInput
//                     fieldTitle={`education.${index}.area`}
//                     type="text"
//                     //
//
//                     parentClassValue="w-[49%]"
//                   />
//                   <FormInput
//                     fieldTitle={`education.${index}.startDate`}
//                     type="date"
//                     //
//
//                     parentClassValue="w-[49%]"
//                   />
//                   <FormInput
//                     fieldTitle={`education.${index}.endDate`}
//                     type="date"
//                     //
//
//                     parentClassValue="w-[49%]"
//                   />
//                   <FormInput
//                     fieldTitle={`education.${index}.score`}
//                     type="text"
//                     //
//
//                     parentClassValue="w-[49%]"
//                   />
//                 </div>
//               </div>
//             );
//           })
//         }
//       </SectionWrapper>
//     </div>
//   );
// }

// export function Awards({
//   register,
//   control,
//   formState: { errors },
//   setValue,
// }: UseFormReturn<Inputs, any, undefined>) {
//   return (
//     <div className="w-full fc gap-2">
//       <SectionWrapper
//
//         sectionKey="awards"
//         fieldArraySection={true}
//         control={control}
//         editableTitle={{
//           control: control,
//           register: register,
//           errors: errors,
//         }}
//       >
//         {({ fields, remove }) =>
//           fields.map((item, index) => {
//             const eachEntry = item as typeof item & ArrayKeysRecord<awardsT>;

//             return (
//               <div
//                 className={cn(
//                   "w-full fc gap-2 p-2 border-2 inset-2 glass shadow-sm rounded-md"
//                 )}
//                 key={eachEntry.id}
//               >
//                 <motion.div className="fr gap-2">
//                   <motion.div
//                     className={cn(
//                       "flex-1 group relative h-10",
//                       "transition ease-in-out delay-300"
//                     )}
//                   >
//                     <div
//                       className={cn(
//                         "absolute bold text-xl p-1",
//                         "hidden transition ease-in-out delay-500",
//                         "group-[:not(:hover)]:block",
//                         "group-[:has(.formInput:focus-visible)]:hidden"
//                       )}
//                     >
//                       <WatchedValue
//                         watchKey={`awards.${index}.title`}
//                         control={control}
//                       />
//                     </div>
//                     <FormInput
//                       fieldTitle={`awards.${index}.title`}
//                       type="text"
//                       //
//
//                       headerInput={{
//                         InputClassValue:
//                           "hidden group-[:hover]:block focus-visible:block transition p-0 px-1 text-lg",
//                         LabelClassValue:
//                           "hidden focus-visible:block transition ease-in-out delay-300",
//                         parentClassValue: "absolute",
//                       }}
//                     />
//                   </motion.div>
//                   {fields.length > 1 && (
//                     <motion.button
//                       className="hover:text-red-490 hover:opacity-100 opacity-50"
//                       onClick={() => {
//                         remove(index);
//                       }}
//                     >
//                       <Trash2 />
//                     </motion.button>
//                   )}
//                 </motion.div>
//                 <div className="fr flex-wrap gap-2">
//                   <FormInput
//                     fieldTitle={`awards.${index}.date`}
//                     type="date"
//                     //
//
//                     parentClassValue="w-[49%]"
//                   />
//                   <FormInput
//                     fieldTitle={`awards.${index}.awarder`}
//                     type="text"
//                     //
//
//                     parentClassValue="w-[49%]"
//                   />
//                   <FormInput
//                     fieldTitle={`awards.${index}.summary`}
//                     type="summary"
//                     //
//
//                   />
//                   <FormInput
//                     fieldTitle={`awards.${index}.url`}
//                     type="url"
//                     //
//
//                   />
//                 </div>
//               </div>
//             );
//           })
//         }
//       </SectionWrapper>
//     </div>
//   );
// }
