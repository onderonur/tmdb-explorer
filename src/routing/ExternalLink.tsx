import { Link, LinkProps } from '@mui/material';
import { forwardRef } from 'react';

type ExternalLinkProps = LinkProps;

const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  function ExternalLink({ href, ...rest }, ref) {
    return (
      <Link
        ref={ref}
        {...rest}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      />
    );
  },
);

export default ExternalLink;
