import { useContext } from 'react';

import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Diagnosis, Entry, HealthCheckRating } from '../../types';
import { DiagnosesContext } from '../../contexts/ContextProvider';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HealthRatingIcon = ({
  healthRating,
}: {
  healthRating: HealthCheckRating;
}) => {
  let styling;
  switch (healthRating) {
    case 0:
      styling = { color: 'green', display: 'block' };
      break;
    case 1:
      styling = { color: 'yellow', display: 'block' };
      break;
    case 2:
      styling = { color: 'orange', display: 'block' };
      break;
    case 3:
      styling = { color: 'red', display: 'block' };
      break;
    default:
      styling = { color: 'transparent', display: 'none' };
      break;
  }
  return <FavoriteIcon sx={styling} />;
};

const TypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'HealthCheck':
      return <MedicalServicesIcon />;
    case 'Hospital':
      return <LocalHospitalIcon />;
    case 'OccupationalHealthcare':
      return <WorkIcon />;
    default:
      assertNever(type as never);
  }
};

const BaseEntry = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  const populateDiagnosisName = (diagnosisCode: string) => {
    const result = diagnoses.find((d) => d.code === diagnosisCode);
    if (result) {
      return `${result.code} ${result.name}`;
    }
    return diagnosisCode;
  };

  return (
    <>
      <Grid container item columnSpacing={1}>
        <Grid item>
          <Typography variant="subtitle1">{entry.date}</Typography>
        </Grid>
        <Grid item>
          <TypeIcon type={entry.type} />
        </Grid>
        <Grid item>
          <Typography
            variant="body1"
            sx={{
              marginBottom: '10px',
            }}
          >
            Diagnose by {entry.specialist}
          </Typography>
        </Grid>
      </Grid>

      <Grid item>
        <Typography
          variant="body1"
          sx={{
            fontStyle: 'italic',
            marginBottom: '10px',
          }}
        >
          {entry.description}
        </Typography>
      </Grid>

      <Grid item sx={{ marginBottom: '10px' }}>
        <List
          sx={{
            padding: '1px',
            margin: '0px',
            marginLeft: '25px',
            listStyleType: 'disc',
          }}
        >
          {entry.diagnosisCodes?.map((code) => (
            <ListItem
              key={code}
              disablePadding
              sx={{
                display: 'list-item',
              }}
            >
              <ListItemText>{populateDiagnosisName(code)}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Grid>
    </>
  );
};

const entryBoxStyle = {
  border: '1px solid black',
  padding: '5px',
  borderRadius: '5px',
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const { diagnoses } = useContext(DiagnosesContext);

  switch (entry.type) {
    case 'HealthCheck':
      return (
        <Grid container item direction="column" sx={entryBoxStyle}>
          <BaseEntry entry={entry} diagnoses={diagnoses} />
          <Grid item>
            <HealthRatingIcon healthRating={entry.healthCheckRating} />
          </Grid>
        </Grid>
      );
    case 'Hospital':
      return (
        <Grid container item direction="column" sx={entryBoxStyle}>
          <BaseEntry entry={entry} diagnoses={diagnoses} />
          <Grid item>
            <Typography
              variant="body1"
              sx={{
                marginBottom: '10px',
              }}
            >
              {entry.discharge?.date &&
                `Discharge: ${entry.discharge.date} ${entry.discharge.criteria}`}
            </Typography>
          </Grid>
        </Grid>
      );
    case 'OccupationalHealthcare':
      return (
        <Grid container item direction="column" sx={entryBoxStyle}>
          <BaseEntry entry={entry} diagnoses={diagnoses} />
          <Grid item>
            <Typography
              variant="body1"
              sx={{
                marginBottom: '10px',
              }}
            >
              {`Employer: ${entry.employerName}`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="body1"
              sx={{
                marginBottom: '10px',
              }}
            >
              {entry.sickLeave?.startDate &&
                `Sick leave: ${entry.sickLeave.startDate} - ${entry.sickLeave.endDate}`}
            </Typography>
          </Grid>
        </Grid>
      );

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
