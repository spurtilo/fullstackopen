import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { Diagnosis } from '../../types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface DiagnosisSelectProps {
  diagnosisCodes: string[];
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>;
  diagnosisData: Diagnosis[];
}

const DiagnosisSelect = ({
  diagnosisCodes,
  setDiagnosisCodes,
  diagnosisData,
}: DiagnosisSelectProps) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <FormControl
        fullWidth
        sx={{ marginTop: '10px', maxWidth: '600px', textOverflow: 'ellipsis' }}
      >
        <InputLabel id="DiagnosisSelectLabel">Diagnosis codes</InputLabel>
        <Select
          labelId="DiagnosisSelectLabel"
          id="DiagnosisSelect"
          multiple
          value={diagnosisCodes}
          onChange={handleChange}
          input={<OutlinedInput label="Diagnosis codes" />}
          MenuProps={MenuProps}
        >
          {diagnosisData.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {`${d.code} - ${d.name}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DiagnosisSelect;
