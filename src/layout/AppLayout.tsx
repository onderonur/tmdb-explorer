import React from 'react';
import { Container, styled, Toolbar, Box } from '@mui/material';
import AppHeader from './AppHeader';
import BackToTopButton from '@/layout/BackToTopButton';
import AppDrawerProvider from '@/layout/AppDrawerContext';
import AppDrawer, { APP_DRAWER_WIDTH } from '@/layout/AppDrawer';
import useIsMobile from '@/common/useIsMobile';

const Main = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2),
  flex: 1,
})) as typeof Container;

type AppLayoutProps = React.PropsWithChildren<unknown>;

function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <AppDrawerProvider>
      <AppHeader />
      <Toolbar />
      <Box display="flex">
        <Box component="nav" width={isMobile ? undefined : APP_DRAWER_WIDTH}>
          <AppDrawer />
        </Box>
        <Main component="main">{children}</Main>
      </Box>
      <BackToTopButton />
    </AppDrawerProvider>
  );
}

export default AppLayout;
