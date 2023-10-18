import React, { useState } from "react";
import TextField from "@mui/material/TextField";

function TextInput({ id, label, onChange }) {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value)
    onChange({ [e.target.name]: e.target.value })
  };

  return (
    <TextField
      onChange={handleChange}
      value={value}
      name={id}
      id={id}
      size="small"
      fullWidth
      label={label}
      variant="outlined"
    />
  );
}

export default TextInput;
