import { sql } from "drizzle-orm/sql";
import { env } from "~/env";
import { db } from "~/server/db";

const url = new URL(env.DATABASE_URL);

async function emptyDBTables() {
  console.log("🗑️ Dropping the entire database");
  await db.execute(
    sql.raw(`DROP DATABASE ${url.pathname.slice(1)} WITH (FORCE)`),
  );
  await db.execute(sql.raw(`CREATE DATABASE ${url.pathname.slice(1)}`));
}

emptyDBTables()
  .then(() => {
    console.log("✅ Database dropped");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    //  db();
  });
