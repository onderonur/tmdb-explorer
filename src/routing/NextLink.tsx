import Link, { LinkProps } from 'next/link';
import { SxProps, Theme, Link as MuiLink } from '@mui/material';
import React from 'react';

export type NextLinkProps = React.PropsWithChildren<LinkProps> & {
  className?: string;
  sx?: SxProps<Theme>;
};

const NextLink = React.forwardRef<React.ElementRef<typeof Link>, NextLinkProps>(
  function NextLink({ href, ...rest }, ref) {
    return (
      <MuiLink
        ref={ref}
        component={Link}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        href={href as any}
        underline="none"
        {...rest}
      />
    );
  },
);

export default NextLink;
