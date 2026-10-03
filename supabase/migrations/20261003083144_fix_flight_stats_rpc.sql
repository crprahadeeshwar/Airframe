-- Remove both old RPC signatures.
DROP FUNCTION IF EXISTS public.get_user_flight_stats(uuid);
DROP FUNCTION IF EXISTS public.get_user_flight_stats();

-- Create one canonical, typed RPC.
CREATE FUNCTION public.get_user_flight_stats()
RETURNS TABLE (
    flight_count integer,
    aircraft_count integer,
    airline_count integer
)
LANGUAGE plpgsql
SECURITY INVOKER
AS $function$
DECLARE
    current_user_id uuid;
BEGIN
    current_user_id := auth.uid();

    IF current_user_id IS NULL THEN
        RAISE EXCEPTION 'Unauthorized';
    END IF;

    SELECT count(*)
    INTO flight_count
    FROM public.flights
    WHERE user_id = current_user_id;

    SELECT count(DISTINCT aircraft_type)
    INTO aircraft_count
    FROM public.flights
    WHERE user_id = current_user_id;

    SELECT count(DISTINCT airline)
    INTO airline_count
    FROM public.flights
    WHERE user_id = current_user_id;

    RETURN NEXT;
END;
$function$;

GRANT EXECUTE ON FUNCTION public.get_user_flight_stats()
TO authenticated;