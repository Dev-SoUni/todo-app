import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // 권한 인증 없이 접근 가능한 페이지 경로
  publicRoutes: [
    '/',
    '/api/todos',
  ],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
