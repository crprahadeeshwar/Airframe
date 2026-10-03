begin;

select plan(6);

-- ============================================================
-- Alice
-- ============================================================

set local role authenticated;
set local request.jwt.claim.sub =
  '11111111-1111-1111-1111-111111111111';

-- Alice can see her 2 flights.
select results_eq(
  'select count(*) from public.flights',
  ARRAY[2::bigint],
  'Alice can see only her own flights'
);

-- Alice cannot see Bob's flight.
select is(
  (
    select count(*)
    from public.flights
    where user_id = '22222222-2222-2222-2222-222222222222'
  ),
  0::bigint,
  'Alice cannot see Bob''s flights'
);

-- Alice can insert her own flight.
select lives_ok(
  $$
    insert into public.flights (
      user_id,
      flight_number,
      departure,
      arrival
    )
    values (
      '11111111-1111-1111-1111-111111111111',
      'TEST123',
      'HYD',
      'DXB'
    )
  $$,
  'Alice can insert her own flight'
);

-- Alice cannot insert a flight belonging to Bob.
select throws_ok(
  $$
    insert into public.flights (
      user_id,
      flight_number,
      departure,
      arrival
    )
    values (
      '22222222-2222-2222-2222-222222222222',
      'HACK123',
      'HYD',
      'DXB'
    )
  $$,
  '42501',
  null,
  'Alice cannot insert a flight belonging to Bob'
);

-- ============================================================
-- Bob
-- ============================================================

set local request.jwt.claim.sub =
  '22222222-2222-2222-2222-222222222222';

-- Bob sees exactly 1 flight.
select results_eq(
  'select count(*) from public.flights',
  ARRAY[1::bigint],
  'Bob can see only his own flight'
);

-- Bob cannot modify Alice's flights.
select results_eq(
  $$
    with updated as (
      update public.flights
      set notes = 'HACKED'
      where user_id = '11111111-1111-1111-1111-111111111111'
      returning id
    )
    select count(*)::bigint
    from updated
  $$,
  $$ values (0::bigint) $$,
  'Bob cannot update Alice''s flights'
);

select * from finish();

rollback;