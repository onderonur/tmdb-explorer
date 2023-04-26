import Link, { LinkProps } from 'next/link';
import { SxProps, Theme, Link as MuiLink } from '@mui/material';
import { forwardRef } from 'react';

export type NextLinkProps = React.PropsWithChildren<LinkProps> & {
  className?: string;
  sx?: SxProps<Theme>;
};

const NextLink = forwardRef<React.ElementRef<typeof Link>, NextLinkProps>(
  function NextLink({ href, ...rest }, ref) {
    return (
      <MuiLink
        ref={ref}
        component={Link}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        href={href as any}
        underline="none"
        // To disable prefetch feature of next/link
        prefetch={false}
        {...rest}
      />
    );
  },
);

export default NextLink;
