import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { ServiceProvider } from "@/hooks/use-service";
import { getTodosByDate } from "@/data/todo";

import { TodoCreateButton } from "./_components/todo-create-button";
import { TodoCreateDrawer } from "./_components/todo-create-drawer";
import { TodoEditDrawer } from "./_components/todo-edit-drawer";
import { TodoContainer } from "./_components/todo-container";
import { toDefaultDate } from "@/lib/date";

export default async function TodosPage() {
  const { userId } = auth();
  const date = toDefaultDate(new Date());

  // 로그인이 되어있지 않은 경우
  if (!userId) {
    return redirect("/");
  }

  const todos = await getTodosByDate({userId, date})

  return (
    <ServiceProvider preloadedState={{ todos }}>
      <TodoContainer />
      <TodoCreateButton
        className="fixed bottom-[calc(80px+20px)] right-10"
      />
      <TodoCreateDrawer />
      <TodoEditDrawer />
    </ServiceProvider>

  );
}
