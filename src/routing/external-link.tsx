import { Link, LinkProps } from '@mui/material';
import { forwardRef } from 'react';

type ExternalLinkProps = LinkProps;

const ExternalLink = forwardRef<
  React.ElementRef<typeof Link>,
  ExternalLinkProps
>(function ExternalLink(props, ref) {
  return (
    <Link ref={ref} {...props} target="_blank" rel="noopener noreferrer" />
  );
});

export default ExternalLink;
