import type { Omit } from '@/common/common-types';
import type { LinkProps as MuiLinkProps } from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { forwardRef } from 'react';

type NextLinkProps = Omit<
  MuiLinkProps<typeof Link, { component?: typeof Link }>,
  'component'
>;

export const NextLink = forwardRef<
  React.ElementRef<typeof Link>,
  NextLinkProps
>(function NextLink(props, ref) {
  return (
    <MuiLink
      ref={ref}
      component={Link}
      underline="none"
      // To disable prefetch feature of next/link
      prefetch={false}
      {...props}
    />
  );
});
