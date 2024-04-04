"use server";

import { auth } from "@clerk/nextjs";

import { pool } from "@/lib/db";

export const deleteTodo = async (todoId: number) => {
  const { userId } = auth();
  if (!userId) {
    console.error("[createTodo]: 로그인한 사용자를 찾을 수 없습니다.");
    return { error: "로그인한 사용자를 찾을 수 없습니다." };
  }

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(`
      DELETE FROM todo
      WHERE id = '${todoId}'
    `);

    return { success: "해당 데이터가 정상적으로 삭제되었습니다." };
  }
  catch (e) {
    console.error("할 일을 삭제하는 중 문제가 발생했습니다.", e);
    return { error: "해당 요청을 처리하는 중 문제가 발생했습니다." };
  }
  finally {
    if (conn) await conn.release()
  }
}
