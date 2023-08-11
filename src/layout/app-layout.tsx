import { Box } from '@mui/material';
import AppHeader from './app-header';
import AppDrawerProvider from '@/layout/app-drawer-context';
import AppDrawer from '@/layout/app-drawer';
import AppDrawerGenres from './app-drawer-genres';
import { APP_DRAWER_WIDTH } from './app-drawer-utils';

type AppLayoutProps = React.PropsWithChildren<unknown>;

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppDrawerProvider>
      <AppHeader />
      <Box sx={{ display: 'flex' }}>
        <AppDrawer>
          <AppDrawerGenres />
        </AppDrawer>
        <Box
          component="main"
          sx={{
            paddingBottom: 6,
            flex: 1,
            marginLeft: { lg: APP_DRAWER_WIDTH },
          }}
        >
          {children}
        </Box>
      </Box>
    </AppDrawerProvider>
  );
}
