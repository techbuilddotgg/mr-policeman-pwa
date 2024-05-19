DO $$ BEGIN
 CREATE TYPE "public"."provider" AS ENUM('email', 'google');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
