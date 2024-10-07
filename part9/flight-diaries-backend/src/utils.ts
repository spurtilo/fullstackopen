import { NewDiaryEntry, Weather, Visibility } from './types';
import { z } from 'zod';

export const NewEntrySchema = z.object({
  date: z.string().min(1, 'Date is required').date('Invalid date'),
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  comment: z.string().optional(),
});

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  return NewEntrySchema.parse(object);
};
