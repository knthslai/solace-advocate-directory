import db from "../../../db";
import { advocates } from "../../../types/database";
import { ilike, or, sql, count, asc } from "drizzle-orm";
import { simulateDbDelay } from "../../../services/performance-simulation";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Simulate database delays for testing
    await simulateDbDelay("select");

    let data;
    let totalResult;

    if (searchTerm && searchTerm.trim() !== "") {
      // Server-side filtering using Drizzle ORM operators
      const searchPattern = `%${searchTerm}%`;
      const searchCondition = or(
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
      );

      // Execute search queries - always sort by ID
      [data, totalResult] = await Promise.all([
        db
          .select()
          .from(advocates)
          .where(searchCondition)
          .orderBy(asc(advocates.id))
          .limit(limit)
          .offset(offset),
        db.select({ count: count() }).from(advocates).where(searchCondition),
      ]);
    } else {
      // No search - get all data, sort by ID
      [data, totalResult] = await Promise.all([
        db
          .select()
          .from(advocates)
          .orderBy(asc(advocates.id))
          .limit(limit)
          .offset(offset),
        db.select({ count: count() }).from(advocates),
      ]);
    }

    const total = Number(totalResult[0]?.count || 0);
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return Response.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
      search: searchTerm || null,
    });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
