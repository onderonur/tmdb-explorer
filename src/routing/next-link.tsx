import Link from 'next/link';
import type { LinkProps as MuiLinkProps } from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import { forwardRef } from 'react';
import type { Omit } from '@/common/common-types';

type NextLinkProps = Omit<
  MuiLinkProps<typeof Link, { component?: typeof Link }>,
  'component'
>;

const NextLink = forwardRef<React.ElementRef<typeof Link>, NextLinkProps>(
  function NextLink(props, ref) {
    return (
      <MuiLink
        ref={ref}
        component={Link}
        underline="none"
        // TODO: Bunu bi check et prod ve dev'de vs.
        // To disable prefetch feature of next/link
        prefetch={false}
        {...props}
      />
    );
  },
);

export default NextLink;
