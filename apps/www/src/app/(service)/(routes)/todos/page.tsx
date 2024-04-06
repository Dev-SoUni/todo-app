import React from "react";

import { TodoHeader} from "./_components/todo-header";
import { TodoList } from "./_components/todo-list";
import { TodoCreateButton } from "./_components/todo-create-button";
import { TodoCreateDrawer } from "./_components/todo-create-drawer";
import { TodoEditDrawer } from "./_components/todo-edit-drawer";
import {TodoContain} from "@/app/(service)/(routes)/todos/_components/todo-contain";

export default async function TodosPage() {
  return (
    <>
      <TodoContain/>
      <TodoCreateButton
        className="fixed bottom-[calc(80px+20px)] right-10"
      />
      <TodoCreateDrawer />
      <TodoEditDrawer />
    </>
  );
}
