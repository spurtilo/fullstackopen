import { z } from 'zod';
import { Gender, HealthCheckRating } from './types';

export const ParamsIdSchema = z
  .string()
  .min(1, 'Id is required and must be a string');

export const NewPatientSchema = z.object({
  name: z.string().min(5, 'Name is too short or missing (min 5 characters)'),
  ssn: z
    .string()
    .min(1, 'Social security number is required')
    .regex(
      /^[0-9]{6}[+Aa-][0-9]{3}[A-Za-z0-9]$/,
      'Invalid social security number'
    ),
  dateOfBirth: z.string().min(1, 'Date is required').date('Invalid date'),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(1, 'Occupation is required'),
});

export const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required').date('Invalid date'),
  specialist: z.string().min(1, 'Specialist is required'),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({ date: z.string(), criteria: z.string() }).optional(),
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string().min(1, 'Employer is required'),
  sickLeave: z
    .object({ startDate: z.string(), endDate: z.string() })
    .optional(),
});

export const EntrySchema = z.union([
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);

const createOmits = {
  id: true,
} as const;

export const NewEntrySchema = z.union([
  HealthCheckEntrySchema.omit(createOmits),
  HospitalEntrySchema.omit(createOmits),
  OccupationalHealthcareEntrySchema.omit(createOmits),
]);
