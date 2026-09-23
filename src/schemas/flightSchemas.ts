import * as z from "zod";

const uuidSchema = z.uuid();

const emptyToNull = (val: string | null) => 
  val === null || val.trim() === '' ? null : val;

const FlightSchema = z.object({
  flight_number: z.string().nullable().transform(emptyToNull),
  date: z.preprocess((value) => value === "" ? null : value, z.coerce.date().nullable()),
  departure: z.string().nullable().transform(emptyToNull),
  arrival: z.string().nullable().transform(emptyToNull),
  airline: z.string().nullable().transform(emptyToNull),
  aircraft_type: z.string().nullable().transform(emptyToNull),
  registration: z.string().nullable().transform(emptyToNull),
  notes: z.string().nullable().transform(emptyToNull),
});

const EmailSchema = z.email();
const PasswordSchema = z.string();

export {
    uuidSchema, 
    FlightSchema,
    EmailSchema,
    PasswordSchema
}

export type FlightTypeSchema = z.infer<typeof FlightSchema>;
export type UUID = z.infer<typeof uuidSchema>;
export type Email = z.infer<typeof EmailSchema>;
export type Password = z.infer<typeof PasswordSchema>;
