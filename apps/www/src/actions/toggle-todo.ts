"use server";

import { auth } from "@clerk/nextjs";

import { getTodoById } from "@/data/todo";
import { pool } from "@/lib/db";
import type { Todo } from "@/ts/schema.t";

/**
 * 할일 완료 여부 토글
 */
export const toggleTodo = async (todoId: string) => {
  const { userId } = auth();
  if (!userId) {
    console.error("[toggleTodo]: 로그인한 사용자를 찾을 수 없습니다.");
    return { error: "로그인한 사용자를 찾을 수 없습니다." };
  }

  const todo = await getTodoById(todoId);
  if (!todo) {
    console.error(`해당 Todo(id=${todoId})를 찾을 수 없습니다.`);
    return { error: "해당 할 일 데이터를 찾을 수 없습니다." };
  }

  if (todo.user_id !== userId) {
    console.error("해당 할 일을 수정할 권한이 없습니다. (자신이 등록한 할 일이 아님)");
    return { error: "해당 할 일을 수정할 권한이 없습니다." };
  }

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(`
        UPDATE todo
        SET is_done = ${!Boolean(todo.is_done)}
        WHERE id = ${todo.id}
    `);

    return {
      success: "해당 데이터가 정상적으로 수정되었습니다.",
      data: {
        ...todo,
        is_done: todo.is_done === 0 ? 1 : 0
      } as Todo,
    };
  }
  catch (e) {
    console.error("할 일 여부를 토글하는 중 문제가 발생했습니다.", e);
    return { error: "해당 요청을 처리하는 중 문제가 발생했습니다." };
  }
  finally {
    if (conn) conn.release();
  }
}
