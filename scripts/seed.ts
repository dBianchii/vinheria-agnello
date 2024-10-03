import { getTableColumns } from "drizzle-orm";
import { type PgTable } from "drizzle-orm/pg-core";
import { type SQL, sql } from "drizzle-orm/sql";
import { db } from "~/server/db";
import {
  grapes,
  harmonizations,
  wines,
  winesToGrapes,
  winesToHarmonizations,
} from "~/server/db/schema";
import { _wines } from "./wines-data";

const _harmonizacoes = [
  "Carnes vermelhas",
  "Carnes brancas",
  "Massas ou pizzas",
  "Frutos do mar",
  "Queijos",
  "Saladas ou aperitivos",
  "Sobremesas",
  "Carnes de caça",
  "Risotos",
] satisfies (typeof harmonizations.$inferInsert.name)[];
const _grapes = [
  "Tempranillo",
  "Grenache",
  "Merlot",
  "Sauvignon Blanc",
  "Verdejo",
  "Uvas variadas",
  "Moscatel",
  "Pinot Noir",
  "Airén",
  "Chardonnay",
  "Syrah",
  "Carménère",
  "Primitivo",
  "Malbec",
  "Nebbiolo",
  "Cabernet Sauvignon",
  "Antão Vaz",
  "Verdelho",
  "Arinto",
  "Alicante Branco",
  "Tamarez",
  "Chenin Blanc",
  "Cinsault",
  "Tibouren",
] satisfies (typeof grapes.$inferInsert.name)[];

void (async () => {
  //? 1. Insert wines
  const winesToInsert = _wines.map(
    ({ harmonizacao: _, grapes: __, ...rest }) => ({
      //Rm harmonizacao and grapes
      ...rest,
    }),
  );
  const keys = Object.keys(
    winesToInsert[0]!,
  ) as (keyof typeof wines._.columns)[];
  await db
    .insert(wines)
    .values(winesToInsert)
    .onConflictDoUpdate({
      target: wines.id,
      set: buildConflictUpdateColumns(wines, keys),
    })
    .returning({ id: wines.id });

  //? 2. Insert harmonizations and grapes
  const missingHarms = _wines
    .flatMap(({ harmonizacao }) => harmonizacao)
    .filter((x) => !_harmonizacoes.includes(x));
  if (missingHarms.length)
    throw new Error(`Missing harmonizations: ${missingHarms.join(", ")}`);

  const missingGrapes = _wines
    .flatMap(({ grapes }) => grapes)
    .filter((x) => !_grapes.includes(x));
  if (missingGrapes.length)
    throw new Error(`Missing grapes: ${missingGrapes.join(", ")}`);

  await db
    .insert(harmonizations)
    .values(_harmonizacoes.map((name) => ({ name })))
    .onConflictDoNothing();
  await db
    .insert(grapes)
    .values(_grapes.map((name) => ({ name })))
    .onConflictDoNothing();
  const allHarmonizations = await db.select().from(harmonizations);
  const allGrapes = await db.select().from(grapes);

  //? 3. Insert relations for wines/harmonizations and wines/grapes
  const winesToHarmonizationsToInsert = _wines.flatMap(({ harmonizacao, id }) =>
    harmonizacao.map((name) => ({
      wineId: id,
      harmonizationId: allHarmonizations.find((x) => x.name === name)!.id,
    })),
  );
  await db
    .insert(winesToHarmonizations)
    .values(winesToHarmonizationsToInsert)
    .onConflictDoNothing();

  const winesToGrapesToInsert = _wines.flatMap(({ grapes, id }) =>
    grapes.map((name) => ({
      wineId: id,
      grapeId: allGrapes.find((x) => x.name === name)!.id,
    })),
  );
  await db
    .insert(winesToGrapes)
    .values(winesToGrapesToInsert)
    .onConflictDoNothing();
})()
  .then(() => {
    console.log("Seeded!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

//? Helper function created with love by andrew sherman love u andrew sherman
//? https://orm.drizzle.team/learn/guides/upsert#postgresql-and-sqlite
function buildConflictUpdateColumns<
  T extends PgTable,
  Q extends keyof T["_"]["columns"],
>(table: T, columns: Q[]) {
  const cls = getTableColumns(table);
  return columns.reduce(
    (acc, column) => {
      const colName = cls[column]!.name;
      acc[column] = sql.raw(`excluded.${colName}`);
      return acc;
    },
    {} as Record<Q, SQL>,
  );
}
