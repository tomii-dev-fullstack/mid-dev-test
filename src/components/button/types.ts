export interface ButtonProps {
    label: string;
    onClick?: () => void;
    color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
    variant?: "contained" | "outlined" | "text";
    showLoading?: boolean;
    loading?: boolean; // loading externo
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  }