import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { commonInputStyles } from './style'; 

const SelectComponent = ({ label, name, value, onChange, options, disabled }) => (
  <FormControl fullWidth sx={{ mt: 0.5 }} disabled={disabled}>
    <InputLabel sx={{ pl: 1 }}>{label}</InputLabel>
    <Select
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      sx={{ ...commonInputStyles, pl: 1 }}
      disabled={disabled}
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default SelectComponent;
