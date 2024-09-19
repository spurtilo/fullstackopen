import { v1 as uuid } from 'uuid';
import patientData from '../../data/patientData';
import { NewPatient, NonSensitivePatientInfo, Patient } from '../types';

const getPatients = (): NonSensitivePatientInfo[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patientObject: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient = { id, ...patientObject };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
};
