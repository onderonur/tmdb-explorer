import { Divider } from '@mui/material';
import ButtonLink from './button-link';

type SeeAllLinkProps = { href: string; isLinkVisible: boolean };

export default function SeeAllLink({ href, isLinkVisible }: SeeAllLinkProps) {
  return (
    <Divider sx={{ marginTop: 2 }}>
      {isLinkVisible && (
        <ButtonLink
          // TODO: movies array'i için refactor
          // TODO: Hiç item olmayabilir videos array'inde. Bu kullanımları düzelt.
          href={href}
        >
          See all
        </ButtonLink>
      )}
    </Divider>
  );
}
