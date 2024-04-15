import { Suspense } from "react";

import { TodoHeader } from "./todo-header";
import { TodoList } from "./todo-list";
import { TodoFilter } from "./todo-filter";
import { TodoListSkeleton } from "./todo-list-skeleton";

export function TodoContainer() {

  return (
    <>
      <TodoHeader />
      <div className="mt-4">
        <TodoFilter />
      </div>
      <Suspense fallback={<TodoListSkeleton />}>
        <TodoList />
      </Suspense>
    </>
  );
}
