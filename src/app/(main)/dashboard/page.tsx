"use client";

import TwScreenInfo from "../../../components/custom/TwScreenInfo";
import AnimateText from "../../../components/custom/AmimateText";
import { AnimatePresence, motion } from "framer-motion";

// import { UserButton, useAuth, useUser } from "@clerk/nextjs";

export default function Dashboard() {
  // get userid from clerk
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  // const { user } = useUser();
  // console.log(userId, user);

  // check if user is signed in if not then redirect to login pages else redirect to dashboard
  return (
    // make whole page with 10/12 width and center it on above medium screens
    <main className="app xl:px-[11%] md:px-[5%] px-[2%] py-[2.5rem] lg:gap-20 gap-8 flex flex-col items-center text-center">
      <div className="w-full ">
        this is Dashboard
        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, sequi est? Doloribus omnis, corporis, quibusdam quidem id minus aliquid repellat animi, dolor exercitationem sunt consequuntur veniam? Eius magnam neque eum enim delectus, assumenda reiciendis debitis commodi, quam deleniti, placeat tempore! */}
        {/* <UserButton/> */}
      </div>

      {/* <TwScreenInfo /> */}
    </main>
  );
}


// Dashboard.                  