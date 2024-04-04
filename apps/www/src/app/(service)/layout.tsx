import React from 'react';
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { ServiceProvider } from "@/hooks/use-service";
import { getTodosByUserId } from "@/data/todo";

import { BottomNavigation } from "./_components/bottom-navigation";

export default async function ServiceLayout({
  children,
}: {
  children?: React.ReactNode
}) {
  const { userId } = auth();

  // 로그인이 되어있지 않은 경우
  if (!userId) {
    return redirect("/");
  }

  const todos = await getTodosByUserId(userId);

  return (
    <ServiceProvider preloadedState={{ todos }}>
      <div className="h-full flex flex-col">
        <main className="flex-1">
          {children}
        </main>
        <BottomNavigation />
      </div>
    </ServiceProvider>
  );
}
