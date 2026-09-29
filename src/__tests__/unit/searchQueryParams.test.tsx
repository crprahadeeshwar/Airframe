import { expect, test } from "vitest";
import { SearchQueryParamsSchema } from "@/src/schemas/flightSchemas";

test("accepts the default flight query", () => {
  const result = SearchQueryParamsSchema.parse({
    order: "newest",
    criteria: null,
    search: null,
  });

  expect(result).toEqual({
    order: "newest",
    criteria: null,
    search: null,
  });
});

test("accepts a combined search query", () => {
  const result = SearchQueryParamsSchema.parse({
    order: "oldest",
    criteria: "registration",
    search: "A6",
  });

  expect(result).toEqual({
    order: "oldest",
    criteria: "registration",
    search: "A6",
  });
});

test("rejects an invalid order", () => {
  expect(() =>
    SearchQueryParamsSchema.parse({
      order: "random",
      criteria: null,
      search: null,
    })
  ).toThrow();
});

test("rejects an invalid filter", () => {
  expect(() =>
    SearchQueryParamsSchema.parse({
      order: "newest",
      criteria: "all",
      search: null,
    })
  ).toThrow();
});