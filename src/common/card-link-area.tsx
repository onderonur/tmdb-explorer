'use client';

import { NextLink } from '@/routing/next-link';
import type { CardActionAreaProps } from '@mui/material';
import { CardActionArea } from '@mui/material';

type CardLinkAreaProps = CardActionAreaProps<
  typeof NextLink,
  { component?: typeof NextLink }
>;

export function CardLinkArea(props: CardLinkAreaProps) {
  return <CardActionArea {...props} component={NextLink} />;
}
