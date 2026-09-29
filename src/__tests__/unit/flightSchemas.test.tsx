import { expect, test } from "vitest";
import { FlightInputSchema } from "@/src/schemas/flightSchemas";

test("accepts a valid flight", () => {
  const testData = {
    flight_number: "EK525",
    date: "2026-09-29",
    departure: "HYD",
    arrival: "DXB",
    airline: "Emirates",
    aircraft_type: "B777-300ER",
    registration: "A6-EQH",
    notes: "Window seat",
  };

  const result = FlightInputSchema.parse(testData);

  expect(result).toEqual({
    flight_number: "EK525",
    date: new Date("2026-09-29"),
    departure: "HYD",
    arrival: "DXB",
    airline: "Emirates",
    aircraft_type: "B777-300ER",
    registration: "A6-EQH",
    notes: "Window seat",
  });
});

test("rejects an empty flight form", () => {
  const testData = {
    flight_number: "",
    date: "",
    departure: "",
    arrival: "",
    airline: "",
    aircraft_type: "",
    registration: "",
    notes: "",
  };

  expect(() => FlightInputSchema.parse(testData)).toThrow();
});

test("empty strings become null", () => {

  const testData = {
    flight_number: "EK525",
    date: "2026-09-29",
    departure: "HYD",
    arrival: "DXB",
    airline: "Emirates",
    aircraft_type: "",
    registration: "A6-EQH",
    notes: "Window seat",
  };

  const result = FlightInputSchema.parse(testData);

  expect(result.aircraft_type).toBeNull();

});

test ("empty dates become null", () => {
  const testData = {
    flight_number: "EK525",
    date: "",
    departure: "HYD",
    arrival: "DXB",
    airline: "Emirates",
    aircraft_type: "",
    registration: "A6-EQH",
    notes: "Window seat",
  };

  const result = FlightInputSchema.parse(testData);

  expect(result.date).toBeNull();
})