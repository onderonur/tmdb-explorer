import React from 'react';
import { Box, Typography, styled } from '@mui/material';

const Label = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.disabled,
}));

interface TextWithLabelProps {
  label: React.ReactNode;
  text: React.ReactNode;
}

function TextWithLabel({ label, text }: TextWithLabelProps) {
  return (
    <Box my={1}>
      <Label>{label}</Label>
      {typeof text === 'string' ? (
        <Typography variant="body2">{text}</Typography>
      ) : (
        text
      )}
    </Box>
  );
}

export default TextWithLabel;
