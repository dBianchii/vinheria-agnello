import { and, eq, or, type SQL, max } from "drizzle-orm";
import { type searchParamsCache } from "~/app/products/_components/nuqs-parsers";
import { db, type DrizzleWhere } from "./index";
import { type SelectWine, wines } from "./schema";

export async function getWines(
  input?: Awaited<ReturnType<typeof searchParamsCache.parse>>,
) {
  const filterExpressions: (SQL<unknown> | undefined)[] = [
    input?.categoria
      ? or(...input.categoria.map((cat) => eq(wines.categoria, cat)))
      : undefined,

    input?.tipo ? or(...input.tipo.map((t) => eq(wines.tipo, t))) : undefined,

    input?.pais ? or(...input.pais.map((p) => eq(wines.pais, p))) : undefined,
  ];

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

export async function getMaxPrice() {
  const result = await db
    .select({ maxPrice: max(wines.preco) })
    .from(wines)
    .then((res) => res[0]?.maxPrice);
  return result;
}
