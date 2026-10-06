CREATE OR REPLACE FUNCTION public.get_user_id_by_email(p_email text)
RETURNS TABLE(id uuid)
LANGUAGE sql
SECURITY DEFINER
SET search_path TO ''
AS $$
    SELECT au.id
    FROM auth.users AS au
    WHERE au.email = p_email;
$$;