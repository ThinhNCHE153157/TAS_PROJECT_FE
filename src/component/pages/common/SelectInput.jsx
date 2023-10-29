import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import { set } from "date-fns";

function SelectInput({ id, label, onChange = '', dropDown }) {
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    console.log("value", e.target.value)
    setValue(e.target.value)
    onChange({ [e.target.name]: e.target.value })
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="kdd">{label}</InputLabel>

        <Select
          id={id}
          size="small"
          labelId="kdd"
          label={label}
          value={value}
          name={id}
          onChange={handleChange}
        >
          {dropDown ? dropDown.map(item => (
            <MenuItem value={item.MA}>{item.TEN}</MenuItem>
          )) : <MenuItem value={''}></MenuItem>}
        </Select>

      </FormControl>
    </Box>
  );
}

export default SelectInput;
