"use client";

import { useMemo } from "react";

import { TodoItem } from "@/components/todo/todo-item";
import { useServiceState, useServiceDispatch } from "@/hooks/use-service";
import { toggleTodo } from "@/actions/toggle-todo";
import { deleteTodo } from "@/actions/delete-todo";

export  const TodoList = async () => {
  const { todos, filter } = useServiceState();
  const dispatch = useServiceDispatch();

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "all":
        return todos
      case "1":
        return todos.filter((todo) => todo.is_done)
      case "0":
        return todos.filter((todo) => !todo.is_done)
      default:
        return todos
    }
  }, [todos, filter])

  return (
    <div>
      {
        filteredTodos.map((todo) => (
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
            onEdit={() => {
              dispatch({ type: "OPEN_EDIT_DRAWER", payload: todo });
            }}
            onDelete={() => {
              deleteTodo(todo.id)
                .then((response) => {
                  if (response.error) {
                    alert(response.error);
                  }
                  if (response.success) {
                    dispatch({ type: "DELETE_TODO", payload: todo.id });
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
  );
}
