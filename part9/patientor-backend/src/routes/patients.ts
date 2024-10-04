import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import patientService from '../services/patientService';
import { Diagnosis, Entry, NewEntry, NewPatient, Patient } from '../types';
import {
  NewEntrySchema,
  NewPatientSchema,
  ParamsIdSchema,
} from '../zodSchemas';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    ParamsIdSchema.parse(req.params.id);
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const errorMiddleWare = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    console.log('ERROR: ', { error: error.issues });
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.post(
  '/:id/entries',
  newEntryParser,
  (
    req: Request<{ id: string }, unknown, NewEntry>,
    res: Response<Entry | undefined>
  ) => {
    const entryObject = {
      diagnosisCodes: parseDiagnosisCodes(req.body),
      ...req.body,
    };
    const newEntry = patientService.addEntry(req.params.id, entryObject);
    res.json(newEntry);
  }
);

router.use(errorMiddleWare);

export default router;
