import * as z from "zod";

const uuidSchema = z.uuid();

// Helper function to turn empty strings into null
const emptyToNull = (val: string | null) => 
  val === null || val.trim() === '' ? null : val;

const FlightSchema = z.object({
  flight_number: z.string().nullable().transform(emptyToNull),
  date: z.coerce.date().nullable(),
  departure: z.string().nullable().transform(emptyToNull),
  arrival: z.string().nullable().transform(emptyToNull),
  airline: z.string().nullable().transform(emptyToNull),
  aircraft_type: z.string().nullable().transform(emptyToNull),
  registration: z.string().nullable().transform(emptyToNull),
  notes: z.string().nullable().transform(emptyToNull),
});


export {
    uuidSchema, 
    FlightSchema
}

export type FlightInput = z.infer<typeof FlightSchema>;
export type UUID = z.infer<typeof uuidSchema>;
