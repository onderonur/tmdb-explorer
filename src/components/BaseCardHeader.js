import React from 'react';
import { CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    padding: theme.spacing(1),
  },
  cardTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

function BaseCardHeader({ className, ...rest }) {
  const classes = useStyles();

  return (
    <CardHeader
      {...rest}
      className={clsx(classes.cardHeader, className)}
      titleTypographyProps={{
        variant: 'subtitle2',
        className: classes.cardTitle,
      }}
      subheaderTypographyProps={{ variant: 'subtitle2' }}
    />
  );
}

export default BaseCardHeader;
