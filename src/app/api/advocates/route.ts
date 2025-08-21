import db from "../../../db";
import { advocates } from "../../../types/database";

export async function GET() {
  const data = await db.select().from(advocates);

  return Response.json({ data });
}
