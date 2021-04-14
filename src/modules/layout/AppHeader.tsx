import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  makeStyles,
  Box,
  IconButton,
} from '@material-ui/core';
import Searcher from '@/modules/searcher/Searcher';
import AppDrawerToggleButton from '@/modules/layout/AppDrawerToggleButton';
import useDetectMobile from '@/modules/shared/useDetectMobile';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import HideOnScroll from '@/modules/layout/HideOnScroll';
import NextLink from '@/modules/routing/NextLink';

const useStyles = makeStyles((theme) => ({
  titleLink: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
  closeMobileSearchButton: {
    marginRight: theme.spacing(2),
  },
  searcher: {
    maxWidth: 680,
  },
}));

const AppHeader = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const isMobile = useDetectMobile();
  const [isMobileSearch, setIsMobileSearch] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setIsMobileSearch(false);
    }
  }, [isMobile]);

  function showMobileSearch() {
    setIsMobileSearch(true);
  }

  function hideMobileSearch() {
    setIsMobileSearch(false);
  }

  return (
    <HideOnScroll>
      <AppBar ref={ref} color="default">
        <Toolbar>
          {(!isMobile || !isMobileSearch) && (
            <Link
              className={classes.titleLink}
              color="inherit"
              href="/movie/popular"
              component={NextLink}
            >
              <Typography variant="h6">TMDb</Typography>
            </Link>
          )}

          {isMobile ? (
            isMobileSearch ? (
              <>
                <IconButton
                  className={classes.closeMobileSearchButton}
                  onClick={hideMobileSearch}
                >
                  <CloseIcon />
                </IconButton>
                <Searcher autoFocus />
              </>
            ) : (
              <>
                <Box flex={1} />
                <IconButton onClick={showMobileSearch}>
                  <SearchIcon />
                </IconButton>
              </>
            )
          ) : (
            <Box flex={1} mx={2} display="flex" justifyContent="center">
              <Searcher className={classes.searcher} />
            </Box>
          )}

          {!isMobileSearch && <AppDrawerToggleButton />}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
});

export default AppHeader;
