import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

function TextWithLabel({ label, text }) {
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
