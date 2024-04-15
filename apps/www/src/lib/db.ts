/**
 * MariaDB 데이터베이스
 */

import mariadb from "mariadb";

declare global {
  var pool: mariadb.Pool | undefined
}

export const pool = globalThis.pool || mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 5,
})

if (process.env.NODE_ENV !== "production") {
  globalThis.pool = pool
}
