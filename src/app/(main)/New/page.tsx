import { type PageProps } from "@/types/utils";
import { redirect } from "next/navigation";
// page route /New

// user to create new resume
// possibel search params are = mode, templateName, resumeId
// parameters=> mode ['newResume', 'newLogin']
// if newResume{
// go to any one page and
//     templateName [all list of templates]
// }

export default function New(props: PageProps) {
  if (!props.searchParams?.mode){
    redirect('/New?mode=newResume');
  } else if (props.searchParams?.mode == "newResume") {
    // console.log(props);
  } else if (props.searchParams?.mode == "newLogin") {
    // ask user to upload the user from pc or load from linkedin or start generating the resume data
    // ask user to use upload resume 
  }
  // show templates and ask user for his choices to template to use 
  // and show old build resume if use that to create new or upload a resume to parse it 

  return (
    <div className="w-full border">
      {props.searchParams && Object.keys(props.searchParams).map((key) => {
        return (
          <div className="text-xl " key={key}>
            {key} = {props.searchParams[key]}
          </div>
        );
      })}
    </div>
  );
}
