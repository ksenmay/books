import React from 'react';
import { Button as MuiButton } from '@mui/material';
import type { ButtonProps } from '@mui/material';

const Button: React.FC<ButtonProps> = (props) => {
  return <MuiButton variant="contained" color="primary" {...props} />;
};

export default Button;
