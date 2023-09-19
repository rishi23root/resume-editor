"use client";

import TwScreenInfo from "../../../components/custom/TwScreenInfo";
import AnimateText from "../../../components/custom/AmimateText";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

// import { UserButton, useAuth, useUser } from "@clerk/nextjs";

export default function Template() {
  // get userid from clerk
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  // const { user } = useUser();
  // console.log(userId, user);

  // check if user is signed in if not then redirect to login pages else redirect to dashboard
  return (
    // make whole page with 10/12 width and center it on above medium screens
    <div className="border"> this is Templates </div>
  );
}
