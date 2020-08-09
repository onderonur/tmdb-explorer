import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

interface TextWithLabelProps {
  label: React.ReactNode;
  text: React.ReactNode;
}

function TextWithLabel({ label, text }: TextWithLabelProps) {
  const classes = useStyles();

  return (
    <Box my={1}>
      <Typography className={classes.bold}>{label}</Typography>
      {typeof text === 'string' ? (
        <Typography variant="body2">{text}</Typography>
      ) : (
        text
      )}
    </Box>
  );
}

export default TextWithLabel;
