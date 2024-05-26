import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { useAppDrawerContext } from './app-drawer-context';

export function AppDrawerToggleButton() {
  const { toggle } = useAppDrawerContext();

  return (
    <IconButton aria-label="Toggle drawer" onClick={toggle}>
      <MenuIcon />
    </IconButton>
  );
}
