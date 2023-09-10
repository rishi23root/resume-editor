import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware



export default authMiddleware({
  afterAuth(auth, req, evt) {

    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // on the succesfull user first signup that mean user is not not already exist in the database
    
    // so use the clerk to create the user in the database
    // add the basic user info to the database like name and email and extract other info of the user accordingly
    // console.log("auth:",auth)
    // console.log("req:",req.url)
    // console.log()
    // evt.waitUntil(
    //   fetch("/api/user", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       id: auth.userId,
    //       email: auth.emailAddresses[0].emailAddress,
    //       name: auth.fullName,
    //     }),
    //   })
    // );    


  },
  publicRoutes: ["/"],
});



export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
