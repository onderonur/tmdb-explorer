import { Divider, Skeleton } from '@mui/material';
import { ButtonLink } from './button-link';

type SeeAllLinkProps = { href: string; isLinkVisible: boolean };

export function SeeAllLink({ href, isLinkVisible }: SeeAllLinkProps) {
  return (
    <Divider sx={{ marginTop: 1 }}>
      {isLinkVisible && <ButtonLink href={href}>See all</ButtonLink>}
    </Divider>
  );
}

export function SeeAllLinkSkeleton() {
  return (
    <Divider sx={{ marginTop: 1 }}>
      <Skeleton width={68} sx={{ fontSize: '2.5rem' }} />
    </Divider>
  );
}
