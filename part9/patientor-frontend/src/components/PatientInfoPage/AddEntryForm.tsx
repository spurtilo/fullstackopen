import { SyntheticEvent, useState } from 'react';
import { Diagnosis, HealthCheckRating, NewEntry } from '../../types';
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';

import DateInput from '../DateInput';
import DiagnosisSelect from './DiagnosisSelect';

interface AddEntryFormProps {
  selectedForm: string;
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
  diagnoses: Diagnosis[];
}

interface RatingOption {
  value: HealthCheckRating;
  label: string;
}

const ratingOptions: RatingOption[] = Object.values(HealthCheckRating)
  .filter((v): v is HealthCheckRating => typeof v === 'number')
  .map((v) => ({
    value: v,
    label: `${v.toString()} - ${HealthCheckRating[v]}`,
  }));

const BaseEntryForm = ({
  description,
  setDescription,
  setDate,
  specialist,
  setSpecialist,
  diagnosisData,
  diagnosisCodes,
  setDiagnosisCodes,
}: {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  specialist: string;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
  diagnosisData: Diagnosis[];
  diagnosisCodes: string[];
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return (
    <>
      <Grid item>
        <TextField
          variant="standard"
          fullWidth
          label="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
      </Grid>
      <Grid item>
        <DateInput
          label="Entry date"
          textFieldVariant="standard"
          setValue={setDate}
        />
      </Grid>
      <Grid item>
        <TextField
          variant="standard"
          fullWidth
          label="Specialist"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
      </Grid>
      <Grid item>
        <DiagnosisSelect
          diagnosisData={diagnosisData}
          diagnosisCodes={diagnosisCodes}
          setDiagnosisCodes={setDiagnosisCodes}
        />
      </Grid>
    </>
  );
};

const FormButtons = ({ onCancel }: { onCancel: () => void }) => {
  return (
    <Grid container justifyContent="space-between" sx={{ marginTop: '10px' }}>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Grid>
      <Grid item>
        <Button type="submit" variant="contained">
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

const AddEntryForm = ({
  selectedForm,
  onCancel,
  onSubmit,
  diagnoses,
}: AddEntryFormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );

  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState<string>('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>('');

  const onRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = Number(event.target.value);
    if (value in HealthCheckRating) {
      setHealthCheckRating(value);
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    switch (selectedForm) {
      case 'HealthCheck':
        onSubmit({
          type: 'HealthCheck',
          description,
          date,
          specialist,
          diagnosisCodes,
          healthCheckRating,
        });
        break;
      case 'Hospital':
        onSubmit({
          type: 'Hospital',
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
        });
        break;
      case 'OccupationalHealthcare':
        onSubmit({
          type: 'OccupationalHealthcare',
          description,
          date,
          specialist,
          diagnosisCodes,
          employerName,
          sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd },
        });
        break;

      default:
        break;
    }
  };

  switch (selectedForm) {
    case 'HealthCheck':
      return (
        <Box sx={{ p: 2, border: '1px dashed black' }}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            New Healthcheck Entry
          </Typography>
          <form onSubmit={addEntry}>
            <Grid container direction="column" rowSpacing={1}>
              <BaseEntryForm
                description={description}
                setDescription={setDescription}
                setDate={setDate}
                specialist={specialist}
                setSpecialist={setSpecialist}
                diagnosisData={diagnoses}
                diagnosisCodes={diagnosisCodes}
                setDiagnosisCodes={setDiagnosisCodes}
              />
              <Grid container item xs={12} direction="column" rowSpacing={1}>
                <Grid item>
                  <InputLabel sx={{ fontSize: '12px' }}>
                    Healthcheck rating
                  </InputLabel>
                </Grid>
                <Grid item>
                  <Select
                    variant="standard"
                    fullWidth
                    label="Healthcheck rating"
                    value={
                      healthCheckRating !== undefined
                        ? healthCheckRating.toString()
                        : ''
                    }
                    onChange={onRatingChange}
                  >
                    {ratingOptions.map((option) => (
                      <MenuItem key={option.label} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormButtons onCancel={onCancel} />
              </Grid>
            </Grid>
          </form>
        </Box>
      );
    case 'Hospital':
      return (
        <Box sx={{ p: 2, border: '1px dashed black' }}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            New Hospital Entry
          </Typography>
          <form onSubmit={addEntry}>
            <Grid container direction="column" rowSpacing={1}>
              <BaseEntryForm
                description={description}
                setDescription={setDescription}
                setDate={setDate}
                specialist={specialist}
                setSpecialist={setSpecialist}
                diagnosisData={diagnoses}
                diagnosisCodes={diagnosisCodes}
                setDiagnosisCodes={setDiagnosisCodes}
              />

              <Grid container item xs={12} spacing={2} direction="row">
                <Grid item xs={6}>
                  <DateInput
                    label="Discharge date"
                    textFieldVariant="standard"
                    setValue={setDischargeDate}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="standard"
                    label="Discharge criteria"
                    fullWidth
                    value={dischargeCriteria}
                    onChange={({ target }) =>
                      setDischargeCriteria(target.value)
                    }
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <FormButtons onCancel={onCancel} />
              </Grid>
            </Grid>
          </form>
        </Box>
      );
    case 'OccupationalHealthcare':
      return (
        <Box sx={{ p: 2, border: '1px dashed black' }}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            New Occupational Healthcare Entry
          </Typography>
          <form onSubmit={addEntry}>
            <Grid container direction="column" rowSpacing={1}>
              <BaseEntryForm
                description={description}
                setDescription={setDescription}
                setDate={setDate}
                specialist={specialist}
                setSpecialist={setSpecialist}
                diagnosisData={diagnoses}
                diagnosisCodes={diagnosisCodes}
                setDiagnosisCodes={setDiagnosisCodes}
              />
              <Grid item>
                <TextField
                  variant="standard"
                  label="Employer name"
                  fullWidth
                  value={employerName}
                  onChange={({ target }) => setEmployerName(target.value)}
                />
              </Grid>

              <Grid
                container
                item
                xs={12}
                spacing={2}
                direction="row"
                alignItems="center"
              >
                <Grid item>
                  <InputLabel>Sick leave</InputLabel>
                </Grid>
                <Grid item>
                  <DateInput
                    label="Start Date"
                    textFieldVariant="standard"
                    setValue={setSickLeaveStart}
                  />
                </Grid>
                <Grid item>
                  <DateInput
                    label="End Date"
                    textFieldVariant="standard"
                    setValue={setSickLeaveEnd}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <FormButtons onCancel={onCancel} />
              </Grid>
            </Grid>
          </form>
        </Box>
      );
    default:
      return null;
  }
};

export default AddEntryForm;
