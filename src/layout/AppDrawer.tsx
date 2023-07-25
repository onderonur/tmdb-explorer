// TODO: Genel olarak use client'lara bi bak fazla mı vs
'use client';

import {
  Divider,
  Drawer,
  List,
  ListSubheader,
  Toolbar,
  Box,
  DrawerProps,
} from '@mui/material';
import AppDrawerItem from './AppDrawerItem';
import { useAppDrawerContext } from './AppDrawerContext';
import PersonIcon from '@mui/icons-material/RecentActors';
import StarIcon from '@mui/icons-material/StarRate';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AppTitle from './AppTitle';
import TmdbAttribution from '../tmdb/tmdb-attribution';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

export const APP_DRAWER_WIDTH = 260;

type AppDrawerProps = React.PropsWithChildren;

function AppDrawer({ children }: AppDrawerProps) {
  const { isOpen, close } = useAppDrawerContext();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    return () => {
      close();
    };
  }, [pathname, searchParams, close]);

  const drawerContent = (
    <>
      <Toolbar>
        <AppTitle />
      </Toolbar>
      <Box
        sx={{
          overflow: 'auto',
        }}
      >
        <List subheader={<ListSubheader>Discover</ListSubheader>}>
          <AppDrawerItem
            href="/movies/discover"
            selected={
              pathname === '/movies/discover' && !searchParams.get('genreId')
            }
            // TODO: Change icon
            icon={<TrendingUpIcon />}
            title="Discover Movies"
          />
          <AppDrawerItem
            href="/movies/popular"
            selected={pathname === '/movies/popular'}
            icon={<TrendingUpIcon />}
            title="Popular Movies"
          />
          <AppDrawerItem
            href="/movies/top-rated"
            selected={pathname === '/movies/top-rated'}
            icon={<StarIcon />}
            title="Top Rated Movies"
          />
          <AppDrawerItem
            href="/people/popular"
            selected={pathname === '/people/popular'}
            icon={<PersonIcon />}
            title="Popular People"
          />
        </List>
        <Divider />
        <div>{children}</div>
      </Box>
      <TmdbAttribution />
    </>
  );

  const drawerProps: DrawerProps = {
    open: isOpen,
    onClose: close,
    sx: {
      '.MuiDrawer-paper': {
        width: APP_DRAWER_WIDTH,
        overflow: 'hidden',
      },
    },
  };

  // If we use `useIsMobile` hook to render components responsively, it flickers especially on low-end mobile devices.
  // So, instead of relying on JS, we rely on CSS to prevent this flickering.
  return (
    <>
      {/* <Drawer
        {...drawerProps}
        variant={'permanent'}
        sx={{ ...drawerProps.sx, display: { xs: 'none', md: 'block' } }}
      >
        {drawerContent}
      </Drawer> */}
      <Drawer {...drawerProps} variant={'temporary'}>
        {drawerContent}
      </Drawer>
    </>
  );
}

export default AppDrawer;
