import { Divider } from '@mui/material';
import ButtonLink from './button-link';

type SeeAllLinkProps = { href: string; isLinkVisible: boolean };

export default function SeeAllLink({ href, isLinkVisible }: SeeAllLinkProps) {
  return (
    <Divider sx={{ marginTop: 1 }}>
      {isLinkVisible && <ButtonLink href={href}>See all</ButtonLink>}
    </Divider>
  );
}
