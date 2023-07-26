import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDrawerContext } from './app-drawer-context';

function AppDrawerToggleButton() {
  const { toggle } = useAppDrawerContext();

  return (
    <IconButton aria-label="Toggle drawer" onClick={toggle}>
      <MenuIcon />
    </IconButton>
  );
}

export default AppDrawerToggleButton;
