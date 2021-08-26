import React from 'react';
import { Drawer, List, makeStyles } from '@material-ui/core';
import MovieIcon from '@material-ui/icons/LocalMovies';
import PersonIcon from '@material-ui/icons/RecentActors';
import AppDrawerItem from '@/layout/AppDrawerItem';
import { useAppDrawer } from '@/layout/AppDrawerContext';

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: 240,
  },
}));

function AppDrawer() {
  const classes = useStyles();
  const { isOpen, close } = useAppDrawer();

  return (
    <Drawer
      open={isOpen}
      anchor="right"
      classes={{ paper: classes.drawerPaper }}
      onClose={close}
    >
      <List>
        <AppDrawerItem
          href="/movie/popular"
          icon={<MovieIcon />}
          title="Popular Movies"
        />
        <AppDrawerItem
          href="/person/popular"
          icon={<PersonIcon />}
          title="Popular People"
        />
      </List>
    </Drawer>
  );
}

export default AppDrawer;
