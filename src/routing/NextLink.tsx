import Link, { LinkProps } from 'next/link';
import { Omit } from '@/common/CommonTypes';
import { styled, SxProps, Theme } from '@mui/material';
import React from 'react';

const Anchor = styled('a')({
  textDecoration: 'none',
});

export type NextLinkProps = React.PropsWithChildren<
  Omit<LinkProps, 'passHref'>
> & {
  className?: string;
  sx?: SxProps<Theme>;
};

const NextLink = React.forwardRef<HTMLAnchorElement, NextLinkProps>(
  function NextLink(
    {
      children,
      href,
      prefetch,
      replace,
      scroll,
      shallow,
      // To pass the any other props like "className" etc to anchor.
      className,
      as,
      ...rest
    },
    ref,
  ) {
    return (
      <Link
        // If any other prop is passed to next/link,
        // it gives a propType warning.
        {...{ href, as, prefetch, replace, scroll, shallow }}
        // If the child of Link is a custom component that wraps an <a> tag, you must add passHref to Link.
        // https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag
        passHref={true}
      >
        <Anchor
          ref={ref}
          // Material UI passes classes sometimes.
          // So, we need "className" prop here.
          className={className}
          {...rest}
        >
          {children}
        </Anchor>
      </Link>
    );
  },
);

export default NextLink;
