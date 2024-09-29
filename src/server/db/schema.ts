import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  numeric,
  pgEnum,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `vinheria-agnello_${name}`);

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

const percentageColumn = (columnName: string) =>
  numeric(columnName, { precision: 5, scale: 2 }).$type<number>(); //E.G. -> 123.00 (p=5, s=2)

export const categoriaEnum = pgEnum("categoria", ["kit", "singular"]);

export const wines = createTable(
  "wine",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    img: varchar("img", { length: 256 }).notNull(),
    vinicula: varchar("vinicula", { length: 256 }).notNull(),
    preco: numeric("preco").$type<number>().notNull(),
    desconto: percentageColumn("desconto").notNull(),
    descricao: text("descricao").notNull(),
    categoria: categoriaEnum("categoria"),
    uva: varchar("uva", { length: 256 }).notNull(),
    pais: varchar("pais", { length: 256 }).notNull(),
    stars: numeric("stars", { precision: 2, scale: 1 }).$type<number>().notNull(), // Changed to numeric with precision and scale
    unidades: integer("unidades").notNull(),
    tipo: varchar("tipo", { length: 256 }),
    safra: integer("safra"),
    teoralcoolico: percentageColumn("teoralcoolico").notNull(), //?lowercase bc... https://github.com/drizzle-team/drizzle-orm/issues/3024
    temperaturaservico: varchar("temperaturaservico", { length: 256 }),
    tipofechamento: varchar("tipofechamento", { length: 256 }),
    volume: varchar("volume", { length: 256 }),
    cor: varchar("cor", { length: 256 }),
    aroma: varchar("aroma", { length: 256 }),
    sabor: varchar("sabor", { length: 256 }),
    harmonizacao: varchar("harmonizacao", { length: 256 }),
  },
  (wine) => ({
    nameIndex: index("name_idx").on(wine.name),
  }),
);

export const winesRelations = relations(wines, ({ many }) => ({
  orders: many(orders),
}));

export const orders = createTable(
  "order",
  {
    id: serial("id").primaryKey().notNull(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    wineId: integer("wineId")
      .notNull()
      .references(() => wines.id),
    status: varchar("status", { length: 256 }).notNull(),
    total: numeric("total").notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (order) => ({
    userIdIdx: index("order_user_id_idx").on(order.userId),
  }),
);

export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  wine: one(wines, { fields: [orders.wineId], references: [wines.id] }),
}));


export type SelectWine = typeof wines.$inferSelect;