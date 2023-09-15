export type Notification = {
    type: "info" | "warn" | "alert" | "error" ;
    message: string
}

export type NotificationArr = Notification[];