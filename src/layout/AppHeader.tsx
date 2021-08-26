import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Box,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import AppDrawerToggleButton from '@/layout/AppDrawerToggleButton';
import useDetectMobile from '@/common/useDetectMobile';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import HideOnScroll from '@/layout/HideOnScroll';
import NextLink from '@/routing/NextLink';
import MovieAndPersonAutocomplete from '@/search/MovieAndPersonAutocomplete';

const useStyles = makeStyles((theme) => ({
  titleLink: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
  closeMobileSearchButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    maxWidth: 680,
  },
}));

const AppHeader = React.forwardRef(function AppHeader(props, ref) {
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
                <MovieAndPersonAutocomplete autoFocus />
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
              <MovieAndPersonAutocomplete className={classes.search} />
            </Box>
          )}

          {!isMobileSearch && <AppDrawerToggleButton />}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
});

export default AppHeader;
