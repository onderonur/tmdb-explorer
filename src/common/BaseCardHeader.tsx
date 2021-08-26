import React from 'react';
import { CardHeader, CardHeaderProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    padding: theme.spacing(1),
  },
  cardTitle: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

type BaseCardHeaderProps = CardHeaderProps;

function BaseCardHeader({ className, ...rest }: BaseCardHeaderProps) {
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
