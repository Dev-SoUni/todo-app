import { NextRequest, NextResponse } from "next/server"
import { unstable_noStore as noStore } from "next/cache"
import { auth } from "@clerk/nextjs"

import { pool } from "@/lib/db"

export async function GET(
  req: NextRequest,
) {
  noStore()

  try {
    const searchParams = req.nextUrl.searchParams
    const date = searchParams.get("date")

    const { userId } = auth()

    let conn
    try {
      conn = await pool.getConnection()
      const rows = await conn.query(`
        SELECT *
        FROM todo
        WHERE user_id = '${userId}'
        ${date ? `AND date = '${date}'` : ""}
      `)

      return NextResponse.json(rows)
    }
    catch (error) {
      console.log("[GET_TODOS]", error)

      return new NextResponse("Database Error", { status: 500 })
    }
    finally {
      if (conn) await conn.release()
    }
  }
  catch (error) {
    return new NextResponse("INTERNAL SERVER ERROR", { status: 500 })
  }
}
