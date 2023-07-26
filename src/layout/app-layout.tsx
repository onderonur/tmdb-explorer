import { Box } from '@mui/material';
import AppHeader from './app-header';
import AppDrawerProvider from '@/layout/app-drawer-context';
import AppDrawer from '@/layout/app-drawer';
import AppDrawerGenres from './app-drawer-genres';

type AppLayoutProps = React.PropsWithChildren<unknown>;

function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppDrawerProvider>
      <AppHeader />
      <AppDrawer>
        <AppDrawerGenres />
      </AppDrawer>
      <Box
        component="main"
        sx={{
          paddingBottom: 6,
        }}
      >
        {children}
      </Box>
    </AppDrawerProvider>
  );
}

export default AppLayout;
