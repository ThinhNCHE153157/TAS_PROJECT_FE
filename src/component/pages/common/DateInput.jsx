import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { useState } from "react"
export default function DateInput(id, label) {
    const [selectedDate, setSelectedDate] = useState(null);
    console.log({ selectedDate })
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3} sx={{ width: '250px' }}>
                <DesktopDatePicker
                    label={label}
                    id={id}
                    name={id}
                    inputFormat={'DD/MM/YYYY'}
                    renderInput={(params) => <TextField {...params} />}
                    value={selectedDate}
                    // views={["day", "month"]}
                    // showDaysOutsideCurrentMonth
                    onChange={(newValue) => {
                        setSelectedDate(newValue)
                    }}
                />
            </Stack>
        </LocalizationProvider>

    )
}