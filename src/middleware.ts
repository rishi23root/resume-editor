// import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
// // import { NextResponse } from "next/server";



// export default  authMiddleware({
//   afterAuth(auth, req, evt) {
//     // handle users who aren't authenticated
//     if (!auth.userId && !auth.isPublicRoute) {
//       return redirectToSignIn({ returnBackUrl: req.url });
//     }
//   },
//   publicRoutes: ["/"],
// });



// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };


import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  // "/" will be accessible to all users
  publicRoutes: ["/"]
});
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};