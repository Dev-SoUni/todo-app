"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs";

import { getTodoById } from "@/data/todo";
import { pool } from "@/lib/db";

const Schema = z.object({
  todoId: z.number(),
  title: z.string().min(1, "제목은 필수 입력 사항입니다."),
  description: z.string(),
  date: z.string().min(1, '날짜는 필수 입력 사항입니다.'),
});
type SchemaValeus = z.infer<typeof Schema>

export const editTodo = async (values: SchemaValeus) => {
  const validatedFields = Schema.safeParse(values);
  if (!validatedFields.success) {
    console.error("데이터가 올바르지 않습니다", validatedFields.error.flatten().fieldErrors);
    return { error: "데이터가 올바르지 않습니다." }
  }

  const { todoId, title, description, date } = validatedFields.data;

  const { userId } = auth();
  if (!userId) {
    console.error("[editTodo]: 로그인한 사용자를 찾을 수 없습니다.");
    return { error: "로그인한 사용자를 찾을 수 없습니다." };
  }

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(`
      UPDATE todo
      SET title = '${title}',
          description = '${description}',
          date = '${date}'
      WHERE id = '${todoId}'
    `);

    const updatedTodo = await getTodoById(todoId);

    return {
      success: "해당 데이터가 정상적으로 수정되었습니다.",
      data: updatedTodo!,
    };
  }
  catch (e) {
    console.error("할 일을 수정하는 중 문제가 발생했습니다.", e);
    return { error: "해당 요청을 처리하는 중 문제가 발생했습니다." };
  }
  finally {
    if (conn) await conn.release()
  }
}
