import Link from 'next/link';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import { forwardRef } from 'react';
import { Omit } from '@/common/CommonTypes';

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
        // To disable prefetch feature of next/link
        prefetch={false}
        {...props}
      />
    );
  },
);

export default NextLink;