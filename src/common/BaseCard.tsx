import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardProps,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  card: {
    backgroundColor: 'transparent',
  },
  cardContent: {
    padding: 0,
  },
}));

type BaseCardProps = CardProps & {
  hasActionArea: boolean;
};

function BaseCard({
  hasActionArea,
  className,
  children,
  ...rest
}: BaseCardProps) {
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
