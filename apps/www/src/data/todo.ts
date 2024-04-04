import { pool } from "@/lib/db";
import type { Todo } from "@/ts/schema.t";

/**
 * 해당 'userId'에 해당하는 할 일 전체 데이터 조회
 */
export const getTodosByUserId = async (userId: number): Promise<Todo[]> => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`
      SELECT *
      FROM todo
      WHERE user_id = '${userId}'
    `);

    return rows;
  }
  finally {
    if (conn) conn.release();
  }
}

/**
 * 해당 'id'에 해당하는 할 일 데이터 조회
 */
export const getTodoById = async (id: number): Promise<Todo | null> => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`
      SELECT *
      FROM todo
      WHERE id = '${id}'
    `);

    if (rows.length === 0) return null

    return rows[0];
  }
  finally {
    if (conn) conn.release();
  }
}
