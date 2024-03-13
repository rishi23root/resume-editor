import { authMiddleware, currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// import { NextResponse } from "next/server";



export default authMiddleware({
  async afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
    return NextResponse.next();
  },
  publicRoutes: ["/", "/termAndCondition", "/privacyPolicy", '/blog', '/blog/(.*)','/api/link-preview']
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