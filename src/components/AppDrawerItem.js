import React from 'react';
import { ListItemIcon, ListItemText, ListItem } from '@material-ui/core';
import { useRouter } from 'next/router';
import NextLink from './NextLink';

function AppDrawerItem({ to, icon, title }) {
  const router = useRouter();

  return (
    <ListItem
      button
      href={to}
      component={NextLink}
      selected={router.pathname === to}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
}

export default AppDrawerItem;
