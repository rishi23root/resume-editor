export type Notification = {
    type: "info" | "warn" | "alert" | "error" ;
    message: string,
    link ?: string
}

export type NavProps = {
  isSignedIn: Boolean | undefined;
  pathname: string;
};


export type templateWithImages = {
    id: number,
    name: string,
    pages: string[]
}

export type PageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined } | newResumeSearchParams;
};

// resume builder new page may have props
export type newResumeSearchParams = {
    mode?: 'newResume' | 'newLogin';
    templateName?: string; // can just fetch name form list template api maybe in future
    resumedata?: string; // all the data that will going to use in the formation of resume
}
