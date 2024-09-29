DO $$ BEGIN
 CREATE TYPE "public"."categoria" AS ENUM('kit', 'singular');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vinheria-agnello_account" (
	"user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "vinheria-agnello_account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vinheria-agnello_order" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"wineId" integer NOT NULL,
	"status" varchar(256) NOT NULL,
	"total" numeric NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vinheria-agnello_session" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vinheria-agnello_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vinheria-agnello_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "vinheria-agnello_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vinheria-agnello_wine" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"img" varchar(256) NOT NULL,
	"vinicula" varchar(256) NOT NULL,
	"preco" numeric NOT NULL,
	"desconto" numeric(5, 2) NOT NULL,
	"descricao" text NOT NULL,
	"categoria" "categoria",
	"uva" varchar(256) NOT NULL,
	"pais" varchar(256) NOT NULL,
	"stars" numeric(2, 1) NOT NULL,
	"unidades" integer NOT NULL,
	"tipo" varchar(256),
	"safra" integer,
	"teoralcoolico" numeric(5, 2) NOT NULL,
	"temperaturaservico" varchar(256),
	"tipofechamento" varchar(256),
	"volume" varchar(256),
	"cor" varchar(256),
	"aroma" varchar(256),
	"sabor" varchar(256),
	"harmonizacao" varchar(256)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vinheria-agnello_account" ADD CONSTRAINT "vinheria-agnello_account_user_id_vinheria-agnello_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."vinheria-agnello_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vinheria-agnello_order" ADD CONSTRAINT "vinheria-agnello_order_userId_vinheria-agnello_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."vinheria-agnello_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vinheria-agnello_order" ADD CONSTRAINT "vinheria-agnello_order_wineId_vinheria-agnello_wine_id_fk" FOREIGN KEY ("wineId") REFERENCES "public"."vinheria-agnello_wine"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vinheria-agnello_session" ADD CONSTRAINT "vinheria-agnello_session_user_id_vinheria-agnello_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."vinheria-agnello_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_user_id_idx" ON "vinheria-agnello_account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_user_id_idx" ON "vinheria-agnello_order" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "vinheria-agnello_session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "vinheria-agnello_wine" USING btree ("name");