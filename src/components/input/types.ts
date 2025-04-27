export interface ItemTextFieldProps {
    name: string;
    label: string;
    type?: string;
    value: string | number;
    onChange: (name: string, value: string | number) => void;
    error?: boolean;
    helperText?: string;
  }