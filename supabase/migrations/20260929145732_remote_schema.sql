SET local check_function_bodies = off;

CREATE TABLE "public"."flights" (
  "id"            uuid                        NOT NULL DEFAULT gen_random_uuid(),
  "date"          date,
  "flight_number" text,
  "registration"  text,
  "aircraft_type" text,
  "airline"       text,
  "departure"     text,
  "arrival"       text,
  "notes"         text,
  "created_at"    timestamp with time zone    NOT NULL DEFAULT now(),
  "updated_at"    timestamp without time zone DEFAULT now(),
  CONSTRAINT "flights_pkey" PRIMARY KEY (id),
  "user_id"       uuid                        NOT NULL DEFAULT auth.uid()
);

ALTER TABLE "public"."flights"
  ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE "public"."flights" FROM "anon";

CREATE OR REPLACE FUNCTION public.get_user_flight_stats (
  target_user_id uuid
)
  RETURNS json
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
declare
    flight_count integer;
    aircraft_count integer;
    airline_count integer;
begin
    -- 1. Count total flights for the user
    select count(*) into flight_count
    from flights
    where user_id = target_user_id;

    -- 2. Count unique aircraft types for the user
    select count(distinct aircraft_type) into aircraft_count
    from flights
    where user_id = target_user_id;

    -- 3. Count unique airlines for the user
    select count(distinct airline) into airline_count
    from flights
    where user_id = target_user_id;

    -- Return everything as a unified JSON object
    return json_build_object(
        'flight_count', flight_count,
        'aircraft_count', aircraft_count,
        'airline_count', airline_count
    );
end;
$function$;

CREATE OR REPLACE FUNCTION public.rls_auto_enable()
  RETURNS event_trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'pg_catalog'
  AS $function$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$function$;

CREATE EVENT TRIGGER "ensure_rls"
  ON ddl_command_end
  WHEN TAG IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
  EXECUTE FUNCTION "public"."rls_auto_enable"();

GRANT EXECUTE ON FUNCTION "public"."get_user_flight_stats"(uuid) TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

GRANT EXECUTE ON FUNCTION "public"."rls_auto_enable"() TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

REVOKE ALL ON TABLE "public"."flights" FROM "authenticated";

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE "public"."flights" TO "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."flights" TO "postgres", "service_role";

ALTER TABLE "public"."flights"
  ADD CONSTRAINT "flights_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id);

CREATE POLICY "Users can create their own flights" ON "public"."flights"
  FOR INSERT
  TO "authenticated"
  WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "Users can delete their own flights" ON "public"."flights"
  FOR DELETE
  TO "authenticated"
  USING ((auth.uid() = user_id));

CREATE POLICY "Users can read their own flights" ON "public"."flights"
  FOR SELECT
  TO "authenticated"
  USING ((auth.uid() = user_id));

CREATE POLICY "Users can update their own flights" ON "public"."flights"
  FOR UPDATE
  TO "authenticated"
  USING ((auth.uid() = user_id))
  WITH CHECK ((auth.uid() = user_id));

