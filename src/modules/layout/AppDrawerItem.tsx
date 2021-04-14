import React from 'react';
import { ListItemIcon, ListItemText, ListItem } from '@material-ui/core';
import { useRouter } from 'next/router';
import NextLink from '@/modules/routing/NextLink';

interface AppDrawerItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
}

function AppDrawerItem({ href, icon, title }: AppDrawerItemProps) {
  const router = useRouter();

  return (
    <ListItem
      button
      href={href}
      component={NextLink}
      selected={router.pathname === href}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
}

export default AppDrawerItem;
