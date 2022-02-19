import React from 'react';
import { Container, styled, Toolbar, Box } from '@mui/material';
import AppHeader from './AppHeader';
import BackToTopButton from '@/layout/BackToTopButton';
import AppDrawerProvider from '@/layout/AppDrawerContext';
import AppDrawer, { APP_DRAWER_WIDTH } from '@/layout/AppDrawer';

const Main = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2),
  flex: 1,
  // To not let content of "main" to exceed it horizontally.
  minWidth: 0,
})) as typeof Container;

type AppLayoutProps = React.PropsWithChildren<unknown>;

function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppDrawerProvider>
      <AppHeader />
      <Toolbar />
      <Box display="flex">
        <Box
          component="nav"
          width={{ xs: 0, md: APP_DRAWER_WIDTH }}
          flexShrink={0}
        >
          <AppDrawer />
        </Box>
        <Main component="main">{children}</Main>
      </Box>
      <BackToTopButton />
    </AppDrawerProvider>
  );
}

export default AppLayout;
