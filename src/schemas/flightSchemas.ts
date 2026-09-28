import * as z from "zod";

const uuidSchema = z.uuid();

const emptyToNull = (val: string | null) => 
  val === null || val.trim() === '' ? null : val;

const FlightInputSchema = z.object({
  flight_number: z.string().nullable().transform(emptyToNull),
  date: z.preprocess((value) => value === "" ? null : value, z.coerce.date().nullable()),
  departure: z.string().max(20, { message: "Cannot exceed 20 characters." }).nullable().transform(emptyToNull),
  arrival: z.string().nullable().transform(emptyToNull),
  airline: z.string().nullable().transform(emptyToNull),
  aircraft_type: z.string().nullable().transform(emptyToNull),
  registration: z.string().nullable().transform(emptyToNull),
  notes: z.string().nullable().transform(emptyToNull),
}).refine((flightData) => Object.values(flightData).some(value => value !== null), {
  message: "Atleast one field must be filled out",
});

const FlightSchema = z.object({
  id: z.uuid(),
  flight_number: z.string().nullable().transform(emptyToNull),
  date: z.preprocess((value) => value === "" ? null : value, z.coerce.date().nullable()),
  departure: z.string().nullable().transform(emptyToNull),
  arrival: z.string().nullable().transform(emptyToNull),
  airline: z.string().nullable().transform(emptyToNull),
  aircraft_type: z.string().nullable().transform(emptyToNull),
  registration: z.string().nullable().transform(emptyToNull),
  notes: z.string().nullable().transform(emptyToNull),
})

const EmailSchema = z.email();
const PasswordSchema = z.string();

export const criteriaSchema = z.enum([
  'flight_number',
  'registration',
  'airline',
  'aircraft_type',
  'departure',
  'arrival',
  'notes',
]).nullable();

export const orderSchema = z.enum(['oldest', 'newest']);

export const searchSchema = z.string().nullable();

export const SearchQueryParamsSchema = z.object({
  criteria: criteriaSchema,
  order: orderSchema,
  search: searchSchema,
});

export type FormState = {
  status: 'idle' | 'success' | 'error'
  errorMessage: string;
  errorType: "validation" | "operation" | "none";
}

export {
    uuidSchema, 
    FlightInputSchema,
    FlightSchema,
    EmailSchema,
    PasswordSchema
}

export type FlightTypeInputSchema = z.infer<typeof FlightSchema>;
export type FlightTypeSchema = z.infer<typeof FlightSchema>;
export type UUID = z.infer<typeof uuidSchema>;
export type Email = z.infer<typeof EmailSchema>;
export type Password = z.infer<typeof PasswordSchema>;
export type Criteria = z.infer<typeof criteriaSchema>;
export type Order = z.infer<typeof orderSchema>;
export type Search = z.infer<typeof searchSchema>;
export type QuerySchema = z.infer<typeof SearchQueryParamsSchema>;