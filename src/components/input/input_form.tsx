import { TextField } from '@mui/material';
import { ItemTextFieldProps } from './types';


export const ItemTextField = ({
  name, label, type = 'text', value, onChange, error, helperText
}: ItemTextFieldProps) => (
  <TextField
    name={name}
    label={label}
    type={type}
    variant='outlined'
    value={value}
    onChange={e => onChange(name, type === 'number' ? Number(e.target.value) : e.target.value)}
    fullWidth
    required
    error={error}
    helperText={helperText}
  />
);
