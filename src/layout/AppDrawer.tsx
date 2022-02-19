import React from 'react';
import {
  Divider,
  Drawer,
  List,
  ListSubheader,
  styled,
  Toolbar,
  Box,
} from '@mui/material';
import AppDrawerItem from '@/layout/AppDrawerItem';
import { useAppDrawer } from '@/layout/AppDrawerContext';
import PersonIcon from '@mui/icons-material/RecentActors';
import StarIcon from '@mui/icons-material/StarRate';
import UpdateIcon from '@mui/icons-material/Update';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useQuery } from 'react-query';
import { apiQueries } from '@/http-client/apiQueries';
import AppTitle from './AppTitle';

export const APP_DRAWER_WIDTH = 260;

const StyledDrawer = styled(Drawer)({
  '.MuiDrawer-paper': {
    width: APP_DRAWER_WIDTH,
    overflow: 'hidden',
  },
});

function AppDrawer() {
  const { isOpen, close } = useAppDrawer();

  const { data: genresData, isLoading } = useQuery(
    apiQueries.genres.movieGenres(),
  );

  const drawerContent = (
    <>
      <Toolbar>
        <AppTitle />
      </Toolbar>
      <Box overflow="auto" display="flex" flexDirection="column">
        <List subheader={<ListSubheader>Discover</ListSubheader>}>
          <AppDrawerItem
            href="/movie/popular"
            icon={<TrendingUpIcon />}
            title="Popular Movies"
          />
          <AppDrawerItem
            href="/movie/top-rated"
            icon={<StarIcon />}
            title="Top Rated Movies"
          />
          <AppDrawerItem
            href="/movie/upcoming"
            icon={<UpdateIcon />}
            title="Upcoming Movies"
          />
          <AppDrawerItem
            href="/person/popular"
            icon={<PersonIcon />}
            title="Popular People"
          />
        </List>
        {isLoading ? null : (
          <>
            <Divider />
            <List subheader={<ListSubheader>Movie Genres</ListSubheader>}>
              {genresData?.genres.map((genre) => {
                return (
                  <AppDrawerItem
                    key={genre.id}
                    href={{
                      pathname: '/movie/discover',
                      query: { genreId: genre.id },
                    }}
                    title={genre.name}
                  />
                );
              })}
            </List>
          </>
        )}
      </Box>
    </>
  );

  const drawerProps = { open: isOpen, onClose: close };

  // If we use `useIsMobile` hook to render components responsively, it flickers especially on low-end mobile devices.
  // So, instead of relying on JS, we rely on CSS to prevent this flickering.
  return (
    <>
      <StyledDrawer
        {...drawerProps}
        variant={'permanent'}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        {drawerContent}
      </StyledDrawer>
      <StyledDrawer
        {...drawerProps}
        variant={'temporary'}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {drawerContent}
      </StyledDrawer>
    </>
  );
}

export default AppDrawer;
