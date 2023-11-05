import { Box, Container } from '@mui/material';
import AppHeader from './app-header';
import AppDrawerProvider from '@/layout/app-drawer-context';
import AppDrawer from '@/layout/app-drawer';
import AppDrawerGenres from './app-drawer-genres';
import { APP_DRAWER_WIDTH } from './app-drawer-utils';

type AppLayoutProps = React.PropsWithChildren;

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppDrawerProvider>
      <AppHeader />
      <Box sx={{ display: 'flex' }}>
        <AppDrawer>
          <AppDrawerGenres />
        </AppDrawer>
        <Box
          sx={{
            flex: 1,
            padding: { xs: 0, md: 0 },
            marginBottom: 6,
            marginLeft: { lg: APP_DRAWER_WIDTH },
          }}
        >
          <Container
            maxWidth="xl"
            component="main"
            sx={{ padding: { xs: 0, md: 0 } }}
          >
            {children}
          </Container>
        </Box>
      </Box>
    </AppDrawerProvider>
  );
}
