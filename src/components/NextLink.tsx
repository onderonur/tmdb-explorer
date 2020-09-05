import React from 'react';
import Link, { LinkProps } from 'next/link';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { Omit } from '@/types';

const useStyles = makeStyles((theme) => ({
  anchor: {
    textDecoration: 'none',
  },
}));

export type NextLinkProps = React.PropsWithChildren<
  Omit<LinkProps, 'passHref'>
> & {
  className?: string;
};

const NextLink = React.forwardRef<HTMLAnchorElement, NextLinkProps>(
  (
    {
      children,
      href,
      as,
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
        {...{ href, as, prefetch, replace, scroll, shallow }}
        // If the child of Link is a custom component that wraps an <a> tag, you must add passHref to Link.
        // https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag
        passHref={true}
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
