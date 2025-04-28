import { TextField } from '@mui/material';
import { ItemTextFieldProps } from './types';


export const ItemTextField = ({
  name, label, type = 'text', value, onChange, error, helperText, size, sx,
}: ItemTextFieldProps) => (
  <TextField
    name={name}
    label={label}
    type={type}
    variant='outlined'
    value={value}
    onChange={e => onChange(name, type === 'number' ? Number(e.target.value) : e.target.value)}
    fullWidth
    required={name === "code" ? false : true}
    error={error}
    helperText={helperText}
    size={size}
    sx={sx}
    InputLabelProps={{
      shrink: type === "date" ? true : undefined, // solo para fechas
    }}
  />
);
