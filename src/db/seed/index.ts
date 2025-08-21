import { seedAdvocates } from "./advocates";

async function main() {
  try {
    console.log("Starting database seeding...");
    await seedAdvocates();
    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

main();
