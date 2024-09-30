import { and, eq, or, type SQL } from "drizzle-orm";
import { type searchParamsCache } from "~/app/products/_components/shared";
import { db, type DrizzleWhere } from "./index";
import { type SelectWine, wines } from "./schema";

export async function getWines(
  input?: Awaited<ReturnType<typeof searchParamsCache.parse>>,
) {
  const filterExpressions: (SQL<unknown> | undefined)[] = [
    input?.categoria
      ? or(...input.categoria.map((cat) => eq(wines.categoria, cat)))
      : undefined,
  ];

  console.log(input);

  const where: DrizzleWhere<typeof wines.$inferSelect> = and(
    ...filterExpressions,
  );
  return db.select().from(wines).where(where);
}

export async function getWineById(id: SelectWine["id"]) {
  return db
    .select()
    .from(wines)
    .where(eq(wines.id, id))
    .then((res) => res[0]);
}
