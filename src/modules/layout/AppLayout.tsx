import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import AppHeader from './AppHeader';
import BackToTopButton from '@/modules/layout/BackToTopButton';
import AppDrawerProvider from '@/modules/layout/AppDrawerContext';
import AppDrawer from '@/modules/layout/AppDrawer';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  main: {
    padding: theme.spacing(2),
  },
}));

type AppLayoutProps = React.PropsWithChildren<unknown>;

function AppLayout({ children }: AppLayoutProps) {
  const classes = useStyles();
  return (
    <AppDrawerProvider>
      <AppHeader />
      <AppDrawer />
      <div className={classes.toolbar} />
      <Container className={classes.main} component="main">
        <>{children}</>
      </Container>
      <BackToTopButton />
    </AppDrawerProvider>
  );
}

export default AppLayout;
