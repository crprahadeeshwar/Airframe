drop function if exists public.get_user_flight_stats(uuid);

create or replace function public.get_user_flight_stats()
returns json
language plpgsql
security invoker
as $$
declare
    flight_count integer;
    aircraft_count integer;
    airline_count integer;
    current_user_id uuid;
begin
    current_user_id := auth.uid();

    if current_user_id is null then
        raise exception 'Unauthorized';
    end if;

    select count(*) into flight_count
    from public.flights
    where user_id = current_user_id;

    select count(distinct aircraft_type) into aircraft_count
    from public.flights
    where user_id = current_user_id;

    select count(distinct airline) into airline_count
    from public.flights
    where user_id = current_user_id;

    return json_build_object(
        'flight_count', flight_count,
        'aircraft_count', aircraft_count,
        'airline_count', airline_count
    );
end;
$$;