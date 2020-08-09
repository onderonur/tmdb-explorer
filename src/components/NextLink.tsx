import React from 'react';
import Link, { LinkProps } from 'next/link';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  anchor: {
    textDecoration: 'none',
  },
}));

export type NextLinkProps = React.PropsWithChildren<LinkProps> & {
  className?: string;
};

const NextLink = React.forwardRef<HTMLAnchorElement, NextLinkProps>(
  (
    {
      children,
      href,
      as,
      passHref,
      prefetch,
      replace,
      scroll,
      shallow,
      // To pass the any other props like "className" etc to anchor.
      className,
      ...rest
    },
    ref,
  ) => {
    const classes = useStyles();

    return (
      <Link
        // If any other prop is passed to next/link,
        // it gives a propType warning.
        {...{ href, as, passHref, prefetch, replace, scroll, shallow }}
      >
        <a
          ref={ref}
          className={clsx(
            classes.anchor,
            // Material UI passes classes sometimes.
            // So, we need "className" prop here.
            className,
          )}
          {...rest}
        >
          {children}
        </a>
      </Link>
    );
  },
);

export default NextLink;
