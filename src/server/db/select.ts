import { eq } from "drizzle-orm";
import { db } from "./index";
import { type SelectWine, wines } from "./schema";
import { IWine } from "data/vinhos";

export async function getWines(): Promise<IWine[]> {
  return db.select().from(wines);
}

export async function getWineById(id: SelectWine["id"]): Promise<IWine[]> {
  return db.select().from(wines).where(eq(wines.id, id));
}
