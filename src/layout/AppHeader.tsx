import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, IconButton, styled } from '@mui/material';
import useIsMobile from '@/common/useIsMobile';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import HideOnScroll from '@/layout/HideOnScroll';
import MovieAndPersonAutocomplete from '@/search/MovieAndPersonAutocomplete';
import AppTitle from './AppTitle';

const CloseButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const StyledMovieAndPersonAutocomplete = styled(MovieAndPersonAutocomplete)({
  maxWidth: 680,
});

const AppHeader = React.forwardRef<HTMLDivElement, {}>(function AppHeader(
  props,
  ref,
) {
  const isMobile = useIsMobile();
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
      <AppBar
        ref={ref}
        color="default"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {!isMobileSearch && <AppTitle />}

          {isMobile ? (
            isMobileSearch ? (
              <>
                <CloseButton onClick={hideMobileSearch}>
                  <CloseIcon />
                </CloseButton>
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
              <StyledMovieAndPersonAutocomplete />
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
});

export default AppHeader;
