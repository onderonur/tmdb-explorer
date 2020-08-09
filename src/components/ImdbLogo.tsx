import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  logo: {
    width: 70,
    display: 'block',
  },
}));

function ImdbLogo() {
  const classes = useStyles();

  return <img className={classes.logo} src="/imdb-logo.svg" alt="IMDB Logo" />;
}

export default ImdbLogo;
