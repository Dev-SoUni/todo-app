import { pool } from "@/lib/db";

/**
 * 할 일 전체 데이터 조회
 */
export const getTodos = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`
      SELECT *
      FROM todo
    `);

    return rows
  }
  finally {
    if (conn) conn.release();
  }
}
