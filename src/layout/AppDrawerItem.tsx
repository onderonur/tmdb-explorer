import {
  ListItemIcon,
  ListItemText,
  ListItemButton,
  ListItem,
} from '@mui/material';
import NextLink, { NextLinkProps } from '@/routing/NextLink';
import Router from 'next/router';
import { resolveHref } from 'next/dist/shared/lib/router/utils/resolve-href';

type AppDrawerItemProps = Pick<NextLinkProps, 'href'> & {
  icon?: React.ReactNode;
  title: string;
  selected: boolean;
};

function AppDrawerItem({ href, icon, title, selected }: AppDrawerItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton href={resolveHref(Router, href, false)} component={NextLink} selected={selected}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
}

export default AppDrawerItem;
