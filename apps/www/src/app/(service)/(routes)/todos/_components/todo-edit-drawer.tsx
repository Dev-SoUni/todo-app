"use client";

import { format } from "date-fns";
import { CircleX } from "lucide-react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { TodoForm, type TodoFormProps } from "@/components/todo/todo-form";
import { useServiceDispatch, useServiceState } from "@/hooks/use-service";
import { editTodo } from "@/actions/edit-todo";

export const TodoEditDrawer = () => {
  const { isEditDrawerOpen, selectedEditTodo } = useServiceState();
  const dispatch = useServiceDispatch();

  const handleOpenChange = (value: boolean) => {
    if (!value) dispatch({ type: "CLOSE_EDIT_DRAWER" });
  }

  const handleSubmit: TodoFormProps['onSubmit'] = (values) => {
    if (!selectedEditTodo) return;

    const formattedDate = format(values.date, "yyyy-MM-dd");

    editTodo({
      todoId: selectedEditTodo.id,
      ...values,
      date: formattedDate,
    })
      .then((response) => {
        if (response.error) {
          alert(response.error);
        }
        if (response.success) {
          dispatch({ type: "EDIT_TODO", payload: response.data });
          dispatch({ type: "CLOSE_EDIT_DRAWER" });
        }
      })
      .catch(() => {
        alert("해당 요청을 처리하는 중 문제가 발생했습니다.");
      })
  }

  const handleClose = () => {
    dispatch({ type: "CLOSE_EDIT_DRAWER" });
  }

  return (
    <Drawer open={isEditDrawerOpen} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>할 일 수정</DrawerTitle>
          <DrawerDescription>
            아래 항목을 변경하여 할 일을 수정할 수 있습니다.
          </DrawerDescription>
        </DrawerHeader>

        {
          selectedEditTodo && (
            <TodoForm
              defaultTitle={selectedEditTodo.title}
              defaultDescription={selectedEditTodo.description || ""}
              defaultDate={selectedEditTodo.date}
              submitButtonText="변경사항 저장"
              className="mt-4"
              onSubmit={handleSubmit}
              onCancel={handleClose}
            />
          )
        }
        {
          !selectedEditTodo && (
            <div className="py-6">
              <div className="flex justify-center">
                <CircleX className="h-12 w-12 text-red-500" />
              </div>
              <p className="mt-2 text-center font-medium">
                죄송합니다. <br/>
                해당 서비스를 준비하는 중 문제가 발생했습니다.
              </p>
            </div>
          )
        }
      </DrawerContent>
    </Drawer>
  )
}
