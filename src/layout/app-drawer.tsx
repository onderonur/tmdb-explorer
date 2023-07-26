// TODO: Genel olarak use client'lara bi bak fazla mı vs
'use client';

import {
  Divider,
  Drawer,
  List,
  ListSubheader,
  Toolbar,
  Box,
} from '@mui/material';
import AppDrawerItem from './app-drawer-item';
import { useAppDrawerContext } from './app-drawer-context';
import PersonIcon from '@mui/icons-material/RecentActors';
import StarIcon from '@mui/icons-material/StarRate';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AppTitle from './app-title';
import TmdbAttribution from '../tmdb/tmdb-attribution';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

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

  return (
    <>
      <Drawer
        open={isOpen}
        variant={'temporary'}
        onClose={close}
        sx={{
          '.MuiDrawer-paper': {
            width: '16rem',
          },
        }}
      >
        <Toolbar>
          <AppTitle />
        </Toolbar>
        <Box
          // TODO: Semantic Fix. nav içinde ul li olur mu vs. Veya nav içinde sub header vs nasıl olmalı?
          component="nav"
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
          {children}
        </Box>
        <TmdbAttribution />
      </Drawer>
    </>
  );
}

export default AppDrawer;
