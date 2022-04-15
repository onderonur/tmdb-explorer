import { Link } from '@mui/material';

type ExternalLinkProps = React.PropsWithChildren<{ href: string }>;

export const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <Link href={href} {...externalLinkProps}>
      {children}
    </Link>
  );
}

export default ExternalLink;
