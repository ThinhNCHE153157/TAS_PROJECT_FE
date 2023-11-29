import React from 'react'
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const DatePickerBase = ({
  label,
  name,
  error,
  onChange,
}) => {

  const [value, setValue] = React.useState(dayjs());
  const handleOnChange = (newValue, name) => {

    console.log(newValue)
    setValue(newValue)
    onChange({ [name]: newValue.format('YYYY-MM-DD') })
    console.log('Name:', name)
    console.log('Selected Date:', newValue.format('YYYY-MM-DD'));
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        name={name}
        error={error !== ''}
        helperText={error}
        onChange={(newValue) => handleOnChange(newValue, name)}
      />
    </LocalizationProvider>
  );
}

export default DatePickerBase