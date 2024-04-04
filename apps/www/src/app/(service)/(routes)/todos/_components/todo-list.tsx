"use client";

import { TodoItem } from "@/components/todo/todo-item";
import { useServiceState, useServiceDispatch } from "@/hooks/use-service";
import { toggleTodo } from "@/actions/toggle-todo";

export const TodoList = () => {
  const { todos } = useServiceState();
  const dispatch = useServiceDispatch();

  return (
    <div>
      {
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            name="정보 없음 (추후 빠질 수 있음)"
            description={todo.description || ""}
            date={todo.date}
            checked={Boolean(todo.is_done)}
            onCheckedChange={() => {
              toggleTodo(todo.id)
                .then((response) => {
                  if (response.error) {
                    alert(response.error);
                  }
                  if (response.success) {
                    dispatch({ type: "TOGGLE_TODO", payload: todo.id });
                  }
                })
                .catch(() => {
                  alert("해당 요청을 처리하는 중 문제가 발생했습니다.");
                })
            }}
          />
        ))
      }
    </div>
  )
}
