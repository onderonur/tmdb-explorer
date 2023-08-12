'use client';

import NextLink from '@/routing/next-link';
import { Chip, ChipProps } from '@mui/material';

type ChipLinkProps = ChipProps<
  typeof NextLink,
  { component?: typeof NextLink }
>;

export default function ChipLink(props: ChipLinkProps) {
  return <Chip {...props} component={NextLink} clickable />;
}
