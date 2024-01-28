import { resumeTemplates } from "./templates";

export type Notification = {
  type: "info" | "warn" | "alert" | "error";
  message: string,
  link?: string
}

export type NavProps = {
  isSignedIn: Boolean | undefined;
  pathname: string;
};

// any record type with coustom generic template
export type keyValue<T> = { [key: string]: T }

// tipicle json format
export type JsonType = keyValue<any>

// search params types
export type searchParamType = keyValue<string | string[] | undefined> | newResumeSearchParams & {
  error?: string
  redirectPage?: string
}

// nextjs page params 
export type PageProps = {
  params: keyValue<string>;
  searchParams: searchParamType;
};

// resume builder new page may have props
export type newResumeSearchParams = {
  // page base keywords
  templateName?: resumeTemplates; // template in use name 
  jobId?: number; // job id to Choose a specific job type like profession
  payId?: string; // pay id to Choose a specific pay type [basic, advance]

  // sesssion data in use
  _s?: string | {
    mode?: 'newResume' | 'newLogin';
    procegure?: 1 | 2 | 3 | 4; // procegure flow of the application 
    jsonDataId?: string; // json data uuid form database
  }; // json data or in base64 format
}

export type paramType = keyValue<string | string[] | undefined> | newResumeSearchParams;

export type privateData = searchParamType["_s"] & JsonType;
