-- Test users
INSERT INTO auth.users (
  id,
  email,
  raw_user_meta_data
)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'alice@test.airframe.local',
    '{}'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'bob@test.airframe.local',
    '{}'
  );


-- A's flights
INSERT INTO public.flights (
  id,
  user_id,
  date,
  flight_number,
  registration,
  aircraft_type,
  airline,
  departure,
  arrival,
  notes
)
VALUES
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '11111111-1111-1111-1111-111111111111',
    '2026-09-01',
    'EK525',
    'A6-EQH',
    'B777-300ER',
    'Emirates',
    'HYD',
    'DXB',
    'Alice flight 1'
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '11111111-1111-1111-1111-111111111111',
    '2026-09-10',
    'LH760',
    'D-ABYA',
    'A350-900',
    'Lufthansa',
    'DEL',
    'FRA',
    'Alice flight 2'
  );


-- B's flight
INSERT INTO public.flights (
  id,
  user_id,
  date,
  flight_number,
  registration,
  aircraft_type,
  airline,
  departure,
  arrival,
  notes
)
VALUES
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    '22222222-2222-2222-2222-222222222222',
    '2026-09-15',
    'SQ421',
    '9V-SMA',
    'A350-900',
    'Singapore Airlines',
    'BOM',
    'SIN',
    'Bob flight 1'
  );