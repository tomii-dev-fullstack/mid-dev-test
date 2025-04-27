'use client';

import { useState } from "react";
import { Button } from "@mui/material";
import { ButtonProps } from "./types";

export default function ButtonComponent({
  label,
  onClick,
  color = label === "Eliminar" ? "error" : "info",
  variant = "contained",
  showLoading = false,
  loading /* = false */, // loading externo
  type = "button",
}: ButtonProps) {
  const [internalLoading, setInternalLoading] = useState(false);

  const handleClick = async () => {
    if (!onClick) return;
    if (showLoading) setInternalLoading(true);
    try {
    
        onClick();
    } finally {
      if (showLoading) setInternalLoading(false);
    }
  };

  const isLoading = type === "submit" ? loading : showLoading ? internalLoading : loading;


  return (
    <Button
      type={type}
      onClick={handleClick}
      variant={variant}
      color={color}
      disabled={isLoading}
      disableElevation
    >
      {isLoading ? `${label}...` : label}
    </Button>
  );
}
