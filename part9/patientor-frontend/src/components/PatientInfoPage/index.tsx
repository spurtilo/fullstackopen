import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { Alert, Box, Grid, Typography } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import patientService from '../../services/patients';
import { Diagnosis, Entry, NewEntry, Patient, ZodIssue } from '../../types';

import EntryDetails from './EntryDetails';
import AddEntryForm from './AddEntryForm';
import AddEntryMenu from './AddEntryMenu';

interface Props {
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  diagnoses: Diagnosis[];
}

const PatientInfo = ({ setPatients, diagnoses }: Props) => {
  const [formVisibility, setFormVisibility] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const { state: patient }: { state: Patient } = useLocation();
  const { id: patientId, name, ssn, occupation, gender, entries } = patient;
  const [localEntries, setLocalEntries] = useState<Entry[]>(entries || []);

  const [selectedForm, setSelectedForm] =
    useState<Entry['type']>('HealthCheck');

  const openForm = (): void => setFormVisibility(true);

  const closeForm = (): void => {
    setFormVisibility(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const newEntry = await patientService.createEntry(patientId, values);
      setLocalEntries((prevEntries) => [...prevEntries, newEntry]);
      setPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient.id === patientId
            ? { ...patient, entries: [...patient.entries, newEntry] }
            : patient
        )
      );
      setFormVisibility(false);
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data.error && Array.isArray(e?.response?.data.error)) {
          const firstError: ZodIssue = e?.response?.data.error[0];
          const message = `ERROR: ${firstError.message}`;
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <Box sx={{ margin: '0', padding: '0', marginTop: '1em' }}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">
            {name}
            {gender === 'male' ? (
              <MaleIcon />
            ) : gender === 'female' ? (
              <FemaleIcon />
            ) : (
              <TransgenderIcon />
            )}
          </Typography>
        </Grid>

        <Grid container item xs={12} direction="column" rowSpacing={1}>
          <Grid item>
            <Typography>ssn: {ssn}</Typography>
          </Grid>
          <Grid item>
            <Typography>occupation: {occupation}</Typography>
          </Grid>
        </Grid>

        <Grid item>{error && <Alert severity="error">{error}</Alert>}</Grid>

        <Grid item>
          {formVisibility ? (
            <AddEntryForm
              selectedForm={selectedForm}
              onSubmit={submitNewEntry}
              onCancel={closeForm}
              diagnoses={diagnoses}
            />
          ) : (
            <AddEntryMenu
              setSelectedForm={setSelectedForm}
              openForm={openForm}
            />
          )}
        </Grid>

        <Grid item>
          <Typography align="left" variant="h6">
            Entries
          </Typography>
        </Grid>

        <Grid container item direction="column" rowGap={2}>
          {localEntries &&
            localEntries.map((entry) => {
              return (
                <EntryDetails
                  key={entry.id}
                  entry={entry}
                  diagnoses={diagnoses}
                />
              );
            })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientInfo;
