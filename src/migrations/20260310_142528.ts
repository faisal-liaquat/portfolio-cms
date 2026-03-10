import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "site_settings_now_bar_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  ALTER TABLE "site_settings" ALTER COLUMN "status" SET DATA TYPE text;
  ALTER TABLE "site_settings" ALTER COLUMN "status" SET DEFAULT 'available'::text;
  DROP TYPE "public"."enum_site_settings_status";
  CREATE TYPE "public"."enum_site_settings_status" AS ENUM('available', 'busy', 'open to offers');
  ALTER TABLE "site_settings" ALTER COLUMN "status" SET DEFAULT 'available'::"public"."enum_site_settings_status";
  ALTER TABLE "site_settings" ALTER COLUMN "status" SET DATA TYPE "public"."enum_site_settings_status" USING "status"::"public"."enum_site_settings_status";
  ALTER TABLE "site_settings" ALTER COLUMN "name" SET DEFAULT 'Faisal Liaquat';
  ALTER TABLE "site_settings" ADD COLUMN "last_commit" varchar DEFAULT 'a4f3c1';
  ALTER TABLE "site_settings_now_bar_chips" ADD CONSTRAINT "site_settings_now_bar_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_now_bar_chips_order_idx" ON "site_settings_now_bar_chips" USING btree ("_order");
  CREATE INDEX "site_settings_now_bar_chips_parent_id_idx" ON "site_settings_now_bar_chips" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_now_bar_chips" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "site_settings_now_bar_chips" CASCADE;
  ALTER TABLE "site_settings" ALTER COLUMN "status" SET DATA TYPE text;
  ALTER TABLE "site_settings" ALTER COLUMN "status" SET DEFAULT 'available'::text;
  DROP TYPE "public"."enum_site_settings_status";
  CREATE TYPE "public"."enum_site_settings_status" AS ENUM('available', 'open', 'busy', 'unavailable');
  ALTER TABLE "site_settings" ALTER COLUMN "status" SET DEFAULT 'available'::"public"."enum_site_settings_status";
  ALTER TABLE "site_settings" ALTER COLUMN "status" SET DATA TYPE "public"."enum_site_settings_status" USING "status"::"public"."enum_site_settings_status";
  ALTER TABLE "site_settings" ALTER COLUMN "name" SET DEFAULT 'Faisal';
  ALTER TABLE "site_settings" DROP COLUMN "last_commit";`)
}
