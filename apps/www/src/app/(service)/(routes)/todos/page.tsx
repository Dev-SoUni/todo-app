import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { ServiceProvider } from "@/hooks/use-service";
import { getTodosByUserId } from "@/data/todo";

import { TodoCreateButton } from "./_components/todo-create-button";
import { TodoCreateDrawer } from "./_components/todo-create-drawer";
import { TodoEditDrawer } from "./_components/todo-edit-drawer";
import { TodoContainer } from "./_components/todo-container";

export default async function TodosPage() {
  const { userId } = auth();

  // 로그인이 되어있지 않은 경우
  if (!userId) {
    return redirect("/");
  }

  const todos = await getTodosByUserId(userId);

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
