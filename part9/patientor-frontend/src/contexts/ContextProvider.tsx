import { createContext, ReactNode, useEffect, useState } from 'react';
import { Diagnosis, Patient } from '../types';
import axios from 'axios';

import { apiBaseUrl } from '../constants';
import patientService from '../services/patients';
import diagnosisService from '../services/diagnoses';

interface PatientsContextType {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}
interface DiagnosesContextType {
  diagnoses: Diagnosis[];
  setDiagnoses: React.Dispatch<React.SetStateAction<Diagnosis[]>>;
}

export const PatientsContext = createContext<PatientsContextType>({
  patients: [],
  setPatients: () => {},
});
export const DiagnosesContext = createContext<DiagnosesContextType>({
  diagnoses: [],
  setDiagnoses: () => {},
});

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchData = async () => {
      try {
        const patients = await patientService.getAll();
        setPatients(patients);

        const diagnoses = await diagnosisService.getAll();
        setDiagnoses(diagnoses);
      } catch (error) {
        console.error(error);
      }
    };
    void fetchData();
  }, []);

  return (
    <PatientsContext.Provider value={{ patients, setPatients }}>
      <DiagnosesContext.Provider value={{ diagnoses, setDiagnoses }}>
        {children}
      </DiagnosesContext.Provider>
    </PatientsContext.Provider>
  );
};

export default ContextProvider;
