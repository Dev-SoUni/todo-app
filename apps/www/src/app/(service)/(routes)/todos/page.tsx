import React from "react";

import { TodoCreateButton } from "./_components/todo-create-button";
import { TodoCreateDrawer } from "./_components/todo-create-drawer";
import { TodoEditDrawer } from "./_components/todo-edit-drawer";
import { TodoContainer } from "./_components/todo-container";

export default async function TodosPage() {
  return (
    <>
      <TodoContainer />
      <TodoCreateButton
        className="fixed bottom-[calc(80px+20px)] right-10"
      />
      <TodoCreateDrawer />
      <TodoEditDrawer />
    </>
  );
}
