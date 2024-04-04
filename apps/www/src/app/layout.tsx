import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { koKR } from "@clerk/localizations";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | 망고 - 할 일",
    default: "망고 - 할 일",
  },
  description: "내가 해야할 모든 것! 망고와 함께라면 놓치지 않을 수 있어요.",
};

const pretendard = localFont({
  src: [
    {
      path: '../styles/fonts/pretendard/woff2/Pretendard-Thin.woff2',
      weight: '100',
    },
    {
      path: '../styles/fonts/pretendard/woff2/Pretendard-ExtraLight.woff2',
      weight: '200',
    },
    {
      path: '../styles/fonts/pretendard/woff2/Pretendard-Light.woff2',
      weight: '300',
    },
    {
      path: '../styles/fonts/pretendard/woff2/Pretendard-Regular.woff2',
      weight: '400',
    },
    {
      path: '../styles/fonts/pretendard/woff2/Pretendard-Medium.woff2',
      weight: '500',
    },
    {
      path: '../styles/fonts/pretendard/woff2/Pretendard-SemiBold.woff2',
      weight: '600',
    },
    {
      path: '../styles/fonts/pretendard/woff2/Pretendard-Bold.woff2',
      weight: '700',
    },
    {
      path: '../styles/fonts/pretendard/woff2/Pretendard-ExtraBold.woff2',
      weight: '800',
    },
    {
      path: '../styles/fonts/pretendard/woff2/Pretendard-Black.woff2',
      weight: '900',
    },
  ],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={koKR}>
      <html lang="en">
        <body className={pretendard.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
