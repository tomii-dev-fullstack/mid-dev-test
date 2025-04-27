"use client"
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ItemSelectFieldProps } from './types';

export const ItemSelectField = ({ name, label, value, onChange, options }: ItemSelectFieldProps) => {
  return (
    <FormControl >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
      
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={value}
        label={label}
        onChange={(e: SelectChangeEvent<string>) => onChange(name, e.target.value)}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
