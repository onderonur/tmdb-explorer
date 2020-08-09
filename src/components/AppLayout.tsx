import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import AppHeader from '@/components/AppHeader';
import BackToTopButton from '@/components/BackToTopButton';
import AppDrawerProvider from '@/contexts/AppDrawerContext';
import AppDrawer from '@/contexts/AppDrawerContext/components/AppDrawer';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  main: {
    padding: theme.spacing(2),
  },
}));

type AppLayoutProps = React.PropsWithChildren<{}>;

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
