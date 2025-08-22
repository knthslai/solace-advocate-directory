import db from "../../../db";
import { advocates } from "../../../types/database";
import { ilike, or, sql } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("search");

    let data;

    if (searchTerm && searchTerm.trim() !== "") {
      // Server-side filtering using Drizzle ORM operators
      const searchPattern = `%${searchTerm}%`;

      data = await db
        .select()
        .from(advocates)
        .where(
          or(
            ilike(advocates.firstName, searchPattern),
            ilike(advocates.lastName, searchPattern),
            ilike(advocates.city, searchPattern),
            ilike(advocates.degree, searchPattern),
            sql`${advocates.yearsOfExperience}::text ILIKE ${searchPattern}`,
            // For text array search, we need to use unnest
            sql`EXISTS (
              SELECT 1 FROM unnest(${advocates.specialties}) AS specialty
              WHERE specialty ILIKE ${searchPattern}
            )`
          )
        );
    } else {
      data = await db.select().from(advocates);
    }

    return Response.json({ data });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
