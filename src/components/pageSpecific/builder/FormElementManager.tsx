import { Input } from "@/components/ui/input";

// form manager for the form builder handle all the fields and their data to make a single resume
async function FormManager() {
  // get the data from the server
  // in xl screens show the form in the left side of the screen
  return (
    <div className="items-center w-full md:w-[40%] fc glass md:h-full h-1/2 gap-4 ">
      <h1 className="capitalize text-xl">data fields for the form</h1>
      <Input type="text" />
      <Input type="text" />
    </div>
  );
}

export default FormManager;
