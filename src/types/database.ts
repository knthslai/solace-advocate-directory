import { advocates } from "../db/schema";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

// Auto-generated types from Drizzle schema
export type Advocate = InferSelectModel<typeof advocates>;
export type NewAdvocate = InferInsertModel<typeof advocates>;

// Re-export the table schema for convenience
export { advocates };
