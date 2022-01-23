import React from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDrawer } from '@/layout/AppDrawerContext';

function AppDrawerToggleButton() {
  const { toggle } = useAppDrawer();

  return (
    <IconButton onClick={toggle}>
      <MenuIcon />
    </IconButton>
  );
}

export default AppDrawerToggleButton;
