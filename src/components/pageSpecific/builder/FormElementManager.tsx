// import { Input } from "@/components/ui/input";

// // form manager for the form builder handle all the fields and their data to make a single resume
// async function FormManager() {
//   // get the data from the server
//   // in xl screens show the form in the left side of the screen
//   return (
//     <div className="items-center w-full md:w-[40%] fc glass md:h-full h-1/2 gap-4 ">
//       <h1 className="capitalize text-xl">data fields for the form</h1>
//       <Input type="text" />
//       <Input type="text" />
//     </div>
//   );
// }

// export default FormManager;

import { useForm, SubmitHandler } from "react-hook-form";
import { FormInput } from "./formInput";
import { Inputs } from "@/types/builder";


export default function FormManager() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register("example")} />
      <FormInput type="" error={errors} />
      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("exampleRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
}
