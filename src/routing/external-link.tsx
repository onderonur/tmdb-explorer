import type { LinkProps } from '@mui/material';
import { Link } from '@mui/material';
import { forwardRef } from 'react';

type ExternalLinkProps = LinkProps;

export const ExternalLink = forwardRef<
  React.ElementRef<typeof Link>,
  ExternalLinkProps
>(function ExternalLink(props, ref) {
  return (
    <Link ref={ref} {...props} target="_blank" rel="noopener noreferrer" />
  );
});
