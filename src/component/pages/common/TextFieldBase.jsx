import React, { useState } from "react";
import TextField from "@mui/material/TextField";

function TextFieldBase({ id, name, label, onChange, disable, defaultValue, isRequire = false, error }) {
  const [value, setValue] = useState(defaultValue || '');
  const handleChange = (e) => {
    setValue(e.target.value)
    console.log(e.target.name, ": ", e.target.value)
    onChange({ [e.target.name]: e.target.value.trim() })
  };
  return (
    <TextField
      onChange={handleChange}
      value={value}
      name={name}
      // id={id}
      size="Large"
      fullWidth
      label={label}
      // variant="outlined"
      disabled={disable}
      required={isRequire}
      sx={{ maxWidth: 400 }}
      error={error !== ''}
      helperText={error}
    />
  );
}

export default TextFieldBase;
