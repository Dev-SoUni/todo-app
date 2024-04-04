import React from "react";

import { TodoList } from "./_components/todo-list";
import { TodoCreateButton } from "./_components/todo-create-button";
import { TodoCreateDrawer } from "./_components/todo-create-drawer";

export default async function TodosPage() {
  return (
    <>
      <TodoList />
      <TodoCreateButton
        className="fixed bottom-[calc(80px+20px)] right-10"
      />
      <TodoCreateDrawer />
    </>
  );
}
