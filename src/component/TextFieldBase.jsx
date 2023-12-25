
import React, { useState } from "react";
import TextField from "@mui/material/TextField";

function TextFieldBase({ id, name, label, onChange, onChangeDetail, disable, defaultValue, isRequire = false, error = '', multiline = false, rows = 1 }) {
  const [value, setValue] = useState(defaultValue || '');
  const handleChange = (e) => {
    setValue(e.target.value)
    console.log(e.target.name, ": ", e.target.value)

    if (onChangeDetail) {
      onChangeDetail({
        'name': e.target.name,
        'value': e.target.value.trim()
      });
    } else {
      onChange({ [e.target.name]: e.target.value.trim() })
    }
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
      sx={{ maxWidth: 500 }}
      error={error !== ''}
      helperText={error}
      multiline={multiline}
      rows={rows}
    />
  );
}

export default TextFieldBase;
