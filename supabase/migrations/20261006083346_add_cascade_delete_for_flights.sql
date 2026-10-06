ALTER TABLE public.flights
  DROP CONSTRAINT flights_user_id_fkey;

ALTER TABLE public.flights
  ADD CONSTRAINT flights_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES auth.users(id)
  ON DELETE CASCADE;