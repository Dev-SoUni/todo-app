"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs";

import { pool } from "@/lib/db";
import { getTodoById } from "@/data/todo";

const Schema = z.object({
  title: z.string().min(1, "제목은 필수 입력 사항입니다."),
  description: z.string(),
  date: z.string().min(1, '날짜는 필수 입력 사항입니다.'),
});
type SchemaValeus = z.infer<typeof Schema>

export const createTodo = async (values: SchemaValeus) => {
  const validatedFields = Schema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "데이터가 올바르지 않습니다." }
  }

  const { title, description, date } = validatedFields.data;

  const { userId } = auth();
  if (!userId) {
    console.error("[createTodo]: 로그인한 사용자를 찾을 수 없습니다.");
    return { error: "로그인한 사용자를 찾을 수 없습니다." };
  }

  let conn;
  try {
    conn = await pool.getConnection();
    const { insertId } = await conn.query(`
      INSERT INTO todo (
                        user_id,
                        title,
                        description,
                        date
      ) VALUES (
                '${userId}',
                '${title}',
                '${description}',
                '${date}'
      )
    `);

    const insertedTodo = await getTodoById(insertId)

    return {
      success: "해당 데이터가 정상적으로 등록되었습니다.",
      data: insertedTodo!,
    };
  }
  catch (e) {
    console.error("할 일을 등록하는 중 문제가 발생했습니다.", e);
    return { error: "해당 요청을 처리하는 중 문제가 발생했습니다." };
  }
  finally {
    if (conn) await conn.release()
  }
}
