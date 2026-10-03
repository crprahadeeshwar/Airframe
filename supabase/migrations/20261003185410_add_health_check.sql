create or replace function public.health_check()
returns boolean
language sql
security invoker
as $$
    select true;
$$;

grant execute on function public.health_check() to anon, authenticated;