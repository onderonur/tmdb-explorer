import React from 'react';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useAppDrawer } from '@/modules/layout/AppDrawerContext';

function AppDrawerToggleButton() {
  const { toggle } = useAppDrawer();

  return (
    <IconButton onClick={toggle}>
      <MenuIcon />
    </IconButton>
  );
}

export default AppDrawerToggleButton;
