export type Notification = {
    type: "info" | "warn" | "alert" | "error" ;
    message: string,
    link ?: string
}