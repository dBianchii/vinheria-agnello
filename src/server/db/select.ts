import { eq } from "drizzle-orm";
import { db } from "./index";
import { type SelectWine, wines } from "./schema";

export async function getWines() {
  return db.select().from(wines);
}

export async function getWineById(id: SelectWine["id"]) {
  return db.select().from(wines).where(eq(wines.id, id));
}
