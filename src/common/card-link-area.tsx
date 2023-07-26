'use client';

import NextLink from '@/routing/next-link';
import { CardActionArea, CardActionAreaProps } from '@mui/material';

type CardLinkAreaProps = CardActionAreaProps<
  typeof NextLink,
  { component?: typeof NextLink }
>;

export default function CardLinkArea(props: CardLinkAreaProps) {
  return <CardActionArea {...props} component={NextLink} />;
}
