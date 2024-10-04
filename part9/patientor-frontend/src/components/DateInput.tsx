import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useState } from 'react';

interface DateInputProps {
  label: string;
  textFieldVariant?: 'outlined' | 'filled' | 'standard';
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const DateInput = ({ label, textFieldVariant, setValue }: DateInputProps) => {
  const [dayJsObject, setDayJsObject] = useState<Dayjs | null>(null);

  const handleDateChange = (newValue: Dayjs | null) => {
    setDayJsObject(newValue);
    if (newValue) {
      const formattedDate = newValue.format('YYYY-MM-DD');
      setValue(formattedDate);
    } else {
      setValue('');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <DatePicker
        label={label}
        value={dayJsObject}
        onChange={(newValue) => handleDateChange(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant={textFieldVariant || 'outlined'}
            fullWidth
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
