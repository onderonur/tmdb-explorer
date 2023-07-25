import { Box } from '@mui/material';
import AppHeader from './AppHeader';
import AppDrawerProvider from '@/layout/AppDrawerContext';
import AppDrawer from '@/layout/AppDrawer';
import AppDrawerGenres from './AppDrawerGenres';

type AppLayoutProps = React.PropsWithChildren<unknown>;

function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppDrawerProvider>
      <AppHeader />
      <Box sx={{ flex: 1, display: 'flex' }}>
        <Box
          component="nav"
          sx={{
            // width: { xs: 0, md: APP_DRAWER_WIDTH },
            flex: 'none',
          }}
        >
          <AppDrawer>
            <AppDrawerGenres />
          </AppDrawer>
        </Box>
        <Box
          component="main"
          sx={{
            flex: 1,
            // To not let content of "main" to exceed it horizontally.
            minWidth: 0,
            minHeight: '100%',
            paddingBottom: 6,
          }}
        >
          {children}
        </Box>
      </Box>
    </AppDrawerProvider>
  );
}

export default AppLayout;
