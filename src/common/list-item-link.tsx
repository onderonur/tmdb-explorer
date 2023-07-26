'use client';

import NextLink from '@/routing/next-link';
import { ListItemButton, ListItemButtonProps } from '@mui/material';

type ListItemLinkProps = ListItemButtonProps<
  typeof NextLink,
  { component?: typeof NextLink }
>;

export default function ListItemLink(props: ListItemLinkProps) {
  return <ListItemButton {...props} component={NextLink} />;
}
