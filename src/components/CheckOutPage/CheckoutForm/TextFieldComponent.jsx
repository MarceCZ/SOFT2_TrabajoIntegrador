import React from 'react';
import { TextField } from '@mui/material';
import { commonInputStyles } from './style';

const TextFieldComponent = ({ label, name, value, onChange, required, disabled }) => (
  <TextField
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    disabled={disabled}
    variant="outlined"
    fullWidth
    InputProps={{ sx: commonInputStyles }}
    InputLabelProps={{ sx: { pl: 1 } }}
    sx={{ mt: 0.5 }}
  />
);

export default TextFieldComponent
