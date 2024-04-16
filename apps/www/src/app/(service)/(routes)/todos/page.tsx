import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { ServiceProvider } from "@/hooks/use-service";
import { getTodosByDate } from "@/data/todo";
import { toDefaultDate } from "@/lib/date";

import { TodoHeader } from "./_components/todo-header";
import { TodoList } from "./_components/todo-list";
import { TodoCreateButton } from "./_components/todo-create-button";
import { TodoCreateDrawer } from "./_components/todo-create-drawer";
import { TodoEditDrawer } from "./_components/todo-edit-drawer";

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
      <TodoHeader />
      <div className="h-full flex-1 space-y-4 overflow-y-auto">
        <TodoList />
      </div>
      <TodoCreateButton className="absolute bottom-[calc(80px+20px)] right-10" />
      <TodoCreateDrawer />
      <TodoEditDrawer />
    </ServiceProvider>
  );
}
