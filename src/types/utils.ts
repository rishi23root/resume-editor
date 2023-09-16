export type Notification = {
    type: "info" | "warn" | "alert" | "error" ;
    message: string,
    link ?: string
}

export type NotificationArr = Notification[];