import { forwardRef, useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import HideOnScroll from '@/layout/HideOnScroll';
import SearchAutocomplete from '@/search/SearchAutocomplete';
import AppTitle from './AppTitle';
import { usePaletteMode } from '@/theme/BaseThemeProvider';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import Brightness5OutlinedIcon from '@mui/icons-material/Brightness5Outlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import ExternalLink from '@/routing/ExternalLink';
import { useIsMobile } from '@/common/CommonHooks';

const AppHeader = forwardRef<HTMLDivElement>(function AppHeader(props, ref) {
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

          <Box sx={{ display: { xs: 'flex', md: 'none', flex: 1 } }}>
            {isMobileSearch && (
              <>
                <IconButton
                  aria-label="Hide search"
                  sx={{ marginRight: 2 }}
                  onClick={hideMobileSearch}
                >
                  <CloseIcon />
                </IconButton>
                <SearchAutocomplete autoFocus />
              </>
            )}
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flex: 1,
              mx: 2,
              justifyContent: 'center',
            }}
          >
            <SearchAutocomplete sx={{ maxWidth: 680 }} />
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
                LinkComponent={ExternalLink}
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
