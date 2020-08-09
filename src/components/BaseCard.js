import React from 'react';
import { Card, CardActionArea, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: 'transparent',
  },
  cardContent: {
    padding: 0,
  },
}));

function BaseCard({ hasActionArea, className, children, ...rest }) {
  const classes = useStyles();

  const content = (
    <CardContent className={classes.cardContent}>{children}</CardContent>
  );

  return (
    <Card elevation={0} className={clsx(classes.card, className)} {...rest}>
      {hasActionArea ? <CardActionArea>{content}</CardActionArea> : { content }}
    </Card>
  );
}

export default BaseCard;
