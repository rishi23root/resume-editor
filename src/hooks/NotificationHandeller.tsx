import { Notification } from "@/types/utils";
import { useEffect, useState } from "react";

// responsible for handeling the fetching of notification from the server 
// make it singleton
function useNotification() {
  const [notification, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // check every 2 minute if any request in que
    // if it does then every 30sec check for notifiction
    // else no need
    const id = setTimeout(() => {
      setNotifications((prec) => [
        ...prec,
        {
          type: "warn",
          message: "resume builded",
        },
        {
          type: "info",
          message: "unable to build retry",
        },
        {
          type: "alert",
          message: "resume builded",
        },
        {
          type: "error",
          message: "unable to build retry",
        },
      ]);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return notification;
}

export default useNotification;
