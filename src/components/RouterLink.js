import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { addKeepScrollState } from '@/hooks/useHistoryPush';

const useStyles = makeStyles((theme) => ({
  link: {
    color: 'inherit',
    textDecoration: 'inherit',
  },
}));

const RouterLink = React.forwardRef(
  ({ keepScroll, to, className, ...rest }, ref) => {
    const classes = useStyles();
    const toProp = keepScroll ? addKeepScrollState(to) : to;

    return (
      <Link
        {...rest}
        className={clsx(classes.link, className)}
        ref={ref}
        to={toProp}
      />
    );
  },
);

export default RouterLink;
