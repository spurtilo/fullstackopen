import { v1 as uuid } from 'uuid';
import patientData from '../../data/patientData';
import { Entry, NewEntry, NewPatient, Patient } from '../types';

const getPatients = (): Patient[] => {
  return patientData.map(
    ({ id, name, ssn, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      ssn,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (patientObject: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient = { id, entries: [], ...patientObject };

  patientData.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = patientData.find((p) => p.id === id);
  return patient;
};

const addEntry = (
  patientId: string,
  entryObject: NewEntry
): Entry | undefined => {
  const patientToUpdate = findById(patientId);

  if (!patientToUpdate) {
    console.error(`Patient with ID ${patientId} not found.`);
    return undefined;
  }

  const entryId: string = uuid();
  const newEntry = { id: entryId, ...entryObject };
  patientToUpdate.entries.push(newEntry);
  patientData.map((obj) =>
    obj.id === patientToUpdate.id ? patientToUpdate : obj
  );

  return newEntry;
};

export default {
  getPatients,
  addPatient,
  findById,
  addEntry,
};
