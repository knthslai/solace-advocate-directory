import { advocates } from "@/types/database";
import { advocateData } from "./advocates";
import { count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "dotenv";

// Load environment variables from .env file
config();

async function main() {
  let sql: postgres.Sql | undefined;

  try {
    console.log("🚀 Starting database seeding...");

    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set");
    }

    // Create a dedicated connection for seeding
    sql = postgres(process.env.DATABASE_URL, { max: 1 });
    const db = drizzle(sql);

    // Check if data already exists to avoid duplicates
    const existingCount = await db.select({ count: count() }).from(advocates);
    const existingCountNum = Number(existingCount[0]?.count || 0);

    if (existingCountNum > 0) {
      console.log(
        `⚠️  Database already contains ${existingCountNum} advocates. Clearing existing data...`
      );
      await db.delete(advocates);
    }

    console.log(`📝 Inserting ${advocateData.length} advocates...`);

    // Use batch insert for better performance
    await db.insert(advocates).values(advocateData);

    // Verify the insertion
    const finalCount = await db.select({ count: count() }).from(advocates);
    const insertedCount = Number(finalCount[0]?.count || 0);

    console.log(`✅ Database seeding completed successfully!`);
    console.log(`📊 Total advocates in database: ${insertedCount}`);

    // Show a sample of the data
    const sample = await db.select().from(advocates).limit(3);
    console.log(`🔍 Sample data:`);
    sample.forEach((advocate, index) => {
      console.log(
        `   ${index + 1}. ${advocate.firstName} ${advocate.lastName} - ${
          advocate.city
        } (${advocate.specialties.length} specialties)`
      );
    });

    console.log("🎉 Seeding process completed!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    // Always close the database connection
    if (sql) {
      console.log("🔌 Closing database connection...");
      await sql.end();
    }
    console.log("👋 Goodbye!");
    process.exit(0);
  }
}

// Handle process termination gracefully
process.on("SIGINT", async () => {
  console.log("\n🛑 Seeding interrupted by user");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n🛑 Seeding terminated");
  process.exit(0);
});

main();
