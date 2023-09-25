export type Notification = {
    type: "info" | "warn" | "alert" | "error" ;
    message: string,
    link ?: string
}


export type templateWithImages = {
    id: number,
    name: string,
    pages: string[]
}
// export type templateWithImages = [{
//     name: string,
//     pages: string[]
// }]

export type PageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};