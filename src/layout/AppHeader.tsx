import React, { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, styled, Stack } from '@mui/material';
import useIsMobile from '@/common/useIsMobile';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import HideOnScroll from '@/layout/HideOnScroll';
import SearchAutocomplete from '@/search/SearchAutocomplete';
import AppTitle from './AppTitle';
import { usePaletteMode } from '@/theme/BaseThemeProvider';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import Brightness5OutlinedIcon from '@mui/icons-material/Brightness5Outlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import { externalLinkProps } from '@/routing/ExternalLink';

const CloseButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const StyledSearchAutocomplete = styled(SearchAutocomplete)({
  maxWidth: 680,
});

const AppHeader = React.forwardRef<HTMLDivElement, {}>(function AppHeader(
  props,
  ref,
) {
  const isMobile = useIsMobile();
  const [isMobileSearch, setIsMobileSearch] = useState(false);

  if (!isMobile && isMobileSearch) {
    setIsMobileSearch(false);
  }

  function showMobileSearch() {
    setIsMobileSearch(true);
  }

  function hideMobileSearch() {
    setIsMobileSearch(false);
  }

  const { mode, toggleMode } = usePaletteMode();

  return (
    <HideOnScroll>
      <AppBar
        ref={ref}
        color="default"
        sx={{
          // To make the drawer clipped
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          {!isMobileSearch && <AppTitle />}

          <Box display={{ xs: 'flex', md: 'none' }} flex={1}>
            {isMobileSearch && (
              <>
                <CloseButton
                  aria-label="Hide search"
                  onClick={hideMobileSearch}
                >
                  <CloseIcon />
                </CloseButton>
                <SearchAutocomplete autoFocus />
              </>
            )}
          </Box>

          <Box
            flex={1}
            mx={2}
            justifyContent="center"
            display={{ xs: 'none', md: 'flex' }}
          >
            <StyledSearchAutocomplete />
          </Box>

          {!isMobileSearch && (
            <Stack spacing={1} direction="row">
              <IconButton
                aria-label="Show search"
                onClick={showMobileSearch}
                sx={{ display: { md: 'none' } }}
              >
                <SearchIcon />
              </IconButton>
              <IconButton aria-label="Toggle theme" onClick={toggleMode}>
                {mode === 'light' ? (
                  <DarkModeIcon />
                ) : (
                  <Brightness5OutlinedIcon />
                )}
              </IconButton>
              <IconButton
                aria-label="Toggle theme"
                href="https://github.com/onderonur/tmdb-explorer"
                {...externalLinkProps}
              >
                <GitHubIcon />
              </IconButton>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
});

export default AppHeader;
