import {Tabs, TabsContent} from "@/components/ui/tabs";

import {TodoHeader} from "./todo-header";
import {TodoList} from "./todo-list";
import {TodoFilter} from "./todo-filter";

export function TodoContain(){

  return (
    <Tabs defaultValue="todo">
      <TodoHeader/>
      <TodoFilter/>
      <TabsContent value="todo">
        <TodoList/>
      </TabsContent>
    </Tabs>
  )
}
