import { Suspense } from "react";

import { Tabs, TabsContent } from "@/components/ui/tabs";

import { TodoHeader } from "./todo-header";
import { TodoList } from "./todo-list";
import { TodoFilter } from "./todo-filter";
import { TodoListSkeleton } from "./todo-list-skeleton";

export function TodoContainer() {
  return (
    <Tabs defaultValue="todo">
      <TodoHeader/>
      <TodoFilter/>
      <TabsContent value="todo">
        <Suspense fallback={<TodoListSkeleton/>}>
          <TodoList/>
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}
