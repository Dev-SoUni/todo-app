"use client";

import { format } from "date-fns";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { TodoForm, type TodoFormProps } from "@/components/todo/todo-form";
import { useServiceDispatch, useServiceState } from "@/hooks/use-service";
import { createTodo } from "@/actions/create-todo";

export const TodoCreateDrawer = () => {
  const { isCreateDrawerOpen } = useServiceState();
  const dispatch = useServiceDispatch();

  const handleOpenChange = (value: boolean) => {
    if (!value) dispatch({ type: "CLOSE_CREATE_DRAWER" });
  }

  const handleSubmit: TodoFormProps['onSubmit'] = (values) => {
    const formattedDate = format(values.date, "yyyy-MM-dd");

    createTodo({
      ...values,
      date: formattedDate,
    })
      .then((response) => {
        if (response.error) {
          alert(response.error);
        }
        if (response.success) {
          dispatch({ type: "CREATE_TODO", payload: response.data });
          dispatch({ type: "CLOSE_CREATE_DRAWER" });
        }
      })
      .catch(() => {
        alert("해당 요청을 처리하는 중 문제가 발생했습니다.");
      });
  }

  const handleClose = () => {
    dispatch({ type: "CLOSE_CREATE_DRAWER" });
  }

  return (
    <Drawer open={isCreateDrawerOpen} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>할 일 추가</DrawerTitle>
          <DrawerDescription>
            아래 항목을 입력하면 할 일을 추가할 수 있습니다.
          </DrawerDescription>
        </DrawerHeader>

        <TodoForm
          submitButtonText="등록"
          className="mt-4"
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      </DrawerContent>
    </Drawer>
  )
}
