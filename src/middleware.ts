import { authMiddleware, currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// import { NextResponse } from "next/server";



export default authMiddleware({
  async afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    // try {
    //   const user = await currentUser();
    // } catch (error) {
    //   return redirectToSignIn({ returnBackUrl: req.url });
    // }
    // console.log('[middleware] ',req.url);

    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
    return NextResponse.next();
  },
  publicRoutes: ["/", "/termAndCondition", "/privacyPolicy"],
});



export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"]
};


// import { authMiddleware } from "@clerk/nextjs";
// export default authMiddleware({
//   // "/" will be accessible to all users
//   publicRoutes: ["/"]
// });

// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// };