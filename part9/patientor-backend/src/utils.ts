import { z } from 'zod';
import { Gender } from './types';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string().regex(/^[0-9]{6}[+Aa-][0-9]{3}[A-Za-z0-9]$/),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});
